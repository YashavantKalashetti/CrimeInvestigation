// models/police.model.js
const sql = require('../config/db');

const Police = function(police) {
  this.name = police.name;
  this._rank = police._rank;
  this.station = police.station;
  this.badge = police.badge;
};

Police.create = (newPolice, result) => {
  sql.query("INSERT INTO police SET ?", newPolice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newPolice });
  });
};

Police.findById = (id, result) => {
  sql.query(`SELECT * FROM police WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Police.getAll = result => {
  sql.query("SELECT * FROM police", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Police.updateById = (id, police, result) => {
  sql.query(
    "UPDATE police SET name = ?, rank = ?, station_id = ? WHERE id = ?",
    [police.name, police.rank, police.station_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...police });
    }
  );
};

Police.remove = (id, result) => {
  sql.query("DELETE FROM police WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Police;
