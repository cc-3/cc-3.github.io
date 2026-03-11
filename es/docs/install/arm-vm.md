# Máquina virtual para ARM

!!! info "Mac + ARM"
    Las siguientes instrucciones aplican para usuarios de Mac OS con procesador ARM (Apple Silicon) (Macs recientes).


## Preparación: VMware

Descargue e **instale** VMware Fusion (Mac OS). Puede realizar la descarga desde la [página de Broadcom](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion).

La página puede requerir que se registre y que acepte términos y condiciones antes de permitirle su descarga. Si al momento de registrarse le pide dirección, basta con colocar Guatemala.

!!! warning "Software de virtualización"
    Workstation o Fusion es el software utilizado para virtualización, no es la máquina virtual. Continue con la siguiente sección.

## Máquina virtual

Descargue y **descomprima** una de las siguientes opciones.

* Máquina virtual para CC3 2026-2027: basada en Ubuntu 24

    * Mirror 1: [Descargar maquina virtual ARM 2026-2027 desde Google Drive](https://drive.google.com/file/d/1algAHeU54aBPGKY9RbWO6fSMb2H0Ke0G/view?usp=drive_link)
    ```
    user: cc3
    pass: student
    ```

Es importante que **descomprima** el ZIP que acaba de descargar. Si no lo hace, tendrá múltiples errores. Deje la carpeta descomprimida en su unidad de almacenamiento interna, si lo deja en una USB tendrá un mal desempeño.

Una vez descomprimido vaya a su software de virtualización y use la opción para agregar o importar una máquina virtual. Busque en la carpeta recién descomprimida un archivo con extensión VMX y seleccionelo. 

Es posible que Fusion le pida una ubicación para guardar el bundle `.vmwarevm`.

!!! warning "Primer uso"
    La primera vez que inicie su máquina virtual, es posible que VMware le haga algunas preguntas:
    
    * Si le pregunta si movió o copió la máquina, haga click en **I copied it**
    
    * Si le pregunta por algún dispositivo no conectado, seleccione la opción de siempre ignorar. 

Esta máquina virtual incluye:

* `gcc` y `cgdb`, para trabajar laboratorios de C.
* `jupiter` en versión JAR para trabajar los laboratorios de RISC-V. Estos laboratorios no son compatibles con el autograder local (consulte la siguiente sección).
* `logisim` en versión JAR para trabajar los laboratorios de electrónica digital.
* `conda` para ejecutar sus autograders.

## Autograder para RISC-V

Existe un problema de compatibilidad entre Jupiter, ARM y el autograder. Para conocer su nota siga estos pasos:

* No podrá realizar `./check`, deberá probar manualmente sus ejercicios de RISC-V ingresando valores en Jupiter.
* Cuando suba su ejercicio al repositorio, Github Actions ejecutará el autograder y mostrará su nota.

## Usando Jupiter

Como usuario de Mac + ARM, tiene algunas opciones para trabajar sus labs de RISC-V:

* Opción preferida: Usar el `jupiter.jar` que viene incluido en su directorio raiz, solo debe hacerle doble click.

* Opción adicional: Descargar [Jupiter para Mac](https://github.com/andrescv/jupiter/releases/download/v3.1/Jupiter-3.1-mac.zip) desde su Mac OS (es decir, afuera de su máquina virtual)

    * Descargar y descomprimir el archivo

    * Entrar a la carpeta `image/bin`

    * Desde esa carpeta ejecutar `./jupiter`

## Autograder para C y electrónica digital

Debe ejecutar el comando `grading` antes del `./check` que normalmente hacemos.

* Notará que el `(base)` que salía en la terminal cambió y ahora dice `(grading)`

* Después de eso, ya puede ejecutar su comando `./check` con normalidad

## Mejorando el desempeño de la máquina virtual

Luego de abrir la máquina virtual en VMware, podemos ir a `VM > Settings...` y hacer los siguientes cambios.

* En `Memory` aumente la cantidad de RAM que la máquina virtual puede usar. Si tiene menos de 4 GB de RAM, déjela como está. Si tiene entre 4 GB y 8 GB de RAM, coloque la mitad de su RAM. Si tiene más de 8 GB de RAM, coloque 4 GB.