import definePokemon from "../models/pokemon.sequilize";
import userModel from "../models/user.sequelize";

const { Sequelize, DataTypes } = require("sequelize");
const pokemons = require('./mock-pokemon');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize('pokedexdb', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

export const Pokemon = definePokemon(sequelize, DataTypes);
export const User = userModel(sequelize, DataTypes)

export const initDb = () => {
    return sequelize.sync({force: true})
    .then(()=> {
        console.log('la base de données "pokedex" à bien été crée.');
        pokemons.map((pokemon) => {
            Pokemon.create({name: pokemon.name, hp: pokemon.hp, cp: pokemon.cp, picture: pokemon.picture, types: pokemon.types})
            .then((data)=> console.log(data.toJSON()));
        });
        
    })
}



/**
 * const sequelize = new Sequelize(
    'pokedexDb', //nom de la base de donnee
    'root',// nom d'utilisateur par defaut de mariadb permettant d'acceder a la BD
    '',// le mot de pass par defaut est vide
    {
        host: 'localhost',// le nom permettant de situer la base de donnée
        dialect: 'mariadb',// nom du driver que nous utiliser pour inter-agir avec sequilize qui est notre ORM
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }

);*/