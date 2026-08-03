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
    name: "Entradas",
    description: "Primeros platos y opciones para compartir de la carta actual de Alma de Pueblo.",
    shortDescription: "Empanadas, panini y mar.",
    accent: "entradas",
    items: [
      { id: "empanada-cordero", name: "Empanada de Cordero", description: "Cordero, panceta, cebolla, verdeo, aji molido, sal y pimienta blanca.", price: "$4.200", image: "/images/menu/entrada.png", ingredients: ["Cordero", "Panceta", "Cebolla", "Verdeo"], pairing: "Ideal para arrancar con una copa tinta suave.", tags: ["Recomendado"] },
      { id: "empanada-carne", name: "Empanada de Carne", description: "Matambre, cebolla, verdeo, pimenton, sal y pimienta blanca.", price: "$4.200", image: "/images/menu/entrada.png", ingredients: ["Matambre", "Cebolla", "Verdeo", "Pimenton"], pairing: "Va muy bien al centro de mesa." },
      { id: "empanada-jamon-queso", name: "Empanada de Jamon, queso tybo y mozzarella", description: "Queso tybo, queso sardo, jamon cocido y mozzarella.", price: "$3.800", image: "/images/menu/entrada.png", ingredients: ["Jamon", "Queso tybo", "Mozzarella", "Queso sardo"], pairing: "Simple y familiar para compartir." },
      { id: "tortilla-papas", name: "Tortilla de Papas", description: "Papa, chorizo colorado, huevo, cebolla y alioli.", price: "$13.500", image: "/images/menu/entrada.png", ingredients: ["Papa", "Chorizo colorado", "Huevo", "Alioli"], pairing: "Buen inicio para una mesa que comparte.", tags: ["Recomendado"] },
      { id: "tagliere-mare", name: "Tagliere di mare", description: "Rabas, mejillones, vieyras y langostinos rebozados con aderezos. Para compartir.", price: "$47.000", image: "/images/menu/entrada.png", ingredients: ["Rabas", "Mejillones", "Vieyras", "Langostinos"], pairing: "Para compartir antes de pastas o pesca." },
      { id: "panini-alma", name: "Panini del Alma", description: "Masa madre, burrata, mortadela, rucula, queso sardo y tomate cherry.", price: "$19.000", image: "/images/menu/entrada.png", ingredients: ["Masa madre", "Burrata", "Mortadela", "Rucula"], pairing: "Funciona muy bien con aperitivo o cerveza." },
    ],
  },
  {
    id: "principales",
    name: "Principales",
    description: "Carnes, pescados, milanesas y risottos de la carta de almuerzo y cena.",
    shortDescription: "Carnes, pesca y milanesas.",
    accent: "principales",
    items: [
      { id: "ojo-bife-hueso", name: "Ojo de Bife con Hueso", price: "$34.000", image: "/images/menu/principal.png", ingredients: ["Ojo de bife"], pairing: "Recomendado con Malbec.", tags: ["Recomendado", "Sin TACC"] },
      { id: "bife-chorizo", name: "Bife de Chorizo", price: "$34.000", image: "/images/menu/principal.png", ingredients: ["Bife de chorizo"], pairing: "Va muy bien con vino tinto.", tags: ["Sin TACC"] },
      { id: "salmon-rosado", name: "Salmon rosado", price: "$37.000", image: "/images/menu/principal.png", ingredients: ["Salmon rosado"], pairing: "Ideal con blanco fresco." },
      { id: "osobuco-milanese", name: "Osobuco alla milanese", description: "Osobuco con risotto alla spinaci.", price: "$30.000", image: "/images/menu/principal.png", ingredients: ["Osobuco", "Risotto", "Espinaca"], pairing: "Plato potente para acompanar con tinto." },
      { id: "milanesa-alma", name: "Milanesa del Alma", description: "Papas fritas, huevo frito y ketchup.", price: "$35.000", image: "/images/menu/principal.png", ingredients: ["Milanesa", "Papas fritas", "Huevo"], pairing: "Un clasico para compartir.", tags: ["Recomendado"] },
      { id: "milanesa-bomba", name: "Milanesa del Alma Bomba", description: "Papas fritas, salsa de tomate, jamon cocido, queso tybo, cebolla caramelizada, queso sardo, huevos fritos y panceta.", price: "$42.000", image: "/images/menu/principal.png", ingredients: ["Milanesa", "Jamon", "Queso tybo", "Panceta"], pairing: "Para una mesa con hambre real." },
      { id: "risotto-gamberi", name: "Risotto ai Gamberi", description: "Langostinos, arroz carnaroli y tinta de calamar.", price: "$27.000", image: "/images/menu/principal.png", ingredients: ["Langostinos", "Arroz carnaroli", "Tinta de calamar"], pairing: "Queda muy bien con blanco con cuerpo." },
      { id: "risotto-calabaza", name: "Risotto de calabaza asada", description: "Calabaza asada, queso azul y nueces tostadas.", price: "$21.000", image: "/images/menu/principal.png", ingredients: ["Calabaza", "Queso azul", "Nueces"], pairing: "Opcion cremosa y vegetariana.", tags: ["Vegetariano"] },
    ],
  },
  {
    id: "pastas",
    name: "Pastas",
    description: "Pastas caseras y cazuelas con salsas de la casa.",
    shortDescription: "Pastas caseras.",
    accent: "principales",
    items: [
      { id: "caserecce-cacio-pepe", name: "Caserecce Cacio e Pepe alla Ruota", description: "Terminada en rueda de reggianito estacionado. Incluye champinones, panceta y verdeo.", price: "$29.000", image: "/images/menu/principal.png", ingredients: ["Caserecce", "Reggianito", "Champinones", "Panceta"], pairing: "Uno de los platos mas teatrales de la carta.", tags: ["Recomendado"] },
      { id: "tagliatelle-carbonara", name: "Tagliatelle Carbonara", description: "Tagliatelles caseros, molleja, panceta, verdeo, yemas y queso sardo.", price: "$30.000", image: "/images/menu/principal.png", ingredients: ["Tagliatelle", "Molleja", "Panceta", "Queso sardo"], pairing: "Potente, cremoso y bien italiano." },
      { id: "tagliatelle-langostinos", name: "Tagliatelle en Salsa de Tomates con Langostinos", description: "Tagliatelles caseros, queso sardo, langostinos y tomate concasse.", price: "$30.000", image: "/images/menu/principal.png", ingredients: ["Tagliatelle", "Langostinos", "Tomate", "Queso sardo"], pairing: "Excelente con vino blanco." },
      { id: "cazuela-noquis-ricota", name: "Cazuela de Noquis de Ricota y Espinaca", price: "$19.000", image: "/images/menu/principal.png", ingredients: ["Noquis", "Ricota", "Espinaca"], pairing: "Comoda, abundante y vegetariana.", tags: ["Vegetariano"] },
      { id: "cazuela-noquis-papa", name: "Cazuela de Noquis de Papa", price: "$16.000", image: "/images/menu/principal.png", ingredients: ["Noquis de papa"], pairing: "Base perfecta para sumar salsa." },
      { id: "lasagna-ternera", name: "Lasagna de Ternera", description: "Ternera braseada, champignones, cebolla, pimiento y mozzarella.", price: "$27.000", image: "/images/menu/principal.png", ingredients: ["Ternera", "Champignones", "Mozzarella"], pairing: "Ideal con tinto de cuerpo medio." },
      { id: "ravioles-salmon", name: "Ravioles de Salmon", description: "Salmon rosado, queso brie, pimiento, ciboulette, tomate y cebolla.", price: "$27.000", image: "/images/menu/principal.png", ingredients: ["Salmon", "Queso brie", "Ciboulette", "Tomate"], pairing: "Delicado y fresco." },
      { id: "sorrentinos-ternera", name: "Sorrentinos de Ternera", description: "Ternera ahumada, hongos, cebolla, queso tybo y nuez moscada.", price: "$23.000", image: "/images/menu/principal.png", ingredients: ["Ternera ahumada", "Hongos", "Queso tybo"], pairing: "Buena opcion para salsa blanca o mixta." },
    ],
  },
  {
    id: "pizzas",
    name: "Pizzas",
    description: "Pizzas disponibles en cena, con sabores clasicos y combinaciones de la casa.",
    shortDescription: "Solo cena.",
    accent: "principales",
    items: [
      { id: "pizza-clasica", name: "Clasica", description: "Mozzarella, salsa de tomate, oregano y olivas verdes.", price: "$18.000", image: "/images/menu/principal.png", ingredients: ["Mozzarella", "Tomate", "Oregano", "Olivas"], pairing: "La opcion directa para compartir.", tags: ["Vegetariano"] },
      { id: "pizza-napolitana", name: "Napolitana", description: "Mozzarella, salsa de tomate, oregano, tomate redondo, aceite de ajo y olivas verdes.", price: "$20.000", image: "/images/menu/principal.png", ingredients: ["Mozzarella", "Tomate", "Ajo", "Olivas"], pairing: "Va con aperitivo o cerveza.", tags: ["Vegetariano"] },
      { id: "pizza-burrata", name: "Burrata", description: "Mozzarella, salsa de tomate, burrata, pesto, albahaca y olivas verdes.", price: "$27.000", image: "/images/menu/principal.png", ingredients: ["Burrata", "Mozzarella", "Pesto", "Albahaca"], pairing: "La mas cremosa de la seccion.", tags: ["Recomendado", "Vegetariano"] },
      { id: "pizza-especial", name: "Especial", description: "Mozzarella, salsa de tomate, jamon cocido, queso sardo, morrones y olivas verdes.", price: "$22.000", image: "/images/menu/principal.png", ingredients: ["Jamon cocido", "Mozzarella", "Morrones", "Queso sardo"], pairing: "Clasica de bodegon italiano." },
      { id: "pizza-cuatro-quesos", name: "Cuatro Quesos", description: "Mozzarella, salsa de tomate, queso azul, provolone, queso sardo y olivas negras.", price: "$24.000", image: "/images/menu/principal.png", ingredients: ["Mozzarella", "Queso azul", "Provolone", "Queso sardo"], pairing: "Intensa y salina.", tags: ["Vegetariano"] },
      { id: "pizza-rucula-jamon", name: "Rucula y Jamon Crudo", description: "Mozzarella, salsa de tomate, rucula, jamon crudo, queso sardo, tomate y olivas negras.", price: "$24.000", image: "/images/menu/principal.png", ingredients: ["Rucula", "Jamon crudo", "Queso sardo", "Tomate"], pairing: "Fresca y muy italiana." },
    ],
  },
  {
    id: "ensaladas",
    name: "Ensaladas",
    description: "Opciones frescas con burrata, verdes y combinaciones de temporada.",
    shortDescription: "Frescas y completas.",
    accent: "entradas",
    items: [
      { id: "ensalada-burrata", name: "Ensalada de Burrata", description: "Rucula, burrata, pesto de perejil y menta, picles de cebolla morada, chutney de mango y nuez.", price: "$28.000", image: "/images/menu/entrada.png", ingredients: ["Burrata", "Rucula", "Pesto", "Chutney"], pairing: "Fresca, cremosa y para compartir.", tags: ["Recomendado", "Vegetariano"] },
      { id: "ensalada-caesar", name: "Ensalada Caesar", description: "Pollo, lechuga, queso sardo, croutons, panceta crocante, huevo poche y aderezo caesar.", price: "$18.000", image: "/images/menu/entrada.png", ingredients: ["Pollo", "Lechuga", "Queso sardo", "Panceta"], pairing: "Opcion liviana pero completa." },
      { id: "ensalada-calabaza", name: "Ensalada de Calabaza y Queso Roquefort", description: "Calabaza asada, mix de verdes, cebolla caramelizada, naranja, queso azul, nueces y sesamo.", price: "$22.000", image: "/images/menu/entrada.png", ingredients: ["Calabaza", "Queso azul", "Nueces", "Naranja"], pairing: "Dulce, salina y vegetariana.", tags: ["Vegetariano"] },
    ],
  },
  {
    id: "postres",
    name: "Postres",
    description: "Finales dulces de la carta de Alma de Pueblo.",
    shortDescription: "Volcanes, tiramisu y flan.",
    accent: "postres",
    items: [
      { id: "volcan-dulce-leche", name: "Volcan de Dulce de Leche", description: "Con helado de crema Cremolatti. Coccion aproximada de 15 minutos.", price: "$12.000", image: "/images/menu/postre.png", ingredients: ["Dulce de leche", "Helado de crema"], pairing: "Para cerrar con algo bien argentino.", tags: ["Recomendado"] },
      { id: "volcan-chocolate", name: "Volcan de Chocolate", description: "Con helado de crema Cremolatti. Coccion aproximada de 15 minutos.", price: "$12.000", image: "/images/menu/postre.png", ingredients: ["Chocolate", "Helado de crema"], pairing: "Ideal para compartir." },
      { id: "tiramisu-clasico", name: "Tiramisu clasico", description: "Capas de vainilla mojada en cafe y lluvia de cacao amargo.", price: "$12.000", image: "/images/menu/postre.png", ingredients: ["Cafe", "Vainilla", "Cacao"], pairing: "Cierre italiano con espresso.", tags: ["Recomendado"] },
      { id: "affogato-alma", name: "Affogato del Alma", description: "Helado de crema Cremolatti, galleta de almendra, cafe Segafredo y Amarula.", price: "$10.000", image: "/images/menu/postre.png", ingredients: ["Helado", "Cafe", "Almendra", "Amarula"], pairing: "Postre y cafe en una misma opcion." },
      { id: "flan-casero", name: "Flan Casero", description: "Con crema, dulce de leche o mixto.", price: "$8.000", image: "/images/menu/postre.png", ingredients: ["Flan", "Crema", "Dulce de leche"], pairing: "Clasico, simple y rendidor." },
      { id: "panqueques-dulce-leche", name: "Panqueques con Dulce de Leche", description: "Panqueques tibios con helado de crema y azucar caramelizada.", price: "$8.000", image: "/images/menu/postre.png", ingredients: ["Panqueques", "Dulce de leche", "Helado"], pairing: "Dulce final para compartir." },
    ],
  },
];

export const getMenuCategoryById = (categoryId: string) => menuCategories.find((category) => category.id === categoryId) ?? null;
