# CLONE GPTs: Conversación con el Modelo y Autocompletado de Formulario

Este proyecto permite conversar con un modelo de lenguaje (como Mistral AI) y, a partir de las respuestas, autocompletar un formulario dinámicamente. El flujo incluye interacción estilo chat y la opción de aceptar propuestas generadas por el modelo.

---

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (v18+)
- **pnpm** (gestor de paquetes)
  - Si no lo tienes, instálalo con:
    ```bash
    npm install -g pnpm
    ```

- Una **clave de API** válida del modelo que desees usar, como [Mistral AI](https://mistral.ai).

---

## **Instalación**

1. Clona el repositorio:

```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
```

2. Instala las dependencias con pnpm:

```bash
   pnpm install
```


## **Configuración del Archivo .env**

1. Ve a la carpeta backend y crea un archivo .env:

```bash
   cd backend
   touch .env
```


2. Instala las dependencias con pnpm:

```bash
   MISTRAL_API_KEY=tu_clave_api_aqui
   PORT=3000
```

- Reemplaza tu_clave_api_aqui con la clave de la API del modelo que estés utilizando.


## **Estructura del proyeto**

```plaintext
/gptsclone
  ├── backend
  │   ├── server.js       # Servidor Express
  │   ├── .env            # Variables de entorno
  │   ├── data.json       # Archivo de datos generado automáticamente
  │   └── package.json    # Dependencias del backend
  │
  ├── frontend
  │   ├── index.html      # Página principal
  │   ├── src
  │   │   ├── main.js     # Punto de entrada del frontend
  │   │   ├── prompt.js   # Lógica de interacción con el modelo
  │   │   ├── form.js     # Lógica del formulario
  │   │   └── style.css   # Estilos
  │   └── package.json    # Dependencias del frontend
  │
  ├── pnpm-workspace.yaml # Configuración de pnpm workspace
  └── readme.md           # Documentación
    
```
## **Ejecución del Proyecto**

1. Desde la raíz del proyecto, inicia el backend y el frontend al mismo tiempo con:

```bash
   pnpm run dev
```

2. Esto hará lo siguiente:

Iniciará el servidor backend en http://localhost:3000.
Iniciará el servidor frontend en http://localhost:5173.

3. Ejecutar solo el backend (opcional):

```bash
   pnpm --filter backend run dev
```

4. Ejecutar solo el frontend (opcional):

```bash
   pnpm --filter frontend run dev
```

## **Dependencias Principales**

### Backend
- `express` – Framework para crear el servidor.
- `dotenv` – Carga variables de entorno desde `.env`.
- `axios` – Realiza peticiones HTTP.
- `cors` – Permite peticiones entre dominios.

### Frontend
- **Vanilla JavaScript** – Lógica de interacción con el modelo y manejo del formulario.
- **CSS básico** – Estilos personalizados.

---

## **Contribuciones**

Si quieres contribuir a este proyecto, sigue estos pasos:

1. Realiza un **fork** del repositorio.
2. Crea una nueva rama para tu funcionalidad:
```bash
   git checkout -b feature/nueva-funcionalidad
```
3. Realiza tus cambios y haz un commit:
```bash
   git commit -m "Descripción de los cambios realizados"
```
4. Sube los cambios a tu fork:
```bash
   git push origin feature/nueva-funcionalidad
```
5. Crea un Pull Request desde tu fork al repositorio principal

## **Licencia**

Este proyecto está bajo la licencia **MIT**. Puedes consultar el archivo [LICENSE](LICENSE) para obtener más información.

---

## **Contacto**

Si tienes preguntas, sugerencias o algún problema con el proyecto, no dudes en contactarme:

- **Email**: [davidlealo@gmail.com](mailto:davidlealo@gmail.com)
- **GitHub**: [https://github.com/davidlealo](https://github.com/davidlealo)
- **LinkedIn**: [https://www.linkedin.com/in/davidlealo/](https://www.linkedin.com/in/davidlealo/)

---

¡Gracias por usar este proyecto! 😊  
Si encuentras algún problema, abre un **issue** o envía una Pull Request. ¡Tu ayuda es bienvenida!
