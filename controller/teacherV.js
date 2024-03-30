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
        : console.log("ugugdliinn san amjilttai holbogdloo 6")
    });
    };
    dbconnect();


exports.list = async(req, res)=> {

    try{
        const { id } = req.params;
        const query = `select lessoncode, lessonname, lesson.teacherid from lesson inner join users on lesson.teacherid = users.teacherid where lesson.teacherid = '${id}';`
        console.log("teacherV", query);
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
