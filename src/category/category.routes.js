import { Router } from "express";
import { check } from "express-validator";
import { deleteCategory, getCategories, postCategory, putCategory } from "./category.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("name", "The name is required").not().isEmpty(),
        validarCampos,
    ], postCategory);

router.get("/", getCategories);

router.put(
    "/:id",
    [
        validarJWT,
        check("name", "The name is required").not().isEmpty(),
        validarCampos,
    ], putCategory);

router.delete("/:id", validarJWT, deleteCategory);

export default router;