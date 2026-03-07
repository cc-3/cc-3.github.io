# Instalación nativa para Linux

!!! info "Linux + Intel/AMD"
    Las siguientes instrucciones aplican para usuarios de Linux con procesador Intel/AMD (la mayoría de laptops).

!!! warning "Ubuntu 24"
    Las siguientes instrucciones están pensadas para usarse en Ubuntu 24 o distro compatible (se requiere `apt` como manejador de paquetes).

    Si usted usa otra distro, no hay soporte oficial.

## Instalación

Si su Ubuntu no se encuentra en ingles, tendra problemas en el lab 2 (cgdb). Puede cambiar su idioma, o buscar la solucion al problema en Google.

La siguiente instalación es larga y requiere toda su atención. Si le es posible usar máquina virtual en lugar de nativo, hágalo.

Lea bien las indicaciones de cada sección. Si tiene un error al instalar, deténgase y pregunte de inmediato.

#### Dependencias base

Instale:

```
sudo apt update

sudo apt upgrade -y

sudo apt install -y git default-jdk curl cgdb python3-pip wget gpg make unzip gcc
```

Después de instalar esto, verifique su versión de Java usando:

```
java -version

javac -version
```

Si aparece una versión distinta a la 21, ejecute también:

```
sudo update-alternatives --set java /usr/lib/jvm/java-21-openjdk-amd64/bin/java

sudo update-alternatives --set javac /usr/lib/jvm/java-21-openjdk-amd64/bin/javac
```

#### Jupiter

Si su procesador es ARM, deténgase y consulte a su catedrático. Si su procesador es Intel/AMD, realice esta instalación:
```
wget https://github.com/andrescv/Jupiter/releases/download/v3.1/Jupiter-3.1-linux.zip

unzip Jupiter-3.1-linux.zip

sudo mv image /opt/jupiter

echo 'export PATH="$PATH:/opt/jupiter/bin"' >> ~/.bashrc
```

#### Conda y librerías de Python

Para que el autograder funcione necesitamos Python 3.7, esta versión es muy vieja para Ubuntu 24 entonces trabajaremos con conda:

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh

bash ~/miniconda.sh -b -p $HOME/miniconda

export PATH="$HOME/miniconda/bin:$PATH"

echo 'export PATH="$HOME/miniconda/bin:$PATH"' >> ~/.bashrc

source $HOME/miniconda/etc/profile.d/conda.sh

conda init bash
```

Antes de continuar, debemos aceptar los términos y condiciones de conda, use los siguientes comandos:

```
conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main

conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
```

Ahora ya puede, utilizando conda, instalar una versión anterior de Python y las librerías necesarias:

```
conda create -n grading python=3.7 -y

conda run -n grading pip install tabulate psutil pycparser

conda clean --all -y

echo "alias grading='conda activate grading'" >> ~/.bashrc

source ~/.bashrc
```

## Autograder

Debe ejecutar el comando `grading` antes del `./check` que normalmente hacemos.

* Notará que el `(base)` que salía en la terminal cambió y ahora dice `(grading)`

* Después de eso, ya puede ejecutar su comando `./check` con normalidad