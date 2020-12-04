const express = require("express");
const app = express();
const cors = require("cors");

const categoryRouter = require("./routers/category");

const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use(categoryRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}...`));