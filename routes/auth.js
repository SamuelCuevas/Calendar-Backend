/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/


const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post(
    '/new',
    [
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'La Password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ] ,              // Aqui irian middlewares 1 o varios
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'La Password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);


router.get('/renew', validarJWT, revalidarToken );



// Exportacion en Node

module.exports = router;