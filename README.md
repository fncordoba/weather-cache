# Weather-Cache API

Este proyecto es una aplicación para obtener información meteorológica con una funcionalidad de caché usando Redis y un cron para buscar información a intervalos regulares.

## Requerimientos:

**Objetivo:** Garantizar la disponibilidad de localizaciones clave para el servicio de meteorología utilizando un caché.

**Localidades en Caché:** 
- Santiago (CL)
- Zúrich (CH)
- Auckland (NZ)
- Sídney (AU)
- Londres (UK)
- Georgia (USA)

**Funcionalidades:**
1. **Timer:** Un cron que consulta las localidades mencionadas en la API meteorológica cada 5 minutos y almacena los resultados en Redis.
2. **API Rest:** Una interfaz para consultar cualquiera de las localidades mencionadas y devolver el valor almacenado en el caché de Redis.

**Consideraciones Importantes:**
- La llamada a la API meteorológica tiene una probabilidad del 20% de fallo. En caso de fallo, el sistema intentará reintentar la llamada.
- Si la llamada a la API meteorológica falla, se almacenará un registro en Redis con el error y el sello de tiempo.

## Instalación y Ejecución:

**Requisito previo:** Se recomienda tener un servidor Redis en ejecución en su puerto predeterminado. Para levantar un servidor Redis con Docker, puedes usar el siguiente comando:

```bash
docker run --name some-redis -d -p 6379:6379 redis
```

**Instalación de Dependencias:**
```bash
$ npm install
```

**Ejecución de la Aplicación:**

- **Modo Desarrollo:**
```bash
$ npm run start:dev
```

- **Modo Producción:**
```bash
$ npm run start:prod
```

**Pruebas:**

- **Tests Unitarios:**
```bash
$ npm run test
```

- **Tests End-to-End:**
```bash
$ npm run test:e2e
```

- **Cobertura de Tests:**
```bash
$ npm run test:cov
```

