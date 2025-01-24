# Tutorial de Instalacion de material

El objetivo de este tutorial es dejar preparado el material que necesitaran para los laboratorios y proyectos.

## La mejor opcion: Máquina virtual

Desde 2024 [VMware es gratis](https://blogs.vmware.com/workstation/2024/05/vmware-workstation-pro-now-available-free-for-personal-use.html). Descargue la versión correspondiente (Workstation si está en Windows, Fusion si está en Mac OS) e instálela.

Luego de instalar VMware, descargue la siguiente máquina virtual. Descomprímala y abra el archivo .vmx (VMware virtual machine configuration).

Todos los links son para la misma maquina virtual. Si alguno falla, utilice otro.

[Descargar maquina virtual desde Google Drive](https://drive.google.com/file/d/1_4CFuF1Z7kPzQbND5zvq8vEaOvTKbZl2/view?usp=sharing)

[Descargar maquina virtual desde Mega](https://mega.nz/file/DNxFyYaR#2fJJX7IIeQxOzlXtBsvmDgv79xO8r3r-bhLakXTykyo)

```
Usuario: student 
Contrasena: student
```

La maquina virtual trae ya todo lo necesario para el semestre.

### Mejorando el desempeño de la máquina virtual

Luego de abrir la máquina virtual en VMware, podemos ir a `VM > Settings...` y hacer los siguientes cambios.

* En `Memory` aumente la cantidad de RAM que la máquina virtual puede usar. Si tiene menos de 4 GB de RAM, déjela como está. Si tiene entre 4 GB y 8 GB de RAM, coloque la mitad de su RAM. Si tiene más de 8 GB de RAM, coloque 4 GB.

* En `Processors` active la opción `Virtualize Intel VT-x or AMD-V`. Si aparece una ventana que indica que VT-x o AMD-V no están activados, debe ingresar a la BIOS de su máquina y activarlo desde allí. Este proceso cambia de una máquina a otra, entonces busque en Google algo como `Enable VT-x HP Victus Windows 11`. Coloque `VT-x` si su procesador es Intel, `AMD-V` si es AMD. Sustituya la marca de su computadora y la versión de Windows que utiliza.

## Otra opcion: Nativo

Para trabajar nativo necesitará Ubuntu 22 LTS en inglés. Si decide usar otra distribución de Linux, usted es responsable de instalar y configurar todo.

Si su Ubuntu no se encuentra en ingles, tendra problemas en el lab 2 (cgdb). Puede cambiar su idioma, o buscar la solucion al problema en Google.

Si todavia no tiene Ubuntu instalado aqui hay un [tutorial para dual boot](https://www.youtube.com/watch?v=h9cPABYSJSI). Ponga mucha atención, sea muy cuidadoso y sobre todo haga un backup de su información importante antes de comenzar.

Recuerde... Nuestra opción preferida es usar la máquina virtual.

Instalar git

	sudo apt update
	sudo apt install git

Instalar Java 11

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

Finalmente instalamos curl

	sudo apt update
	sudo apt install curl

Y terminamos instalando cgdb

	sudo apt update
	sudo apt install cgdb

Casi listo! Conforme avancemos por los labs, tendrá que instalar software adicional en caso que esté usando su Linux nativo.
