import z from "zod";

export const SignupSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
    name: z.string().min(3)
});

export const SigninSchema = z.object({
    username: z.string(),
    password: z.string()
});