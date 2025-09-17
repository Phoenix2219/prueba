import express from "express";
import multer from "multer";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { uploadDocument, getUserDocuments, getDashboardDocStats} from "../controllers/document.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", verifyToken(["administrador", "docente", "estudiante"]),
  upload.single("file"),
  uploadDocument
);

router.get("/lower", verifyToken(["administrador", "docente", "estudiante"]), getUserDocuments);
router.get("/stats", getDashboardDocStats);

export default router;