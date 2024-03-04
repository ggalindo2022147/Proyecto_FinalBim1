import { request, response } from "express";
import Product from "./product.model.js";

export const postProduct = async (req = request, res = response) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const product = new Product({ nombre, descripcion, precio, stock });

    await product.save();

    res.status(200).json({
        product
    });
}

export const getProducts = async (req = request, res = response) => {
    const query = { estado: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
    ]);

    res.status(200).json({
        total,
        products
    });
}