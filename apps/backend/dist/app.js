"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const vendors_1 = require("./vendors");
vendors_1.mongo.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && "body" in error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "JSON Parsing error encountered in body. Please fix the payload and try again." });
    }
    next();
});
routers_1.default.forEach(({ root, router }) => app.use(root, router));
app.get("/", (req, res) => {
    res.send(`Welcome to the ConnSuite API. Running on port ${process.env.PORT} with db status: ${vendors_1.mongo.status()}.`);
});
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
