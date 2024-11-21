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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
exports.getPostsByAuthor = getPostsByAuthor;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
function registerUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("User already exists with thsi email");
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        return yield prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });
    });
}
function loginUser(email, password, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("User not Found");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: "24h" });
        return { token, user };
    });
}
function createPost(title, content, authorId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });
    });
}
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.post.findMany({
            include: {
                author: true,
            },
        });
    });
}
function getPostsByAuthor(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.post.findMany({
            where: {
                authorId: userId,
            },
            include: {
                author: true,
            },
        });
    });
}
