import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const usuarioLogin = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Admin.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "Credenciales incorrectos, correo no existe en la base de datos"
            });
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