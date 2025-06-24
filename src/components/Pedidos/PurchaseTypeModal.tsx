// src/components/Pedidos/PurchaseTypeModal.tsx
import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi"; // Import necessary icons

interface PurchaseTypeModalProps {
  showModal: boolean;
  onClose: () => void;
  purchaseType: string;
  onSetPurchaseType: (type: string) => void;
  address: string; // To display current address if already set
  additionalReferences: string; // To display additional references if already set
  numeroEncontrado: boolean; // From MapaSimple, to show warnings if number not found
  onOpenAddressModal: (e: React.MouseEvent) => void; // Function to open the address selection modal
  onSavePreferences: () => void; // Function to save preferences and proceed
}

const PurchaseTypeModal: React.FC<PurchaseTypeModalProps> = ({
  showModal,
  onClose,
  purchaseType,
  onSetPurchaseType,
  address,
  additionalReferences,
  numeroEncontrado,
  onOpenAddressModal,
  onSavePreferences,
}) => {
  // If the modal is not supposed to be shown, return null to render nothing
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          ¿Cómo entregaremos tu pedido?
        </h3>
        <form>
          {/* Option: Despacho a domicilio (Home Delivery) */}
          <label
            className={`
              flex items-center gap-4 p-4 mb-4 rounded-lg border cursor-pointer transition-colors duration-200
              ${
                purchaseType === "domicilio"
                  ? "border-[#B73852] bg-red-50" // Active style
                  : "border-gray-300 hover:bg-gray-50" // Inactive style
              }
            `}
          >
            <input
              type="radio"
              name="compra"
              value="domicilio"
              checked={purchaseType === "domicilio"}
              onChange={() => onSetPurchaseType("domicilio")}
              className="form-radio h-5 w-5 text-[#B73852] focus:ring-[#B73852]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiPackage className="text-xl" />
                <span className="font-semibold text-gray-800">
                  Despacho a domicilio
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {address ? `Dirección: ${address}` : "Ingresa una dirección"}
              </p>
              {additionalReferences && (
                <p className="text-xs text-gray-500 mt-1">
                  Referencias: {additionalReferences}
                </p>
              )}
              {!numeroEncontrado && address && (
                <p className="text-xs text-red-500 mt-1">
                  *No se encontró número. Agrega referencias claras.
                </p>
              )}
              <button
                type="button"
                onClick={onOpenAddressModal}
                className="text-sm text-blue-600 hover:underline focus:outline-none mt-2"
              >
                {address ? "Cambiar dirección" : "Seleccionar dirección"}
              </button>
            </div>
          </label>

          {/* Option: Retiro en Tienda (Store Pickup) */}
          <label
            className={`
              flex items-center gap-4 p-4 mb-6 rounded-lg border cursor-pointer transition-colors duration-200
              ${
                purchaseType === "tienda"
                  ? "border-[#B73852] bg-red-50" // Active style
                  : "border-gray-300 hover:bg-gray-50" // Inactive style
              }
            `}
          >
            <input
              type="radio"
              name="compra"
              value="tienda"
              checked={purchaseType === "tienda"}
              onChange={() => onSetPurchaseType("tienda")}
              className="form-radio h-5 w-5 text-[#B73852] focus:ring-[#B73852]"
            />
            <div>
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-xl" />
                <span className="font-semibold text-gray-800">
                  Retiro en Tienda
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Ubica una tienda</p>
            </div>
          </label>

          {/* Action buttons for the modal */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose} // Closes the modal without saving
              className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300 text-sm font-medium"
            >
              Regresar
            </button>
            <button
              type="button"
              onClick={onSavePreferences} // Saves preferences and proceeds
              // Disable button if no purchase type is selected, or if domicile is selected but no address
              disabled={!purchaseType || (purchaseType === "domicilio" && !address)}
              className={`
                px-6 py-2 rounded-md text-white transition-colors duration-300 text-sm font-medium
                ${
                  purchaseType && (purchaseType !== "domicilio" || address)
                    ? "bg-[#B73852] hover:bg-[#a02e45]" // Active style
                    : "bg-gray-400 cursor-not-allowed" // Disabled style
                }
              `}
            >
              Guardar preferencias
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseTypeModal; // Export the component as default