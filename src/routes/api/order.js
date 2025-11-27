const express = require("express")
const { orderRegister } = require("../../controllers/orderController");
const orderRouter = express.Router()

orderRouter.post("/orderRegister", orderRegister);

module.exports = orderRouter;