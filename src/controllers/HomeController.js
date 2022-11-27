class HomeController {
  async index(req, res) {
    res.json('Home controller running ok');
  }
}

export default new HomeController();
