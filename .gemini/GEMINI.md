# Guía de Desarrollo Docker-First

Hola Alex,

Para asegurar un entorno de desarrollo consistente y evitar conflictos de versiones de Node.js o dependencias, todos los comandos de `npm` se ejecutarán a través de Docker, como solicitaste.

El servicio definido en `docker-compose.yml` se llama `app`.

### Cómo ejecutar comandos

La sintaxis general para ejecutar cualquier comando del `package.json` (como `build`, `lint`, `test`, etc.) será:

```bash
docker compose run --rm app <comando>
```

**Ejemplos:**

-   **Instalar dependencias:**
    ```bash
    docker compose run --rm app npm install
    ```

-   **Construir el proyecto:**
    ```bash
    docker compose run --rm app npm run build
    ```

-   **Ejecutar tests:**
    ```bash
    docker compose run --rm app npm run test
    ```

-   **Auditoría de seguridad:**
    ```bash
    docker compose run --rm app npm audit
    ```

Seguiré esta guía para todas las operaciones que realicemos.
