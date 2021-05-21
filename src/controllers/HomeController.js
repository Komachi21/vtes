const index = function (req, res) {
  res.json(req.user)
}

module.exports = {
  index,
}