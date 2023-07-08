require("dotenv").config({ path: '../.env' })
const  express = require('express');
const  cors = require('cors')
const PORT = process.env.REACT_APP_PORT || 8000;
const app = express();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth")
require("./db/conn")
const Register = require("./models/struct")
const otpGenerator = require("otp-generator")
const Otp = require("./models/otpStruct")
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
  }));
  
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))

app.post("/resendOtp",async(req,res) => {
    // const user  = Register.findOne(req.body)
    const OTP = otpGenerator.generate(6, {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        alphabets: false,
      });
      const number =req.body;
      console.log(OTP);
      
      const salt = await bcrypt.genSalt(10);
      const hashedOTP = await bcrypt.hash(OTP, salt);
      await Otp.deleteMany(req.body)
      
      const newotp = new Otp({phone:req.body.phone, otp: hashedOTP });
        const savedOTP = await newotp.save();
        // res.send(otp);
        res.json(savedOTP)
})

app.post("/logoutofall",auth,async (req,res) => {
    try {
        console.log("i am in app.post")
        // console.log(req.body);
        const token = req.body.token;
        // console.log(req.user);
        req.user.tokens = []
    
        await req.user.save();
        res.send("deleted info")
    }catch(error){
        console.log(error)
    }
})

app.post("/logout",auth , async (req,res) => {
    try {
        // console.log(req.body);
        const token = req.body.token;
        // console.log(req.user);
        req.user.tokens = req.user.tokens.filter(ele => ele.token != token);
    
        await req.user.save();
    } catch (error) {
        console.log(error)
    }
})
app.post("/resetpassword",async (req,res) =>{
    try {
        const {email,password} = req.body.email;
        const updatedPasswordHash = await bcrypt.hash(req.body.newpassword,10);
        const user = await Register.findOneAndUpdate({email:req.body.email},{password:updatedPasswordHash,confirmpassword:updatedPasswordHash}) 

        // console.log(user);
        const result = await user.save();
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})
app.post("/verifyotp",async (req,res) => {
    try {
        // console.log(req.body)
        const otpHolder = await Otp.find({
            phone:req.body.phone,
        })
        console.log(otpHolder)
        if(otpHolder.length == 0){ return res.status(400).send("use an expired otp")}
        const rightOtp = otpHolder[0];
        console.log(rightOtp)
        const validUser = await bcrypt.compare(req.body.otp,rightOtp.otp);
        console.log(validUser)
        if(rightOtp.phone == req.body.phone && validUser){
             await Otp.findOneAndDelete({
                phone: req.body.phone
            })
            res.status(200).send({message:"user Registration Succesful"})
        }else{
            res.status(400).send("Your OTP was wrong")
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Entered a Wrong OTP")
    }
})
app.post("/generateOTP" , async (req,res) => {
    try {
        
        const OTP = otpGenerator.generate(6, {
            digits: true,
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            alphabets: false,
          });
          const number = req.body.phone;
          console.log(OTP);
          
          const salt = await bcrypt.genSalt(10);
          const hashedOTP = await bcrypt.hash(OTP, salt);
          
          const otp = new Otp({ phone: number , otp: hashedOTP });
            const savedOTP = await otp.save();
    
          return res.status(200).json( {otp: savedOTP } );
    } catch (error) {
        
    }

})
app.post("/signin", async (req,res) => {
    try { 
        const email = req.body.email;
        const password = req.body.password;
    
        const user = await Register.findOne({ "email" : email});
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = await user.generateAuthToken();


            // send the token to front end file there we can set token using useCookie method and set the cookie .cookie get stored in the localstorage
            // console.log(token)
            // res.cookie("myCookieName", "cookieValue", {
            //     httpOnly: true,
            //     maxAge: 3600000,
            //   });
            //  res.json({token})

            const result = await fetch("http://localhost:8000/generateOTP",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                },
                body:JSON.stringify({phone:user.phone})
            })
            if(result.ok){
                res.status(200).send({token:token})
            }else{
                res.status(400).send("failed to send otp")
            }

           

        }else{
            console.log("password not match")
            res.send("password not match")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})


app.post("/signup" , async (req,res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password == cpassword){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                age:req.body.age,
                gender:req.body.gender,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
            })
            const token = await registerEmployee.generateAuthToken();
            
            
            res.cookie("cook", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 3600000,
                path: "/", 
            });


            const user = await registerEmployee.save();
            return res.send("succesful");
        }else{
            console.log("password does not match")
            res.status(400).send("Invalid login details");
        }
    } catch (error) {
        console.log(error+"   signup");
        res.status(400).send("error"+ error)
    }
})

app.listen(PORT,() => {
    console.log(`server is running at the port no ${PORT}`)
})