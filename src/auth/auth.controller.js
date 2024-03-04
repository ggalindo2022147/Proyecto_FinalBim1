import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.model.js'
import Client from '../client/client.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const usuarioLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let usuario = await Admin.findOne({ email });

        console.log(usuario);
        if (!usuario) {
            usuario = await Client.findOne({ email });
            console.log(usuario);
            if (!usuario) {
                return res.status(400).json({
                    msg: "Credenciales incorrectos, correo no existe en la base de datos"
                });
            }    
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario administrador no existe en la base de datos"
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Contraseña incorrecta",
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Login OK!!!',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador",
        });
    }
}