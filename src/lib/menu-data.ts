export type MenuTag = "Recomendado" | "Sin TACC" | "Vegetariano";
export type MenuCategoryAccent = "entradas" | "principales" | "bebidas" | "ninos" | "postres";
export type MenuSectionId = "principales" | "pastas" | "pizzas" | "ensaladas" | "vinos" | "sin-alcohol" | "cafeteria" | "cervezas" | "aperitivos" | "gin-vermu" | "whisky";

export interface MenuOption { id: string; name: string; price?: string; }
export interface MenuOptionGroup { id: string; title: string; description: string; required?: boolean; options: MenuOption[]; }

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  image?: string;
  ingredients?: string[];
  pairing?: string;
  tags?: MenuTag[];
  section?: MenuSectionId;
  optionGroups?: MenuOptionGroup[];
  heading?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  accent: MenuCategoryAccent;
  items: MenuItem[];
  sections?: { id: MenuSectionId; name: string; emoji: string }[];
}

const garnishGroup: MenuOptionGroup = {
  id: "guarnicion", title: "Guarniciones disponibles", description: "Precios de la carta", options: [
    { id: "fritas", name: "Papas fritas", price: "$7.500" },
    { id: "fritas-huevo", name: "Papas fritas con huevo revuelto", price: "$8.000" },
    { id: "espanolas", name: "Papas españolas a la crema y verdeo", price: "$8.500" },
    { id: "pure-cabutia", name: "Puré de cabutia ahumada", price: "$7.000" },
    { id: "mixta", name: "Ensalada mixta", price: "$7.500" },
    { id: "estacion", name: "Ensalada de estación", price: "$7.500" },
    { id: "vegetales", name: "Vegetales grillados", price: "$8.500" },
  ],
};

const sauceGroup: MenuOptionGroup = {
  id: "salsa", title: "Salsas disponibles", description: "Opciones para acompañar la pasta", options: [
    { id: "bechamel", name: "Salsa bechamel" }, { id: "filetto", name: "Salsa filetto" },
    { id: "mixta", name: "Salsa mixta" }, { id: "bolognesa", name: "Salsa bolognesa" },
    { id: "blanca-puerro", name: "Salsa blanca con puerro" },
  ],
};

