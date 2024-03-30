//service bichhed ashiglana
import express from "express";

//post-n body-r data avhin tul ashiglana
import parser from "body-parser";
//md5 encrypt
/* import md5 from "md5"; */
//jwt
import { expressjwt } from "express-jwt";
//jwt create
import jwt from "jsonwebtoken";
//cors
import cors from "cors";
//ugugdliin san holboh

//teacher route oruulah
import { teacherRouter,studentRouter, lessonRouter, teacherVRouter, StudentClassRouter, StudentChosenRouter, postRouter} from "./routes";

//ugugdliin sangiin medeelel oruulah

const app = express();

//pareser ashiglaj body-g avah
app.use( parser.urlencoded({
    extended: false,  })
);
const allowedOrigins = ["http://localhost:5121"];

app.use(
cors({
    origin: allowedOrigins,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [
        "Authorization",
        "Content-Type",
        "Accept-Ranges",
        "Access-Control-Allow-Origin"],
    credentials: true,
})
);
app.use(parser.json({
    limit: "5mb",})
);

app.use(
expressjwt({ secret: "io", algorithms: ["HS256"] }).unless({
    path: [
{
            url: "/student/login",
            method: "POST",
},
    ],
})
);

//teacher route holboh
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/lesson", lessonRouter);
app.use("/teacherView", teacherVRouter);
app.use("/StudentClass", StudentClassRouter);
app.use("/StudentChosen", StudentChosenRouter);
app.use("/post", postRouter);



//serves-g 3030 port deer ajiluulah
app.listen(3030, () => {
console.log("server running 3030 PORT");
});
