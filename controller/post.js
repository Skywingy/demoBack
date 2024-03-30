const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "nyam-erdene",
  password: "L@lala75",
  database: "postgres",
});
const dbconnect = async () => {
  await client.connect((error) => {
    error
      ? console.log("ugugdliin san holbohod daraah aldaa garlaa: ", error)
      : console.log("ugugdliinn san amjilttai holbogdloo 7");
  });
};
dbconnect();

exports.list = async (req, res) => {
  try {
    const query = `select * from post;`;
    console.log("post:", query);
    const result = await client.query(query);
    return res.json({
      success: true,
      data: result.rows,
      total: result.rowCount,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, message } = req.body;
    const query = `INSERT INTO post (title, message)
                        VALUES('${title}','${message}')`;
    console.log("query:", query);
    const result = await client.query(query);
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
    const { postid } = req.params;
    const { title } = req.body;
    const { message } = req.body;
    const query = `UPDATE post set title = '${title}', message = '${message}' where postid = '${postid}'`;
    console.log("query", query);
    const result = await client.query(query);
    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.delete = async (req, res) => {
  try {
    const { postid } = req.params;
    const query = `DELETE from post where postid = '${postid}'`;
    const result = await client.query(query);
    return res.json({
      success: true,
      total: result.rowCount,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

exports.read = async (req, res) => {
  try {
    const { postid } = req.params;
    const query = `select * from post where postid = '${postid}'`;
    const result = await client.query(query);
    console.log("query:::", query);
    return res.json({
      success: true,
      data: result.rows[0],
      total: result.rowCount,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};
