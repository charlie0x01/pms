require("dotenv").config({ path: "./.env" });
PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("./models/user.model");

// user auth routes
const authRoutes = require("./routes/auth.routes");
const orgRoutes = require("./routes/organization.routes");
const projectRoutes = require("./routes/project.routes");
const kanbanRoutes = require("./routes/kanban.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const { AsyncLocalStorage } = require("async_hooks");

app.use("/static", express.static("assets"));

app.use(cors());
app.use(express.json());

const upload = multer({ desc: "./upload/profile_pictures/" });

app.post(
  "/uploadProfilePicture",
  upload.single("profileImage"),
  async function (req, res, next) {
    try {
      let base64Image = req.body.profileImage.split(";base64,").pop();
      const image = Buffer.from(base64Image, "base64");
      fs.writeFileSync(
        __dirname + `/assets/avatars/${req.body.email.split("@")[0]}.jpg`,
        image
      );
      await User.updateProfilePicture(
        req.body.email,
        `http://localhost:5000/static/avatars/${
          req.body.email.split("@")[0]
        }.jpg`
      );

      const [user, _] = await User.findByEmailId(req.body.email);
      console.log(user);
      return res.status(200).json({
        success: true,
        user: user[0],
        message: "Profile Picture updated successfully",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);
//
app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/kanban", kanbanRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);

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
