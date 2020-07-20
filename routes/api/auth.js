const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const config = require("config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const middleware = require("../../middleware/auth")

const Auth = require("../../models/Account")

// Get User
// GET /api/users
// @public
router.get("/", middleware, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})

//Create a User
// POST /api/auth
//@Public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      let auth = await Auth.findOne({ email: email })

      if (auth) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] })
      }

      auth = new Auth({
        email: email,
        password: password,
      })
      const salt = await bcrypt.genSalt(10)
      auth.password = await bcrypt.hash(password, salt)
      await auth.save()

      const payload = {
        user: {
          id: auth.id,
        },
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err
          }
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

//Login User
//POST /api/auth/login
//@Public
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atlest 8 characters").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { email, password } = req.body
      const user = await Auth.findOne({ email: email })

      if (!user) {
        console.log(user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err
          } else {
            res.json({ token })
          }
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
  }
)

module.exports = router