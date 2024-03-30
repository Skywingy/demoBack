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
            ? console.log( "ugugdliin san holbohod daraah aldaa garlaa: ",
        error)
        : console.log("ugugdliinn san amjilttai holbogdloo 3")
    });
    };
    dbconnect();


exports.list = async(req, res)=> {

    try{
        const { id } = req.params;
        const query = `select * from studentclass where studentid ='${id}';`
        console.log("list.chosen", query);
        const result = await client.query(query);
        return res.json({
            success: true,
            data: result.rows,
            total: result.rowCount,
        })
    }
    catch(error){
        return res.json({success:false, message: error});
    }
};

exports.delete = async(req, res)=> {

    try{
        const { id } = req.params;
        const query = `DELETE from studentclass where id = '${id}'`;
        console.log("hey", query);
        const result = await client.query(query);
        console.log("🚀 ~ file: student.js ~ line 78 ~ exports.delete ~ query", query)
        return res.json({
            success: true,
            total: result.rowCount,
        })
    }
    catch(error){
        return res.json({success:false, message: error});
    }

};

exports.read = async(req, res)=> {

    try{
        const { id } = req.params;
        const query = `select * from studentclass where id = '${id}'`;
        console.log('read', query)
        const result = await client.query(query);
        return res.json({
            success: true,
            data: result.rows[0],
            total: result.rowCount,
        })
    }
    catch(error){
        return res.json({success:false, message: error});
    }

};