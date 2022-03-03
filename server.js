
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index")
const subjectRouter = require("./routes/subjects")


app.set("view engine", "ejs")
app.set("views", __dirname+"/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public")) //style/js/img
app.use(bodyParser.urlencoded({limit: "10mb", extended: false}))

// DB
mongoose.connect(process.env.LOCAL_DB, {
    useNewUrlParser: true
})

const db = mongoose.connection

db.on("error", error => console.log(error))
db.once("open", () => console.log("Connected to DB"))

app.use("/", indexRouter)
app.use("/subjects", subjectRouter)

app.listen(process.env.PORT || 3000);