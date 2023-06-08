require("dotenv").config({ path: "./.env" });
PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// models
const User = require("./models/user.model");
const Task = require("./models/task.model");

// user auth routes
const authRoutes = require("./routes/auth.routes");
const orgRoutes = require("./routes/organization.routes");
const projectRoutes = require("./routes/project.routes");
const kanbanRoutes = require("./routes/kanban.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const notificationRoutes = require("./routes/notification.routes");

app.use("/static", express.static("assets"));

app.use(cors());
app.use(express.json());

const upload = multer({
  desc: "./upload/profile_pictures/",
});

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

// upload attachments
// Configure Multer for file upload
const attachmentStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    const filename = Date.now() + path.extname(file.originalname);
    callback(null, filename);
  },
});

const uploadAttachment = multer({
  storage: attachmentStorage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
});

// API endpoint for file upload
app.post("/upload/attachments", uploadAttachment.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const uploadedFiles = req.files.map((file) => {
    const { originalname, filename } = file;
    return { originalname, filename };
  });

  req.files.forEach((file) => {
    const { originalname, filename, path: filePath } = file;
    const destination = "/assets/attachments/" + originalname.replace(" ", "_");

    // Move the file from the temporary location to the final destination
    fs.rename(filePath, "." + destination, (err) => {
      if (err) {
        return res.send(err);
      }
      Task.addTaskAttachment(
        req.body.taskId,
        `http://localhost:5000/static${destination.slice(7)}`
      );
    });
  });

  return res.status(200).json({ files: uploadedFiles });
});

// console.log(req.file);
// console.log(req.body.taskId);

// const { originalname, filename, path: filePath } = req.file;
// const destination =
//   "./assets/attachments/" +
//   req.body.taskId +
//   "_" +
//   originalname.replace(" ", "_");
// console.log(filePath);
// console.log(destination);

// if (!fs.existsSync(destination.slice(0, 19))) {
//   fs.mkdirSync(destination.slice(0, 19));
// } else {
//   fs.writeFile(destination, (err) => {
//     return res.send(err);
//   });
// }

// Move the file from the temporary location to the final destination
// fs.rename(filePath, destination, (err) => {
//   if (err) {
//     console.error("Error saving file: ", err);
//     res.sendStatus(500);
//     return;
//   }
//   console.log("File saved successfully");
//   res.sendStatus(200);
// });
// });

// API endpoint to retrieve a file
app.get("/files/:filename", (req, res) => {
  const { filename, taskId } = req.params;

  res.download(path.join(__dirname, "uploads", filename), (err) => {
    if (err) {
      console.error("Error retrieving file: ", err);
      res.sendStatus(404);
    }
  });
});

//
app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/kanban", kanbanRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notification", notificationRoutes);

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
