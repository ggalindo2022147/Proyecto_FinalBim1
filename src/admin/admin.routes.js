import { Router } from "express";
import { check } from "express-validator";
import { postAdmin } from "./admin.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import { existenteEmail } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "The name is required").not().isEmpty(),
        check("apellido", "The last name is required").not().isEmpty(),
        check("email", "The email is required").isEmail(),
        check("password", "The password is required").isLength({ min: 6 }),
        validarCampos,
    ], postAdmin);

export default router;