// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('./models/users-schema')
// const Note = require('./models/notes-schema')

// const authMiddleware = require('./middleware/authmiddleware')

// const router = express.Router();

// router.post('/register', async (req, res) => {
//     try{
//         const {email, password, conformPassword} = req.body;

//         if(password !== conformPassword){
//             return res.status(400).json({error: "Passwods do not match"});
//         }

//         const existingUser = await User.findOne({email});

//         if(existingUser){
//             return res.status(409).json({error: 'User already exists'});
//         }

//         const user = new User({ email, password });
//         await user.save();
//         res.status(201).json({ message: 'User registered sucessfully'})
//     }
//      catch (error) {
//         res.status(500).json({error: error.message})
//      }
// });


// router.post('/login', async(req, res) => {
//     try{
//         const { email, password } = req.body;
//         const user = await User.findOne({email});

//         if(!user){
//             return res.status(401).json({error: 'Invalid email or passowrd'});
//         }
        
//         const isMatch = await user.checkPassword(password)
        
//         if(!isMatch){
//             return res.status(401).json({ error: 'Invalid email or password'});
//         }

//         const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
//         res.json({token});
//     }
//     catch (error) {
//         res.status(500).json({error: error.message});
//     }
// });

// //get all notes endpoint
// router.get('/notes', authMiddleware, async (req, res) => {
//     try {
//         const notes = await Note.find({user: req.userId});
//         res.json(notes);
//     } catch (error){
//         res.status(500).json({erroe: error.message})
//     }
// });

// module.exports = router;