import z from "zod";

export const SignupSchema = z.object({
    username: z.string().min(2),
    name: z.string().min(3),
    password: z.string().min(6).max(30),

})
export const SignInSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(6).max(30),
    
})