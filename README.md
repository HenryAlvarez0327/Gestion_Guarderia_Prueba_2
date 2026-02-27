# Sistema de Gestión de Guarderías
## Descripción
Sistema web desarrollado con **.NET Web API** y **Angular** que permite gestionar la información de niños, cuidadores y sus asignaciones dentro de una guardería.
La aplicación implementa operaciones CRUD completas, validaciones en frontend y backend, navegación mediante rutas y comunicación cliente-servidor mediante API REST.
## Objetivo
Diseñar e implementar una aplicación web que permita administrar registros de:
* Niños
* Cuidadores
* Asignaciones entre niños y cuidadores
Garantizando integridad de datos, validaciones y control de registros.
## Tecnologías utilizadas
### Backend
* .NET 8 Web API
* Entity Framework Core
* SQL Server
* Swagger (documentación de API)
### Frontend
* Angular (Standalone Components)
* TypeScript
* HTML + CSS
* HttpClient para consumo de API
## Arquitectura del sistema
El sistema sigue arquitectura **Cliente–Servidor**:
Angular (Frontend)
HTTP Requests
.NET Web API (Backend)
SQL Server (Base de Datos)
## Modelo de Base de Datos
### Tabla: Niños
* nino_id (int)
* nombre (string)
* apellido (string)
* fecha_nacimiento (date)
* alergias (string)
### Tabla: Cuidadores
* cuidador_id (int)
* nombre (string)
* especialidad (string)
* telefono (string)
* email (string)
### Tabla: Asignaciones
* asignacion_id (int)
* nino_id (int)
* cuidador_id (int)
* fecha_asignacion (date)
* estado (string)
## Funcionalidades principales
### CRUD Niños
* Crear registros
* Editar registros
* Eliminar registros
* Listar registros
* Búsqueda en tiempo real
* Validación de campos
### CRUD Cuidadores
* Registro de cuidadores
* Edición
* Eliminación
* Validación de teléfono y email
* Filtro dinámico
### CRUD Asignaciones
* Asignar niño a cuidador
* Editar asignación
* Eliminar asignación
* Control de duplicados activos
* Validación de fecha
* Resumen dinámico de selección
## Validaciones implementadas
### Frontend
* Nombre solo letras
* Teléfono solo números (10 dígitos)
* Email formato válido
* Campos obligatorios
* Fecha no futura
* Selección obligatoria en listas
### Backend
* Validación de claves foráneas
* Control de duplicados activos
* Restricción de eliminación con relaciones
* Manejo de errores HTTP
## Endpoints API
### Niños
GET /api/Ninos
GET /api/Ninos/{id}
POST /api/Ninos
PUT /api/Ninos/{id}
DELETE /api/Ninos/{id}
### Cuidadores
GET /api/Cuidadores
POST /api/Cuidadores
PUT /api/Cuidadores/{id}
DELETE /api/Cuidadores/{id}
### Asignaciones
GET /api/Asignaciones
POST /api/Asignaciones
PUT /api/Asignaciones/{id}
DELETE /api/Asignaciones/{id}
## Autor
Henry Alvarez
# Evidencia
<img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/139818c6-2817-458f-9656-62c76b6f9647" />
<img width="1918" height="951" alt="image" src="https://github.com/user-attachments/assets/3e0ad0de-5664-4722-add8-64090e727fcc" />
<img width="1896" height="593" alt="image" src="https://github.com/user-attachments/assets/8d9559de-3777-4b38-9e31-31ab67fbe076" />
<img width="1919" height="957" alt="image" src="https://github.com/user-attachments/assets/736fad8c-89ae-44ba-8ac9-6f4cab67e392" />
<img width="1905" height="958" alt="image" src="https://github.com/user-attachments/assets/5cfc2d89-a02d-4f95-9249-2d8ec1ef2c67" />
<img width="1917" height="971" alt="image" src="https://github.com/user-attachments/assets/85221f58-5f5a-4654-b982-4a3ec655bc03" />
<img width="1918" height="870" alt="image" src="https://github.com/user-attachments/assets/00fd53e4-45c5-415d-8e0f-b15ed6f43787" />
<img width="1904" height="607" alt="image" src="https://github.com/user-attachments/assets/86455781-d343-4dfd-95a5-689c18c274fd" />
<img width="1919" height="976" alt="image" src="https://github.com/user-attachments/assets/a5f2cac0-320f-4c53-9480-cc5e770739e8" />
<img width="1919" height="979" alt="image" src="https://github.com/user-attachments/assets/2ba9c9a0-f1bc-4a18-ad92-343c423dc667" />
<img width="1912" height="625" alt="image" src="https://github.com/user-attachments/assets/4c7e77bc-a89f-4e89-b5e5-2b74aceb9a10" />
<img width="1915" height="975" alt="image" src="https://github.com/user-attachments/assets/147091c7-68bf-4cdf-b89f-83a29b0dbce9" />
<img width="1889" height="576" alt="image" src="https://github.com/user-attachments/assets/c62a0594-2b37-4289-a035-3ae085d09d1f" />
<img width="1913" height="879" alt="image" src="https://github.com/user-attachments/assets/7f3d4332-7c62-4b27-975a-624f089fc256" />
<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/d82104e2-ed77-4cd3-a0e8-6c8cd9f6aa76" />
<img width="1914" height="973" alt="image" src="https://github.com/user-attachments/assets/5a08034d-c7cb-4382-a246-908a98299d50" />
<img width="1919" height="643" alt="image" src="https://github.com/user-attachments/assets/c093274f-18e3-4dd5-a216-a8c105b05001" />



