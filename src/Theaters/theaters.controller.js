const service = require('./theaters.service');
const asyncErrorBoundary = require('../Errors/asyncErrorBoundary');

async function list(req, res) {
  res.json({ data: await service.list() });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
}