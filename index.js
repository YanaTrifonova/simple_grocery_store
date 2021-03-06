const express = require("express");
const app = express();
const cors = require("cors");

const categoryRouter = require("./routers/category");
const productRouter = require("./routers/product");
const orderRouter = require("./routers/order");
const userRouter = require("./routers/user");
const authorizationRouter = require("./routers/authorization");

const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use(categoryRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(authorizationRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}...`));