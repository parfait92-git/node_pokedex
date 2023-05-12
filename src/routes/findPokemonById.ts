import { Request, Response } from 'express';
import { Pokemon } from '../db/sequilize';
import auth from '../auth/auth';

export default function findPokemonById(app: any) {
    app.get('/api/pokemons/:id',auth, (req: Request, res: Response) => {
        Pokemon.findByPk(req.params.id)
        .then((pokemons  => {
            const message = `Le pokemon ${pokemons.name} a été retrouvé`;
            res.json({message, data: pokemons})
        })).
        catch((err) => {
            const message = 'Une erreur s\'est produite lors de la recherche du pokemon'
            console.error(message+ ': ', err);
            res.status(500).json({message, data: err})
        })
    })
}