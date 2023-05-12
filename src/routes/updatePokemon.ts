import { Request, Response } from 'express';
import { Pokemon } from '../db/sequilize';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import auth from '../auth/auth';

export default function updatePokemon(app: any) {
    app.put('/api/pokemons/:id',auth, (req: Request, res: Response) => {
        const id = req.params.id;
        Pokemon.update(req.body, {
            where: {id : id}
        })
        .then(()  => {
          return  Pokemon.findByPk(id).then((pokemons) => {
                if (pokemons === null) {
                    const message = 'Le pokemon n\'existe pas, réessayez un autre identifiant';
                    return res.status(400).json(message);
                }
                const message = `Le pokemon ${pokemons.name} a été modifié`;
                res.json({message, data: pokemons})
            })
            
        }).
        catch((err) => {
            if(err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if(err instanceof UniqueConstraintError) {
                throw res.status(400).json({message: err.message});
            }
            const message = 'Une erreur s\'est produite lors de la modification du pokemon';
            console.error(message+': ', err);
            res.status(500).json({message, data: err})
        })
    })
}