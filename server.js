
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")

const indexRouter = require("./routes/index")

app.set("view engine", "ejs")
app.set("views", __dirname+"/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public")) //style/js/img

// DB
mongoose.connect(process.env.LOCAL_DB, {
    useNewUrlParser: true
})

const db = mongoose.connection

db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to DB"))

app.listen(process.env.PORT || 3000)

app.use("/", indexRouter)