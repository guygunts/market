const e = require('express');
const loginService = require('../service/loginService');

class Login {
  async loginuser(req, res) {
    try {

      const ret = await loginService.login(req.body);
      if (ret.length > 0) {
        if (ret[0].username !== req.body.username) {
          res.status(400);
          let data = {
            'message': 'username is wrong'
          }
          res.json(data);
        } else if (ret[0].pass !== req.body.pass) {
          res.status(400);
          let data = {
            'message': 'password is wrong'
          }
          res.json(data);
        } else {
          let data = {
            'message': 'success'
          }
          res.json(data);
        }
      }else{
        let data = {
          'messageage': 'user not found'
        }
        res.json(data);
      }
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
const login = new Login();
module.exports = login;