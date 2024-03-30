const { query } = require("express");
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
        : console.log("ugugdliinn san amjilttai holbogdloo 5")
    });
    };
    dbconnect();

exports.list = async(req, res)=> {

    try{
        const { q } = req.query;
        console.log("q value:", query);
        if(q) {
            const query = `select * from teacher where teachername ILIKE '${q}%'`;
            console.log("get.list:", query);
            const result = await client.query(query);
    
            return res.json({
                success: true,
                data: result.rows,
                total: result.rowCount,
            })
        } else {
            const query = `select * from teacher`
            console.log("get.list", query);
            const result = await client.query(query);
    
            return res.json({
                success: true,
                data: result.rows,
                total: result.rowCount,
            })
        }
        
    }
    catch(error){
        return res.json({success:false, message: error});
    }

};

exports.create = async(req, res)=> {

    try{
        const {teacherid, teachername, phone} = req.body;
        const query = `INSERT INTO TEACHER (teachername, phone)
                        VALUES('${teachername}','${phone}')`;
        console.log("🚀 ~ file: teacher.js ~ line 42 ~ exports.create=async ~ query", query)
                        const result = await client.query(query);
        
        return res.json({
            success: true,
            total: result.rowCount,
        })
    }
    catch(error){
        return res.json({success:false, message: error});
    }

};

exports.update = async(req, res)=> {

    try{
        const { id } = req.params;
        const { phone } = req.body;
        const { teachername } = req.body;
        const query = `UPDATE TEACHER set phone = '${phone}', teachername = '${ teachername }' where teacherid = '${id}'`;
        console.log("exports.update=async ~ query", query)
        const result = await client.query(query);
        return res.json({
            success: true,
            data: result.rows,
        })
    }
    catch(error){
        return res.json({success:false, message: error});
    }

};

exports.delete = async(req, res)=> {

    try{
        const {id} = req.params;
        const query = `DELETE from teacher where teacherid = '${id}'`;
        console.log("Deleted teacher:", query);
        const result = await client.query(query);
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
        const query = `select * from teacher where teacherid = '${id}'`;
        console.log("read", query);
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
exports.login= async(req, res)=> {

    try{
        

        const query = `select * from teacher`
        const result = await client.query(query);
        return res.json({
            success: true,
            data: result.row,
            total: result.rowCount,
        })
    }
    catch(error){
        return res.json({success:false, message: error});
    }

};

exports.search = async(req, res)=> {
    try{
        const { q } = req.query;
        const { id } = req.query;
        console.log("id", id);
        const query = `select * from teacher where teachername ILIKE '${id}%'`;
        const result = await client.query(query);
        
        console.log("exports.search=async ~ query", query)

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