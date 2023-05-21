require("dotenv").config({ path: "./.env" });
PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const app = express();

// user auth routes
const authRoutes = require("./routes/auth.routes");
const orgRoutes = require("./routes/organization.routes");
const projectRoutes = require("./routes/project.routes");

app.use(cors());
app.use(express.json());

//
app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/project", projectRoutes);

// if route not exit
app.use(function (req, res, next) {
  res.status(404).json({ success: false, message: "api not exit" });
});

const server = app.listen(PORT, () => {
  console.log("Server started on port 5000");
});

// handle 'UnhandledRejection' to prevent server crash
// if UnhandledRejection Error occure, just close the server
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
  server.close(() => {
    process.exit(1);
  });
});
