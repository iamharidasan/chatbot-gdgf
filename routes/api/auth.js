const express = require("express")
const router = express.Router()
const { Storage } = require("@google-cloud/storage")

router.get("/", async (req, res) => {
  const { projectId, text } = req.body
  // Creates a client from a Google service account key.
  const storage = new Storage({
    projectId,
    keyFilename: "./influencertiktok.json"
  })

  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets()

    const [buckets] = results

    console.log("Buckets:")
    buckets.forEach(bucket => {
      console.log(bucket.name)
    })
    res.json(results)
  } catch (err) {
    res.status(500).send(err.message)
    console.error("ERROR:", err)
  }
})

module.exports = router
