import { Hono } from 'hono'
import { userRouter } from './Routes/userRoutes'
import { blogRouter } from './Routes/blogRoutes'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
    }
}>()


// //Middleware
// app.use('/api/v1/blog/*', async (c, next) => {

//   const header = c.req.header("authorization") || "";

//   if(!header){
//     c.status(401);
//     return c.json({error: "unauthorized"});
//   }

//   const token = header.split(" ")[1]

//   const response = await verify(token, c.env.JWT_SECRET);

//   if(response.id){
//     //c.set('userId', response.id)
//     await next()
//   }else{
//     c.status(403)
//     return c.json({error: "unauthorized"})
//   }
  
// })

app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app
