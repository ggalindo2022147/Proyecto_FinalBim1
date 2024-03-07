import { request, response } from "express";
import bcriptjs from "bcryptjs";
import Admin from "./admin.model.js";

export const adminDefault = async (res) => {
    const admin = await Admin.findOne({ email: "administrador@gmail.com" });

    if (admin) {
        console.log("ADMINISTRADOR already exists");
    } else {
        const newAdmin = new Admin({
            nombre: "Administrador",
            apellido: "Administrador",
            email: "administrador@gmail.com",
            password: "123456"
        });

        const salt = bcriptjs.genSaltSync();
        newAdmin.password = bcriptjs.hashSync(newAdmin.password, salt);
        await newAdmin.save();
    }
}