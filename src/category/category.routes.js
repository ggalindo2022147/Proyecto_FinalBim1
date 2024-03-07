import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({ 
    nombre:{ 
        type: String, 
        required: true 
    }, 
    estado:{ 
        type: Boolean, 
        default: true 
    }
});

export default mongoose.model('Category', CategorySchema);