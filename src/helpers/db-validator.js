import Admin from "../admin/admin.model.js";

export const existenteEmail = async (email = "") => {
    const existeEmail = await Admin.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email ${email} already exists`);
    }
};