const extraSauceGroup: MenuOptionGroup = {
  id: "salsa-adicional", title: "Salsas adicionales", description: "Precios adicionales", options: [
    { id: "crema", name: "Crema de leche", price: "+$8.000" },
    { id: "panceta-verdeo", name: "Salsa blanca con panceta y verdeo", price: "+$8.000" },
    { id: "cuatro-quesos", name: "Salsa blanca con cuatro quesos", price: "+$8.000" },
    { id: "hongos", name: "Salsa blanca con hongos", price: "+$8.000" },
    { id: "mariscos", name: "Salsa de mariscos", price: "+$18.000" },
    { id: "langostinos", name: "Salsa de langostinos", price: "+$16.000" },
  ],
};

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    name: "Entradas",
    description: "Sabores de la casa para abrir la mesa y compartir.",
    shortDescription: "Para abrir la mesa.",
    accent: "entradas",
    items: [
      { id: "empanada-cordero", name: "Empanada de cordero", description: "Cordero, panceta, cebolla, verdeo, ají molido, sal y pimienta blanca.", price: "$4.200", ingredients: ["Cordero", "Panceta", "Cebolla", "Verdeo", "Ají molido"], pairing: "Ideal para abrir la mesa." },
      { id: "empanada-carne", name: "Empanada de carne", description: "Matambre, cebolla, verdeo, pimentón, sal y pimienta blanca.", price: "$4.200", ingredients: ["Matambre", "Cebolla", "Verdeo", "Pimentón"], pairing: "Ideal para abrir la mesa." },
      { id: "empanada-cerdo", name: "Empanada de matambre de cerdo", description: "Matambre de cerdo, cebolla, verdeo, panceta, ají molido, sal y pimienta blanca.", price: "$4.200", ingredients: ["Matambre de cerdo", "Cebolla", "Verdeo", "Panceta", "Ají molido"], pairing: "Ideal para abrir la mesa." },
      { id: "empanada-jamon-queso", name: "Empanada de jamón y quesos", description: "Jamón cocido, queso tybo, queso sardo y mozzarella.", price: "$3.800", ingredients: ["Jamón cocido", "Queso tybo", "Queso sardo", "Mozzarella"], pairing: "Ideal para abrir la mesa." },
      { id: "empanada-berenjena", name: "Empanada de berenjena y mozzarella", description: "Berenjena, cebolla, pimiento rojo, mozzarella, ají molido, sal y pimienta blanca.", price: "$3.800", ingredients: ["Berenjena", "Cebolla", "Pimiento rojo", "Mozzarella", "Ají molido"], pairing: "Ideal para abrir la mesa.", tags: ["Vegetariano"] },
      { id: "empanada-espinaca", name: "Empanada de espinaca y parmesano", description: "Espinaca, cebolla, mozzarella, queso sardo, nuez moscada, sal y pimienta blanca.", price: "$3.800", ingredients: ["Espinaca", "Cebolla", "Mozzarella", "Queso sardo", "Nuez moscada"], pairing: "Ideal para abrir la mesa.", tags: ["Vegetariano"] },
      { id: "empanada-calabaza", name: "Empanada de calabaza, queso y castañas", description: "Calabaza, cebolla, pimiento rojo, mozzarella, castaña de cajú y nuez moscada.", price: "$3.800", ingredients: ["Calabaza", "Cebolla", "Pimiento rojo", "Mozzarella", "Castaña de cajú"], pairing: "Ideal para abrir la mesa.", tags: ["Vegetariano"] },
      { id: "tortilla", name: "Tortilla de papas", description: "Papa, chorizo colorado, huevo, cebolla y alioli.", price: "$13.500", ingredients: ["Papa", "Chorizo colorado", "Huevo", "Cebolla", "Alioli"], pairing: "Va muy bien con una cerveza roja.", tags: ["Sin TACC"] },
      { id: "tagliere-mar", name: "Tagliere di mare · Tabla de mar", description: "Rabas, mejillones, vieyras y langostinos rebozados, fritos y con aderezos. Para compartir.", price: "$47.000", ingredients: ["Rabas", "Mejillones", "Vieyras", "Langostinos", "Aderezos"], pairing: "Ideal con un vino blanco fresco.", tags: ["Recomendado"] },
      { id: "calamar-frito", name: "Calamar frito con aderezo picante", description: "Anillos de calamar rebozados y fritos.", price: "$25.000", ingredients: ["Calamar", "Rebozado", "Aderezo picante"], pairing: "Acompañalo con una cerveza o vino blanco." },
      { id: "bunuelo", name: "Buñuelos de espinaca y queso sardo", description: "Con aderezo de remolacha.", price: "$12.500", ingredients: ["Espinaca", "Cebolla", "Huevo", "Queso sardo", "Remolacha"], pairing: "Acompañalos con un aperitivo cítrico.", tags: ["Vegetariano"] },
      { id: "panini-alma", name: "Panini del Alma", description: "Masa madre, burrata, mortadela, rúcula, queso sardo y tomates cherry.", price: "$19.000", ingredients: ["Masa madre", "Burrata", "Mortadela", "Rúcula", "Queso sardo", "Tomates cherry"], pairing: "Ideal con una copa de blanco fresco." },
      { id: "panini-pueblo", name: "Panini del Pueblo", description: "Masa madre, burrata, jamón crudo, rúcula, tomates cherry y queso sardo.", price: "$19.000", ingredients: ["Masa madre", "Burrata", "Jamón crudo", "Rúcula", "Tomates cherry", "Queso sardo"], pairing: "Ideal con una copa de blanco fresco." },
    ],
  },
  {
    id: "principales",
    name: "Principales",
    description: "Carnes, pesca y pastas con el carácter de nuestra cocina.",
    shortDescription: "Carnes, pesca y pastas.",
    accent: "principales",
    sections: [
      { id: "principales", name: "Principales", emoji: "🍽️" },
      { id: "pastas", name: "Pastas", emoji: "🍝" },
      { id: "pizzas", name: "Pizzas", emoji: "🍕" },
      { id: "ensaladas", name: "Ensaladas", emoji: "🥗" },
    ],
    items: [
      { id: "ojo-bife", section: "principales", name: "Ojo de bife con hueso", price: "$34.000", optionGroups: [garnishGroup], tags: ["Sin TACC"] },
      { id: "bife-chorizo", section: "principales", name: "Bife de chorizo", price: "$34.000", optionGroups: [garnishGroup], tags: ["Sin TACC"] },
      { id: "salmon", section: "principales", name: "Salmón rosado", price: "$37.000", optionGroups: [garnishGroup], tags: ["Sin TACC"] },
      { id: "molleja-verdeo", section: "principales", name: "Molleja al verdeo", description: "Con puré de papas.", price: "$27.500", ingredients: ["Molleja", "Verdeo", "Puré de papas"], optionGroups: [garnishGroup], tags: ["Sin TACC"] },
      { id: "osobuco-milanese", section: "principales", name: "Osobuco alla milanese", description: "Con risotto alla spinaci.", price: "$30.000", ingredients: ["Osobuco", "Risotto", "Espinaca"], optionGroups: [garnishGroup] },
      { id: "pacu", section: "principales", name: "Pacú · Pesca del día", price: "$25.000", optionGroups: [garnishGroup], tags: ["Sin TACC"] },
      { id: "milanesa-alma", section: "principales", name: "Milanesa del Alma", description: "Papas fritas, huevo frito y ketchup.", price: "$35.000", tags: ["Recomendado"], optionGroups: [garnishGroup] },
      { id: "milanesa-bomba", section: "principales", name: "Milanesa del Alma Bomba", description: "Papas fritas, salsa de tomate, jamón cocido, queso tybo, cebolla caramelizada, queso sardo, huevos fritos, panceta ahumada y ketchup.", price: "$42.000", optionGroups: [garnishGroup] },
      { id: "risotto-gamberi", section: "principales", name: "Risotto ai gamberi", description: "Langostinos, arroz carnaroli y tinta de calamar.", price: "$27.000", tags: ["Sin TACC"] },
      { id: "risotto-calabaza", section: "principales", name: "Risotto de calabaza asada", description: "Queso azul y nueces tostadas.", price: "$21.000", tags: ["Vegetariano", "Sin TACC"] },
      { id: "milanese-vitello", section: "principales", name: "Milanese di vitello", description: "Con caserecce en rueda de reggianito estacionado. Opcional a caballo: $2.000.", price: "$42.000" },

      { id: "caserecce-ruota", section: "pastas", heading: "Pasta corta a la rueda", name: "Caserecce cacio e pepe alla ruota", description: "Pasta finalizada en rueda de reggianito, con champiñones, panceta y verdeo.", price: "$29.000", tags: ["Recomendado"] },
      { id: "tagliatelle-carbonara", section: "pastas", heading: "Pastas", name: "Tagliatelle carbonara", description: "Molleja, panceta, verdeo y salsa cremosa de yemas y queso sardo.", price: "$30.000" },
      { id: "tagliatelle-langostinos", section: "pastas", name: "Tagliatelle con tomates y langostinos", description: "Queso sardo, langostinos y tomate concasé.", price: "$30.000" },
      { id: "noquis-ricota", section: "pastas", name: "Cazuela de ñoquis de ricota y espinaca", price: "$19.000", optionGroups: [sauceGroup, extraSauceGroup], tags: ["Vegetariano"] },
      { id: "noquis-papa", section: "pastas", name: "Cazuela de ñoquis de papa", price: "$16.000", optionGroups: [sauceGroup, extraSauceGroup], tags: ["Vegetariano"] },
      { id: "lasagna-ternera", section: "pastas", heading: "Pasta rellena", name: "Lasagna de ternera", description: "Ternera braseada, champiñones, cebolla, pimiento y mozzarella.", price: "$27.000" },
      { id: "canelones-ternera", section: "pastas", name: "Canelones de ternera braseada", price: "$25.000", optionGroups: [sauceGroup, extraSauceGroup] },
      { id: "ravioles-salmon", section: "pastas", name: "Ravioles de salmón", description: "Salmón rosado, queso brie, pimiento, ciboulette, tomate y cebolla.", price: "$27.000", optionGroups: [sauceGroup, extraSauceGroup] },
      { id: "sorrentinos-ternera", section: "pastas", name: "Sorrentinos de ternera", description: "Ternera ahumada, hongos, cebolla y queso tybo.", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup] },
      { id: "sorrentinos-hongos", section: "pastas", name: "Sorrentinos de hongo de pino", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup], tags: ["Vegetariano"] },
      { id: "sorrentinos-jamon", section: "pastas", name: "Sorrentinos de jamón y queso", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup] },
      { id: "sorrentinos-calabaza", section: "pastas", name: "Sorrentinos de calabaza", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup], tags: ["Vegetariano"] },
      { id: "panzottis-mar", section: "pastas", name: "Panzottis de mar", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup] },
      { id: "panzottis-cordero", section: "pastas", name: "Panzottis de cordero", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup] },
      { id: "ravioles-osobuco", section: "pastas", name: "Ravioles de osobuco", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup] },
      { id: "ravioles-espinaca", section: "pastas", name: "Ravioles de espinaca", price: "$23.000", optionGroups: [sauceGroup, extraSauceGroup], tags: ["Vegetariano"] },

      { id: "pizza-clasica", section: "pizzas", name: "Clásica", description: "Mozzarella, salsa de tomate, orégano y olivas verdes.", price: "$18.000", tags: ["Vegetariano"] },
      { id: "pizza-napolitana", section: "pizzas", name: "Napolitana", description: "Mozzarella, tomate, aceite de ajo y olivas verdes.", price: "$20.000", tags: ["Vegetariano"] },
      { id: "pizza-burrata", section: "pizzas", name: "Burrata", description: "Mozzarella, salsa de tomate, burrata, pesto, albahaca y olivas verdes.", price: "$27.000", tags: ["Recomendado", "Vegetariano"] },
      { id: "pizza-fugazzeta", section: "pizzas", name: "Fugazzeta", description: "Mozzarella, cebolla, queso sardo y olivas negras.", price: "$19.000", tags: ["Vegetariano"] },
      { id: "pizza-especial", section: "pizzas", name: "Especial", description: "Jamón cocido, queso sardo, morrones y olivas verdes.", price: "$22.000" },
      { id: "pizza-hawaii", section: "pizzas", name: "Hawaii", description: "Mozzarella, ananá, jamón cocido, azúcar mascabo y olivas negras.", price: "$23.000" },
      { id: "pizza-peras", section: "pizzas", name: "Peras", description: "Mozzarella, peras, queso azul, tomillo y nueces.", price: "$20.000", tags: ["Vegetariano"] },
      { id: "pizza-verdeo", section: "pizzas", name: "Verdeo y panceta", price: "$24.000" },
      { id: "pizza-cuatro-quesos", section: "pizzas", name: "Cuatro quesos", price: "$24.000", tags: ["Vegetariano"] },
      { id: "pizza-rucula", section: "pizzas", name: "Rúcula y jamón crudo", price: "$24.000" },
      { id: "pizza-funghi", section: "pizzas", name: "Funghi", price: "$21.000", tags: ["Vegetariano"] },
      { id: "pizza-langostinos", section: "pizzas", name: "De langostinos", price: "$24.000" },

      { id: "ensalada-burrata", section: "ensaladas", name: "Ensalada de burrata", description: "Rúcula, burrata, pesto de perejil y menta, picles de cebolla, chutney de mango y nuez.", price: "$28.000", tags: ["Sin TACC", "Vegetariano"] },
      { id: "ensalada-caesar", section: "ensaladas", name: "Ensalada Caesar", description: "Pollo, lechuga, queso sardo, croutons, panceta, huevo poché y aderezo Caesar.", price: "$18.000" },
      { id: "ensalada-calabaza", section: "ensaladas", name: "Ensalada de calabaza y queso roquefort", description: "Mix de verdes, cebolla caramelizada, naranja, queso azul, nueces y sésamo.", price: "$22.000", tags: ["Sin TACC", "Vegetariano"] },
    ],
  },
  {
    id: "bebidas",
    name: "Bodega y bebidas",
    description: "Nuestra selección de vinos, bebidas, cafetería y coctelería.",
    shortDescription: "Bodega, bebidas y coctelería.",
    accent: "bebidas",
    sections: [
      { id: "vinos", name: "Vinos", emoji: "🍷" },
      { id: "sin-alcohol", name: "Sin alcohol", emoji: "🥤" },
      { id: "cafeteria", name: "Cafetería", emoji: "☕" },
      { id: "cervezas", name: "Cervezas", emoji: "🍺" },
      { id: "aperitivos", name: "Aperitivos", emoji: "🍹" },
      { id: "gin-vermu", name: "Gin y Vermú", emoji: "🍸" },
      { id: "whisky", name: "Whisky", emoji: "🥃" },
    ],
    items: [
      { id: "sangria-verano", section: "vinos", heading: "Sangría y tinto de verano", name: "Sangría · Tinto de verano", description: "Emilia Malbec o Benjamín Malbec.", price: "$12.500 botella · $4.500 copa", tags: ["Recomendado"] },
      { id: "cadus", section: "vinos", heading: "Tintos", name: "Cadus Appellation", description: "Malbec, Cabernet, Pinot Noir o Petit Verdot.", price: "$43.000" },
      { id: "perdices-exploracion", section: "vinos", name: "Las Perdices Exploración Geográfica", description: "La Consulta, Paraje Altamira, Gualtallary o Chacayes Malbec.", price: "$39.000" },
      { id: "ruca-dos", section: "vinos", name: "Ruca Malén Capítulo Dos", description: "Malbec, Petit Verdot o Cabernet.", price: "$25.000" },
      { id: "nicanor-cabernet", section: "vinos", name: "Don Nicanor Cabernet Sauvignon", price: "$30.000" },
      { id: "nicanor-malbec", section: "vinos", name: "Don Nicanor Malbec", price: "$30.000" },
      { id: "lamadrid", section: "vinos", name: "Lamadrid Reserva", description: "Bonarda, Malbec, Cabernet Franc o Cabernet Sauvignon.", price: "$25.000" },
      { id: "salentein-tinto", section: "vinos", name: "Salentein Reserva", description: "Malbec, Cabernet, Merlot o Cabernet Franc.", price: "$26.000" },
      { id: "nieto-cabernet", section: "vinos", name: "Nieto Senetiner Cabernet Sauvignon", price: "$20.000" },
      { id: "nieto-malbec", section: "vinos", name: "Nieto Senetiner Malbec", price: "$20.000" },
      { id: "nieto-pinot", section: "vinos", name: "Nieto Senetiner Pinot Noir", price: "$20.000" },
      { id: "nicanor-sangiovese", section: "vinos", name: "Don Nicanor Sangiovese", price: "$20.000" },
      { id: "killka-corte", section: "vinos", name: "Killka Corte de Tintas", price: "$15.000" },
      { id: "ruca-uno", section: "vinos", name: "Ruca Malén Capítulo Uno Malbec", price: "$16.000" },
      { id: "portillo-malbec", section: "vinos", name: "Portillo Malbec", price: "$15.000" },
      { id: "cocktail-sangria", section: "vinos", heading: "Emilia Nieto Senetiner Cocktails", name: "Emilia Cocktail · Sangría", description: "Malbec y Bonarda infusionados con naranja y botánicos.", price: "$15.000" },
      { id: "cocktail-clarea", section: "vinos", name: "Emilia Cocktail · Clarea", description: "Semillón y Chenin infusionados con limón y flor de sauco.", price: "$15.000" },
      { id: "cocktail-rose", section: "vinos", name: "Emilia Cocktail · Rosé", description: "Syrah y Bonarda infusionados con pomelo e hibiscus.", price: "$15.000" },
      { id: "cocktail-spritz", section: "vinos", name: "Emilia Cocktail · Spritz", description: "Pinot Noir y Malbec infusionados con naranja y bitter.", price: "$15.000" },
      { id: "nicanor-chardonnay", section: "vinos", heading: "Blancos", name: "Don Nicanor Chardonnay", price: "$28.000" },
      { id: "lamadrid-chardonnay", section: "vinos", name: "Lamadrid Reserva Chardonnay", price: "$25.000" },
      { id: "nieto-chardonnay", section: "vinos", name: "Nieto Senetiner Chardonnay", price: "$21.000" },
      { id: "salentein-sauvignon", section: "vinos", name: "Salentein Reserva Sauvignon Blanc", price: "$26.000" },
      { id: "perdices-torrontes", section: "vinos", name: "Las Perdices Torrontés", price: "$22.000" },
      { id: "killka-chardonnay", section: "vinos", name: "Killka Chardonnay", price: "$15.000" },
      { id: "emilia-moscatel", section: "vinos", name: "Emilia Dulce Natural Moscatel", price: "$15.000" },
      { id: "emilia-rosado", section: "vinos", heading: "Rosados", name: "Emilia Rosado", price: "$15.000" },
      { id: "nieto-rosado", section: "vinos", name: "Nieto Senetiner Rosado", price: "$20.000" },
      { id: "copa-malbec", section: "vinos", heading: "Vino por copa", name: "Copa Las Perdices Partridge Malbec", price: "$6.000" },
      { id: "copa-chardonnay", section: "vinos", name: "Copa Las Perdices Reserva Chardonnay", price: "$6.000" },
      { id: "chandon", section: "vinos", heading: "Espumantes", name: "Chandon Reserva Pinot Cuvée", price: "$42.500" },
      { id: "bousquet-rose", section: "vinos", name: "Bousquet Rosé", price: "$24.500" },
      { id: "nieto-extra-brut", section: "vinos", name: "Nieto Senetiner Extra Brut", price: "$23.000" },
      { id: "nieto-brut-nature", section: "vinos", name: "Nieto Senetiner Brut Nature", price: "$23.000" },

      { id: "agua", section: "sin-alcohol", name: "Agua mineral con o sin gas", price: "$3.000" },
      { id: "agua-saborizada", section: "sin-alcohol", name: "Agua saborizada", price: "$3.900" },
      { id: "gaseosa-350", section: "sin-alcohol", name: "Gaseosa 350 cc", price: "$3.600" },
      { id: "gaseosa-500", section: "sin-alcohol", name: "Gaseosa 500 cc", price: "$3.900" },
      { id: "pomelada", section: "sin-alcohol", name: "Pomelada", description: "Pomelo, menta y azúcar o edulcorante.", price: "$9.500 jarra · $5.000 vaso" },
      { id: "limonada", section: "sin-alcohol", name: "Limonada", description: "Limón, jengibre, menta y azúcar o edulcorante.", price: "$9.500 jarra · $5.000 vaso" },

      { id: "cafe", section: "cafeteria", name: "Café", price: "$2.500" },
      { id: "cafe-crema", section: "cafeteria", name: "Café con crema", price: "$3.200" },
      { id: "cafe-leche", section: "cafeteria", name: "Café con leche", price: "$3.200" },
      { id: "cafe-doble", section: "cafeteria", name: "Café doble", price: "$3.500" },
      { id: "cafe-doble-crema", section: "cafeteria", name: "Café doble con crema", price: "$4.200" },
      { id: "te", section: "cafeteria", name: "Té", price: "$1.800" },
      { id: "te-saborizado", section: "cafeteria", name: "Té saborizado", price: "$1.800" },

      { id: "heineken-litro", section: "cervezas", name: "Heineken 1000 cc", price: "$9.000" },
      { id: "warsteiner", section: "cervezas", name: "Warsteiner 1000 cc", price: "$6.000" },
      { id: "imperial-litro", section: "cervezas", name: "Imperial IPA o Golden 1000 cc", price: "$8.000" },
      { id: "imperial-330", section: "cervezas", name: "Imperial Golden 330 cc", price: "$2.800" },
      { id: "heineken-330", section: "cervezas", name: "Heineken 330 cc", price: "$4.500" },
      { id: "miller-330", section: "cervezas", name: "Miller 330 cc", price: "$2.800" },
      { id: "sin-alcohol-330", section: "cervezas", name: "Long neck sin alcohol 330 cc", price: "$3.500" },
      { id: "imperial-stout", section: "cervezas", name: "Imperial Stout 473 cc", price: "$3.500" },
      { id: "imperial-roja", section: "cervezas", name: "Imperial Roja 473 cc", price: "$3.500" },

      { id: "gancia", section: "aperitivos", name: "Aperitivo Gancia", price: "Happy hour 2 × $3.500" },
      { id: "campari", section: "aperitivos", name: "Campari Orange", description: "Campari con jugo de naranja.", price: "$10.000 · HH 2 × $12.000" },
      { id: "negroni", section: "aperitivos", name: "Negroni", description: "Gin, rosso y Campari.", price: "$8.000 · HH 2 × $9.000" },
      { id: "cynar-julep", section: "aperitivos", name: "Cynar Julep", description: "Cynar, pomelo, limón, menta y almíbar.", price: "$10.000 · HH 2 × $12.000" },
      { id: "aperol", section: "aperitivos", name: "Aperol Spritz", description: "Aperol, espumante, soda y naranja.", price: "$10.000 · HH 2 × $12.000" },
      { id: "fernet", section: "aperitivos", name: "Fernet Branca medida", price: "$8.000 · HH 2 × $9.000" },
      { id: "mojito", section: "aperitivos", name: "Mojito", description: "Ron Havana añejo, limón, almíbar y menta.", price: "$10.000 · HH 2 × $12.000" },

      { id: "gin-tonic", section: "gin-vermu", name: "Gin Tonic", description: "Príncipe de los Apóstoles, Pulpo Blanco tónica y cítrico a elección.", price: "$9.000 · HH 2 × $12.500" },
      { id: "ap-ap-tonic", section: "gin-vermu", name: "AP AP Tonic", description: "Gin, tónica, Aperol, naranja y menta.", price: "$9.000 · HH 2 × $12.500" },
      { id: "cyn-tonic", section: "gin-vermu", name: "Cyn Tonic", description: "Gin, Cynar, tónica, pomelo y romero.", price: "$7.800 · HH 2 × $12.500" },
      { id: "giovannoni", section: "gin-vermu", name: "Giovannoni Rosso o Seco", description: "Tónica, soda y rodaja de cítricos.", price: "$5.000 · HH 2 × $7.500" },
      { id: "cinzano", section: "gin-vermu", name: "Cinzano Rosso o Bianco", price: "$5.000 · HH 2 × $7.500" },

      { id: "johnnie-negro", section: "whisky", name: "Johnnie Walker Black", price: "$9.000" },
      { id: "johnnie-rojo", section: "whisky", name: "Johnnie Walker Red", price: "$6.000" },
      { id: "jb", section: "whisky", name: "J&B", price: "$5.500" },
    ],
  },
  {
    id: "ninos",
    name: "Menú bambino",
    description: "Sabores simples y porciones pensadas para los más chicos.",
    shortDescription: "Para los más chicos.",
    accent: "ninos",
    items: [
      { id: "milanesa-bambino", name: "Milanesa bambino", description: "Con papas fritas o puré, huevo frito y ketchup.", price: "$25.000", image: "/images/menu/principal.png", ingredients: ["Ternera", "Papas o puré", "Huevo", "Ketchup"], pairing: "Ideal con agua o limonada." },
      { id: "tagliatelle-bambino", name: "Tagliatelle bambino", description: "Pasta casera con salsa roja, blanca, mixta o aceite de oliva.", price: "$16.000", image: "/images/menu/principal.png", ingredients: ["Tagliatelle casero", "Salsa a elección"], pairing: "Una opción simple para los más chicos.", tags: ["Vegetariano"] },
    ],
  },
  {
    id: "postres",
    name: "Postres",
    description: "El mejor cierre para una gran comida.",
    shortDescription: "Dulces de cierre.",
    accent: "postres",
    items: [
      { id: "volcan-dulce-leche", name: "Volcán de dulce de leche", description: "Con helado de crema Cremolatti. 15 minutos de cocción.", price: "$12.000" },
      { id: "volcan-chocolate", name: "Volcán de chocolate", description: "Con helado de crema Cremolatti. 15 minutos de cocción.", price: "$12.000" },
      { id: "tiramisu", name: "Tiramisú clásico", description: "Capas de vainilla mojadas en café y una lluvia de cacao amargo.", price: "$12.000" },
      { id: "affogato", name: "Affogato del Alma", description: "Helado de crema Cremolatti, galleta de almendra, café Segafredo y Amarula.", price: "$10.000" },
      { id: "merengata", name: "Merengata del Pueblo", description: "Pionono de vainilla, helado de crema Cremolatti, merengue italiano quemado y espejo de chocolate.", price: "$10.000" },
      { id: "creme-brulee", name: "Crème brûlée", description: "Crema suave de vainilla con una capa de azúcar caramelizada.", price: "$10.000", tags: ["Sin TACC"] },
      { id: "flan", name: "Flan casero", description: "Con crema, dulce de leche o mixto.", price: "$8.000", tags: ["Sin TACC"] },
      { id: "panqueques", name: "Panqueques con dulce de leche", description: "Panqueques tibios y suaves, helado de crema Cremolatti y una capa fina de azúcar caramelizada.", price: "$8.000" },
    ],
  },
];

export const getMenuCategoryById = (categoryId: string) => menuCategories.find((category) => category.id === categoryId) ?? null;
