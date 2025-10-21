import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nameCourse: { type: String, required: true },
    dateCourse: { type: Date, default: Date.now },
    state: { type: String, enum: ["activo", "inactivo"], default: "activo"},
});

export default mongoose.model("Course", courseSchema);
