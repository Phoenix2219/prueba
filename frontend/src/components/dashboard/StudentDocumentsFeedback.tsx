import { useEffect, useState } from "react";
import { Input, Button, Spin, message, Modal } from "antd";
import { FilePdfOutlined, SendOutlined, CheckCircleFilled } from "@ant-design/icons";
import { motion } from "framer-motion";

interface Document {
  _id: string;
  fileName: string;
  url: string;
  uploadedAt: string;
  correctedUrl?: string;
  isReviewed?: boolean;
}

interface FeedbackForm {
  comentario: string;
  calificacion: string;
}

interface Props {
  studentId: string;
}

const makeCorrectedUrl = (url: string) => {
  // Si ya tiene "-C" no modificamos nada
  if (url.includes("-C")) return url

  // Si tiene extensión (ej. .pdf) → insertar -C antes de la extensión
  const lastSegment = url.substring(url.lastIndexOf("/") + 1)
  if (lastSegment.includes(".")) {
    return url.replace(/\.([^.\/?#]+)$/, "-C.$1")
  }

  // Si no tiene extensión → añadir "-C.pdf"
  return `${url}-C.pdf`
}

const checkExists = async (url: string) => {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
};

export default function StudentDocumentsFeedback({ studentId }: Props) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [feedbacks, setFeedbacks] = useState<Record<string, FeedbackForm>>({});
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [reviewedDocs, setReviewedDocs] = useState<Set<string>>(new Set());
  const [previewWhich, setPreviewWhich] = useState<"original" | "corrected">("original");

  const token = localStorage.getItem("token");

  // Cargar documentos del estudiante
  useEffect(() => {
    if (!studentId) return;

    const fetchDocs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/feedback/student/${studentId}/documents`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        setDocuments(Array.isArray(data) ? data : [])

        // Verificar si existen versiones corregidas
        const enhanced = await Promise.all(
          (data || []).map(async (doc: Document) => {
            const candidate = makeCorrectedUrl(doc.url);
            const exists = await checkExists(candidate);
            return exists ? { ...doc, correctedUrl: candidate } : doc;
          })
        );

        setDocuments(enhanced);

        // Inicializar feedbacks
        const initialFeedbacks = enhanced.reduce(
          (acc: Record<string, FeedbackForm>, doc: Document) => {
            acc[doc._id] = { comentario: "", calificacion: "" };
            return acc;
          },
          {}
        );
        setFeedbacks(initialFeedbacks);

        // Marcar revisados
        const reviewedSet = new Set<string>(
          enhanced.filter((doc) => doc.isReviewed).map((doc) => doc._id)
        );
        setReviewedDocs(reviewedSet);
      } catch (error) {
        console.error(error);
        message.error("Error al cargar documentos del estudiante");
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [studentId]);

  // Enviar retroalimentación
  const handleSubmit = async (documentId: string) => {
    const feedback = feedbacks[documentId];
    if (!feedback.comentario || !feedback.calificacion) {
      message.warning("Completa todos los campos antes de enviar.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId,
          documentIds: [documentId],
          feedbackText: feedback.comentario,
          qualification: feedback.calificacion,
        }),
      });

      if (!res.ok) throw new Error();
      message.success("Retroalimentación enviada correctamente");

      // Marcar documento como revisado
      setReviewedDocs((prev) => new Set<string>([...prev, documentId]));

      setFeedbacks({
        ...feedbacks,
        [documentId]: { comentario: "", calificacion: "" },
      });
      setOpen(false);
    } catch {
      message.error("Error al enviar la retroalimentación");
    } finally {
      setLoading(false);
    }
  };

  if (loading && documents.length === 0) return <Spin tip="Cargando documentos..." />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📚 Documentos del estudiante</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => {
            const isReviewed = reviewedDocs.has(doc._id);
            return (
              <motion.div
                key={doc._id}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-2xl shadow-md bg-white border hover:border-blue-400 cursor-pointer p-4 transition-all"
                onClick={() => {
                  setSelectedDoc(doc);
                  setPreviewWhich("original");
                  setOpen(true);
                }}
              >
                {/* Icono de revisado */}
                {isReviewed && (
                  <div className="absolute top-2 right-2">
                    <CheckCircleFilled style={{ color: "#52c41a", fontSize: 22 }} />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <FilePdfOutlined style={{ fontSize: 22, color: "#f5222d" }} />
                  <div>
                    <p className="font-medium">{doc.fileName}</p>
                    <p className="text-xs text-gray-500">
                      Subido el: {new Date(doc.uploadedAt).toLocaleString()}
                    </p>
                    {/*{doc.correctedUrl && (
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        ✅ Versión corregida disponible
                      </p>
                    )}*/}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p>No se encontraron documentos.</p>
        )}
      </div>

      {/* Modal fullscreen */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="95%"
        style={{ top: 0, padding: 0 }}
        bodyStyle={{ height: "200vh", margin: 0, padding: 0 }}
      >
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col overflow-y-auto"
          >
            {/* Header con botones Original / Corregido */}
            <div className="flex items-center justify-between p-3 border-b bg-white sticky top-0 z-10">
              <h2 className="font-semibold text-gray-800">{selectedDoc.fileName}</h2>

              {selectedDoc.correctedUrl && (
                <div className="flex gap-2">
                  <Button
                    size="small"
                    type={previewWhich === "original" ? "primary" : "default"}
                    onClick={() => setPreviewWhich("original")}
                  >
                    Original
                  </Button>
                  <Button
                    size="small"
                    type={previewWhich === "corrected" ? "primary" : "default"}
                    onClick={() => setPreviewWhich("corrected")}
                  >
                    Corregido
                  </Button>
                  <a
                    href={selectedDoc.correctedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm ml-2"
                  >
                    Abrir en pestaña
                  </a>
                </div>
              )}
            </div>

            {/* Documento PDF */}
            <div className="flex-[0.85] bg-gray-100 flex">
              <iframe
                src={
                  previewWhich === "original"
                    ? selectedDoc.url
                    : selectedDoc.correctedUrl || selectedDoc.url
                }
                className="w-full h-full border-none"
                title={selectedDoc.fileName}
              />
            </div>

            {/* Formulario de retroalimentación */}
            <div className="flex-[0.15] bg-white p-6 border-t shadow-inner">
              <h3 className="text-lg font-semibold mb-3">✏️ Retroalimentación</h3>

              <Input.TextArea
                rows={4}
                placeholder="Escribe tus comentarios aquí..."
                value={feedbacks[selectedDoc._id]?.comentario || ""}
                onChange={(e) =>
                  setFeedbacks({
                    ...feedbacks,
                    [selectedDoc._id]: {
                      ...feedbacks[selectedDoc._id],
                      comentario: e.target.value,
                    },
                  })
                }
                className="mb-3"
              />

              <Input
                placeholder="Calificación (ej. 17/20 o A)"
                value={feedbacks[selectedDoc._id]?.calificacion || ""}
                onChange={(e) =>
                  setFeedbacks({
                    ...feedbacks,
                    [selectedDoc._id]: {
                      ...feedbacks[selectedDoc._id],
                      calificacion: e.target.value,
                    },
                  })
                }
                className="mb-4"
              />

              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => handleSubmit(selectedDoc._id)}
                loading={loading}
                className="w-full"
                disabled={reviewedDocs.has(selectedDoc._id)}
              >
                {reviewedDocs.has(selectedDoc._id)
                  ? "Ya revisado"
                  : "Enviar Retroalimentación"}
              </Button>
            </div>
          </motion.div>
        )}
      </Modal>
    </div>
  );
}
