const db = require('../database/db');

const createMission = (mission, callback) => {
  const { name, crew, spacecraft, destination, status, duration } = mission;

  const query = `
    INSERT INTO missions (name, crew, spacecraft, destination, status, duration)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, crew, spacecraft, destination, status, duration],
    function (err) {
      if (err) return callback(err);
      callback(null, this.lastID);
    }
  );
};

const getMissions = (callback) => {
  const query = `SELECT * FROM missions`;
  db.all(query, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

const getMissionById = (id, callback) => {
  const query = `SELECT * FROM missions WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

const updateMission = (id, mission, callback) => {
  const { name, crew, spacecraft, destination, status, duration } = mission;
  const query = `
    UPDATE missions
    SET name = ?, crew = ?, spacecraft = ?, destination = ?, status = ?, duration = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [name, crew, spacecraft, destination, status, duration, id],
    function (err) {
      if (err) return callback(err);
      callback(null, this.changes);
    }
  );
};

const deleteMission = (id, callback) => {
  const query = `DELETE FROM missions WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) return callback(err);
    callback(null, this.changes);
  });
};

module.exports = {
  createMission,
  getMissions,
  getMissionById,
  updateMission,
  deleteMission,
};
