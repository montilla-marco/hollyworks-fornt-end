# ☕️ Días laborales en un año (Solucion Desafio)

## Instalacion en ambiente local

Instalacion de dependencias

```sh
$ npm i
```

## Scripts

#### Ejecutando la aplicacion con webpack-dev-server en [http://localhost:3000/](http://localhost:3000/)

```sh
$ npm run start
```
## Usando Docker

### Requerimientos
⋅⋅ Docker
⋅⋅ Colima (mac OS)

**Nota**: Si ya tiene Docker instalado por favor saltar la seccion de instalacion

### Instalando docker-cli con Homebrew

```
brew install docker
```
### Instalando Colima con Homebrew
La forma mas rapida de instalar colima es a traves de Homebrew.

```
brew install colima
```
```
colima start
docker ps
```
### Resolucion en caso de fallas a la hora de hacer la construccion de la imagen
Si al ejecutar el comando
```
docker ps
```
da como resultado:
__**Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?**__

#### Resolucion

```
limactl delete --force colima
```
#### Crear una maquina con el siguiente commando:
```
limactl start --name=hollyworks --set='.cpus = 2 | .memory = "2GiB"' template://docker

```

Seleccionar -> Proceed with the current configuration al final aparecera un mensaje como en siguiente:

To run `docker` on the host (assumes docker-cli is installed), run the following commands:
```
docker context create lima-hollyworks --docker "host=unix:///Users/{user}/.lima/hollyworks/sock/docker.sock"
docker context use lima-hollyworks
docker ps
```
Ejecutar esa lista de comando y luego

```
limactl list
```

NAME          STATUS     SSH                VMTYPE    ARCH      CPUS    MEMORY    DISK      DIR
hollyworks    Running    127.0.0.1:57518    qemu      x86_64    2       2GiB      100GiB    ~/.lima/hollyworks

## Contruyendo y ejecutando la imagen

```
chmod +rwx build-run-app 
./build-run-app
```

## Liberando recursos 

```
docker rm $(docker stop $(docker ps -a -q --filter ancestor=hollyworks-fe/dev:1.1.12  --format="{{.ID}}"))
docker rmi hollyworks-fe/dev:1.1.12 

