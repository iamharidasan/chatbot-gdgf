const express = require("express")

const connectDB = require("./config/db")

const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.use("/api/dialogflow", require("./routes/api/dialogflow"))
app.use("/api/db", require("./routes/api/db"))

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set Static folder
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Connected on Port: ${port}`))
