const express = require("express");
const app = express();
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connection");
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Connected To mongodb"))
  .catch((error) => console.log(`mongo db Error :${error}`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
    name: "vedant",
  });
});
app.use("/", staticRoute);
app.use("/url", urlRoute);
app.listen(port, () => console.log(`Server started at port:${port}`));
