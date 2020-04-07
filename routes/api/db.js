const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")

const User = require("../../models/User")

//@ POST
// /api/db/
//Create a new Record.
router.post(
  "/",
  [
    check("sessionId", "Session ID is required")
      .not()
      .isEmpty(),
    check("fields", "Please provide Field Object")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { sessionId, fields } = req.body
    try {
      let User = await User.findOne({ sessionName: sessionId })
      if (!User) {
        User = {
          sessionName: sessionId,
          chatFields: fields
        }
        await User.save()
        return res.json(User)
      }
      res.status(400).json({ msg: "User Already Exists. Try PUT Method" })
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router
