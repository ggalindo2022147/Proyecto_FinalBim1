import { Router } from "express";
import { check } from "express-validator";
import { postProduct, getProducts, getProductByNombre, getProductsInventory, putProduct, deleteProduct } from "./product.controller.js";
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

router.get("/inventory/listar", validarJWT, getProductsInventory);

router.put(
    "/:id",
    [
        validarJWT,
        check("nombre", "The name is required").not().isEmpty(),
        check("descripcion", "The description is required").not().isEmpty(),
        validarCampos,
    ], putProduct);

router.delete(
    "/:id", 
    [
        validarJWT, 
        check("id", "The id is not valid").isMongoId(),
    ], deleteProduct);


export default router;