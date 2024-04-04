import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    imageUrls: {
        type: Array,
        required:true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
},{ timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product;