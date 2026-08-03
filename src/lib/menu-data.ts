export type MenuTag = "Recomendado" | "Sin TACC" | "Vegetariano";
export type MenuCategoryAccent = "entradas" | "principales" | "bebidas" | "ninos" | "postres";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
  ingredients: string[];
  pairing: string;
  tags?: MenuTag[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  accent: MenuCategoryAccent;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    name: "Antipasti",
    description: "Primeros platos para compartir, con impronta italiana y productos simples.",
    shortDescription: "Entradas para la mesa.",
    accent: "entradas",
    items: [
      { id: "provoleta", name: "Provoleta al hierro", description: "Provolone dorado, oregano fresco y oliva.", price: "$9.800", image: "/images/menu/entrada.png", ingredients: ["Provolone", "Oregano", "Aceite de oliva"], pairing: "Va muy bien con un vermut o copa tinta suave.", tags: ["Recomendado", "Vegetariano"] },
      { id: "burrata", name: "Burrata con tomates", description: "Burrata cremosa, tomates confitados y pesto de albahaca.", price: "$12.400", image: "/images/menu/entrada.png", ingredients: ["Burrata", "Tomates", "Albahaca", "Oliva"], pairing: "Ideal con blanco fresco.", tags: ["Vegetariano"] },
      { id: "focaccia", name: "Focaccia della casa", description: "Masa alta, romero, sal marina y oliva.", price: "$6.900", image: "/images/menu/entrada.png", ingredients: ["Harina", "Romero", "Oliva"], pairing: "Para acompanar pastas o pedir al centro.", tags: ["Vegetariano"] },
    ],
  },
  {
    id: "principales",
    name: "Pastas y platos",
    description: "Pastas caseras, carnes y clasicos abundantes para elegir sin ruido.",
    shortDescription: "Pastas, carnes y milanesas.",
    accent: "principales",
    items: [
      { id: "ravioles", name: "Ravioles de calabaza", description: "Pasta casera, manteca de salvia y queso estacionado.", price: "$14.500", image: "/images/menu/principal.png", ingredients: ["Pasta", "Calabaza", "Salvia", "Queso"], pairing: "Ideal con blanco con cuerpo o pinot.", tags: ["Recomendado", "Vegetariano"] },
      { id: "bife", name: "Ojo de bife con hueso", description: "Corte grillado, papas rotas y chimichurri suave.", price: "$34.000", image: "/images/menu/principal.png", ingredients: ["Ojo de bife", "Papas", "Hierbas"], pairing: "Recomendamos Malbec.", tags: ["Sin TACC"] },
      { id: "milanesa", name: "Milanesa del Alma", description: "Milanesa grande, papas fritas y huevo frito.", price: "$18.900", image: "/images/menu/principal.png", ingredients: ["Carne", "Papas", "Huevo"], pairing: "Para compartir con cerveza o gaseosa." },
    ],
  },
  {
    id: "bebidas",
    name: "Cantina",
    description: "Bebidas claras, rapidas y pensadas para acompanar la comida.",
    shortDescription: "Vinos, aperitivos y sin alcohol.",
    accent: "bebidas",
    items: [
      { id: "malbec", name: "Malbec copa", description: "Vino tinto de la casa.", price: "$5.800", image: "/images/menu/bebida.png", ingredients: ["Malbec argentino"], pairing: "Excelente con carnes y pastas con salsa roja.", tags: ["Recomendado"] },
      { id: "aperol", name: "Aperol Spritz", description: "Aperitivo fresco, espumante y soda.", price: "$7.200", image: "/images/menu/bebida.png", ingredients: ["Aperol", "Espumante", "Soda"], pairing: "Buen arranque para antipasti." },
      { id: "limonata", name: "Limonata", description: "Limonada casera con menta.", price: "$3.900", image: "/images/menu/bebida.png", ingredients: ["Limon", "Menta", "Agua"], pairing: "Fresca para toda la carta." },
    ],
  },
  {
    id: "ninos",
    name: "Bambini",
    description: "Opciones simples, porciones claras y sabores conocidos.",
    shortDescription: "Para los mas chicos.",
    accent: "ninos",
    items: [
      { id: "milanesitas", name: "Milanesitas con papas", description: "Porcion infantil con papas al horno.", price: "$8.900", image: "/images/menu/principal.png", ingredients: ["Carne", "Pan rallado", "Papas"], pairing: "Ideal con agua o limonata." },
      { id: "pasta-ninos", name: "Pasta corta", description: "Salsa fileto suave o manteca.", price: "$7.600", image: "/images/menu/principal.png", ingredients: ["Pasta", "Tomate", "Queso"], pairing: "Una opcion simple para los mas chicos.", tags: ["Vegetariano"] },
    ],
  },
  {
    id: "postres",
    name: "Dolci",
    description: "Clasicos dulces para cerrar la comida con una nota italiana.",
    shortDescription: "Postres y cafe.",
    accent: "postres",
    items: [
      { id: "tiramisu", name: "Tiramisu della casa", description: "Mascarpone, cafe y cacao amargo.", price: "$7.100", image: "/images/menu/postre.png", ingredients: ["Mascarpone", "Cafe", "Cacao"], pairing: "Perfecto con espresso.", tags: ["Recomendado"] },
      { id: "flan", name: "Flan casero", description: "Dulce de leche y crema.", price: "$6.200", image: "/images/menu/postre.png", ingredients: ["Huevos", "Leche", "Caramelo"], pairing: "Un cierre clasico argentino." },
    ],
  },
];

export const getMenuCategoryById = (categoryId: string) => menuCategories.find((category) => category.id === categoryId) ?? null;
