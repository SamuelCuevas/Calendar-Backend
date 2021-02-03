const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


// Endpoints

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // let usuario = await Usuario.findOne({ email });
        let usuario = await Usuario.findOne({ email: email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }

        usuario = new Usuario( req.body );

        // Encryptar Password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);


        // Status 201 se devuelve simpre que se guarda informacion
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactese con nosotros'
        })
    }
    
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con ese email no existe'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valida'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactese con nosotros'
        })
    }
}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    // Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}