// const mongoose=require("mongoose")
// const bcrypt=require("bcryptjs")

// const userSchema=new mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     role:{
//         type:String,
//         enum:['user','admin']
//     }
// })

// userSchema.pre('save',async function(next){
//     if(!this.isModified('password'))return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

// const User=mongoose.model('User',userSchema)
// module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho giỏ hàng (cart)
// const cartSchema = new Schema({
//     product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, required: true, min: 1 }
// });

// Định nghĩa schema cho danh sách yêu thích (wishlist)
const wishlistSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    isUnread: { type: Boolean, default: true }
});


// Định nghĩa schema chính cho users
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    user_name:{type:String,required:true,unique:true},
    full_name:{type:String,required:true,default:null},
    default_address:{type:String,default:null},
    password: { type: String, required: true },
    user_phone: { type: String, default:null},
    user_gender: { type: String ,default:null },
    user_avt: { type: String,defaul:null },
    wishlist: [wishlistSchema],
    role: {
            type:String,
            enum:['user','admin']
        }
},{timestamps:true});

// Tạo model từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;