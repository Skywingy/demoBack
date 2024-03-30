import md5 from "md5";
import jwt from "jsonwebtoken";
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "nyam-erdene",
  password: "--------------",
  database: "postgres",
});

const dbconnect = async () => {
  await client.connect((error) => {
    error
      ? console.log("ugugdliin san holbohod daraah aldaa garlaa: ", error)
      : console.log("ugugdliinn san amjilttai holbogdloo 2");
  });
};
dbconnect();

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = `select * from users 
                        where username = '${username}' and password='${md5(
      password
    )}'`;

    const result = await client.query(query);
    console.log(
      "🚀 ~ file: student.js ~ line 28 ~ exports.login=async ~ query",
      result.rows[0]
    );

    const token = await jwt.sign(result.rows[0], "tadaa", { expiresIn: 60000 });

    console.log(
      "🚀 ~ file: student.js ~ line 31 ~ exports.login=async ~ token",
      token
    );
    if (result.rowCount > 0) {
      return res.json({
        success: true,
        user: result.rows[0],
        token: token,
      });
    } else {
      return res.json({
        success: true,
        message: "Not found - student info",
      });
    }
  } catch (error) {
    return res
      .json({
        success: false,
        message: error,
      })
      .status(499);
  }
};

exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `select * from student where studentid = '${id}'`;
    console.log("query", query);
    const result = await client.query(query);
    return res.json({
      success: true,
      data: result.rows[0],
      total: result.rowCount,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE from student where studentid = '${id}'`;
    const result = await client.query(query);
    console.log(
      "🚀 ~ file: student.js ~ line 78 ~ exports.delete ~ query",
      query
    );
    return res.json({
      success: true,
      total: result.rowCount,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { sex } = req.body;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const query = `UPDATE student set firstname = '${firstname}', sex = '${sex}', lastname = '${lastname}' where studentid = '${id}'`;
    const result = await client.query(query);
    console.log(
      "🚀 ~ file: student.js ~ line 96 ~ exports.update=async ~ query",
      query
    );
    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.create = async (req, res) => {
  try {
    const { firstname, sex, lastname } = req.body;
    const query = `INSERT INTO student (firstname, sex, lastname)
                        VALUES('${firstname}','${sex}', '${lastname}')`;
    console.log(
      "🚀 ~ file: teacher.js ~ line 42 ~ exports.create=async ~ query",
      query
    );
    const result = await client.query(query);

    return res.json({
      success: true,
      total: result.rowCount,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.list = async (req, res) => {
  try {
    const { q } = req.query;
    if (q) {
      console.log("search value:", q);

      const query = `select * from student where firstname ILIKE '${q}%'`;

      console.log("query:", query);
      const result = await client.query(query);
      return res.json({
        success: true,
        data: result.rows,
        total: result.rowCount,
      });
    } else {
      const query = `select * from student`;
      console.log("query:", query);
      const result = await client.query(query);
      return res.json({
        success: true,
        data: result.rows,
        total: result.rowCount,
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.search = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const query = `select * from student where firstname ILIKE '${id}%'`;
    const result = await client.query(query);

    console.log("exports.search=async ~ query", query);

    return res.json({
      success: true,
      data: result.rows,
      total: result.rowCount,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};
