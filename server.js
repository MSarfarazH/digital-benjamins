require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const plaid = require("./routes/api/plaid");

const app = express();

// express middleware
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/plaid", plaid);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
