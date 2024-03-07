import mongoose from "mongoose";
import Category from "./category.model.js";

export const categoryDefault = async (res) => {

    const category = await Category.findOne({ name: "Default" });

    if (category) {
        console.log("Category already exists");
    } else {
        const newCategory = new Category({
            name: "Default",
        });

        await newCategory.save();
    }
}

export const postCategory = async (req = request, res = response) => {
    const { name } = req.body; 
    const admin = req.admin.role;

    if (admin !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin is not authorized"
        });
    } else {

        const category = new Category({ name });

        await category.save();

        res.status(200).json({
            category
        });
    }
}

export const getCategories = async (req = request, res = response) => {
    const query = { state: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
    ]);

    res.status(200).json({
        total,
        categories
    });
}

export const getCategoriesByNombre = async (req = request, res = response) => {
    const { name } = req.body;

    const category = await Category.findOne({ name });

    if (!category) {
        return res.status(400).json({
            msg: "The category does not exist"
        });
    } else {
        res.status(200).json({
            msg:"product found in db",
            category
        });
    }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
    ]);

    res.status(200).json({
        total,
        categories
    });
}

export const putCategory = async (req = request, res = response) => {
    const { id } = req.params; 
    const { name } = req.body; 
    const admin = req.admin.role;

    if (admin !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin is not authorized"
        });
    } else {
        const category = await Category.findByIdAndUpdate(id, { name });
        const categoryResult = await Category.findById(id);

        res.status(200).json({
            categoryResult
        });
    }
}

export const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params; const admin = req.admin.role;

    if (admin !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin is not authorized"
        });
    } else {
        let categoryDefault = await Category.findOne({ name: "Default" });

        if (!categoryDefault) {
            categoryDefault = new Category({ name: "Default" });
            await categoryDefault.save();
        }

        await Product.updateMany({ categoria: id }, { categoria: categoryDefault._id });

        const category = await Category.findByIdAndUpdate(id, { state: false });
        const categoryResult = await Category.findById(id);

        res.status(200).json({
            categoryResult
        });
    }
}