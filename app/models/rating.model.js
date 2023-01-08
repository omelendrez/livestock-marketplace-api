const sql = require("./db.js");

// constructor
const Rating = function (rating) {
  this.order_id = rating.order_id
  this.user_id = rating.user_id
  this.rating = rating.rating
};

Rating.create = (newRating, result) => {
  sql.query("INSERT INTO ratings SET ?", newRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created rating: ", { id: res.insertId, ...newRating });
    result(null, { id: res.insertId, ...newRating });
  });
};

Rating.findById = (id, result) => {
  sql.query(`SELECT * FROM ratings WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found rating: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Rating with the id
    result({ kind: "not_found" }, null);
  });
};

Rating.getAll = (title, result) => {
  let query = "SELECT * FROM ratings";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("ratings: ", res);
    result(null, res);
  });
};

Rating.updateById = (id, rating, result) => {
  sql.query(
    "UPDATE ratings SET order_id = ?, user_id = ?, rating = ? WHERE id = ?",
    [rating.order_id, rating.user_id, rating.rating, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Rating with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated rating: ", { id: id, ...rating });
      result(null, { id: id, ...rating });
    }
  );
};

Rating.remove = (id, result) => {
  sql.query("DELETE FROM ratings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Rating with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted rating with id: ", id);
    result(null, res);
  });
};

Rating.removeAll = result => {
  sql.query("DELETE FROM ratings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log(`deleted ${res.affectedRows} ratings`);
    result(null, res);
  });
};

module.exports = Rating;
