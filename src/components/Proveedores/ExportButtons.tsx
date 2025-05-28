import React from "react";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";

export interface Proveedor {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  ruc: string;
  estado: string;
}

interface ExportButtonsProps {
  proveedores: Proveedor[];
  onExportarCSV: (proveedores: Proveedor[]) => void;
  onExportarPDF: () => void;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  proveedores,
  onExportarCSV,
  onExportarPDF,
}) => {
  return (
    <div className="flex space-x-4 flex-wrap">
      <button
        onClick={() => onExportarCSV(proveedores)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center"
      >
        <AiOutlineFileExcel className="mr-2" />
        Exportar a Excel
      </button>

      <button
        onClick={onExportarPDF}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center"
      >
        <AiOutlineFilePdf className="mr-2" />
        Exportar a PDF
      </button>
    </div>
  );
};

export default ExportButtons;
