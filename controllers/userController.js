// import Model
import UserModel from '../models/user.js'
import bcrypt from 'bcrypt'

class UserController {

    static home = (rewq, res) =>{
        res.render('index')
    }

    static registration = (rewq, res) =>{
        res.render('registration')
    }

    // Register - without hash
    // static createUserDoc = async (req, res) =>{ 
    //     try {
    //         // Creating New Document using Model
    //         const doc = new UserModel({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: req.body.password
    //         })
    //         // Saving Document
    //         await doc.save() // also we can return this and log it
    //         res.redirect('/login')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // Register - with hash
    static createUserDoc = async (req, res) =>{
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        try {
            // Creating New Document using Model
            const doc = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            })
            // Saving Document
            await doc.save() // also we can return this and log it
            res.redirect('/login')
        } catch (error) {
            console.log(error);
        }
    }

    static login = (rewq, res) =>{
        res.render('login')
    }

    // Login - without hash
    // static verifyLogin = async (req, res) =>{
    //     try {
    //         const {email, password} = req.body // object destructure
    //         // console.log(email);
    //         const result = await UserModel.findOne({email: email}) // dB: req.body.email
    //         // console.log(result);
            
    //         if(result != null){ // Check result
    //             if(result.email == email && result.password == password){ // dB == req.body.email
    //                 res.send(`<h1>dashboard ---- ${result} </h1>`)
    //             }else{
    //                 res.send("<h1>Email or Password is not Valid</h1>")
    //             }
    //         }else{
    //             res.send("<h1>You are not a registered User</h1>")
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // Login - with hash
    static verifyLogin = async (req, res) =>{
        try {
            const {email, password} = req.body // object destructure
            // console.log(email);
            const result = await UserModel.findOne({email: email}) // dB: req.body.email
            // console.log(result);
            
            if(result != null){ // Check result
                const isMatch = await bcrypt.compare(password, result.password) // req.body.password, dB password(bcrypt)
                if(result.email == email && isMatch){ // dB == req.body.email
                    res.send(`<h1>dashboard ---- ${result} </h1>`)
                }else{
                    res.send("<h1>Email or Password is not Valid</h1>")
                }
            }else{
                res.send("<h1>You are not a registered User</h1>")
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController