
import bcrypt from "bcryptjs";
import { db } from "../src/prisma/db.ts";
import type { Request, Response } from "express";

export const register_user = async (
    req: Request,
    res: Response
) => {
    const { name, email, password } = req.body;

    try {
        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Fields are missing!"
            });
        }

        // Hash password
        const hash_pass = await bcrypt.hash(password, 10);

        // Create user
        const createuser = await db.orm.public.User.create({
            name,
            email,
            password: hash_pass
        });

        if(!createuser){
            return res.status(400).json({
                message: "user are exists!...."
            });
        }

        // Don't return password
        return res.status(201).json({
            message: "User Created!",
            data: {
                id: createuser.id,
                name: createuser.name,
                email: createuser.email
            }
        });

    } catch (error) {
        console.error("Error creating User!", error);

        return res.status(500).json({
            message: "Error creating User!",
            error:error
        });
    }
};

export const get_users = async (
  req: Request,
  res: Response
) => {
  try {
    // const users = await db.orm.public.User.findMany();
    const users = await db.orm.public.User.all();

    return res.status(200).json({
      message: "Users fetched successfully!",
      data: users,
    });
  } catch (error) {
    console.log("Error fetching users:", error);

    return res.status(500).json({
      message: "Error fetching users!",
      error,
    });
  }
};

