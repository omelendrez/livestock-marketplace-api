const sql = require("./db.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const toWeb = require('../helpers/utils');
const { log } = require("../helpers/log.js");
// constructor
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.phone = user.phone;
  this.profile_id = user.profile_id;
  this.organization_id = user.organization_id;
  this.user_status_id = user.user_status_id;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      log.error("error: ", err);
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

User.login = (params, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${params.email}'`, async (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      const ok = await bcrypt.compare(params.password, res[0].password);

      if (!ok) {
        log.error("error: user or password incorrect" + err);
        result({ kind: "wrong_password" }, null);
        return;
      }

      const user = toWeb(res[0]);
      const token = jwt.sign({
        data: user
      }, process.env.JWT_SECRET, { expiresIn: '1d' }, { algorithm: 'HS256' });

      result(null, { ...user, token });
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM users";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET first_name = ?, last_name = ?, phone = ?, profile_id = ?, organization_id = ?, user_status_id = ? WHERE id = ?",
    [user.first_name, user.last_name, user.phone, user.profile_id, user.organization_id, user.user_status_id, id],
    (err, res) => {
      if (err) {
        log.error("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...user });
    }
  );
};

User.chgPwd = async (id, user, result) => {
  sql.query(`SELECT * FROM users WHERE id = '${id}'`, async (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    const ok = await bcrypt.compare(user.prevPass, res[0].password);

    if (!ok) {
      result({ kind: "wrong_prev_password" }, null);
      return;
    }

    const password = await bcrypt.hash(user.password, 10);

    sql.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [password, id],
      (err, res) => {
        if (err) {
          log.error("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        result(null, { id });
      }
    );
  });
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      log.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = User;
