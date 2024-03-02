import { Router } from "express";
import { check } from "express-validator";
import { usuarioLogin } from "./auth.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("correo", "El correo es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
    ], usuarioLogin);

export default router;