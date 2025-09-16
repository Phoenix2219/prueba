import express from "express"
import { deleteUser, editUser, getAllUsers, getUserDetails, test } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/test", test)
router.put('/update/:id', editUser);
router.get("/user/:id", getUserDetails)
router.get("/all", getAllUsers)
router.delete("/delete/:id", deleteUser)

export default router;