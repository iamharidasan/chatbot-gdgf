const express = require("express")
const router = express.Router()
const dialogflow = require("dialogflow")
const config = require("config")
const { check, validationResult } = require("express-validator")

router.post(
  "/",
  [
    check("projectId", "Project ID is required")
      .not()
      .isEmpty(),
    check("reqText", "Please give your input")
      .not()
      .isEmpty(),
    check("sessionId", "Session is missing and it's required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() })
    }
    const { projectId, reqText, sessionId } = req.body
    try {
      const privateKey = config.get("privateKey")
      const clientEmail = config.get("clientEmail")
      const dfConfig = {
        credentials: {
          private_key: privateKey,
          client_email: clientEmail
        }
      }
      const sessionClient = new dialogflow.SessionsClient(dfConfig)
      const sessionPath = sessionClient.sessionPath(projectId, sessionId)

      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: reqText,
            // The language used by the client (en-US)
            languageCode: "en-US"
          }
        }
      }
      const responses = await sessionClient.detectIntent(request)
      const result = responses[0].queryResult
      if (result.fulfillmentMessages) {
        return res.json(result.fulfillmentMessages)
      } else {
        console.log(`No intent matched.`)
        return res.status(404).send("No Intent Matched")
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
    // Send request and log result
  }
)

router.post(
  "/fullset",
  [
    check("projectId", "Project ID is required")
      .not()
      .isEmpty(),
    check("reqText", "Please give your input")
      .not()
      .isEmpty(),
    check("sessionId", "Session is missing and it's required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() })
    }
    const { projectId, reqText, sessionId } = req.body
    try {
      const privateKey = config.get("privateKey")
      const clientEmail = config.get("clientEmail")
      const dfConfig = {
        credentials: {
          private_key: privateKey,
          client_email: clientEmail
        }
      }
      const sessionClient = new dialogflow.SessionsClient(dfConfig)
      const sessionPath = sessionClient.sessionPath(projectId, sessionId)

      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: reqText,
            // The language used by the client (en-US)
            languageCode: "en-US"
          }
        }
      }
      const responses = await sessionClient.detectIntent(request)
      const result = responses[0].queryResult
      if (result) {
        return res.json(result)
      } else {
        console.log(`No intent matched.`)
        return res.status(404).send("No Intent Matched")
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).send("Server Error")
    }
    // Send request and log result
  }
)

module.exports = router
