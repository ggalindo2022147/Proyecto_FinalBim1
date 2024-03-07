import { Router } from "express";
import { check } from "express-validator";
import { postCategory } from "./category.controller.js";
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

export default router;