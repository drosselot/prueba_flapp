# Documentación prueba flapp

## Aplicación levantada en AWS EC2
- Web App: http://ec2-18-118-82-37.us-east-2.compute.amazonaws.com/
- Api: http://ec2-18-118-82-37.us-east-2.compute.amazonaws.com/api

## Tecnologías Utilizadas
### Backend
- **Node.js**
- **Express**

### Frontend
- **NextJS**
- **React**
- **Motion** para animaciones 

### Proyecto
- **Docker**


## Instalación y Configuración
### Requisitos Previos
- Tener **Docker Engine** instalado. Para sistema Linux es posible instalarlo directamente, para otros sistemas es necesario instalar **Docker Desktop**. (https://docs.docker.com/engine/install/)

### Configuración del Proyecto y deploy
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/drosselot/prueba_flapp.git
   cd prueba_flapp
   ```

2. Configurar variables de entorno:

   Crear un archivo `.env` en la raíz del proyecto con las variables:
   ```env
    APP_PORT = <PUERTO DONDE ESCUCHARÁ LA APP>
    API_PORT = <PUERTO DONDE ESCUCHARÁ LA API>

    API_TRAELO_YA_API_KEY=<API KEY DE TRAELO YA>
    API_UDER_API_KEY=<API KEY DE UDER>

    APP_NEXT_PUBLIC_API_URL=<URL DE CONEXIÓN A LA API> (para deploy en local es http://localhost:<API_PORT>/api)
   ```

3. Comenzar el daemon de docker. Si se cuenta con Docker Desktop, es necesario iniciar la aplicación de escritorio e iniciar sesión. En otro caso seguir la documentación: (https://docs.docker.com/engine/daemon/start/)

4. Levantar la aplicación con docker compose desde el root del proyecto (en caso de querer correr en background agregar --detach):
   ```sh
   docker compose up --build
   ```
   * Comentarios para Ubuntu: es necesario correr este comando con sudo.


## Supuestos
- La api dummyjson entrega los valores en USD y la api backend los recibe en CLP. Se transformaron los valores bajo un precio constante de 850 pesos el dolar.
- El precio que se envía a la api de cotización es el valor unitario sin el descuento asociado.