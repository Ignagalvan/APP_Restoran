export type MenuTag = "Recomendado" | "Sin TACC" | "Vegetariano";

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
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    name: "Entradas",
    description: "Pensadas para compartir.",
    items: [
      { id: "burrata", name: "Burrata ahumada", description: "Burrata cremosa, tomates confitados y aceite de albahaca.", price: "$9.800", image: "/images/menu/entrada.png", ingredients: ["Burrata", "Tomates confitados", "Albahaca", "Aceite de oliva"], pairing: "Ideal con una copa de vino blanco fresco.", tags: ["Recomendado", "Vegetariano"] },
      { id: "croquetas", name: "Croquetas de hongos", description: "Hongos, parmesano y alioli suave.", price: "$7.400", image: "/images/menu/entrada.png", ingredients: ["Hongos", "Parmesano", "Alioli suave"], pairing: "Acompañalas con nuestro Malbec por copa.", tags: ["Vegetariano"] },
    ],
  },
  {
    id: "principales",
    name: "Principales",
    description: "Nuestra selección de platos principales.",
    items: [
      { id: "bife", name: "Ojo de bife", description: "Corte grillado, papas rotas y chimichurri de hierbas.", price: "$19.500", image: "/images/menu/principal.png", ingredients: ["Ojo de bife", "Papas", "Hierbas frescas", "Chimichurri"], pairing: "Recomendamos acompañarlo con Malbec.", tags: ["Recomendado", "Sin TACC"] },
      { id: "risotto", name: "Risotto de calabaza", description: "Arroz cremoso, calabaza asada y queso estacionado.", price: "$15.200", image: "/images/menu/principal.png", ingredients: ["Arroz", "Calabaza asada", "Queso estacionado"], pairing: "Ideal con un blanco de buena acidez.", tags: ["Vegetariano", "Sin TACC"] },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    description: "Una selección para acompañar cada momento.",
    items: [
      { id: "malbec", name: "Malbec copa", description: "Vino tinto de la casa.", price: "$5.800", image: "/images/menu/bebida.png", ingredients: ["Malbec argentino"], pairing: "Excelente con carnes grilladas y quesos.", tags: ["Recomendado"] },
      { id: "agua", name: "Agua con gas", price: "$2.500", image: "/images/menu/bebida.png", ingredients: ["Agua mineral con gas"], pairing: "Una opción fresca para toda la carta." },
    ],
  },
  {
    id: "postres",
    name: "Postres",
    description: "El mejor cierre para una gran comida.",
    items: [
      { id: "flan", name: "Flan casero", description: "Dulce de leche y crema.", price: "$6.200", image: "/images/menu/postre.png", ingredients: ["Huevos", "Leche", "Caramelo", "Dulce de leche", "Crema"], pairing: "Perfecto con café o un vino dulce.", tags: ["Recomendado"] },
      { id: "cheesecake", name: "Cheesecake cítrico", description: "Frutos rojos y lima.", price: "$7.100", image: "/images/menu/postre.png", ingredients: ["Queso crema", "Frutos rojos", "Lima"], pairing: "Acompañalo con café o espumante.", tags: ["Vegetariano"] },
    ],
  },
];
