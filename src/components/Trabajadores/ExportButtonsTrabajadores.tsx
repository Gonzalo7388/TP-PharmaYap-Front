// components/ExportButtonsTrabajadores.tsx
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Usuario } from "../../types/Usuario";

interface Props {
    trabajadores: Usuario[];
    onAgregar: () => void;
    onExportarPDF: () => void;
    onExportarCSV: (trabajadores: Usuario[]) => void;

}


export default function ExportButtonsTrabajadores({ trabajadores, onAgregar }: Props) {
    const exportarCSV = () => {
        if (trabajadores.length === 0) {
            alert("No hay trabajadores para exportar");
            return;
        }

        const encabezados = ["Nombre", "Teléfono", "Correo", "Estado"];
        const filas = trabajadores.map((t) => [
            t.nombre,
            t.telefono,
            t.correo_electronico,
            t.estado_cuenta,
        ]);

        const separador = ";";
        const escapeCampo = (campo: string) => campo.includes(separador) || campo.includes("\n")
            ? `"${campo.replace(/"/g, '""')}"`
            : campo;

        const contenidoCSV =
            encabezados.join(separador) + "\r\n" +
            filas.map(fila => fila.map(escapeCampo).join(separador)).join("\r\n");

        const blob = new Blob(["\uFEFF" + contenidoCSV], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "trabajadores.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const exportarPDF = () => {
        if (trabajadores.length === 0) {
            alert("No hay trabajadores para exportar");
            return;
        }

        const doc = new jsPDF();
        doc.text("Lista de Trabajadores", 14, 20);
        autoTable(doc, {
            startY: 30,
            head: [["Nombre", "Teléfono", "Correo", "Estado"]],
            body: trabajadores.map(t => [
                t.nombre,
                t.telefono,
                t.correo_electronico,
                t.estado_cuenta,
            ]),
            styles: { fontSize: 8 },
            headStyles: { fillColor: [202, 92, 113] },
        });

        doc.save("trabajadores.pdf");
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={exportarCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md flex items-center text-sm"
            >
                <AiOutlineFileExcel className="mr-2" />
                Exportar a Excel
            </button>

            <button
                onClick={exportarPDF}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-md flex items-center text-sm"
            >
                <AiOutlineFilePdf className="mr-2" />
                Exportar a PDF
            </button>

            <button
                onClick={onAgregar}
                className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 shadow-md flex items-center text-sm"
            >
                <FiUser className="mr-2" />
                Agregar Trabajador
            </button>
        </div>
    );
}
