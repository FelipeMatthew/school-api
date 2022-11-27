"use strict";const bcryptjs = require('bcryptjs');

// Usado para criar um template no banco de dados assim podendo gerar varios usuários
// npx sequelize bd:seed:all

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [

      {
        nome: 'Escreva aq',
        email: 'felipe2@gmail.com',
        password_hash: await bcryptjs.hash('123555456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        nome: 'Bruno',
        email: 'felipe33@gmail.com',
        password_hash: await bcryptjs.hash('12323223456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
