const express = require("express")
const path = require("path")

const app = express()

app.use(express.json({ extended: false }))

app.use("/api/dialogflow", require("./routes/api/dialogflow"))
app.use("/api/auth", require("./routes/api/auth"))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Connected on Port: ${port}`))
