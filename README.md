# 🛍️ SportyStyle - Mini Tienda Web

Proyecto desarrollado para la asignatura "Taller de Plataformas Web".

🎯 Descripción

Se implementa una mini aplicación web de tienda virtual que permite:

- Visualizar productos
- Agregar productos al carrito
- Autenticación de usuarios con Auth0
- Mantener sesión con Session Storage
- Simular proceso de compra

---

## 🔐 Flujo de autenticación (Auth0)

La autenticación se realiza mediante Auth0 utilizando su SDK de cliente.

1. El usuario presiona "Iniciar sesión"
2. Es redirigido a Auth0
3. Ingresa sus credenciales
4. Auth0 redirige de vuelta a la aplicación
5. Se procesa el callback con `handleRedirectCallback()`
6. Se obtiene la información del usuario y se muestra en pantalla

---

## 🛒 Selección de productos

- Los productos se cargan dinámicamente con JavaScript
- Cada producto tiene:
  - Nombre
  - Descripción
  - Precio
  - Imagen
- Al hacer clic en "Agregar al carrito":
  - Se añade el producto al carrito
  - Si ya existe, se incrementa la cantidad

---

## Uso de Session Storage

Se utiliza `sessionStorage` para:

- Guardar los productos del carrito
- Mantener la información mientras la pestaña esté activa
- Persistir datos al recargar la página

Al cerrar sesión o finalizar compra: Se elimina la información almacenada

Tecnologías utilizadas:
HTML
CSS
JavaScript
Auth0 (autenticación)
Session Storage

📌 Autor
Diego Bustamante Silva