# 🛒 MERN E-commerce

Aplicación web de comercio electrónico desarrollada con el stack **MERN (MongoDB, Express, React y Node.js)**. El proyecto permite a los usuarios registrarse, iniciar sesión, explorar productos, administrar un carrito de compras y realizar pagos mediante **Mercado Pago**.

## ✨ Características

- Registro e inicio de sesión con autenticación JWT.
- Autenticación mediante Cookies HttpOnly.
- Gestión de productos.
- Carrito de compras persistente.
- Sincronización del carrito entre usuarios invitados y autenticados.
- Checkout con formulario de envío.
- Integración con Mercado Pago Checkout Pro.
- Panel de administración.
- Protección de rutas privadas.
- Validación de datos con Zod.
- Rate Limiter para protección contra abuso de peticiones.

---

# 📦 Tecnologías

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Cookie Parser
- CORS
- Zod
- Mercado Pago SDK
- Express Rate Limit

## Frontend

- React
- Vite
- React Router
- React Hook Form
- Axios
- Tailwind CSS
- DaisyUI
- React Hot Toast
- React Icons

---

# 📁 Estructura del proyecto

```
mern-ecommerce/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── layouts/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    │
    └── package.json
```

---

# ⚙️ Instalación

## Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

```
cd mern-ecommerce
```

---

# Backend

Entrar a la carpeta

```bash
cd backend
```

Instalar dependencias

```bash
npm install
```

Crear un archivo

```
.env
```

Ejemplo:

```env
PORT=3001

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=http://localhost:5173

MP_ACCESS_TOKEN=
```

Ejecutar

```bash
npm run dev
```

---

# Frontend

Entrar a la carpeta

```bash
cd frontend
```

Instalar dependencias

```bash
npm install
```

Crear un archivo

```
.env
```

Ejemplo:

```env
VITE_BACKEND_URL=http://localhost:3001/api
```

Ejecutar

```bash
npm run dev
```

---

# Scripts

## Backend

```bash
npm run dev
```

Inicia el servidor con Nodemon.

```bash
npm start
```

Inicia el servidor en producción.

---

## Frontend

```bash
npm run dev
```

Inicia Vite.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run preview
```

Previsualiza la versión compilada.

---

# Flujo de compra

1. Registro o inicio de sesión.
2. Explorar productos.
3. Agregar productos al carrito.
4. Completar la información de envío.
5. Crear la orden.
6. Redirección a Mercado Pago.
7. Confirmación del pago.
8. Limpieza del carrito.

---

# Variables de entorno

## Backend

| Variable | Descripción |
|----------|-------------|
| PORT | Puerto del servidor |
| MONGODB_URI | Conexión a MongoDB |
| JWT_SECRET | Clave para JWT |
| CLIENT_URL | URL del frontend |
| MP_ACCESS_TOKEN | Token de Mercado Pago |

---

## Frontend

| Variable | Descripción |
|----------|-------------|
| VITE_BACKEND_URL | URL del backend |

---

# Despliegue

## Frontend

- Vercel

## Backend

- Render

## Base de datos

- MongoDB Atlas

---

# Autor

Victor Manuel Jordan Solis

Proyecto desarrollado con React, Node.js, Express y MongoDB como práctica de desarrollo Full Stack.
