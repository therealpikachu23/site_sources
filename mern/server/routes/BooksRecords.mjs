import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//  /!\ les chemins de ce fichier sont utilisés pour les opérations CRUD, et le chemin doit être le même dans les fichiers add/delete/edit etc

// This section will help you get a list of all the records.
router.get("/getAllBooks", async (req, res) => {
    let collection = await db.collection("books");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/getSingleBook/:id", async (req, res) => {
    let collection = await db.collection("books");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/addNewBook", async (req, res) => {
    let newDocument = {
        tag: req.body.tag,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    };
    let collection = await db.collection("books");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/updateBook/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            tag: req.body.tag,
            name: req.body.name,
            description: req.body.description,
            url: req.body.url
        }
    };

    let collection = await db.collection("books");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/deleteBook/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("books");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;