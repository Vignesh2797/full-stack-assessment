const express = require("express");
const PORT = process.env.PORT || 3001;
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv")
dotenv.config()
const dir = require('node-dir');
const fs = require('fs');
const app = express();
const cors = require('cors');
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dpcwz.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = "test";
const colName = "records";

app.use(cors());
app.use(express.json())


async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to database");
        const db = client.db(dbName);
        const col = db.collection(colName)

        dir.readFiles(`${process.env.DB_DATAPATH}`, async function (err, content, filename, next) {
            if (err) throw err;
            const dataBuffer = fs.readFileSync(filename)
            const dataJSON = dataBuffer.toString();
            const data = JSON.parse(dataJSON)
            const p = await col.insertOne(data);
            next();
        })

    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);

client.close();


app.get("/api", (req, res) => {
    res.json({ message: "Hello World!!!!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
