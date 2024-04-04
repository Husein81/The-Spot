import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref:'Category'
    }
},{timestamp: true});

const Category = mongoose.model("Category",categorySchema);
export default Category;