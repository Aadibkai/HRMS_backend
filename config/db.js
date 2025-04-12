import { connect, set } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
export const { APP_PORT, DB_CONNECT } = process.env;
set("strictQuery", true);


export const connectDB = () => {
  connect("mongodb://localhost:27017/hrms")
    .then((con) => console.log("Database Connected: " + con.connection.host))
    .catch((err) => console.log(err));
};
