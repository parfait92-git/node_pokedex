import { Request, Response } from 'express';
import { Pokemon } from '../db/sequilize';
import auth from '../auth/auth';

export default function deletePokemon(app: any) {
    app.delete('/api/pokemons/:id',auth, (req: Request, res: Response) => {
        Pokemon.findByPk(req.params.id)
        .then((pokemons  => {
            if (pokemons === null) {
                const message = 'Le pokemon n\'existe pas, réessayez un autre identifiant';
                return res.status.json(message);
            }
            const pokemonDeleted = pokemons;
          return  Pokemon.destroy({
                where: {id: pokemons.id}
            }).then(()=> {
                const message = `Le pokemon l'identifiant n ${pokemonDeleted.id} a été suprimé`;
                res.json({message, data: pokemonDeleted})
            })
        })).
        catch((err) => {
            const message = 'Une erreur s\'est produite lors de la suppression du pokemon'
            console.error(message+ ': ', err);
            res.status(500).json({message, data: err})
        })
    })
}