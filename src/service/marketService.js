const MongoClient = require('mongodb').MongoClient;
const pathdev = require('dotenv').config({ path: './dev.env' });
class Market {

    async listmarket(req) {
        try {
            let searchQuery
            let datajson = await MongoClient.connect(pathdev.parsed.url)
            let dbo = datajson.db(pathdev.parsed.database);
            if (req.search !== '' && typeof req.search !== 'undefined') {
                searchQuery = { "name": { "$regex": req.search, "$options": "i" } }
            } else {
                searchQuery = req
            }
            let data = await dbo.collection("market").find(searchQuery).toArray();
            datajson.close();
            return data
        } catch (err) {
            throw err
        }
    }

    async addmarket(req) {
        try {
            let datajson = await MongoClient.connect(pathdev.parsed.url)
            let dbo = datajson.db(pathdev.parsed.database);
            let data = await dbo.collection("market").insertMany(req);
            datajson.close();
            return data
        } catch (err) {
            throw err
        }
    }

    async updatemarket(req) {
        try {
            var bson = require("bson");
            const id = new bson.ObjectId(req.id)

            let datajson = await MongoClient.connect(pathdev.parsed.url)
            let dbo = datajson.db(pathdev.parsed.database);
            var newvalues = { $set: { name: req.name, detail: req.detail, image: req.image } };
            let data = await dbo.collection("market").updateOne({ _id: id }, newvalues);
            datajson.close();
            return data
        } catch (err) {
            throw err
        }

    }

    async deletemarket(req) {
        try {
            var bson = require("bson");
            const id = new bson.ObjectId(req.id)
            let datajson = await MongoClient.connect(pathdev.parsed.url)
            let dbo = datajson.db(pathdev.parsed.database);
            let data = await dbo.collection("market").deleteOne({ _id: id });
            datajson.close();
            return data
        } catch (err) {
            throw err
        }

    }

}
const market = new Market();
module.exports = market;