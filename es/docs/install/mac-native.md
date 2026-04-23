# Instalación nativa para Mac

!!! warning "No hay soporte completo para Mac"
    Ya contamos con máquina virtual tanto para Mac + Intel/AMD como Mac + ARM, esta es la opción recomendada.

    Lo único que podría instalar nativo es Jupiter.

## Instalación de Jupiter

Realice estos pasos desde Mac OS (es decir desde su sistema nativo, no desde la máquina virtual).

* Descargar [Jupiter para Mac](https://github.com/andrescv/jupiter/releases/download/v3.1/Jupiter-3.1-mac.zip)

* Descargar y descomprimir el archivo

* Entrar a la carpeta `image/bin`

* Desde esa carpeta ejecutar `./jupiter`

### Permisos

Antes de ejecutar por primera vez, debe dar permisos.

* Primero ejecute `sudo spctl --master-disable`

* Luego vaya a **System Settings > Privacy & Security**, en la sección de Security selecciones la opción **Anywhere**.

* Cuando los labs que usan Jupiter terminen (el de caches es el último), regrese las opciones de seguridad a lo normal.
