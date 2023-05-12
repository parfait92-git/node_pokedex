import { SECRET_KEY } from "../auth/private_key";
import { User } from "../db/sequilize";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = SECRET_KEY;


export default function authenticateUser(app) {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } })
            .then(user => {
                if (!user) {
                    const message = `L'utilisateur n'existe pas`;
                    return res.status(404).json({ message })
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(isPasswordValid => {
                        if (!isPasswordValid) {
                            const message = 'Le mot de passe est incorret';
                            return res.status(401).json({ message, data: user });
                        }
                        //JWT 
                        const token = jwt.sign(
                            {userId: user.id},
                            privateKey,
                            {expiresIn: '24h'}
                        )
                        const message = 'L\'utilisateur a été connecté avec succès';
                        return res.json({ message, data: user, token });
                    })
            })
            .catch(err => {
                const message = 'L\'utilisateur n\'a pas pu être connecté réessayer plus tard';
                return res.json({ message, data: err });
            })
    })
}