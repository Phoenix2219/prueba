import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dateEnrolled: { type: Date, default: Date.now },
    state: {type: String, enum: ["matriculado", "retirado"], default: "matriculado", required: true},        
});

export default mongoose.model("Enrollment", enrollmentSchema);
