import z from "zod";

export const SignupSchema = z.object({
    username: z.string(),
    password: z.string().min(6).max(30),

})
export const SignInSchema = z.object({
    username: z.string(),
    password: z.string().min(6).max(30),
    
})