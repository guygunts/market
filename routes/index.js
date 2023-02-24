const express = require('express');
const  MongoClient = require('mongodb').MongoClient;
const pathdev = require('dotenv').config({ path: './dev.env' });

const router = express.Router();
const usermanagement = require('../src/controller/usermanagementController');
const market = require('../src/controller/marketController');

const login = require('../src/controller/loginContrller');

router.post('/login',login.loginuser)


router.get('/listusermanagement',usermanagement.listuser)
router.post('/adduserusermanagement',usermanagement.adduser)
router.post('/updateuserusermanagement',usermanagement.updateuser)
router.delete('/deleteuserusermanagement',usermanagement.deleteuser)


router.post('/listmarket',market.listmarket)
router.post('/addmarket',market.addmarket)
router.post('/updatemarket',market.updatemarket)
router.delete('/deletemarket',market.deletemarket)


router.get('/createdb',createdb)

async function createdb(){
    let datajson = await MongoClient.connect(`${pathdev.parsed.url}`)
    let dbo = datajson.db(`${pathdev.parsed.url}`);
    try{
        dbo.createCollection("usermanagement")
        
    }catch(err){
        return err
    }
    datajson.close();
}
module.exports = router;
