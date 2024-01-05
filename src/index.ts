import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose'
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8000, () => {
  console.log("server is listening on http://localhost:8000/");
});

  
const MONGO_URL = "mongodb+srv://melat1993m:melat1993m@cluster0.l6pjrhd.mongodb.net/?retryWrites=true&w=majority"
  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL);
 
  mongoose.connection.on("error" , (error: Error)=> console.log(error));

  app.use('/' ,router())