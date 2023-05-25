import { SECRET_KEY } from "../auth/private_key";
import { User } from "../db/sequilize";
const bcrypt = require('bcrypt');

import { Request, Response } from 'express';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export default function createUser(app: any) {
    app.post('/api/users', (req: Request, res: Response) => {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            User.create({...req.body, password: hash})
        .then((user  => {
            const message = `L'utilisateur ${user.name} a été ajouté`;
            res.json({message, data: user})
        })).
        catch((err) => {
            if(err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if(err instanceof UniqueConstraintError) {
                throw res.status(400).json({message: err.message});
            }
            const message = 'Une erreur s\'est produite lors de la creation de l\'utilisateur';
            console.error(message+': ', err);
            res.status(500).json({message, data: err})
        })
        })
        
    })
}