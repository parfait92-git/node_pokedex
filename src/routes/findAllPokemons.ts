import { Request, Response } from 'express';
import { Pokemon } from '../db/sequilize';
import auth from '../auth/auth';
const { Op } = require('sequelize');

/**
 * @swagger 
 * /:
 * get: 
 *      summary: this api is used to list all pokemon
 *      description: this api test if the api works or not
 *      responses: 
 *               200: 
 *                  description: the api works
 */
export default function listAllPokemon(app: any) {
    app.get('/api/pokemons', auth, (req: Request, res: Response) => {
        const reqLimit = parseInt(req.query.limit);
        const limit: number = reqLimit ? reqLimit : 5;
      if (req.query.name) {
        const name = req.query.name;
  
        if (name.length < 2) {
          const message = 'Le terme de la recherche doit contenir au moins 2 caractères';
          return res.status(400).json({ message });
        }
  
        return Pokemon.findAndCountAll({
          where: {
            name: {
              [Op.like]: `%${name}%`
            }
          },
          order: ['name'],
          limit: limit,
        })
          .then(({ count, rows }) => {
            const message = `Nous avons trouvé ${count} résultats de pokémon associés à votre recherche`;
            res.json({ message, data: rows });
          })
          .catch((err) => {
            const message = 'Une erreur s\'est produite lors de la récupération des pokémons';
            console.error(message + ': ', err);
            res.status(500).json({ message, data: err });
          });
      } else {
        return Pokemon.findAll({ order: ['name'], limit: limit })
          .then((pokemons) => {
            const message = `La liste des ${pokemons.length} pokémons a bien été récupérée`;
            res.json({ message, data: pokemons });
          })
          .catch((err) => {
            const message = 'Une erreur s\'est produite lors de la récupération des pokémons';
            console.error(message + ': ', err);
            res.status(500).json({ message, data: err });
          });
      }
    });
  }
  