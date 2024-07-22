import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from '@sriyanshujaiswal/medium-common';


export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
       userId: any;
    }
}>();


//Middleware
blogRouter.use('/*', async (c, next) => {

    const authHeader = c.req.header("authorization") || "";
    
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);

        if(user){
            console.log(user);
            c.set("userId", user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e){
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
    
})

blogRouter.post ('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authorId = c.get("userId");

    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body)

    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are incorrect" 
        })
    }
    
    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
})
  
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();

    const { success } = updatePostInput.safeParse(body)

    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are incorrect" 
        })
    }

    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })

    // return c.text('Hello Hono!')
})

//Todo: add padination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 

    //const body = await c.req.json();
    try{
        const blogs = await prisma.post.findMany({
            select:{
                title: true,
                content: true,
                id: true,
                author:{
                    select:{
                        name: true
                    }
                }
            }
        });   
    
        return c.json({
            blogs
        })
    }catch(e){
        c.status(404)
        console.error(e)
        return c.json({
            message:"Blogs not found"
        })
    }
})
  
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate()) 
    
    const id =  c.req.param("id");

    
    try{
        const blog = await prisma.post.findFirst ({
            where:{
                id: id
            },
            select:{
                id:true,
                title: true,
                content: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
    
        return c.json({
            blog
        }) 
    
    }catch(e){
        console.log(e);
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }

})

