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


## **Estructura del proyeto **

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
