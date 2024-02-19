import express from "express";
const app = express();
import dotenv from "dotenv";
import UserRoutes from "./routes/User";
import { connect } from "./config/database";

dotenv.config();

app.use(express.json());
app.use("/api/v1", UserRoutes);

connect();

app.listen(4000, () => {
  console.log("Server is Listening on port number 4000");
});
