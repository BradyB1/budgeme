require('dotenv').config()

const express = require("express")
const cors = require("cors")
const { db } = require("../db/db")
const {readdirSync} = require("fs")
const aiRoutes = require("../routes/aiRoutes")
const routes = require("../routes/routes")
const app = express();


const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use("/api/v1", aiRoutes)


// readdirSync("../routes/routes").map((route) => app.use("/api/v1", require("../routes/routes" + route)))
readdirSync("../routes").map((route) => app.use("/api/v1", require(`../routes/${route}`)));
const path = require("path");




const server = () =>{
    db()
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    })
}

server()
