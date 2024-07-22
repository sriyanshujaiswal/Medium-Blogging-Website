import z, { string } from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export type signupType = z.infer<typeof signupInput> 

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type siginType = z.infer<typeof signinInput>

export const createPostInput = z.object({
    title: z.string(),
    content: z.string()
})

export type createPostType = z.infer<typeof createPostInput>

export const updatePostInput = z.object({
    title: string().optional(),
    content: string().optional()
})

export type updatePostType= z.infer<typeof updatePostInput>
