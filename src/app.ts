import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRouter from "./routes/loginRouter";
import ErrorHandler from "./middleware/ErrorHandler";
import NotFoundHandler from "./middleware/NotFoundHandler";
import signUpRouter from "./routes/signUpRouter";
import inventoryRouter from "./routes/inventoryRouter";
import AuthMiddleware from "./middleware/AuthMiddleware";
import listsRouter from "./routes/listsRouter";
import profileRouter from "./routes/profileRouter";
import helmet from "helmet";
import startRouter from "./routes/startRouter";
import resetPasswordRouter from "./routes/resetPasswordRouter";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", startRouter)

app.use("/api/login", loginRouter);

app.use("/api/signup", signUpRouter);

app.use("/api/reset-password", resetPasswordRouter)

app.use("/api/lists", AuthMiddleware, listsRouter);

app.use("/api/inventory", AuthMiddleware, inventoryRouter);

app.use("/api/profile", AuthMiddleware, profileRouter);

// handle all routes and methods that are not defined in the application
app.use(NotFoundHandler);

// handle all errors
app.use(ErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
