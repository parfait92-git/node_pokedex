import { Request, Response } from 'express';
import { Pokemon } from '../db/sequilize';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import auth from '../auth/auth';

export default function createPokemon(app: any) {
    app.post('/api/pokemons',auth, (req: Request, res: Response) => {
        Pokemon.create(req.body)
        .then((pokemons  => {
            const message = `Le pokemon ${req.body.name} a été ajouté`;
            res.json({message, data: pokemons})
        })).
        catch((err) => {
            if(err instanceof ValidationError) {
                return res.status(400).json({message: err.message, data: err})
            }
            if(err instanceof UniqueConstraintError) {
                throw res.status(400).json({message: err.message});
            }
            const message = 'Une erreur s\'est produite lors de la creation du pokemon';
            console.error(message+': ', err);
            res.status(500).json({message, data: err})
        })
    })
}