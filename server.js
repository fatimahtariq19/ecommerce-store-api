const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const womanProductRoutes =require('./routes/womanProductRoutes');
dotenv.config();
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/women-products", womanProductRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";

// dotenv.config();

// const app = express();


// app.use(express.json());
// app.use(cors());


// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("MongoDB Connected");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(error => console.log(error));

// export default app;
