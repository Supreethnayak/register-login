import express from 'express';
const app = express();
const port  = process.env.PORT || 3000;
import web from './routes/web.js'
import connectDB from './db/connectdb.js'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017"

// Database Connection
connectDB(DATABASE_URL)

// Set Template Engine
app.set('view engine', 'ejs')

// to use re.body use Middleware -> urlencoded
app.use(express.urlencoded({extended: true}))

// Load Routes
app.use('/', web)

app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`);;
})