const mongoose = require('mongoose')

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
        },
    },{timestamps:true})


    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });
    
    // Compare passwords
    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

const UserModel = mongoose.model('User', userSchema)
module.exports=UserModel
