const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://cartnest:cartnest235539@node-cluster.wisyqkq.mongodb.net/final?retryWrites=true&w=majority&appName=node-cluster"
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = dbConnect;
