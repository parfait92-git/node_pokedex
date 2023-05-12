const express = require("express");
const favIcon = require("serve-favicon");
const bodyParser = require("body-parser");

import { initDb } from './db/sequilize';
import authenticateUser from './routes/login';
import createPokemon from './routes/createPokemon';
import deletePokemon from './routes/deletePokemon';
import listAllPokemon from './routes/findAllPokemons';
import findPokemonById from './routes/findPokemonById';
import updatePokemon from './routes/updatePokemon';


const app = express();
const port = process.env.PORT || 3000;


 
app.use(favIcon(__dirname + "/resources/favicon.ico"))
.use(bodyParser.json());  

initDb();
app.get('/', (req, res) => {
    res.json("hello, Heroku app")
})
listAllPokemon(app);
findPokemonById(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);
authenticateUser(app);
app.use((res)=> {
    const message = 'Impossible de trouver la ressource demandé, vous pouvez essayer une autre URL';
    res.status(404).json(message);
})
app.listen(port, ()=> console.log(`Notre application Node est demarrée sur : http://localhost:${port}`));