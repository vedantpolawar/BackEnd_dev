const { getUser } = require("../service/auth");
function checkForAuthentication(req, res, next) {
  const userUid = req.cookies?.uid;
  console.log("Cookies:", req.cookies);
  console.log("userUid:", userUid);

  req.user = null;
  if (!userUid) return next();
  const user = getUser(userUid);
  console.log("GET USER :", user);
  req.user = user;
  return next();
}
function restrictTo(roles = []) {
  return function (req, res, next) {
    console.log(req.user);
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user.role)) {
      return res.end("UNAuthorized ACCESS LAVDYA GHARI JAA CHUP CHAP");
    }
    return next();
  };
}
module.exports = {
  checkForAuthentication,
  restrictTo,
};
