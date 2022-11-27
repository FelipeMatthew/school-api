import User from '../models/User';

class UserController {
  // Store / Create
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      const { id, nome, email } = novoUser;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: [
          'id',
          'nome',
          'email',
        ],
      });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const users = await User.findByPk(req.params.id); // Encontrar pela primary key
      const { id, nome, email } = users;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId); // Encontrar pela primary key
      if (!user) {
        res.status(400).json({
          errors: [
            'Usuário não encontrado',
          ],
        });
      }

      const novosDados = await user.update(req.body);
      // Atualizando novos dados dos usuários já existentes

      const { id, nome, email } = novosDados;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId); // Encontrar pela primary key

      if (!user) {
        res.status(400).json({
          errors: [
            'Usuário não encontrado',
          ],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
