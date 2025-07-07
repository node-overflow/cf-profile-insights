import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:3000';
const client = new MongoClient(uri);

let db;
let handlesCollection;

export async function connectToMongo() {
    if (!db) {
        await client.connect();
        db = client.db('cf_autocomplete');
        handlesCollection = db.collection('handles');

        await handlesCollection.createIndex({ handle: 1 }, { unique: true });
    }
}

export async function saveHandle(handle) {
    if (!handle) return;
    await handlesCollection.updateOne(
        { handle },
        { $set: { handle, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true }
    );
}

export async function getRecentHandles(limit = 10) {
    return handlesCollection
        .find({})
        .sort({ updatedAt: -1 })
        .limit(limit)
        .toArray();
}

export async function searchHandles(partial, limit = 5) {
    if (!partial) return [];

    return handlesCollection
        .find({ handle: { $regex: `^${partial}`, $options: 'i' } })
        .limit(limit)
        .toArray();
}
