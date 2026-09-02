import { Router } from "express";
import { register_user,get_users,del_users } from "../controller/user.controller.ts";

const my_router = Router();

my_router.post("/register",register_user);
my_router.get("/login",get_users);
my_router.delete("/del/:id", del_users);

export default my_router;