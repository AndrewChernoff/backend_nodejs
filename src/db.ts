import { MongoClient } from "mongodb"
import { Product } from "./repositories/productsRepositories-db";


const mongoUrl = process.env.MongoURI || 'mongodb://0.0.0.0:27017';

export const client = new MongoClient(mongoUrl)

const db = client.db('shop');
export const productCollection = db.collection<Product>('products')

export const runDb = async() => {
    try {
        await client.connect()
        await client.db('products').command({ping: 1})
        console.log('Connected seccesfully to mongo server');
    } catch {
        await client.close();
    }
}