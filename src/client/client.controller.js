import { request, response } from "express";
import bcriptjs from "bcryptjs";
import Client from "./client.model.js";

export const postClient = async (req = request, res = response) => {
    const { nombre, apellido, email, password } = req.body;
    const client = new Client({ nombre, apellido, email, password });

    const salt = bcriptjs.genSaltSync();
    client.password = bcriptjs.hashSync(password, salt);

    await client.save();

    res.status(200).json({
        client
    })
};