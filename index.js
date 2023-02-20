const express = require('express');
const {connection} = require("./db");
const { Authentication } = require('./Middlewares/authentication.middleware');
const { postRouter } = require('./routes/Post.route');
const { userRouter } = require('./routes/User.route');
const cors = require('cors');


const app = express();
app.use(express.json())
app.use(cors())


app.use("/users", userRouter)
app.use(Authentication)
app.use("/posts", postRouter)

app.get("/", (req, res) => {
    res.send("Home Page")
})


app.listen(8080, async () => {
    try{
        await connection
        console.log("Connected to DB");
        console.log(`Server is running on port 8080`);
    }catch(err){
        console.log(err)
    }
})
