if (process.env.NODE_ENV === "production") {
  module.exports = "files/";
} else {
  module.exports = "http://localhost:3000/";
}
