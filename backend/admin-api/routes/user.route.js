import express from "express"
import { deleteUser, editUser, getAllUsers, getUserDetails, test, getDashboardStats } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/test", test)
router.put('/update/:id', editUser);
router.get("/all", getAllUsers)
router.get("/details/stats", getDashboardStats);
router.delete("/delete/:id", deleteUser)
router.get("/:id", getUserDetails)

export default router;