const express = require("express")
const orderRouter = require("./api/order")
const router = express.Router()

router.use("/order", orderRouter)

module.exports = router