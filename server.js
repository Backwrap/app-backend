/*jshint esversion: 6 */

const app = require("express")();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user.route");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});
