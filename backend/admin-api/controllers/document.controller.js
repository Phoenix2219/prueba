import Document from "../models/document.model.js";
import { supabase } from "../../supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = "Acceso";

export const uploadDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No se envió archivo" });
    }

    // Nombre único
    const fileName = `${userId}/${Date.now()}-R${uuidv4()}`;

    // Subir a Supabase
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("❌ Error Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    // URL pública
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    // Guardar en Mongo
    const newDoc = new Document({
      userId,
      fileName,
      supabasePath: data.path,
      url: publicUrlData.publicUrl,
      uploadedAt: new Date(),
    });

    await newDoc.save();

    res.status(201).json(newDoc);
  } catch (err) {
    console.error("Error al subir archivo:", err);
    res.status(500).json({ error: err.message });
  }
};

//Listar documentos del usuario autenticado
export const getUserDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.user.id });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};