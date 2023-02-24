const MongoClient = require('mongodb').MongoClient;
const pathdev = require('dotenv').config({ path: './dev.env' });

class Loginmanagement {

    async login(req) {
        try {
            let datajson = await MongoClient.connect(pathdev.parsed.url)
            let dbo = datajson.db(pathdev.parsed.database);
            let data = await dbo.collection("usermanagement").find(req).toArray();
            datajson.close();
            return data
        } catch (err) {
            throw err
        }
    }

}
const loginmanagement = new Loginmanagement();
module.exports = loginmanagement;