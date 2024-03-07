import mongoose from "mongoose";
const CategorySchema = mongoose.Schema({ nombre: { type: String, required: true }, estado: { type: Boolean, default: true } });
export default mongoose.model('Category', CategorySchema);

export const postCategory = async (req = request, res = response) => {
    const { nombre } = req.body; const admin = req.admin.role;

    if (admin !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin is not authorized"
        });
    } else {

        const category = new Category({ nombre });

        await category.save();

        res.status(200).json({
            category
        });
    }
}

export const getCategories = async (req = request, res = response) => {
    const query = { estado: true };

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
    const { id } = req.params; const { nombre } = req.body; const admin = req.admin.role;

    if (admin !== "ADMIN_ROLE") {
        return res.status(400).json({
            msg: "The admin is not authorized"
        });
    } else {
        const category = await Category.findByIdAndUpdate(id, { nombre });
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
        let categoryDefault = await Category.findOne({ nombre: "Default" });

        if (!categoryDefault) {
            categoryDefault = new Category({ nombre: "Default" });
            await categoryDefault.save();
        }

        await Product.updateMany({ categoria: id }, { categoria: categoryDefault._id });

        const category = await Category.findByIdAndUpdate(id, { estado: false });
        const categoryResult = await Category.findById(id);

        res.status(200).json({
            categoryResult
        });
    }
}