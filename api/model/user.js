import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

//encrypt password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    next();
const salt=await bcrypt.genSalt(10)
this.password= await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User', userSchema);
export default User;