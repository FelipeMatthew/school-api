"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index(req, res) {
    res.json('Home controller running ok');
  }
}

exports. default = new HomeController();
