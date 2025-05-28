import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

interface DragAndDropUploaderProps {
    onFileUpload: (file: File) => void;
    mensaje?: string;
    inputRef?: React.RefObject<HTMLInputElement>;

}

const DragAndDropUploader: React.FC<DragAndDropUploaderProps> = ({ onFileUpload, mensaje, inputRef,
}) => {
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const inputFileRef = inputRef || internalInputRef;
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileUpload(e.target.files[0]);
        }
    };

    const abrirSelectorArchivo = () => {
        inputFileRef.current?.click();
    };

    return (
        <div className="mb-6">
            {mensaje && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                    {mensaje}
                </div>
            )}

            <div
                onClick={abrirSelectorArchivo}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors
          ${dragActive ? "border-pink-600 bg-pink-50" : "border-gray-300 bg-white"}
        `}
                aria-label="Zona para subir archivo PDF"
            >
                <FiUpload className="mx-auto mb-2" style={{ fontSize: "2rem", color: "#ca5c71" }} />
                <p className="text-gray-600">
                    Arrastra y suelta un archivo PDF aquí o haz clic para seleccionar.
                </p>
                <input
                    ref={inputFileRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleChangeFile}
                />
            </div>
        </div>
    );
};

export default DragAndDropUploader;
