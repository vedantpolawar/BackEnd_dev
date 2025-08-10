const shortid = require("shortid");
const URL = require("../models/url");
async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is required" });
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
async function handleGetUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  console.log(entry.redirectUrl);
  res.redirect(entry.redirectUrl);
}
module.exports = {
  generateNewShortURL,
  handleGetAnalytics,
  handleGetUrl,
};
