const sessionIdToUSerMap = new Map();
function setUser(id, user) {
  sessionIdToUSerMap.set(id, user);
}
function getUser(id) {
  return sessionIdToUSerMap.get(id);
}
module.exports = { setUser, getUser };
