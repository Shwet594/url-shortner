import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const urls = {};

app.get("/", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.render("index", { urls, baseUrl });
});


app.post("/shorten", (req, res) => {
  const { longUrl, shortCode } = req.body;

  if (!longUrl || !shortCode) {
    return res.send("Both Long URL and Short Code are required!");
  }

  urls[shortCode] = longUrl;
  res.redirect("/");
});

app.get("/:shortCode", (req, res) => {
  const longUrl = urls[req.params.shortCode];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("Short URL not found");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
