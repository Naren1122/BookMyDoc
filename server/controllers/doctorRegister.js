const Doctor = require('../models/Doctor');

//Doctor registration controller
const registerDoctor =async(req,res)=>{
    try{
        const{name,email,password,speciality,license,gender}= req.body;

        //check if email already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor with this email already exists" });
        }
        

        // create new doctor (password will be hashed automatically)

        const newDoctor = new Doctor({
            name,
            email,
            password,
            speciality,
            license,
            gender,
            approved:false // pending approval
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor registered successfully,Waiting for admin approval."});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
    };
    module.exports = {registerDoctor};
