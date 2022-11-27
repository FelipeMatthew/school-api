import { Router } from 'express';

// Controllers
import userController from '../controllers/UserController';

// Middlewares
import loginRequired from '../middlewares/loginRequired';
// O jwt ta dando erro nao esta lendo

const router = new Router();

// Não precisa existir pois são inuteis
// router.get('/:id', userController.show);
// router.get('/', userController.index);

router.post('/', loginRequired, userController.store); // Fica aberto para usuário entre para criar a conta
router.put('/', loginRequired, userController.update); // permissao para que usuário para modificar cadastro
router.delete('/', loginRequired, userController.delete);

export default router;

/*
Cada controller pode ter por media de 5 métodos, no padrao que o mercado utiliza

index -> lista todos os users -> GET
store/create -> cria um novo user -> POST
delete -> apaga um user -> DELETE
show -> mostra o user -> GET
update -> atualiza o user -> PATCH OU PUT
*/
