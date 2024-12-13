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
const app = (0, express_1.default)();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
app.use(express_1.default.json());
const JWT_SECRET = "123";
const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));
app.post("/api/v1/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL
    });
    const body = req.body;
    const user = yield prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if (user) {
        return res.status(401).json({ message: "User Already present" });
    }
    try {
        const user = yield prisma.user.create({
            data: {
                name: body.uname,
                email: body.email,
                password: body.pass
            }
        });
        if (!user) {
            return res.status(400).json({
                message: "User not created"
            });
        }
        const token = yield jwt.sign({ id: user.id }, JWT_SECRET);
        return res.json({ token });
    }
    catch (e) {
        return res.status(403).json({ message: e });
    }
    finally {
        yield prisma.$disconnect(); // Close the Prisma connection
    }
}));
app.post("/api/v1/user/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    const user = yield prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = yield jwt.sign({ id: user.id }, JWT_SECRET);
    return res.json({
        email: user.email,
        password: user.password,
        name: user.name,
        token
    });
}));
app.post("/api/v1/blog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const val = yield prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                authorId: decode.id
            }
        });
        return res.json({ val });
    }
    catch (err) {
        console.log("not happening");
    }
    finally {
        yield prisma.$disconnect(); // Close the Prisma connection
    }
}));
app.put("/api/v1/blog/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    const postId = req.params.postId;
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const post = yield prisma.post.update({
            where: { id: postId },
            data: {
                title: req.body.title,
                content: req.body.content,
                published: true
            },
        });
        return res.json({ post });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield prisma.$disconnect(); // Close the Prisma connection
    }
}));
app.get("/api/v1/blog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const post = yield prisma.post.findMany({
            where: { authorId: decode.id },
        });
        return res.json({ post });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield prisma.$disconnect(); // Close the Prisma connection
    }
}));
app.get("/api/v1/blog/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const post = yield prisma.post.findMany({
            include: {
                author: true, // Include the author of the post
            },
        });
        return res.json({ post });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield prisma.$disconnect(); // Close the Prisma connection
    }
}));
app.get("/api/v1/blog/values/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    console.log("req params: ", req.params);
    const { id } = req.params;
    console.log("id's: ", id);
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const post = yield prisma.post.findMany({
            where: { authorId: id },
            include: {
                author: true, // Include the author of the post
            },
        });
        return res.json({ post });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield prisma.$disconnect(); // Close the Prisma connection
    }
}));
app.get('/api/v1/getdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        console.log("decode: ", decode);
        const datagot = yield prisma.user.findUnique({
            where: { id: decode.id },
        });
        return res.json({ name: datagot.name });
    }
    catch (err) {
        console.log("not happeninggg");
    }
    finally {
        yield prisma.$disconnect(); // Close the Prisma connection
    }
}));
app.listen(3001, () => {
    console.log("Server is running on port 3000");
});
