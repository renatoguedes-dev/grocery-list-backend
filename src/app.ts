import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRouter from "./routes/loginRouter";
import errorHandler from "./middleware/ErrorHandler";
import notFoundHandler from "./middleware/NotFoundHandler";
import signUpRouter from "./routes/signUpRouter";
import inventoryRouter from "./routes/inventoryRouter";
import AuthMiddleware from "./middleware/AuthMiddleware";
import listsRouter from "./routes/listsRouter";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/login", loginRouter);

app.use("/api/signup", signUpRouter);

app.use("/api/lists", AuthMiddleware, listsRouter)

app.use("/api/inventory", AuthMiddleware, inventoryRouter);

// handle all routes and methods that are not defined in the application
app.use(notFoundHandler);

// handle all errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express Server running on port ${PORT}`));
