// backend/controllers/recordController.js
const Record = require('../models/recordModel');

exports.getAllRecords = (req, res) => {
  Record.getAll((err, results) => {
    if (err) res.status(500).send(err);
    res.json(results);
  });
};

exports.getRecordById = (req, res) => {
  const { id } = req.params;
  Record.getById(id, (err, results) => {
    if (err) res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createRecord = (req, res) => {
  const data = req.body;
  Record.create(data, (err, results) => {
    if (err) res.status(500).send(err);
    res.json({ id: results.insertId, ...data });
  });
};

exports.updateRecord = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  Record.update(id, data, (err) => {
    if (err) res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.deleteRecord = (req, res) => {
  const { id } = req.params;
  Record.delete(id, (err) => {
    if (err) res.status(500).send(err);
    res.sendStatus(200);
  });
};
