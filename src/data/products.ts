// Definir el tipo para un producto
export interface Producto {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

// Definir el tipo para una categoría (puede ser literal, pero basta con string[])
export type Categoria = string;

const categories: Categoria[] = [
  "Todos",
  "Cuidado de articulaciones",
  "Cuidado de la diabetes",
  "Cuidado renal",
  "Cuidado del hígado",
  "Cuidado respiratorio",
  "Cuidado de los ojos",
  "Salud digestiva",
  "Cuidado cardiovascular",
  "Suplementos vitamínicos",
];

const allProducts: Producto[] = [
  {
    id: 1,
    name: "Flekosteel ",
    description: "Es un producto que atenua el espasmo muscular y la inflamación, reduce el proceso de degeneración del tejido cartilaginoso y mejora su metabolismo.",
    category: "Cuidado de articulaciones",
    price: 80,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/seller/1686676142018L.jpg",
  },
  {
    id: 2,
    name: "Carticolagen",
    description: "",
    category: "Cuidado de articulaciones",
    price: 60,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/seller/1681698059935L.jpg",
  },
  {
    id: 3,
    name: "Glyconorm",
    description: "Indicado para aliviar y controlar los síntomas de la diabetes para de esta manera mejorar su salud de manera natural. Los ingredientes activos de Glyconorm regulan los niveles de azúr",
    category: "Cuidado de la diabetes",
    price: 150,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/seller/1698082744009L.jpg",
  },
  {
    id: 4,
    name: "Vital vitaminado",
    description: "Es una mezcla de alimentos,libre de azúcar y que puede ser consumido como parte de una alimentación saludable",
    category: "Cuidado de la diabetes",
    price: 110,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/066780L.jpg",
  },


  {
    id: 5,
    name: "Losartán",
    description: "Se utiliza en pacientes con nefropatía diabética o hipertensión para proteger el riñón y reducir la proteinuria.",
    category: "Cuidado renal",
    price: 90,
    image: "https://farmaciaslider.pe/my-assets/image/product/8d78e3c19f109aea7d6ee5c56991b89e.jpg",
  },
  {
    id: 6,
    name: "Silimarina",
    description: "Protector hepático natural. Derivado del cardo mariano, ayuda a regenerar células hepáticas y reducir la inflamación.",
    category: "Cuidado del hígado",
    price: 95,
    image: "https://res.cloudinary.com/riqra/image/upload/w_656,h_656,c_limit,q_auto,f_auto/v1643152268/sellers/salud-farma/products/igiuithhusw8dpjolzjm.png",
  },
  {
    id: 7,
    name: "Ambroxol ",
    description: "Actúa sobre las secreciones bronquiales haciendo que las flemas sean más fluidas, facilitando su expulsión mediante la tos.",
    category: "Cuidado respiratorio",
    price: 70,
    image: "https://www.hogarysalud.com.pe/wp-content/uploads/2024/10/75110-C2.jpg",
  },
  {
    id: 8,
    name: "Cloranfenicol",
    description: "Elimina bacterias causantes de infecciones oculares.",
    category: "Cuidado de los ojos",
    price: 30,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/205052L.jpg",
  },

  {
    id: 9,
    name: "Omeprazol",
    description: "Bloquea la secreción ácida gástrica hasta 24 h.",
    category: "Salud digestiva",
    price: 50,
    image: "https://farmaciauniversalpe.vtexassets.com/arquivos/ids/158088/01984_1.jpg?v=638428792795700000",
  },

  {
    id: 10,
    name: "Sucralfato",
    description: "Forma una barrera gel protectora sobre úlceras.",
    category: "Salud digestiva",
    price: 65,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/034190L.jpg",
  },


  {
    id: 11,
    name: "	Enalapril",
    description: "Relaja vasos y baja presión arterial, protege el corazón.",
    category: "Cuidado cardiovascular",
    price: 85,
    image: "https://farmaciauniversalpe.vtexassets.com/arquivos/ids/159455-800-auto?v=638591216595200000&width=800&height=auto&aspect=true",
  },

  {
    id: 12,
    name: "Metoprolol",
    description: "Controla frecuencia y presión.",
    category: "Cuidado cardiovascular",
    price: 120,
    image: "https://farmaciaslider.pe/my-assets/image/product/8518f2c912d69b86e8f6dd754a198c48.jpg",
  },



  {
    id: 13,
    name: "Centrum",
    description: "",
    category: "Complejo multivitamínico con 26 nutrientes esenciales: vitaminas A–E, B1–B12, hierro, zinc, magnesio, etc.",
    price: 40,
    image: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/1735/PMP20000174890/full_image-1.webp",
  },



  {
    id: 14,
    name: "Neurobion",
    description: "Contiene vitaminas B1, B6 y B12.",
    category: "Suplementos vitamínicos",
    price: 55,
    image: "https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/072581L.jpg",
  },
  {
    id: 15,
    name: "Vitaglobin",
    description: "Hierro + vitamina C + B12 + ácido fólico + zinc.",
    category: "Suplementos vitamínicos",
    price: 45,
    image: "https://pharmacie-denni.dz/wp-content/uploads/2025/05/vitaglobin.jpg",
  },
];

export { categories, allProducts };
