⚡ Wappify - WhatsApp Automation PlatformPlataforma web interactiva desarrollada para la contratación y administración de servicios de automatización de ventas, catálogos interactivos y logística autónoma por WhatsApp dirigida a pequeñas y medianas empresas (PyMEs).Este proyecto integrador fue conceptualizado, diseñado y desarrollado por Ericka Infante en el marco de formación técnica de Tecnolochicas.

📌 1. Descripción del ProyectoLas pequeñas y medianas empresas (como chocolaterías artesanales, reposterías, florerías y tiendas de retail) sufren una pérdida constante de ventas y una severa saturación operativa al gestionar manualmente sus pedidos por mensajería. Responder cotizaciones, enviar PDFs pesados, tomar direcciones a mano y registrar transferencias consume horas valiosas y genera errores en las entregas.Wappify nace como una solución integral "Done-for-you" (llave en mano):Catálogo interactivo en el chat: Los clientes exploran productos con fotos, descripciones y precios actualizados directamente en WhatsApp sin salir a enlaces externos lentos.Cotizador autónomo en tiempo real: Cálculo automático de precios por gramaje, piezas, sabores y variantes especiales.Cierre de ventas y cobro: Confirmación de pedidos y recepción de comprobantes de pago de forma desatendida.Gestión logística de envíos: Cálculo de tarifas de entrega y notificaciones automáticas del estado del pedido al comprador.

🚀 2. Enlaces del ProyectoSitio Web en Vivo (Despliegue Lovable): https://wappify.lovable.app 
Repositorio de Código: https://github.com/erickainfante/wappify

🛠️ 3. Herramientas y Tecnologías UtilizadasCategoríaHerramienta / TecnologíaPropósito y AplicaciónGeneración & AsistenciaLovable / LLM EngineAceleración del desarrollo de la SPA, scaffolding de componentes React y lógica de estado.Diseño UI/UX & PrototipadoFigma & html.to.designCreación de componentes, maquetación de pantallas, wireframes y tokens de diseño.Front-End CoreReact / JavaScript (ES6+)Construcción modular de la interfaz de usuario, reactividad y gestión del carrito.Estilos & ResponsiveTailwind CSSUtility-first CSS para maquetación ágil, soporte multi-pantalla y paleta personalizada.IconografíaLucide IconsSet de iconos limpios, escalables y optimizados para plataformas SaaS.Control de VersionesGit & GitHubControl de versiones, ramas por funcionalidad y despliegue continuo.
  
🎨 4. Sistema de Diseño (Paleta Oficial Dark Cyber)La interfaz de Wappify utiliza un enfoque de alto impacto visual y contraste optimizado para conversión comercial:Fondo Principal (Background): #130D26 (Violeta oscuro espacial)Superficie de Tarjetas (Card Surface): #1D1438 (con bordes en #33235E)Color Primario de Marca (Brand Primary): #8B5CF6 (Violeta vibrante para logotipos y títulos)Color de Contraste y Acción (CTA / Carrito): #06B6D4 (Cian eléctrico para botones principales de compra)Color de Acento y Éxito (WhatsApp / Badges): #22C55E (Verde esmeralda para confirmaciones y estados activos)Texto Principal: #F8FAFC (Blanco nítido de alta legibilidad)Tipografía Base: Inter / Plus Jakarta Sans

📑 5. Arquitectura de Navegación (6 Pantallas Principales + Carrito)Página Principal (Inicio): Presentación de la plataforma, Hero section con llamada a la acción y un mockup interactivo de smartphone mostrando una interacción real de compra en la Chocolatería Luna vía WhatsApp, complementado con la sección "¿Cómo funciona?" en 3 pasos.Servicios & Planes: Catálogo de soluciones con filtros dinámicos (Planes mensuales y Módulos adicionales) y botón directo para agregar al carrito.Carrito de Compras (Drawer lateral) & Checkout: Panel lateral deslizable con cálculo reactivo de subtotal, IVA (16%), total en MXN y modal de contratación con datos comerciales y pasarela simulada.Nosotros: Filosofía del proyecto ("Hacemos que la tecnología trabaje para las PyMEs"), misión, visión, valores y perfil profesional de Ericka Infante.Contacto: Formulario comercial para PyMEs con canales directos (WhatsApp y correo).Gestor CRUD: Panel de control administrativo para consultar, dar de alta, editar y eliminar paquetes de automatización en tiempo real.Login: Acceso seguro al dashboard para clientes suscritos a Wappify.

🤖 6. Prompts Utilizados en el DesarrolloPrompt 1: Generación y Arquitectura del Proyecto en LovableActúa como un Desarrollador Web Full Stack Senior y Diseñador UI/UX especializado en aplicaciones SaaS modernas con React, Tailwind CSS y Lucide Icons.

