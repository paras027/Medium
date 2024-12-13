import express, { Request, Response } from 'express';
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
app.use(express.json());

const JWT_SECRET = "123"
const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.post("/api/v1/user/signup", async (req:Request, res:Response) => {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  });
  const body = req.body;

  const user = await prisma.user.findUnique({
    where:{
      email:req.body.email
    }
  });

  if(user)
  {
    return res.status(401).json({message:"User Already present"});
  }

try {
  const user = await prisma.user.create({
    data: {
      name:body.uname,
      email:body.email,
      password:body.pass
    }
  });
  if(!user) {  
    return res.status(400).json({
      message: "User not created"
    })
  }
  const token = await jwt.sign({ id: user.id },JWT_SECRET);
		return res.json({ token });
} catch(e) {
  return res.status(403).json({ message: e });
}
finally {
  await prisma.$disconnect(); // Close the Prisma connection
}
  });

  app.post("/api/v1/user/signin", async(req:Request, res:Response) => {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
  })
  const user = await prisma.user.findUnique({
    where:{
      email:req.body.email
    }
  });
  if(!user)
  {
    return res.status(401).json({message:"Invalid credentials"});
  }

  const token = await jwt.sign({ id: user.id },JWT_SECRET);
  return res.json({ 
    email:user.email,
    password:user.password,
    name:user.name,
    token });

  });

  app.post("/api/v1/blog", async(req:Request, res:Response) => {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
  })
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);

        const val = await prisma.post.create({
          data:{
            title:req.body.title,
            content:req.body.content,
            image:req.body.image,
            authorId:decode.id
          }
        })
        return res.json({ val });
    }
    catch (err) {
        console.log("not happening");
    }
    finally {
      await prisma.$disconnect(); // Close the Prisma connection
    }
      
  });

  app.put("/api/v1/blog/:postId", async(req:Request, res:Response) => {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
  })
    const postId = req.params.postId;
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const post = await prisma.post.update({
          where: { id: postId },
          data: { 
            title:req.body.title,
            content:req.body.content,
            published: true },
        })
        return res.json({ post })
    }
    catch (err) {
        console.log(err);
    }
    finally {
      await prisma.$disconnect(); // Close the Prisma connection
    }
      
  });

  app.get("/api/v1/blog", async (req:Request, res:Response) => {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
  })

  const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const post = await prisma.post.findMany({
          where: { authorId: decode.id },
        })
        return res.json({ post })
    }
    catch (err) {
        console.log(err);
    }
    finally {
      await prisma.$disconnect(); // Close the Prisma connection
    }
      
  });

  app.get("/api/v1/blog/bulk", async(req:Request, res:Response) => {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
  })

  const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        const post = await prisma.post.findMany(
          {
            include: {
              author: true, // Include the author of the post
            },
          }
        )
        return res.json({ post })
    }
    catch (err) {
        console.log(err);
    }
    finally {
      await prisma.$disconnect(); // Close the Prisma connection
    }
      
  });

  app.get("/api/v1/blog/values/:id", async(req:Request, res:Response) => {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
  })
  console.log("req params: ", req.params)
  const {id} = req.params;
  console.log("id's: ", id);
  const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);

        const post = await prisma.post.findMany(
          {
            where: { authorId: id },
            include: {
              author: true, // Include the author of the post
            },
          },
          
        )
        return res.json({ post })
    }
    catch (err) {
        console.log(err);
    }
    finally {
      await prisma.$disconnect(); // Close the Prisma connection
    }
      
  });

  app.get('/api/v1/getdata', async(req:Request, res:Response) =>{
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
  })
    const tok = req.headers.authorization;
    try {
        const decode = jwt.verify(tok, JWT_SECRET);
        console.log("decode: " ,decode)
        const datagot = await prisma.user.findUnique({
          where: { id: decode.id },
        });

        return res.json({name:datagot.name});
    }
    catch (err) {
        console.log("not happeninggg");
    }
    finally {
      await prisma.$disconnect(); // Close the Prisma connection
    }
      
  }
);

  
  app.listen(3001, () => {
    console.log("Server is running on port 3000");
  });