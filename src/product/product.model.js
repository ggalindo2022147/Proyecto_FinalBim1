import e from "express";
import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    contadorVentas:{
        type: Number,
        default: 0
    },
    estado:{
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function(){
    const { __v, _id, stock, contadorVentas, ...product} = this.toObject();
    product.uid = _id;
    return product;
}

export default mongoose.model('Product', ProductSchema);