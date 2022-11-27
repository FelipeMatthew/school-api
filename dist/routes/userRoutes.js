"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

// Controllers
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

// Middlewares
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
// O jwt ta dando erro nao esta lendo

const router = new (0, _express.Router)();

// Não precisa existir pois são inuteis
// router.get('/:id', userController.show);
// router.get('/', userController.index);

router.post('/', _loginRequired2.default, _UserController2.default.store); // Fica aberto para usuário entre para criar a conta
router.put('/', _loginRequired2.default, _UserController2.default.update); // permissao para que usuário para modificar cadastro
router.delete('/', _loginRequired2.default, _UserController2.default.delete);

exports. default = router;

/*
Cada controller pode ter por media de 5 métodos, no padrao que o mercado utiliza

index -> lista todos os users -> GET
store/create -> cria um novo user -> POST
delete -> apaga um user -> DELETE
show -> mostra o user -> GET
update -> atualiza o user -> PATCH OU PUT
*/
