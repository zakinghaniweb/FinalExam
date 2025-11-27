const express = require("express")
const { orderRegister } = require("../../controllers/orderController");
const orderRouter = express.Router()

orderRouter.get("/orderRegister", orderRegister);

module.exports = orderRouter;