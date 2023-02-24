const marketService = require('../service/marketService');

class market {

    async listmarket(req, res) {
        try {
            const ret = await marketService.listmarket(req.body);
            res.json(ret)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async addmarket(req, res) {
        try {
            let multer = require('multer')
            let filessystem = require('fs');
            let dir = './image'
            let storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    if (!filessystem.existsSync(dir)) {
                        filessystem.mkdirSync(dir);
                    }
                    cb(null, dir);
                },
                filename: (req, file, cb) => {

                    cb(null, file.originalname)
                }
            });

            let upload = multer({ storage }).any()

            upload(req, res, async function (err) {
                try {
                    const arraydata= []
                    for (let i = 0; i < req.files.length; i++) {
                        const converttobase64 = await filessystem.readFileSync(req.files[i].path, { encoding: 'base64' })
                        req.body.image = `data:${req.files[i].mimetype};base64,${converttobase64}`
                        arraydata.push(req.body)
                    }
                    const ret = await marketService.addmarket(arraydata);
                    res.json(ret);
                } catch (err) {
                    res.status(400).json(err)
                }
            })
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async updatemarket(req, res) {
        try {
            let multer = require('multer')
            let filessystem = require('fs');
            let dir = './image'
            let storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    if (!filessystem.existsSync(dir)) {
                        filessystem.mkdirSync(dir);
                    }
                    cb(null, dir);
                },
                filename: (req, file, cb) => {

                    cb(null, file.originalname)
                }
            });

            let upload = multer({ storage }).any()

            upload(req, res, async function (err) {
                try {
                    for (let i = 0; i < req.files.length; i++) {
                        const converttobase64 = await filessystem.readFileSync(req.files[i].path, { encoding: 'base64' })
                        req.body.image = `data:${req.files[i].mimetype};base64,${converttobase64}`
                    }
                    const ret = await marketService.updatemarket(req.body);
            res.json(ret);
                } catch (err) {
                    res.status(400).json(err)
                }
            })
        } catch (err) {
            res.status(400).json(err)
        }
    }

    async deletemarket(req, res) {
        try {
            const ret = await marketService.deletemarket(req.query);
            res.json(ret);
        } catch (err) {
            res.status(400).json(err)
        }

    }

}
const Market = new market();
module.exports = Market;