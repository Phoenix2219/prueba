import { useEffect, useState } from "react";
import UploadPDF from "./upload";
import EnrollmentModal from "./enrolled";

const Home = () => {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/enrollment/student/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.length === 0) {
        setShowEnrollmentModal(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <UploadPDF />
      {showEnrollmentModal && (
        <EnrollmentModal onClose={() => setShowEnrollmentModal(false)} />
      )}
    </div>
  );
};

export default Home;
