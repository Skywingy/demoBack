const { Client } = require("pg");
const uniqid = require('uniqid');
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
        : console.log("ugugdliinn san amjilttai holbogdloo 1")
    });
    };
    dbconnect();
    
    
exports.read = async(req, res)=> {
    try{
        const { id } = req.params;
        const query = `select * from lesson where lessoncode = '${id}'`;
        const result = await client.query(query);
        console.log("🚀 ~ file: lesson.js ~ line 25 ~ exports.read=async ~ query", query)
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

exports.list = async(req, res)=> {

    try{
        const { q } = req.query;
        if(q) {
            console.log("typing_______________", q);
            const query = ` select *, lesson.teacherid from lesson inner join teacher on lesson.teacherid = teacher.teacherid where lessonname ILIKE '${q}%'`;
            
            const result = await client.query(query);
            
            console.log("exports.search=async ~ query", query)
            return res.json({
                success: true,
                data: result.rows,
                total: result.rowCount,
            })
        } else {
            const query = `select *, lesson.teacherid from lesson inner join teacher on lesson.teacherid = teacher.teacherid`
            console.log("query", query);
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
        var lessoncode  = uniqid();
        const {lessonname, teacherid    } = req.body;
        const query = `INSERT INTO lesson (lessoncode, lessonname, teacherid)
                        VALUES('${lessoncode}','${lessonname}', '${teacherid}')`;
                        console.log("🚀 ~ file: lesson.js ~ line 42 ~ exports.create=async ~ query", query)
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
        const { lessonname } = req.body;
        const { teacherid } = req.body;
        const { lessonday } = req.body;
        const { lessontime } = req.body;
        const {image} = req.body;
        const query = `UPDATE LESSON set lessonname = '${lessonname}', teacherid = '${teacherid}', lessonday = '${lessonday}', lessontime = '${lessontime}', image = '${image}' where lessoncode = '${id}'`;
        console.log("query", query)
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
        const { id } = req.params;
        const query = `DELETE from lesson where lessoncode = '${id}'`;
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

exports.search = async(req, res)=> {
    try{
        const { id } = req.params;
        console.log("id", id);
        const query = `select * from lesson where lessonname ILIKE '${id}%'`;
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