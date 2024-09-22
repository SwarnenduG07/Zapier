
import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';


const generateToken = () => crypto.randomBytes(20).toString("hex");
const router = Router();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_ENDPOINT,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }
    const token = generateToken();
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const hashedpassword = await bcrypt.hash(parsedData.data.password, 20);

     const user = await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: hashedpassword,
            name: parsedData.data.name,
            verificationToken: token,
            verificationTokenExpiry: expiration,
            isVerified: false,
        }
    })

    const vericationurl = `idonthavedomail.com/verify-email?token=${token}`;

    const mailoptions = {
        from: 'noreply@yourdomail.com',
        to: user.email,
        subject: "Veryfy your email",
        html: `<p>Place verify your email by clicking the link below:</p> <a href="${vericationurl}"> Verify Email</a>`
    }

    await transporter.sendMail(mailoptions);

    return res.json({
        message: "Please verify your account by checking your email"
    });

})

router.get("/verifyemail", async (req, res) =>{
    const token = req.query.token;

    const tokenString = Array.isArray(token) ? token : [token];
    if( typeof tokenString !== 'string') {
        return res.status(400).json({
            messsage: "Invalid token formate"
        });
    }

    const user = await prismaClient.user.findFirst({

        where: {
            verificationToken: tokenString,
            verificationTokenExpiry: {
                gte: new Date()
            }
        }
    });
    if(!user) {
        return res.json({
            messaage :"Invalid or Expired token"
        })
    };

    await prismaClient.user.update({
        where:{
            id: user.id,
        },
        data:{
            isVerified: true,
            verificationToken: null,
            verificationTokenExpiry: null,
        }
    });
    return res.json({
        message: "Email verified Successfully"
    });
})

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
        }
    });
    
    if (!user) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        })
    }
    const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);

    if (!isPasswordValid) {
        return res.status(403).json({
            message: "Sorry, credentials are incorrect"
        });
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_SECRET);

    res.json({
        token: token,
    });
})

router.post("/forgotpassword", async (req, res) => {
    const { username } = req.body;
    try {
        const user = await prismaClient.user.findFirst({
            where: { email: username }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const reset = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); 

        await prismaClient.user.update({
            where: { email: username },
            data: {
                resetToken: reset, 
                resetTokenExpiry
            }
        });

        const resetUrl = `https://yourdomain.com/reset-password?token=${reset}`;
        const mailOptions = {
            from: 'noreply@yourdomain.com',
            to: username,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ message: "Password reset email sent" });
    } catch (e) {
        console.log("Error while resetting the password", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
    });

router.post("/reset-password", async (req,res) => {
    const { token ,  newPassword } = req.body
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                gte: new Date()
                }
            }
        });
        if (!user) {
            return res.json({
                message: "Invalid or expired token"
            })
        }

        const hashedpassword = await bcrypt.hash(newPassword, 10);
        await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedpassword,
                resetToken: null,
                resetTokenExpiry: null,
            }
        });
        res.json({
            message: "Password reset succecful"
        })
    } catch (e) {
        console.log("Error while resating passwprd",e);
        res.status(500).json({
            message: "Internal server error"
        })
        
    }
})

router.get("/", authMiddleware, async (req, res) => {
    // TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });
})

export const userRouter = router;
