import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  // Index

  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      },
    });

    res.json(alunos);
  }

  // Store

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      const {
        nome, sobrenome, idade, peso, altura,
      } = aluno;

      return res.json({
        aluno: {
          nome, sobrenome, idade, peso, altura,
        },
        studentCreated: 'Success',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Show

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: [
            'Id is missing',
          ],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: [
            'Student not found, please try again',
          ],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: [
            'Id is missing',
          ],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: [
            'Student not found, please try again',
          ],
        });
      }

      // Vai apagar o aluno da base de dados
      await aluno.destroy();

      return res.json({
        deleted: true,
        msg: 'Student deleted',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: [
            'Id is missing',
          ],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: [
            'Student not found, please try again',
          ],
        });
      }

      // Vai fazer o update dos dados dos alunos
      const alunoAtualizado = await aluno.update(req.body);

      const {
        nome, sobrenome, idade, peso, altura,
      } = alunoAtualizado;

      return res.json({
        nome, sobrenome, idade, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
