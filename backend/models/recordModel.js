// backend/models/recordModel.js
const db = require('../config/db');

const Record = {
  getAll: (callback) => {
    db.query('SELECT * FROM records', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM records WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO records SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE records SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM records WHERE id = ?', [id], callback);
  }
};

module.exports = Record;
