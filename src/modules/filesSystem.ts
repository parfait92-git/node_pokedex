import * as fs from "fs";

const writeMytext = (data: string) => {
    new fs.writeFile("./src/data.txt", data, (err) => {
        if (err) throw err;
    })
}

const readText = () => {
    fs.readFile("./src/data.txt", "utf-8", (err, data) => {
        if (err) throw err;
        console.log(`the data is ${data}`);
    })
}


module.exports = {
    writeMytext,
    readText
}