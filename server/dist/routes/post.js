"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const query_1 = require("../utils/query");
const postRouter = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
function authenticateToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                error: "Forbidden",
            });
        }
        req.user = user;
        next();
    });
}
postRouter.post("/post", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    try {
        const post = yield (0, query_1.createPost)(title, content, req.user.userId);
        res.status(201).json({
            message: "Post created successfully",
            post,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
postRouter.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, query_1.getAllPosts)();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
postRouter.get("/posts", authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author } = req.query;
    try {
        if (author) {
            const posts = yield (0, query_1.getPostsByAuthor)(Number(author));
            return res.status(200).json(posts);
        }
        const posts = yield (0, query_1.getAllPosts)();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = postRouter;
