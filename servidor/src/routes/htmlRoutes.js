import { Router } from 'express';
import { sendHtmlPage } from '../controllers/htmlController.js';

const router = Router();

const pages = [
    'inicio',
    'menu',
    'informacion',
    'cursos',
    'rutas',
    'planes',
    'soporte',
    'pagos',
    'crear-cuenta',
    'iniciar-sesion',
    'cuenta',
    'progreso',
    'apartadoC1',
    'apartadoH1',
    'apartadoJ1',
    'apartadoP1',
    'rutasHtml',
    'rutasCine',
    'rutasJS',
    'rutasPython',
    'examenHTML',
    'examenCine',
    'examenJS',
    'examenPython',
    'videoHtml',
    'videoCine',
    'video2',
    'videoJS',
    'videoPython',
    'cuestionarioCin',
    'cuestionarioH',
    'cuestionarioJ',
    'cuestionarioP'
];

pages.forEach((page) => {
    router.get(`/${page}.html`, sendHtmlPage(page));
});

export default router;
