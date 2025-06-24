// src/components/Pedidos/ConfirmationModal.tsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the checkmark icon

// Define the props that the ConfirmationModal component will accept
interface ConfirmationModalProps {
  showModal: boolean; // Boolean to control modal visibility
  onGenerateBoleta: () => void; // Function to call when the "Generar Boleta" button is clicked
  onClose: () => void; // Function to call to close the modal (e.g., after generating boleta or just dismissing)
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showModal,
  onGenerateBoleta,
  onClose, // Added for flexibility
}) => {
  // If showModal is false, the component renders nothing
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-30 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all max-w-lg w-full">
        {/* Modal Header/Top Section - Visual confirmation */}
        <div className="relative p-6 bg-gradient-to-r from-[#c85c73] to-pink-500">
          {/* Circular icon container positioned above the modal */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
              <FaCheckCircle className="text-[#c85c73] text-3xl" /> {/* Checkmark icon */}
            </div>
          </div>
          <h2 className="mt-10 text-2xl font-bold text-white text-center">
            Compra Confirmada
          </h2>
          <p className="mt-2 text-center text-white">
            Gracias por su compra, su transacción fue exitosa.
          </p>
        </div>

        {/* Modal Body: Action Buttons */}
        <div className="p-6 bg-white">
          <button
            onClick={onGenerateBoleta} // Calls the prop function to generate the PDF
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Generar Boleta
          </button>
          {/* Added a close button for more flexible dismissal */}
          <button
            onClick={onClose}
            className="w-full mt-3 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded shadow transition-all duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; // Export the component as default