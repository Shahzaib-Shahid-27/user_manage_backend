import { Router } from "express";
import { register_user,get_users } from "../controller/user.controller.ts";

const my_router = Router();

my_router.post("/register",register_user);
my_router.post("/login",get_users);


export default my_router;