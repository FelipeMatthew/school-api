"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Multer serve para fazer upload de arquivos

var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const aleatorio = () => Math.floor(Math.random() * 100000 + 100000);

exports. default = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new _multer2.default.MulterError('Formato de arquivo inválido, verifique o tipo de arquivo'));
    }

    return cb(null, true);
  },

  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      // Cb = Callback
      // Primeiro parametro é o erro já o segundo é a rota

      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },

    filename: (req, file, cb) => {
      // Primeiro parametro é o erro já o segundo é o nome

      // Aqui ele ta pegando o nome do arquivo que vai ser a data atual +
      // numero aleatorio + extrair o nome do file original

      cb(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`);
    },

  }),
};
