import { Router } from "express";
import { check } from "express-validator";
import { postProduct, getProducts, getProductByNombre } from "./product.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import { validarJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "The name is required").not().isEmpty(),
        check("descripcion", "The description is required").not().isEmpty(),
        check("precio", "The price is required").isNumeric(),
        check("stock", "The stock is required").isNumeric(),
        validarCampos,
    ], postProduct);

router.get("/", getProducts);

router.get("/:nombre", getProductByNombre);

export default router;