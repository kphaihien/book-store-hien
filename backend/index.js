const express=require("express")
const app=express()
const cors=require("cors")


const mongoose=require("mongoose")
require("dotenv").config()

const port =3000

//middleware
app.use(express.json())
app.use(cors({
    origin:"https://book-store-hien-front-end.onrender.com",
    credentials:true,
    // allowedHeaders:["Content-Type","Authorization"]
}))




//routes    
app.use('/public', express.static('public'))
const bookRoutes=require("./src/routes/book.route")
const orderRoutes = require("./src/routes/order.route")
const userRoutes = require("./src/routes/user.route")
const authRoutes = require("./src/routes/auth.route")
const categoryRoute = require("./src/routes/category.route")
app.use("/api/books",bookRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/category",categoryRoute)

async function main() {
    await mongoose.connect(process.env.DB_URL)
}

main().then(()=>console.log("Kết nối thành công")).catch(err=>console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
