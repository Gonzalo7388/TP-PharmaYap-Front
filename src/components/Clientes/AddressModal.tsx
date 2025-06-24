// src/components/Clientes/AddressModal.tsx
import React, { useState, useEffect } from "react";
// Assuming MapaSimple will be in ../MapaSimple
// You will need to import MapaSimple and pass props to it.
import MapaSimple from "../MapaSimple"; // Make sure this path is correct

interface AddressModalProps {
  showModal: boolean;
  onClose: () => void;
  setAddress: (address: string) => void;
  setAdditionalReferences: (references: string) => void;
  setNumeroEncontrado: (found: boolean) => void;
  onSaveAddress: () => void;
  currentAddress: string; // To pre-fill if an address was already selected
}

const AddressModal: React.FC<AddressModalProps> = ({
  showModal,
  onClose,
  setAddress,
  setAdditionalReferences,
  setNumeroEncontrado,
  onSaveAddress,
  currentAddress,
}) => {
  // Local state to manage inputs before saving to parent
  const [tempAddress, setTempAddress] = useState(currentAddress);
  const [tempReferences, setTempReferences] = useState("");
  const [tempNumeroEncontrado, setTempNumeroEncontrado] = useState(false);

  // Effect to update local state if parent's currentAddress changes (e.g., when opening modal)
  useEffect(() => {
    setTempAddress(currentAddress);
  }, [currentAddress]);

  // If the modal is not supposed to be shown, return null
  if (!showModal) {
    return null;
  }

  // Handler for saving the address
  const handleSave = () => {
    // Pass the local state back to the parent's handlers
    setAddress(tempAddress);
    setAdditionalReferences(tempReferences);
    setNumeroEncontrado(tempNumeroEncontrado);
    onSaveAddress(); // This should close the modal and return to previous state
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Seleccionar Dirección de Envío
        </h3>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dirección Seleccionada:
          </label>
          <input
            type="text"
            value={tempAddress}
            readOnly // Make this read-only as it should come from the map
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            placeholder="Selecciona en el mapa..."
          />
          {!tempNumeroEncontrado && tempAddress && (
            <p className="text-xs text-red-500 mt-1">
              *El número de dirección no se detectó automáticamente. Por favor,
              añade una referencia detallada.
            </p>
          )}
        </div>

        {/* Placeholder for the Map Component */}
        <div className="mb-4 h-64 border border-gray-300 rounded overflow-hidden">
          {/* THIS IS WHERE YOUR MAPA SIMPLE COMPONENT WILL GO.
            You need to pass functions to MapaSimple that will update 
            tempAddress, tempReferences, and tempNumeroEncontrado when a location is picked.
            
            Example (you'll need to adapt MapaSimple to accept these props):
          */}
          <MapaSimple
            onLocationSelect={(address, references, numeroFound) => {
              setTempAddress(address);
              setTempReferences(references);
              setTempNumeroEncontrado(numeroFound);
            }}
            // You might want to pass initial coordinates if needed
          />
          {/* End of Mapa Simple placeholder */}
        </div>

        <div className="mb-6">
          <label
            htmlFor="additionalReferences"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Referencias Adicionales (ej. Piso, Dpto, color de casa):
          </label>
          <textarea
            id="additionalReferences"
            value={tempReferences}
            onChange={(e) => setTempReferences(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
            placeholder="Ej: Edificio azul, piso 5, departamento 201, al lado de un parque."
          ></textarea>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300 text-sm font-medium flex-1"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!tempAddress} // Disable if no address is selected from the map
            className={`
              px-6 py-2 rounded-md text-white transition-colors duration-300 text-sm font-medium flex-1
              ${
                tempAddress
                  ? "bg-[#B73852] hover:bg-[#a02e45]"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            Guardar Dirección
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal; // Export the component as default