### Contexto
Estoy desarrollando la plataforma oficial de "Wappify" (una solución SaaS de automatización conversacional y logística para PyMEs). Permite a comercios locales (por ejemplo, una chocolatería artesanal) contratar servicios para que sus clientes puedan cotizar, consultar catálogos, realizar pedidos y coordinar entregas directamente desde WhatsApp de forma 100% autónoma.
Este desarrollo será presentado para el proyecto integrador de Tecnolochicas y Generation.

### Tarea
Construye una Single Page Application (SPA) responsiva, interactiva, moderna y visualmente atractiva con navegación fluida entre 6 vistas principales, carrito de compras funcional tipo drawer y modal de checkout:

1. Página Principal (Inicio):
   - Hero Section con propuesta de valor clara y llamadas a la acción ("Ver Servicios", "Contacto").
   - Mockup visual interactivo de un teléfono móvil simulando una conversación real de WhatsApp (ejemplo: cliente comprando en "Chocolatería Luna", recibiendo catálogo, confirmando pedido y entrega automática).
   - Sección "¿Cómo funciona?" explicada en 3 pasos con tarjetas interactivas.

2. Lista de Productos / Servicios & Planes:
   - Catálogo interactivo de planes y módulos (ej. Plan Starter, Módulo Pasarela de Pagos, Módulo Logística de Envíos).
   - Filtro por categoría y buscador.
   - Tarjetas con precios, lista de beneficios con checks y botón interactivo "Agregar al Carrito".

3. Carrito de Compras (Drawer lateral) & Checkout:
   - Icono de carrito en el Navbar con badge numérico reactivo.
   - Drawer deslizante lateral que muestra los ítems agregados, selector de cantidad, eliminación de ítems, cálculo automático de subtotal, IVA (16%) y total en MXN.
   - Botón para abrir modal de Checkout con formulario de contratación (datos del comercio y método de pago) y confirmación de éxito.

4. Acerca de Nosotros:
   - Título destacado: "Hacemos que la tecnología trabaje para las PyMEs".
   - Misión, Visión y Valores en tarjetas con diseño moderno.
   - Sección de Equipo: Debe listar ÚNICAMENTE a una persona: "Ericka Infante" (Rol: Lead Full Stack Developer & Project Lead), con foto o avatar estilizado, descripción profesional e iconos de redes (GitHub, LinkedIn).

5. Contáctenos:
   - Información de contacto directo (WhatsApp de soporte, correo, horarios) y formulario funcional para PyMEs interesadas en automatizar su negocio con validación visual de campos.

6. Gestor CRUD (Panel de Administración):
   - Tabla administrativa completa para gestionar los servicios/paquetes.
   - Debe permitir Ver lista, Crear nuevo servicio mediante modal/formulario, Editar registros existentes y Eliminar con confirmación visual.

7. Login / Autenticación:
   - Pantalla de acceso limpia y centrada para clientes y dueños de negocio con campos de email, contraseña, opciones de "Recordarme" y botón de inicio de sesión.

### Restricciones y Guías de Diseño
- Paleta de Colores Obligatoria (Dark Cyber Theme):
  * Fondo principal: #130D26
  * Superficie de tarjetas y contenedores: #1D1438 (con bordes sutiles en #33235E)
  * Color Primario (Identidad/Títulos): #8B5CF6
  * Color de Contraste (Botones principales, CTAs y Carrito): #06B6D4
  * Color de Acento (Estados de éxito, badges y WhatsApp): #22C55E
  * Texto principal: #F8FAFC
  * Texto secundario: #A5B4FC / #94A3B8
- Tipografía: Inter o Plus Jakarta Sans, con jerarquías claras, esquinas redondeadas modernas (rounded-xl / rounded-2xl) y micro-interacciones suaves al pasar el cursor (hover).
- Restricción estricta de Colaboradores: NO agregues nombres ficticios ni otros miembros en la sección de nosotros o equipo. La ÚNICA colaboradora debe ser Ericka Infante.
- Responsive Design: Debe ser 100% adaptable para pantallas móviles, tablets y desktop.
Prompt 2: Refinamiento del Carrito Reactivo y CálculosEn la aplicación Wappify, optimiza el componente del Drawer del Carrito de Compras:
1. Asegura que el estado persista entre vistas sin reiniciarse.
2. Calcula automáticamente el Subtotal sumando precio * cantidad de cada módulo.
3. Desglosa de forma visual el IVA (16%) y el Total en pesos mexicanos ($ MXN).
4. Agrega una microanimación al botón del carrito en el navbar cuando se añada un servicio nuevo.
5. Si el carrito está vacío, muestra un estado amigable con botón que redirija al catálogo de servicios.

👩‍💻 7.  Autora  Ericka Infante
      Programa: Tecnolochicas 2026
