import React, { useEffect, useState } from "react";

type DocumentType = {
  _id: string;
  fileName: string;
  url: string;
  uploadedAt: string;
};

const DocumentViewer: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentType | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch("/api/document/lower", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error al obtener documentos");
        const data = await res.json();
        setDocuments(data);
        if (data.length > 0) setSelectedDoc(data[0]); // Selecciona el primero por defecto
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="p-6 mx-full bg-white shadow-lg rounded-2xl border border-gray-200 h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Mis Archivos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6 h-[calc(100%-4rem)]">
        {/* Columna izquierda: lista de documentos */}
        <div className="border-2 border-dashed rounded-xl bg-gray-50 shadow-inner p-4 overflow-y-auto h-full">
          {documents.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">
              No hay documentos disponibles 📂
            </p>
          ) : (
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li
                  key={doc._id}
                  className={`p-3 rounded-lg cursor-pointer border transition ${
                    selectedDoc?._id === doc._id
                      ? "border-blue-600 bg-blue-50 shadow"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <p className="font-semibold">{doc.fileName}</p>
                  <p className="text-sm text-gray-500">
                    Subido: {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Columna derecha: previsualizador único */}
        <div className="border rounded-xl bg-gray-50 shadow-inner h-full flex flex-col mr-6">
          {selectedDoc ? (
            <>              
              <iframe
                src={selectedDoc.url}
                className="w-full h-full rounded-b-lg"
                title={selectedDoc.fileName}
              />
            </>
          ) : (
            <p className="text-gray-500 m-auto text-center">
              Selecciona un documento para previsualizar 📄
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
