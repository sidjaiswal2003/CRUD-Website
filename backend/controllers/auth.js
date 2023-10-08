import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    let success=false
    const { name, password, email, phone, gender, howDidYouHear, city, state } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: passwordHash,
      email,
      phone,
      gender,
      howDidYouHear,
      city,
      state,
    });
    const savedUser = await newUser.save();
    const data = {
      user: {
        id: savedUser.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT);
     

    
     success=true
    res.status(201).json({success,savedUser,authToken});
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    let success=false
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      success=false
      return res.json({success, error: "User not exist" });
    }
    let passCompare = await bcrypt.compare(password, user.password);
    console.log({ passCompare });
    if (!passCompare) {
      success=false
      return res.json({ success,err: "Password is wrong" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    success=true

    const authToken = jwt.sign(data, process.env.JWT);
     
    res.status(200).json( {success,authToken} );
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
};
