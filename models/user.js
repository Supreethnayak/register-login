// 'mongoose' = library
import mongoose from 'mongoose'

// 1. Defining Schema
// Schema() = constructor
const userSchema = new mongoose.Schema({
    name:{type:String, required: true, trim: true},
    email:{type:String, required: true, trim: true, unique: true},
    password:{type:String, required: true, trim: true},
    join:{type: Date, default: Date.now }
})

// 2. Compiling Schema or Creating Model
// const studentModel = mongoose.model(collection name, schema name)
// it automatically 's' prefix to collection name -> students
const UserModel = mongoose.model('user', userSchema)


export default UserModel