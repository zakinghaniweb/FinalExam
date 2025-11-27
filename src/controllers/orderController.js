const orderModel = require("../models/orderModel");

const orderRegister = async (req, res) => {
  try {
    const now = new Date();
    // time
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const firstDayOfThisWeek = new Date(now);
    firstDayOfThisWeek.setDate(now.getDate() - now.getDay() + 1);
    const lastDayOfLastWeek = new Date(firstDayOfThisWeek);
    lastDayOfLastWeek.setDate(firstDayOfThisWeek.getDate() - 1);
    const firstDayOfLastWeek = new Date(lastDayOfLastWeek);
    firstDayOfLastWeek.setDate(lastDayOfLastWeek.getDate() - 6);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    // aggregations
    const last7Days = await orderModel.aggregate([
      { $match: { orderDate: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$orderPrice" },
          orderCount: { $sum: 1 },
        },
      },
    ]);
    const lastWeek = await orderModel.aggregate([
      {
        $match: {
          orderDate: { $gte: firstDayOfLastWeek, $lte: lastDayOfLastWeek },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$orderPrice" },
          orderCount: { $sum: 1 },
        },
      },
    ]);
    const lastMonth = await orderModel.aggregate([
      {
        $match: { orderDate: { $gte: startOfLastMonth, $lte: endOfLastMonth } },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$orderPrice" },
          orderCount: { $sum: 1 },
        },
      },
    ]);
    const thisYear = await orderModel.aggregate([
      { $match: { orderDate: { $gte: startOfYear } } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$orderPrice" },
          orderCount: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      last7Days: last7Days[0] || { totalSales: 0, orderCount: 0 },
      lastWeek: lastWeek[0] || { totalSales: 0, orderCount: 0 },
      lastMonth: lastMonth[0] || { totalSales: 0, orderCount: 0 },
      thisYear: thisYear[0] || { totalSales: 0, orderCount: 0 },
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { orderRegister };


  // const orders = [
  //   {
  //     orderId: "ORD001",
  //     orderPrice: 120.5,
  //     orderDate: new Date("2025-11-01T10:15:30.000Z"),
  //   },
  //   {
  //     orderId: "ORD002",
  //     orderPrice: 75.2,
  //     orderDate: new Date("2025-11-03T14:45:10.000Z"),
  //   },
  //   {
  //     orderId: "ORD003",
  //     orderPrice: 200.0,
  //     orderDate: new Date("2025-11-05T09:30:25.000Z"),
  //   },
  //   {
  //     orderId: "ORD004",
  //     orderPrice: 55.75,
  //     orderDate: new Date("2025-11-07T16:20:40.000Z"),
  //   },
  //   {
  //     orderId: "ORD005",
  //     orderPrice: 310.0,
  //     orderDate: new Date("2025-11-10T12:50:55.043Z"),
  //   },
  //   {
  //     orderId: "ORD006",
  //     orderPrice: 145.3,
  //     orderDate: new Date("2025-10-01T11:10:15.000Z"),
  //   },
  //   {
  //     orderId: "ORD007",
  //     orderPrice: 90.0,
  //     orderDate: new Date("2025-10-05T15:25:50.000Z"),
  //   },
  //   {
  //     orderId: "ORD008",
  //     orderPrice: 220.4,
  //     orderDate: new Date("2025-10-08T08:45:35.000Z"),
  //   },
  //   {
  //     orderId: "ORD009",
  //     orderPrice: 60.0,
  //     orderDate: new Date("2025-10-12T17:30:05.000Z"),
  //   },
  //   {
  //     orderId: "ORD010",
  //     orderPrice: 400.0,
  //     orderDate: new Date("2025-10-15T13:15:20.000Z"),
  //   },
  //   {
  //     orderId: "ORD011",
  //     orderPrice: 180.75,
  //     orderDate: new Date("2025-12-02T09:20:15.000Z"),
  //   },
  //   {
  //     orderId: "ORD012",
  //     orderPrice: 95.5,
  //     orderDate: new Date("2025-12-05T14:35:40.000Z"),
  //   },
  //   {
  //     orderId: "ORD013",
  //     orderPrice: 250.0,
  //     orderDate: new Date("2025-12-08T11:10:05.000Z"),
  //   },
  //   {
  //     orderId: "ORD014",
  //     orderPrice: 60.2,
  //     orderDate: new Date("2025-12-12T16:45:30.000Z"),
  //   },
  //   {
  //     orderId: "ORD015",
  //     orderPrice: 330.0,
  //     orderDate: new Date("2025-12-18T13:55:50.000Z"),
  //   },
  //   {
  //     orderId: "ORD016",
  //     orderPrice: 145.0,
  //     orderDate: new Date("2026-01-03T10:05:15.000Z"),
  //   },
  //   {
  //     orderId: "ORD017",
  //     orderPrice: 80.4,
  //     orderDate: new Date("2026-01-07T15:30:25.000Z"),
  //   },
  //   {
  //     orderId: "ORD018",
  //     orderPrice: 275.5,
  //     orderDate: new Date("2026-01-10T09:50:45.000Z"),
  //   },
  //   {
  //     orderId: "ORD019",
  //     orderPrice: 50.75,
  //     orderDate: new Date("2026-01-15T17:20:10.000Z"),
  //   },
  //   {
  //     orderId: "ORD020",
  //     orderPrice: 400.0,
  //     orderDate: new Date("2026-01-20T12:40:55.000Z"),
  //   },
  // ];
  // await orderModel.insertMany(orders);