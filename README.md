# Animal Crossing API

API REST para gestionar vecinos de Animal Crossing usando Node.js, Express y MySQL.

---

## Tecnologías

- Node.js
- Express.js
- MySQL
- CORS
- dotenv (variables de entorno)

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-s-minaya.git
```

2.  Instalar dependencias:

```bash
    npm install
```

3. Configurar variables de entorno:

Copiar el archivo .env_sample y renombrarlo a .env:

Editar .env con tus datos de conexión:

```js
PORT = 3000;
MYSQL_HOST = localhost;
MYSQL_PORT = 3306;
MYSQL_USER = root;
MYSQL_PASSWORD = tu_contraseña;
MYSQL_SCHEMA = animal_crossing;
```

4. Importa la base de datos:

- En MySQL, importar el archivo bd.sql que incluye esquema y datos de ejemplo

5. Arrancar el servidor:

```bash
npm run dev
```

El servidor estará corriendo en http://localhost:3000/

---

## Diagrama de relaciones (2 relaciones)

```
┌──────────┐
│ especies │
└────┬─────┘
     │ 1
     │ (FK: especies_id)
     │ n
┌───▼─────┐        ┌──────────────────┐        ┌────────┐
│ vecinos │◄──n────┤ islas_has_vecinos├────m──►│islas   │
└─────────┘        │(tabla puente)    │        └────────┘
                   └──────────────────┘



```

## Endpoints

- GET /api/vecinos

Listar todos los vecinos con su especie.

Respuesta:

```js

{
    "success": true,
    "vecinos": [
        {
            "vecino_id": 1,
            "vecino_nombre": "Raymond",
            "foto": "https://dodo.ac/np/images/2/2a/Raymond_NH.png",
            "personalidad": "Perezoso",
            "cumpleaños": "2020-03-07T23:00:00.000Z",
            "frase": "¡Por supuesto!",
            "estilo_casa": "Oficina",
            "especie_id": 1,
            "especie_nombre": "Gato",
            "especie_descripcion": "Felinos ágiles y misteriosos, conocidos por su independencia y elegancia"
        },
        {
            "vecino_id": 2,
            "vecino_nombre": "Marshal",
            "foto": "https://dodo.ac/np/images/d/da/Marshal_NH.png",
            "personalidad": "Esnob",
            "cumpleaños": "2020-09-28T22:00:00.000Z",
            "frase": "guaperas",
            "estilo_casa": "Elegante",
            "especie_id": 2,
            "especie_nombre": "Ardilla",
            "especie_descripcion": "Pequeños roedores energéticos que aman las nueces y trepar árboles"
        },
        {
            "vecino_id": 3,
            "vecino_nombre": "Zucker",
            "foto": "https://dodo.ac/np/images/7/7f/Zucker_NH.png",
            "personalidad": "Perezoso",
            "cumpleaños": "2020-03-07T23:00:00.000Z",
            "frase": "bloop",
            "estilo_casa": "Japonés",
            "especie_id": 3,
            "especie_nombre": "Pulpo",
            "especie_descripcion": "Cefalópodos inteligentes y misteriosos del océano"
        },
        {
            "vecino_id": 4,
            "vecino_nombre": "Fauna",
            "foto": "https://dodo.ac/np/images/9/91/Fauna_NH.png",
            "personalidad": "Normal",
            "cumpleaños": "2020-03-25T23:00:00.000Z",
            "frase": "corderito",
            "estilo_casa": "Natural",
            "especie_id": 4,
            "especie_nombre": "Ciervo",
            "especie_descripcion": "Elegantes mamíferos con astas majestuosas"
        },
        {
            "vecino_id": 5,
            "vecino_nombre": "Stitches",
            "foto": "https://dodo.ac/np/images/thumb/5/56/Stitches_NH.png/150px-Stitches_NH.png",
            "personalidad": "Perezoso",
            "cumpleaños": "2020-02-09T23:00:00.000Z",
            "frase": "retales",
            "estilo_casa": "Colorido",
            "especie_id": 5,
            "especie_nombre": "Oso",
            "especie_descripcion": "Grandes mamíferos adorables con corazones igual de grandes"
        }
    ]
}
```

- POST /api/vecinos

Crear un nuevo vecino.

```js

{
"nombre": "Kiki",
"foto": "URL_DE_LA_IMAGEN",
"personalidad": "Perezoso",
"cumpleaños": "2000-10-08",
"frase": "miau",
"estilo_casa": "Moderna",
"especies_id": 1
}
```

Respuesta de éxito:

```js
{
"success": true,
"id": x
}
```

Errores posibles:

```js
{
"success": false,
"error": "Se esperaba el campo nombre"
}
```

```js
{
"success": false,
"error": "Se esperaba el campo personalidad"
}
```

```js
{
"success": false,
"error": "Se esperaba el campo cumpleaños"
}
```

```js
{
"success": false,
"error":  "Se esperaba el campo especies_id (1-Gato, 2-Ardilla, 3-Pulpo, 4-Ciervo, 5-Oso)"
}

```

- PUT /api/vecinos/:id

Actualizar un vecino existente.

Respuesta de éxito:

```js
{
"success": true
}
```

Errores posibles (además de los anteriores):

```js
{
"success": false,
"error": "No se pudieron cambiar los datos"
}
```

- DELETE /api/vecinos/:id

Eliminar un vecino por id.

Respuesta de éxito:

```js
{
"success": true
}
```

Errores posibles:

```js
{
"success": false,
"error": "No se pudieron borrar los datos"
}
```

## Validaciones

- nombre, personalidad, cumpleaños y especies_id son obligatorios al crear o actualizar un vecino.
- Las especies registradas son: 1-Gato, 2-Ardilla, 3-Pulpo, 4-Ciervo, 5-Oso.

- especies_id debe coincidir con un id existente en la tabla especies.

## Cierre

**Creadora:** Sofía Minaya  
**Contexto:** Ejercicio realizado como evaluación final del Módulo 4 de Adalab.

Si tienes sugerencias o ideas de mejora, ¡soy toda oídos! Por ejemplo, futuras versiones podrían incluir:

- Implementar **autenticación con JWT** que incluya las funcionalidades de registro e inicio de sesión.

- Crear un pequeño frontend que utilice la API y permita consultar alguno de los endpoint.

- Subir el servidor de la API a **Render** para que esté disponible en internet.

- Instalar y configurar la **librería Swagger** para generar una página web con la documentación de los endpoints de la API

Cualquier comentario será bienvenido para mejorar y aprender. 🙂
