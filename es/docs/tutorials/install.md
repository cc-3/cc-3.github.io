# Tutorial de Instalacion de material

El objetivo de este tutorial es dejar preparado el material que necesitaran para los laboratorios y proyectos.

## La mejor opcion: Máquina virtual

Puede utilizar [VMware Player](https://www.vmware.com/products/workstation-player.html) (gratuito, sin necesidad de licencia) para abrir y utilizar maquinas virtuales ya hechas. Adicionalmente, en los próximos días se les enviará licencia para VMware Workstation con el cual también pueden crear sus propias máquinas virtuales.

Luego de instalar VMware Player, descargue la siguiente máquina virtual. Descomprímala y abra el archivo .vmx (VMware virtual machine configuration).

Todos los links son para la misma maquina virtual. Si alguno falla, utilice otro.

[Descargar maquina virtual desde Google Drive](https://drive.google.com/file/d/1FdxtXya0jA5iSUpeSvBXxc4Vzmz1JyUm/view?usp=sharing)

```
Usuario: student 
Contrasena: student
```

La maquina virtual trae ya todo lo necesario para el semestre.

### Mejorando el desempeño de la máquina virtual

Luego de abrir la máquina virtual en VMware, podemos ir a `VM > Settings...` y hacer los siguientes cambios.

* En `Memory` aumente la cantidad de RAM que la máquina virtual puede usar. Si tiene menos de 4 GB de RAM, déjela como está. Si tiene entre 4 GB y 8 GB de RAM, coloque la mitad de su RAM. Si tiene más de 8 GB de RAM, coloque 4 GB.

* En `Processors` active la opción `Virtualize Intel VT-x or AMD-V`. Si aparece una ventana que indica que VT-x o AMD-V no están activados, debe ingresar a la BIOS de su máquina y activarlo desde allí. Este proceso cambia de una máquina a otra, entonces busque en Google algo como `Enable VT-x Asus Windows 10`. Coloque `VT-x` si su procesador es Intel, `AMD-V` si es AMD. Sustituya la marca de su computadora y la versión de Windows que utiliza.

## Otra opcion: Nativo

Para trabajar nativo necesitará Ubuntu 18 o 20 en inglés, se recomienda fuertemente Ubuntu 18.

Si su Ubuntu no se encuentra en ingles, tendra problemas en el lab 2 (cgdb). Puede cambiar su idioma, o buscar la solucion al problema en Google.

Si todavia no tiene Ubuntu instalado aqui hay un [tutorial para dual boot](https://www.youtube.com/watch?v=h9cPABYSJSI). Ponga mucha atención, sea muy cuidadoso y sobre todo haga un backup de su información importante antes de comenzar.

Wow... parece que son bastantes instrucciones, seria más facil usar la máquina virtual!

Instalar git

	sudo apt update
	sudo apt install git

Instalar Java

	sudo apt update
	sudo apt install default-jdk

Instalar Python 3

	sudo apt update
	sudo apt install software-properties-common
	sudo add-apt-repository ppa:deadsnakes/ppa
	sudo apt update
	sudo apt install python3.7

Instalar pip

	sudo apt update
	sudo apt install python3-pip

Las versiones recientes de Python suelen incluir todo lo que necesitamos (en la maquina virtual ya revisamos y esta todo lo que necesita! en serio, use la maquina virtual!), verifiquemoslo abriendo la terminal de Python con el comando `python3`, luego en la terminal escribiremos los siguientes comandos

	import os
	import sys
	import requests
	import zipfile

Si ninguno nos dio problema, Python esta listo; si alguno fallo, lo instalaremos con pip

	pip3 install nombreDelPaqueteQueDioError

Finalmente instalamos curl

	sudo apt update
	sudo apt install curl

Y terminamos instalando cgdb

	sudo apt update
	sudo apt install cgdb

Casi listo! Cuando lleguemos al lab 3 y al lab 5 allí le aparecerán las instrucciones para instalar el software faltante.

