import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrls: {
        type: Array,
        required:true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    discountPrice: {
      type: Number,
      required:true,
      default: 1,  
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
},{ timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product;