import React, { useEffect, useState } from "react";
import { Modal, Select, Button, message } from "antd";

interface Course {
  _id: string;
  nameCourse: string;
  teacherId: string;
  dateCourse: string;
  state: string;
}

const EnrollmentModal = ({ onClose }: { onClose: () => void }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course/active`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  const handleEnroll = async () => {
    if (!selectedCourse) {
      message.warning("Selecciona un curso antes de continuar");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/enrollment/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ studentId: user._id, courseId: selectedCourse }),
    });

    if (res.ok) {
      message.success("¡Te has matriculado correctamente!");
      onClose();
    } else {
      message.error("Error al matricularse");
    }
    setLoading(false);
  };

  return (
    <Modal
      open={true}
      closable={false}
      maskClosable={false}
      footer={null}
      centered
      title="Matricúlate para continuar"
    >
      <Select
        placeholder="Selecciona un curso"
        className="w-full mb-4"
        onChange={(value) => setSelectedCourse(value)}
      >
        {courses.map((course) => (
          <Select.Option key={course._id} value={course._id}>
            {course.nameCourse}
          </Select.Option>
        ))}
      </Select>

      <Button
        type="primary"
        loading={loading}
        onClick={handleEnroll}
        className="w-full"
      >
        Matricularme
      </Button>
    </Modal>
  );
};

export default EnrollmentModal;
