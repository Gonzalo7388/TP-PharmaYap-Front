// src/utils/pdfGenerator.ts
import jsPDF from 'jspdf';

// Assuming Producto type is defined in your project.
// Adjust the import path if your Producto type is in a different location.
import { Producto } from '../data/products'; // Example path, adjust as needed

// Define the structure for a single item in the cart for the PDF generator
interface CartItem {
  product: Producto;
  quantity: number;
}

/**
 * Generates a PDF boleta (receipt) based on cart items and purchase details.
 * @param cartItems Array of products in the cart with their quantities.
 * @param purchaseType The type of purchase (e.g., "domicilio" or "tienda").
 * @param address The delivery address if purchaseType is "domicilio".
 * @param additionalReferences Any extra references for the delivery.
 * @param totalAmount The total amount of the purchase.
 */
export const generatePdfBoleta = (
  cartItems: CartItem[],
  purchaseType: string,
  address: string,
  additionalReferences: string,
  totalAmount: number
) => {
  if (cartItems.length === 0) {
    alert("El carrito está vacío. Agrega productos para generar la boleta.");
    return;
  }

  const doc = new jsPDF(); // Initialize jsPDF document

  let y = 20; // Initial Y position for content

  // --- Header ---
  doc.setFontSize(22);
  doc.text("PharmaYap - Boleta de Venta", 105, y, { align: 'center' });
  y += 10;

  doc.setFontSize(10);
  doc.text("RUC: 20567891234", 105, y, { align: 'center' });
  y += 5;
  doc.text("Av. La Farmacia 123, Lima, Perú", 105, y, { align: 'center' });
  y += 5;
  doc.text("Tel: (01) 234-5678 | Email: contacto@pharmayap.com", 105, y, { align: 'center' });
  y += 15; // Space after header

  // --- Order Details ---
  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, y);
  y += 7;
  doc.text(`Hora: ${new Date().toLocaleTimeString()}`, 20, y);
  y += 7;
  doc.text(`Tipo de Compra: ${purchaseType === 'domicilio' ? 'Despacho a Domicilio' : 'Retiro en Tienda'}`, 20, y);
  y += 7;

  if (purchaseType === 'domicilio') {
    doc.text(`Dirección de Entrega: ${address}`, 20, y);
    y += 7;
    if (additionalReferences) {
      doc.text(`Referencias Adicionales: ${additionalReferences}`, 20, y);
      y += 7;
    }
  }
  y += 10; // Space before items

  // --- Items Table Header ---
  doc.setFontSize(10);
  doc.setFillColor(230, 230, 230); // Light gray background for header
  doc.rect(20, y, 170, 7, 'F'); // Draw filled rectangle
  doc.setTextColor(0, 0, 0); // Black text
  doc.text("Producto", 22, y + 5);
  doc.text("Cant.", 120, y + 5, { align: 'right' });
  doc.text("P. Unit.", 145, y + 5, { align: 'right' });
  doc.text("Subtotal", 185, y + 5, { align: 'right' });
  y += 10; // Space after header

  // --- Items List ---
  doc.setFontSize(10);
  cartItems.forEach(item => {
    // Check if new page is needed
    if (y + 10 > doc.internal.pageSize.height - 30) {
      doc.addPage();
      y = 20; // Reset Y for new page
      // Redraw table header on new page for continuity
      doc.setFillColor(230, 230, 230);
      doc.rect(20, y, 170, 7, 'F');
      doc.setTextColor(0, 0, 0);
      doc.text("Producto", 22, y + 5);
      doc.text("Cant.", 120, y + 5, { align: 'right' });
      doc.text("P. Unit.", 145, y + 5, { align: 'right' });
      doc.text("Subtotal", 185, y + 5, { align: 'right' });
      y += 10;
    }

    doc.text(item.product.name, 22, y);
    doc.text(item.quantity.toString(), 120, y, { align: 'right' });
    doc.text(`S/. ${item.product.price.toFixed(2)}`, 145, y, { align: 'right' });
    doc.text(`S/. ${(item.product.price * item.quantity).toFixed(2)}`, 185, y, { align: 'right' });
    y += 7; // Line height for each item
  });

  y += 10; // Space after items

  // --- Total ---
  doc.setDrawColor(0, 0, 0); // Black line
  doc.line(140, y, 190, y); // Line above total
  y += 5;
  doc.setFontSize(14);
  doc.text(`Total a Pagar: S/. ${totalAmount.toFixed(2)}`, 185, y, { align: 'right' });
  y += 15;

  // --- Footer ---
  doc.setFontSize(10);
  doc.text("¡Gracias por tu preferencia!", 105, doc.internal.pageSize.height - 20, { align: 'center' });

  // Save the PDF
  doc.save(`boleta-${new Date().toISOString().slice(0,10)}.pdf`);
};