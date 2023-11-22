import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Charge les variables d'environnement à partir du fichier .env
dotenv.config();

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("test");

export default db;