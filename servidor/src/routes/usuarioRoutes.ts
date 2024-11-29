import { Router } from 'express';
import { crearCuenta, iniciarSesion } from '../controllers/usuarioController';

const router = Router();

router.post('/crear-cuenta', crearCuenta);
router.post('/iniciar-sesion', iniciarSesion);

export default router;
