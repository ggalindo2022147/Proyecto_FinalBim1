import { request, response } from "express";
import Product from "./product.model.js";
import Admin from "../admin/admin.model.js";

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

export const getShowMostSoldProducts = async (req, res) => {
    try {
        const mostSoldAvailableProducts = await Product.find({ estado: true, contadorVentas: { $gt: 0 } })
            .sort({ timesBought: -1 })
            .limit(10);

        if (mostSoldAvailableProducts.length === 0) {
            return res.status(404).json({
                msg: "No products have been sold yet or there are no matches."
            });
        }

        res.status(200).json({
            msg: "Best selling products",
            products: mostSoldAvailableProducts
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const getProductsInventory = async (req = request, res = response) => {
    const query = { estado: true };
    const query2 = { estado: false };
    const admin = req.admin._id;
    const products = await Product.find(query);
    const total = await Product.countDocuments(query2);


    console.log(req.admin.role);
    const adminResult = await Admin.findById(admin);


    if (!adminResult || adminResult.role !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin does not exist or is not authorized"
        });
    } else {
        if (!products) {
            return res.status(400).json({
                msg: "There are no products"
            });
        } else {
            res.status(200).json({
                products,
                msg: `Products disabled found ${total}`
            });
        }
    }
}

export const putProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const admin = req.admin._id;
    const { estado, nombre, descripcion, ...resto } = req.body;

    const adminResult = await Admin.findById(admin);

    if (!adminResult || adminResult.role !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin does not exist or is not authorized"
        });
    } else {
        const product = await Product.findByIdAndUpdate(id, resto);
        const productUpdate = await Product.findOne({ _id: id });

        res.status(200).json({
            msg: "Product updated",
            productUpdate
        });
    }
}

export const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const admin = req.admin._id;

    const adminResult = await Admin.findById(admin);

    if (!adminResult || adminResult.role !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin does not exist or is not authorized"
        });
    } else {
        const product = await Product.findByIdAndUpdate(id, { estado: false });
        const productUpdate = await Product.findOne({ _id: id });

        res.status(200).json({
            msg: "Product deleted",
            productUpdate
        });
    }
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

export const productsGet = async (req, res) => {
    const products = await Product.find({ estado: true });
    const total = await Product.countDocuments({ estado: true });
    res.status(200).json({
        msg: "ccc",
        total,
        products
    });
};



