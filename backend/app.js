const express = require("express")
const cors = require("cors")
const { db } = require("./db/db")
const {readdirSync} = require("fs")
const { GoogleGenerativeAI } = require("@google/generative-ai")


const app = express();

require('dotenv').config()

const port = process.env.PORT

app.use(express.json())
app.use(cors())

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
// const model = genAI.getGenerativeAI({ model: "gemini-1.5-flash" })

readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route)))
const path = require("path");

// ✅ Serve React frontend for unknown routes
// app.use(express.static(path.join(__dirname, "frontend/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
// });


const server = () =>{
    db()
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    })
}

server()
