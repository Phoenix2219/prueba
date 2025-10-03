// config/createAdminUser.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createAdminUser = async () => {
  try {
    const adminEmail = "admin@example.com";

    // Verificar si ya existe un admin con ese email
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("✅ Admin ya existe.");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin123!", 10); // 

    const adminUser = new User({
      username: "admin",
      email: adminEmail,
      password: hashedPassword,
      role: "administrador"
    });

    await adminUser.save();
  } catch (error) {
    console.error("❌ Error creando usuario admin:", error.message);
  }
};
