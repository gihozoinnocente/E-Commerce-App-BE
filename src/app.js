import express from "express"
import mongoose from "mongoose"
import routes from "./routes/index.js"

import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000
const mode = process.env.NODE_ENV || 'development'
try {

    if (mode === "development") {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        .then((res) => {
            console.log("DEVELOPMENT DB CONNECTED");
          });
    } 
    


    app.use(express.json())

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the E-COMMERCE API" });
      });

    app.use("/api/v1/", routes)


    app.listen(port, () => {
        console.log(`The server is running on port ${port}`)
    })
} catch (error) {
    console.log(error)
}
export default app