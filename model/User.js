const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,

    },
    phone: {
        type: String,
        required:true,

    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,

    },
    pan_no: {
        type: String,
        required:true,

    },
    civil_info: {
        type: Object,

    },

    
    


}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", userSchema)