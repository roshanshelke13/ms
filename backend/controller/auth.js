const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const admin = require("../config/firebase");
require("dotenv").config();


exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"enter all the details"
            })
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"user does not  exists"
            })
        }

        const isPass = await bcrypt.compare(password,existingUser.password);

        if(!isPass){
            return res.status(404).json({
                success:false,
                message:"password does not matches"
            })
        }

        const payload = {
            email:existingUser.email,
            id:existingUser._id,
        }

        let token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        })

        const userObj = existingUser.toObject();
        userObj.token = token;
        userObj.password = undefined;

        const options = {
            expires:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }

        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            userObj,
            message:"Logged in successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Login unsuccesssful"
        })
    }
}


exports.loginGoogle = async(req,res) => {
    try{

        const  {firebaseToken} = req.body;

        const decoded = await admin.auth().verifyIdToken(firebaseToken);

        let user = await User.findOne({email : decoded.email});

        if(!user){
            user = await User.create({
                email: decoded.email,
                name: decoded.name || "Google User",
                provider: "google",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
        };

        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        const userObj = user.toObject();
        userObj.token = token;
        userObj.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            userObj,
            message: "Logged in successfully with Google",
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Google login unsuccessful",
            error: error.message,
        });
    }
}

exports.signup = async(req,res) => {
    try{
        const {firstName,lastName,email,password,cnfPassword} = req.body;

        if(!firstName || !lastName ||!email || !password || !cnfPassword){
            return res.status(401).json({
                success:false,
                message:"All details are not filed"
            })
        }

        if(password != cnfPassword){
            return res.status(401).json({
                success:false,
                message:"password does not matches"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"user already exists"
            })
        }

        const hashedPassword =  await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            provider:"local"
        })

        const userObj = user.toObject();
        userObj.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Account created successfully",
            user: userObj,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered . Please try again later"
        })
    }
}