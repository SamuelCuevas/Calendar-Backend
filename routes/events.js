/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const router = Router();

// Todas tienen que pasar por la validacion del JWT
// Todas las peticiones deben de pasar por el validar JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos );

// crear nuevo evento
router.post(
    '/',
    [
        check('title', 'Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento );

// actualizar evento
router.put('/:id', actualizarEvento );

// Borrar evento
router.delete('/:id', eliminarEvento );


module.exports = router;