import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'ADMIN_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Admin', AdminSchema);