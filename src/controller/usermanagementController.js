const usermanagementService = require('../service/usermanagementService');

class usermanagement {

    async listuser(req, res) {
        try {
            const ret = await usermanagementService.listuser(req.body);
            res.json(ret)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async adduser(req, res) {
        try {
            const ret = await usermanagementService.adduser(req.body);
            res.json(ret);
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async updateuser(req, res) {
        try {
            const ret = await usermanagementService.updateuser(req.body);
            res.json(ret);
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async deleteuser(req, res) {
        try {
            const ret = await usermanagementService.deleteuser(req.body);
            res.json(ret);
        } catch (err) {
            res.status(400).json(err)
        }

    }

}
const Usermanagement = new usermanagement();
module.exports = Usermanagement;