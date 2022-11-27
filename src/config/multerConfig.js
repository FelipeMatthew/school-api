// Multer serve para fazer upload de arquivos

import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 100000 + 100000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Formato de arquivo inválido, verifique o tipo de arquivo'));
    }

    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Cb = Callback
      // Primeiro parametro é o erro já o segundo é a rota

      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },

    filename: (req, file, cb) => {
      // Primeiro parametro é o erro já o segundo é o nome

      // Aqui ele ta pegando o nome do arquivo que vai ser a data atual +
      // numero aleatorio + extrair o nome do file original

      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },

  }),
};
