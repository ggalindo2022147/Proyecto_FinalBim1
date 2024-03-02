import jwt from 'jsonwebtoken'
import Admin from '../admin/admin.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const admin = await Admin.findById(uid);

    if(!admin){
      return res.status(401).json({
        msg: 'User does not exist in the database'
      })
    }

    if(!admin.estado){
      return res.status(401).json({
        msg: 'Invalid token - user with status:false'
      })
    }

    req.admin = admin;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Invalid token"
      });
  }
}