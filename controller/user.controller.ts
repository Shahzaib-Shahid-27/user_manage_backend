import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../src/prisma/db.ts";

import type { Request, Response } from "express";



// REGISTER USER
export const register_user = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  try {

    // Validate field
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Fields are missing!",
      });
    }

    // Check if email already exists
    const existingUser = await db.orm.public.User
      .where({
        email: email,
      })
      .all();

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "User already exists!",
      });

    }

    // Hash password
    const hash_pass = await bcrypt.hash(password, 10);

    // Create user
    const createuser = await db.orm.public.User.create({
      name,
      email,
      password: hash_pass,

    });

    // Create JWT token
    const token = jwt.sign(
      {
        id: createuser.id,
        email: createuser.email,
      },
      process.env.JWT_SECRET!,

      {
        expiresIn: "1h",
      }

    );

    return res.status(201).json({
      message: "User Created!",
      token: token,
    });

  } catch (error) {
      console.error("Error creating User!", error);
      return res.status(500).json({
        message: "Error creating User!",
        error: error,
      });
    }
};


// GET ALL USERS
export const get_users = async (req: Request, res: Response) => {

  try {

    const users = await db.orm.public.User.all();

    const usersWithoutPassword = users.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,

    }));

    return res.status(200).json({
      message: "Users fetched successfully!",
      data: usersWithoutPassword,
    });

  } catch (error) {
    console.log("Error fetching users:", error);
    return res.status(500).json({
      message: "Error fetching users!",
      error: error,
    });
  }
};

// DELETE USER
export const del_users = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {

    // Check Id

    const userId = Number(id);

    if (!id || Number.isNaN(userId)) {

      return res.status(400).json({

        message: "Invalid user ID!",

      });

    }

    // Delete user
    const user = await db.orm.public.User
      .where({
        id: userId,
      })
      .delete();

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Error deleting user:", error);
    return res.status(500).json({
      message: "Error deleting user!",
      error: error,
    });
  }
};