import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: [
        'Login required',
      ],
    });
  }
  // Texto  Token
  // Bearer 8ad98f787sd8fasdb6234jhnk523knfapsj23423mfks
  const token = req.headers.authorization.split(' ')[1];

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: [
          'Usuário inválido',
        ],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errors: [
        'Token inválido',
      ],
    });
  }
};
