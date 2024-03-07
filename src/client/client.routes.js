import { Router } from "express";
import { check } from "express-validator";
import { postClient } from "./client.controller.js";
import { validarCampos } from "../middlewares/validate-fields.js";
import { existenteEmail } from "../helpers/db-validator.js";
import {getShowMostSoldProducts, getProductByNombre} from "../product/product.controller.js";
import { getCategories } from "../category/category.controller.js";


const router = Router();

router.post(
    "/",
    [
        check("nombre", "The name is required").not().isEmpty(),
        check("apellido", "The last name is required").not().isEmpty(),
        check("email", "The email is required").isEmail(),
        check("email").custom(existenteEmail),
        check("password", "The password is required").isLength({ min: 6 }),
        validarCampos,
    ], postClient);

router.get("/", getShowMostSoldProducts);

router.get("/:nombre", getProductByNombre);

router.get("/categories/listar", getCategories);

router.get("/categories/buscar/:name", getProductByNombre);

export default router;