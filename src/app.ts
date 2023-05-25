const express = require("express");
const favIcon = require("serve-favicon");
const bodyParser = require("body-parser");

import { initDb } from "./db/sequilize";
import authenticateUser from "./routes/login";
import createPokemon from "./routes/createPokemon";
import deletePokemon from "./routes/deletePokemon";
import listAllPokemon from "./routes/findAllPokemons";
import findPokemonById from "./routes/findPokemonById";
import updatePokemon from "./routes/updatePokemon";
import createUser from "./routes/register";
const cors = require("cors");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "swagger api for Node js project",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: [
    "./routes/createPokemon.ts",
    "./routes/login.ts",
    "./routes/deletePokemon.ts",
    "./routes/findAllPokemons.ts",
    "./routes/updatePokemon.ts",
    "./routes/register.ts",
  ],
};

const swaggerSpec = swaggerJsDocs(options);

app
  .use(favIcon(__dirname + "/resources/favicon.ico"))
  .use(bodyParser.json())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use(cors());

initDb();
app.get("/", (req, res) => {
  res.json("hello, Heroku app");
});
listAllPokemon(app);
findPokemonById(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);
authenticateUser(app);
createUser(app);
app.use((res) => {
  const message =
    "Impossible de trouver la ressource demandé, vous pouvez essayer une autre URL";
  res.status(404).json(message);
});
const server = app.listen(port, () =>
  console.log(
    `Notre application Node est demarrée sur : http://localhost:${port}`
  )
);

module.exports = server;
