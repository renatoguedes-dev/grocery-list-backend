import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRouter from "./routes/loginRouter";
import errorHandler from "./middleware/errorHandler";
import notFoundHandler from "./middleware/notFoundHandler";
import signUpRouter from "./routes/signUpRouter";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/login", loginRouter);

app.use("/api/signup", signUpRouter);

// handle all routes and methods that are not defined in the application
app.use(notFoundHandler);

// handle all errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express Server running on port ${PORT}`));
