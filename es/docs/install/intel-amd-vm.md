# Máquina virtual para Intel/AMD

!!! info "Windows + Intel/AMD"
    Las siguientes instrucciones aplican para usuarios de Windows con procesador Intel/AMD (la mayoría de laptops).

!!! info "macOS + Intel/AMD"
    Las siguientes instrucciones aplican para usuarios de macOS con procesador Intel/AMD (Macs antiguas).

## Preparación: VMware

Descargue e **instale** VMware Workstation Pro(Windows) o VMware Fusion (Mac OS). Puede realizar la descarga desde la [página de Broadcom](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion).

La página puede requerir que se registre y que acepte términos y condiciones antes de permitirle su descarga. Si al momento de registrarse le pide dirección, basta con colocar Guatemala.

!!! warning "Software de virtualización"
    Workstation o Fusion es el software utilizado para virtualización, no es la máquina virtual. Continue con la siguiente sección.

## Máquina virtual

Descargue y **descomprima** una de las siguientes opciones.

* Máquina virtual para CC3 2025-2026: basada en Ubuntu 22

    * Mirror 1: [Descargar maquina virtual Intel/AMD 2025-2026 desde Google Drive](https://drive.google.com/file/d/1_4CFuF1Z7kPzQbND5zvq8vEaOvTKbZl2/view?usp=sharing)
    * Mirror 2: [Descargar maquina virtual Intel/AMD 2025-2026 desde Mega](https://mega.nz/file/DNxFyYaR#2fJJX7IIeQxOzlXtBsvmDgv79xO8r3r-bhLakXTykyo)

    ```
    user: student 
    pass: student
    ```

* Máquina virtual para CC3 y Compiladores 2026-2027: basada en Ubuntu 24

    * Mirror 1: [Descargar maquina virtual Intel/AMD 2026-2027 desde Google Drive](LINK PENDIENTE)

    ```
    user: ug
    pass: student
    ```

Es importante que **descomprima** el ZIP que acaba de descargar. Si no lo hace, tendrá múltiples errores. Deje la carpeta descomprimida en su unidad de almacenamiento interna, si lo deja en una USB tendrá un mal desempeño.

Una vez descomprimido vaya a su software de virtualización y use la opción para agregar o importar una máquina virtual. Busque en la carpeta recién descomprimida un archivo con extensión VMX y seleccionelo. 

Si está en en VMware Fusion, es posible que este le pida una ubicación para guardar el bundle `.vmwarevm`.

!!! warning "Primer uso"
    La primera vez que inicie su máquina virtual, es posible que VMware le haga algunas preguntas:
    
    * Si le pregunta si movió o copió la máquina, haga click en **I copied it**
    
    * Si le pregunta por algún dispositivo no conectado, seleccione la opción de siempre ignorar. 

Esta máquina virtual trae todo lo necesario para el semestre.

## Mejorando el desempeño de la máquina virtual

Luego de abrir la máquina virtual en VMware, podemos ir a `VM > Settings...` y hacer los siguientes cambios.

* En `Memory` aumente la cantidad de RAM que la máquina virtual puede usar. Si tiene menos de 4 GB de RAM, déjela como está. Si tiene entre 4 GB y 8 GB de RAM, coloque la mitad de su RAM. Si tiene más de 8 GB de RAM, coloque 4 GB.

* Opcional, si su máquina virtual funciona lento: En `Processors` active la opción `Virtualize Intel VT-x or AMD-V`. Si aparece una ventana que indica que VT-x o AMD-V no están activados, debe ingresar a la BIOS de su máquina y activarlo desde allí. Este proceso cambia de una máquina a otra, entonces busque en Google algo como `Enable VT-x HP Victus Windows 11`. Coloque `VT-x` si su procesador es Intel, `AMD-V` si es AMD. Sustituya la marca de su computadora y el sistema operativo que usa.
