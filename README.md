# Don Vicente - Proyecto Web

¡Hola! Este es el código fuente del sitio web para el negocio "Don Vicente". 

Como estudias informática (redes y telecomunicaciones), seguro te manejas sin problemas con la terminal y conceptos de red. Sin embargo, como me comentan que es tu primera vez trabajando con React, aquí tienes una guía rápida y directa para que puedas levantar y entender este proyecto en tu computadora.

El proyecto está construido con **React**, usando **Vite** (un servidor de desarrollo súper rápido que sirve la aplicación localmente). Además, utiliza **TypeScript** (JavaScript con tipos) y **Tailwind CSS** para los estilos.

## 🛠️ Requisitos Previos

Antes de empezar, necesitas tener instalado **Node.js** en tu computadora. Node.js incluye `npm`, que es el gestor de paquetes de red que usaremos para descargar todas las librerías que requiere el proyecto.

1. Descárgalo e instálalo desde [nodejs.org](https://nodejs.org/) (te recomiendo descargar la versión **LTS**).
2. Para comprobar que se instaló correctamente, abre tu terminal y ejecuta:
   ```bash
   node -v
   npm -v
   ```

## 🚀 Cómo instalar y correr el proyecto

### 1. Instalar las dependencias
Abre una terminal, navega hasta estar dentro de la carpeta raíz de este proyecto (`don-vicente-pulento`) y ejecuta el siguiente comando. Esto leerá el archivo `package.json` y comenzará a descargar todas las librerías necesarias (las guardará en una carpeta llamada `node_modules`).

```bash
npm install
```

### 2. Levantar el servidor de desarrollo
Una vez finalizada la instalación de las dependencias, puedes arrancar el servidor local para ver la página web funcionando en tu propia máquina. Ejecuta:

```bash
npm run dev
```

**¡Listo!** En la misma terminal verás un mensaje indicando que el servidor está escuchando, generalmente en un puerto local como `http://localhost:5173`. 
- Haz `Ctrl + clic` en ese enlace (o cópialo y pégalo en tu navegador web).
- **Dato clave:** El servidor de Vite soporta "Hot Module Replacement" (HMR). Esto significa que si luego te animas a editar algún archivo del código fuente (dentro de la carpeta `src`) y guardas los cambios, la página web en tu navegador se actualizará instantáneamente sin necesidad de recargar la pestaña.

## 📦 Construir para Producción (Opcional)

Si en algún momento necesitan preparar la página para subirla a internet (a un servidor real), el código fuente no se sube tal cual. Se debe "compilar" para generar archivos estáticos puros y optimizados.

Para generar la versión de producción, ejecuta:
```bash
npm run build
```
Este proceso creará una nueva carpeta llamada `dist`. Los archivos dentro de `dist` (HTML, CSS, JS estáticos) son los que finalmente servirías utilizando un servidor web tradicional (como Nginx, Apache) o algún servicio de hosting moderno.

Si quieres visualizar y probar localmente cómo quedó esa versión final (la optimizada para producción), puedes ejecutar:
```bash
npm run preview
```

---
*Nota: Todo el código fuente principal de la página, los componentes y la lógica se encuentran dentro de la carpeta `src`.* ¡Mucho éxito levantando el proyecto para el negocio!
