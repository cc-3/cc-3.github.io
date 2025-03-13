# Lab 4 - RISC-V

## Objetivos

* Practicar condicionales y ciclos en RISC-V.
* Escribir funciones en RISC-V con el procedimiento correcto de llamadas a funciones.

## Lecturas

![PH](/img/PH.jpg)

* P&amp;H: 2.12

## Preparación

Para comenzar con el laboratorio primero tienen que tener todos los archivos base, estos se encuentran aquí:

```
https://classroom.github.com/a/yhN0LGT4
```

Recuerden que deben aceptar la asignación de **Github Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd> <kbd>+</kbd> <kbd>T</kbd> ):

```shell
git clone https://github.com/cc-3/lab04-2025-SU-USUARIO-DE-GITHUB
```

## Introducción a ensamblador RISC-V

Los siguientes ejercicios utilizan un ensamblador y simulador de RISC-V, desarrollado por el catedrático de la sección nocturna **Andrés Castellanos**. El simulador se llama **Jupiter** (la versión anterior se llamaba V-Sim, por si mira ese nombre en algún lado) y es un proyecto open source inspirado, inicialmente, en el legendario [_SPIM_](http://spimsimulator.sourceforge.net/) y, posteriormente, en [_MARS_](http://courses.missouristate.edu/KenVollmar/mars/) y [_VENUS_](http://www.kvakil.me/venus/) para la versión gráfica.

<p align="center">
  <img src="/img/labs/lab04/jupiter.png"  alt="Jupiter"/>
</p>

Para instalarlo en su computadora, siga estas instrucciones:

**Máquina virtual del curso**

¡Felicidades! No necesita instalar nada, puede ejecutar Jupiter usando el siguiente comando

```
jupiter
```

**Ubuntu 20 o 22**

Descargue [este archivo](https://github.com/andrescv/Jupiter/releases/download/v3.1/Jupiter-3.1-linux.zip), luego en su terminal vaya a la carpeta donde lo descargó y ejecute estos comandos

```
unzip Jupiter-3.1-linux.zip
sudo mv image /opt/jupiter
echo 'export PATH=/opt/jupiter/bin:$PATH' >> ~/.bashrc 
source ~/.bashrc
```

Después de esto, ya debería poder usar el comando `jupiter`. Si aun no funciona, la vieja y confiable, reinicie su máquina.

### Cosas básicas en Jupiter:

A continuación, les vamos a dar una pequeña guía de Jupiter, para más información visiten [la documentación completa](https://jupitersim.gitbook.io/jupiter/).

* Pueden crear archivos, editarlos y borrarlos desde la pestaña "Editor".
* Los programas empiezan en la etiqueta global `__start`, es decir que tienen que definir una etiqueta llamada `__start` y declararla como global.

```asm
.globl __start

.text
__start:
  li a0 10
  ecall       # exit
```

Sí, allí dice `.globl`, no `.global`.

* Las etiquetas terminan con dos puntos como ven en el ejemplo anterior.
* Los comentarios comienzan con el simbolo "#" o ";".
* Solo pueden poner una instrucción por línea.
* Cuando hayan terminado de escribir su código, guarden y presionen <kbd>F3</kbd> para ensamblar y poder ejecutar.
* Los programas siempre tienen que terminar con un `ecall` de exit y esto se logra poniendo un 10 en `a0` (exactamente como el ejemplo anterior). Esto le indica al programa que tiene que terminar. Las instrucciones `ecall` son análogas a los "System Calls" (llamadas al sistema) de otras arquitecturas y nos permiten hacer cosas como imprimir a consola o reservar memoria dinámica.

## Ejercicio 1: Negative

Comenzaremos con un ejercicio simple, averiguar si un número es negativo. El objetivo principal de este ejercicio es obligarlo a probar Jupiter y el autograder para asegurarnos que todo funcione bien con su máquina.

#### ¿Qué debe hacer?
En el archivo **ex1/negative.s** escriba una función que devuelve cero si su número es positivo, y devuelve uno si su número es negativo.

La demás información que necesita está dada por el convenio. Recuerde lo platicado en clase, ¿dónde llegan los argumentos? ¿dónde coloco mi resultado?

Al ejecutar, debería ver un resultado como este:

<p align="center">
  <img src="/img/labs/lab04/neg1.png" alt="Positivo"/>
</p>

<p align="center">
  <img src="/img/labs/lab04/neg2.png" alt="Negativo"/>
</p>

(Si lo piensa con atención, podría escribir una respuesta de ¡una sola línea!)

## Ejercicio 2: Factor

En nuestro siguiente ejercicio, haremos una función capaz de calcular los factores de un número dado. En esta parte practicaremos condicionales y ciclos, así como operaciones aritméticas.

#### ¿Qué debe hacer?
En el archivo **ex2/factor.s** escriba una función que realice estas dos tareas:

* Durante la ejecución de la función va imprimiendo cada factor encontrado, separado por espacios.
* Al finalizar la función devuelve la cantidad de factores encontrados. El main dado se encarga de imprimir el número que usted devuelve.

Revise estas capturas para entender el formato esperado. Considere que el primer factor es 1, y el último es el número dado.

<p align="center">
  <img src="/img/labs/lab04/fac1.png" alt="Factor"/>
</p>

<p align="center">
  <img src="/img/labs/lab04/fac2.png" alt="Factor"/>
</p>

## Ejercicio 3: Upper

En este ejercicio final, haremos una función que convierte las minúsculas a mayúsculas. Para lograrlo, además de condicionales y ciclos, debe entender las operaciones de memoria, y cómo hemos estado manejando arreglos en RISC-V.

#### ¿Qué debe hacer?
En el archivo **ex3/upper.s** escriba una función con las siguientes características:

* Recibe la dirección de un string.
* Al finalizar devuelve la dirección de este mismo string. Si tuvo que mover el puntero recibido, al finalizar debería regresarlo a su posición inicial.
* Su función debe ir visitando cada caracter, si encuentra una minúscula debe convertirla en mayúscula allí mismo en el string.
* Los espacios, números, signos de puntuación, etc. no le afectan.

Al ejecutarlo, el resultado debería verse de esta manera:

<p align="center">
  <img src="/img/labs/lab04/upper.png" alt="Uppercase"/>
</p>

Piense primero cómo realizaría esta tarea en C. Recuerde el ejemplo visto en clase, donde teníamos un arreglo y fuimos visitando cada casilla. Considere que esa vez teníamos int, y ahora tenemos char.

## Calificación

Para probar de forma individual un archivo, ábralo en Jupiter, presione **F3** y pruébelo en el simulador.

Cuando haya probado suficiente, puede usar el **check** para ejecutar el autograder y conocer su nota.

```
./check
```

Las series valen 10, 40 y 50 puntos respectivamente.

Cuando esté satisfecho con su nota haga add, commit y push. Luego suba el link de su repositorio al GES.
