const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firstName: { type: String,default:"NULL" },
    lastName: {type: String,default:"NULL" },
    provider: { type: String, enum: ["local", "google"], default: "local" },
})

module.exports = mongoose.model("User",userSchema);
