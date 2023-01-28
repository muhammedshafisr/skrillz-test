require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRouter");
const cors = require("cors");

// express app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// middleware
app.use(express.json());

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoutes);

// connect ot db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening for requests
    app.listen(process.env.PORT || 3030, () =>
      console.log(`connected to port and listening on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
