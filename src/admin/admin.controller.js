import { request, response } from "express";
import bcriptjs from "bcryptjs";
import Admin from "./admin.model.js";

export const postAdmin = async (req = request, res = response) => {
    const { nombre, apellido, email, password } = req.body;
    const admin = new Admin({ nombre, apellido, email, password });
    
    const salt = bcriptjs.genSaltSync();
    admin.password = bcriptjs.hashSync(password, salt);
    
    await admin.save();
    
    res.status(200).json({
        admin
    });
}