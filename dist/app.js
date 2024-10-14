"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const ErrorHandler_1 = __importDefault(require("./middleware/ErrorHandler"));
const NotFoundHandler_1 = __importDefault(require("./middleware/NotFoundHandler"));
const signUpRouter_1 = __importDefault(require("./routes/signUpRouter"));
const inventoryRouter_1 = __importDefault(require("./routes/inventoryRouter"));
const AuthMiddleware_1 = __importDefault(require("./middleware/AuthMiddleware"));
const listsRouter_1 = __importDefault(require("./routes/listsRouter"));
const profileRouter_1 = __importDefault(require("./routes/profileRouter"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/login", loginRouter_1.default);
app.use("/api/signup", signUpRouter_1.default);
app.use("/api/lists", AuthMiddleware_1.default, listsRouter_1.default);
app.use("/api/inventory", AuthMiddleware_1.default, inventoryRouter_1.default);
app.use("/api/profile", AuthMiddleware_1.default, profileRouter_1.default);
// handle all routes and methods that are not defined in the application
app.use(NotFoundHandler_1.default);
// handle all errors
app.use(ErrorHandler_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
