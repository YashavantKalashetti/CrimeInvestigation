const sql = require('../config/db');

// Constructor
const Complaint = function(complaint) {
  this.user_id = complaint.user_id || 1234;
  this.description = complaint.description;
  this.type_of_crime = complaint.type_of_crime;
  this.date = complaint.date;
  this.time = complaint.time;
  this.location = complaint.location;
  this.status = complaint.status || 'pending';
};

// Create a new Complaint
Complaint.create = (newComplaint, result) => {
  sql.query("INSERT INTO complaints SET ?", newComplaint, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created complaint: ", { id: res.insertId, ...newComplaint });
    result(null, { id: res.insertId, ...newComplaint });
  });
};

// Find Complaint by ID
Complaint.findById = (id, result) => {
  sql.query(`SELECT * FROM complaints WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      // console.log("found complaint: ", res[0]);
      result(null, res[0]);
      return;
    }
    // Not found Complaint with the id
    result({ kind: "not_found" }, null);
  });
};

// Get all Complaints
Complaint.getAll = (result) => {
  sql.query("SELECT * FROM complaints ORDER BY id DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("complaints: ", res);
    result(null, res);
  });
};

// Update a Complaint identified by the id in the request
Complaint.updateById = (id, complaint, result) => {
  console.log("-----", complaint);
  sql.query(
    "UPDATE complaints SET status = ? WHERE id = ?",
    [complaint.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        console.log("not found complaint: ", err);
        result({ kind: "not_found" }, null);
        return;
      }
      // console.log("updated complaint: ", { id: id, ...complaint });
      result(null, { id: id, ...complaint });
    }
  );
};

// Delete a Complaint with the specified id in the request
Complaint.remove = (id, result) => {
  sql.query("DELETE FROM complaints WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // Not found Complaint with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted complaint with id: ", id);
    result(null, res);
  });
};

// Delete all Complaints
Complaint.removeAll = (result) => {
  sql.query("DELETE FROM complaints", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} complaints`);
    result(null, res);
  });
};

module.exports = Complaint;
