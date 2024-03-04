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

export const getProductByNombre = async (req = request, res = response) => {
    const { nombre } = req.params;

    const product = await Product.findOne({ nombre });

    if (!product) {
        return res.status(400).json({
            msg: `The product ${nombre} does not exist`
        });
    } else {
        res.status(200).json({
            msg: "Product found",
            product
        });
    }
}

