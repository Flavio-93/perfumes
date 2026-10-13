# 🚀 ISF Fragance Oud & Beauty - Portal Web de Lujo

Bienvenido al repositorio oficial de **ISF Fragance Oud & Beauty**, desarrollado con las mejores prácticas web y enfocado en conversión, rendimiento y estética de lujo.

## 🌟 Tecnologías Utilizadas
- **Next.js 14+ (App Router)**: Motor de la aplicación.
- **Tailwind CSS**: Estilos modulares e identidad gráfica premium.
- **Radix UI**: Componentes accesibles (Acordeón de FAQs).
- **React Hook Form**: Formularios con validación interactiva.
- **Lucide React**: Íconos consistentes y elegantes.

## 🛠️ Instalación y Desarrollo Local
Para levantar este proyecto en tu entorno local, asegúrate de tener Node.js instalado y sigue estos pasos:

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📝 Guía para No Programadores: Cómo Actualizar Textos y Datos
Toda la información del negocio, como textos, teléfono de WhatsApp, correos y preguntas frecuentes, **NO** está mezclada con el código de diseño. Para cambiar estos datos, solo debes editar **un único archivo**.

1. Navega a `src/data/businessContent.ts`.
2. Verás una estructura sencilla similar a esta:
   ```typescript
   export const businessData = {
     name: "ISF Fragance Oud & Beauty",
     whatsappNumber: "946417177", // <-- Cámbialo aquí si el número cambia
     // ...
   }
   ```
3. Modifica los textos entre las comillas `" "`. Guarda el archivo y los cambios se reflejarán automáticamente en toda la web.

## 🚀 Despliegue en Vercel (1 Clic)
Este proyecto está optimizado nativamente para ser alojado en **Vercel**, la plataforma oficial de Next.js.
1. Sube tu código a GitHub.
2. Inicia sesión en [Vercel](https://vercel.com).
3. Haz clic en "Add New Project" y selecciona tu repositorio.
4. Las configuraciones por defecto (`npm run build`) son perfectas. Solo haz clic en **Deploy**.
5. ¡En menos de 2 minutos tu web estará en vivo para todo el mundo!
