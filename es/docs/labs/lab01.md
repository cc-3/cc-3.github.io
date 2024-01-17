# Lab 1 - Introducción a C

## Objetivos

* Aprender cómo compilar y ejecutar un programa en C.
* Examinar diferentes tipos de control de flujo en C.
* Ganar experiencia manipulando bits

## Preparación
Para obtener sus archivos base visite el siguiente link.

```
https://classroom.github.com/a/b7qUw-1b
```

Allí debe aceptar la asignación para que su repositorio sea creado. Al hacerlo, tendrá un repositorio con un link como este.

```
https://github.com/cc3-ug/lab01-2024-MI_USUARIO.git
```

Abra una terminal y navegue en ella hacia el lugar donde quiera colocar su laboratorio. Como es la primera vez que traeremos información del remote hacia nuestra computadora, usaremos el comando **clone**. Recuerde cambiar `MI_USUARIO` por su usuario.

```
git clone https://github.com/cc3-ug/lab01-2024-MI_USUARIO.git
```

Al ejecutar el comando Github le pedirá su "contraseña", sin embargo desde hace un par de años ya no acepta contraseñas sino tokens, genere el suyo siguiendo los pasos que se indican en esta página. **Puede usar el mismo token de la semana pasada (bueno... depende de la fecha de vencimiento que le haya colocado)**

```
https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
```

Tras haber realizado el **clone** exitosamente, tendrá en su máquina una carpeta con todos los archivos que usaremos en este lab.

## Recordatorio: compilar y ejecutar un programa de C

En este laboratorio, estaremos usando el programa `gcc` para compilar programas en c. La manera más sencilla de ejecutar `gcc` es la siguiente:
```shell
gcc program.c
```
Esto compila el archivo `program.c` y crea un archivo ejecutable llamado `a.out`. Si tienen experiencia en Java, pueden más o menos considerar a `gcc` como el equivalente en C de `javac`. Este archivo se puede ejecutar con el siguiente comando:
```shell
./a.out
```
El archivo ejecutable es `a.out`, así que, ¿qué rayos es eso de punto y diagonal? La respuesta: cuando quieren ejecutar un ejecutable, es necesario preponer una ruta de archivo para distinguirlo de un comando como `python` (no se utiliza `./python`). El punto se refiere al "directorio actual". De paso, dos puntos (..) se referirían al directorio que está un nivel arriba.

`gcc` tiene varias opciones (o argumentos) de línea de comandos, los cuales les recomendamos explorar. En este laboratorio, vamos a estar usando solamente -o,  que se usa para especificar el nombre del ejecutable que `gcc` genera. Usando -o, se utilizarían estos comandos para compilar `program.c` en un archivo llamado `program`, y ejecutarlo. Eso nos sirve si no queremos que todos nuestros archivos ejecutables se llamen `a.out`.

```shell
gcc -o program program.c
./program
```

## Ejercicio 1: Programa simple de C
En este ejercicio, veremos un ejemplo de definiciones macro del preprocesador. Las macros pueden ser un tema complicado, pero en general, la forma en que funcionan es que antes de que un archivo en C sea compilado, las constantes macro son reemplazadas exactamente por el valor al que se refieren.

En este ejercicio, estaremos usando macros exclusivamente como constantes globales. Aquí definimos `CONSTANT_NAME` como un `literal_value` (una literal entera). Noten que solo hay 1 espacio separando el nombre del valor.
```shell
#define CONSTANT_NAME LITERAL_VALUE
```
Ahora, vean el código en eccentric.c (en el repo). Note que al inicio hay cuatro macros, `v0` a `v3`. Cambie sus valores y vea como esto cambia el output del programa.

Su tarea: Modificando sólo estos cuatro valores, hagan que el programa produzca el siguiente mensaje:
```shell
gcc -o eccentric eccentric.c
./eccentric

Welcome to C:
====================
Hola Hola Hola 
Luis

El gato dice miau
```

Hay múltiples combinaciones de valores en las macros que consiguen este resultado. El reto para ustedes en este ejercicio es: Consideren el **mínimo** número de distintos valores que `v0` a `v3` puedan tener que den el resultado correcto. Como ejemplo, el máximo teórico es cuatro (cuando todos son diferentes uno de otro).

Cuando ya hayan logrado esto, pueden actualizar el archivo en su repositorio en Github, de esta manera:

```shell
git add eccentric.c
git commit -m "Ejercicio 1 terminado"
git push -u origin master
```

## Ejercicio 2: Operando bits

Para este inciso, su trabajo es completar los archivos **ex2/get_bit.c**, **ex2/set_bit.c** y **ex2/flip_bit.c** de manera que las funciones cumplan con la tarea que su nombre indica (obtener un bit, actualizar el valor de un bit, negar un bit). Para ello deberán utilizar las operaciones de bits básicas: and (&), or (\|), xor (^), not (~) y los corrimientos a la derecha (\>\>) y a la izquierda (<<). Lea la sección 2.9 de K&R si aún no ha llegado.

Para este ejercicio **no pueden utilizar condicionales ni ciclos**. Es decir, no escriba ningún if, else, do, while, for, switch o case. No intente engañarnos, revisaremos que no los use.

<p align="center">
  <img src="/img/labs/lab02/YouShallNotPassGIF.gif" alt="YOU SHALL NOT PASS" />
  <br/>
  <small>El autograder analiza su código de todas formas...</small>
</p>

**NOTA IMPORTANTE:** Considerar que _n_ es un valor que inicia en la posición cero. Su bit menos significativo (es decir hasta la derecha) es el bit 0, y su bit más significativo (es decir hasta la izquierda) sería su bit 31.

```c
// Return the nth bit of x.
// Assume 0 <= n <= 31
unsigned get_bit(unsigned x,
                 unsigned n);

// Set the nth bit of the value of x to v.
// Assume 0 <= n <= 31, and v is 0 or 1
void set_bit(unsigned * x,
             unsigned n,
             unsigned v);

// Flip the nth bit of the value of x.
// Assume 0 <= n <= 31
void flip_bit(unsigned * x,
              unsigned n);
```
**Idea para set_bit():**  La parte complicada es no que no sabemos el valor del bit antes de cambiarlo. Recuerde las propiedades que vió en Info 1:

```
x & 0 = 0
x & 1 = x
x | 0 = x
x | 1 = 1
```

¿Qué tal si usamos **dos** de estas propiedades para resolver el ejercicio?

**Idea para flip_bit():** ¿Habrá otra operación bitwise con propiedades similares al and y or que aún no haya usado? Quizás hay alguna que me haga la tarea...

Una vez terminen de editar las funciones, pueden compilar y correr el código con:
```shell
make bit_ops
./bit_ops
```

Ahora estamos usando un Makefile, el cuál tiene dentro comandos que nos facilitan la compilación. Al ejecutar `./bit_ops` se imprimirá el resultado de algunas pruebas. Si tienen curiosidad pueden revisar con libertad la carpeta **tests** que contiene las pruebas que se van a realizar en cada ejercicio de este laboratorio y que reflejan bastante lo que evaluará el autograder, por ejemplo el archivo que se utiliza para este ejercicio es **tests/bit_ops_test.c**.

Al terminar su ejercicio recuerde hacer add + commit + push hacia Github.

## Ejercicio 3: Registro de Corrimiento con Retroalimentación Lineal
En este ejercicio deben de implementar una función que compute la siguiente iteración de un registro de corrimiento de retroalimentación lineal (LFSR por sus siglas en inglés). 

Algunas aplicaciones que utilizan LFSRs son: televisión digital, teléfonos con acceso múltiple por división de código, Ethernet, USB 3.0 y mucho más. 

Esta función deberá generar números pseudo-aleatorios utilizando operadores binarios. Si quiere conocer un poco más, puede visitar el siguiente [link de Wikipedia](https://es.wikipedia.org/wiki/LFSR).

En el archivo **ex3/lfsr_calculate.c** deben de completar la función _lfsr_calculate()_ de manera que realice lo siguiente:

### Diagrama del hardware

<p align="center">
  <img src="/img/labs/lab02/LFSR-F16.gif" alt="LFSR" />
</p>

### Explicación del diagrama
* En cada llamada de `lfsr_calculate()` deben de correr el contenido del registro un bit hacia la derecha.
* Este corrimiento no es el lógico ni aritmético que ya conoce, sino que en el lado izquierdo deben de colocar un bit equivalente a un XOR de los bits que estaban, originalmente, en las posiciones 1, 3, 4 y 6.
* El objeto que parece un faro de automóvil curvado es un XOR, el cual recibe dos entradas (a, b) y devuelve en su salida a^b.
* A diferencia del ejercicio 1, las posiciones de los bits **inician con 1**.

Después que hayan implementado de manera correcta `lfsr_calculate()`, compilen y córranlo. Su respuesta debe ser similar a lo siguiente:

```shell
make lfsr
./lfsr

My number is: 1
My number is: 5185
My number is: 38801
My number is: 52819
My number is: 21116
My number is: 54726
My number is: 26552
My number is: 46916
My number is: 41728
My number is: 26004
My number is: 62850
My number is: 40625
My number is: 647
My number is: 12837
My number is: 7043
My number is: 26003
My number is: 35845
My number is: 61398
My number is: 42863
My number is: 57133
My number is: 59156
My number is: 13312
My number is: 16285
 ... etc etc ...
Got 65535 numbers before cycling!
Congratulations! It works!
```
Al finalizar, recuerde hacer add + commit + push.

## Entrega de laboratorio

Antes de entregar, podemos revisar cuántos puntos obtendremos usando el autograder que se nos provee.

Para comenzar, si está en su propio Linux instale lo siguiente. Si está en la máquina virtual del curso, no es necesario, esto ya venía instalado.
```
pip3 install --upgrade pip
pip3 install pycrypto boto3 paramiko tabulate psutil pycparser
```

Ahora ya podemos usar el autograder. Vaya a la carpeta de su laboratorio, y ejecute:
```
./check
```

Al hacerlo verá algo parecido a lo siguiente:
```
   ___       __                        __       
  / _ |__ __/ /____  ___  _______ ____/ /__ ____
 / __ / // / __/ _ \/ _ \/ __/ _ \/ _  / -_) __/
/_/ |_\_,_/\__/\___/\_, /_/  \_,_/\_,_/\__/_/
                   /___/

             Machine Structures
     Great Ideas in Computer Architecture
              Intro to C


Exercise        Grade  Message
------------  -------  --------------------------------------
1. eccentric       20  passed
2. bit_ops         40  passed
3. lfsr            40  passed
```

La nota que aparezca allí es la nota que obtendrá en su laboratorio. En este lab, las series valen 20, 40 y 40 respectivamente.

Cuando esté conforme con su nota (¡apúntele siempre al cien!), entregue su laboratorio a través de Github (los `add` `commit` y `push` que se le pidieron arriba).

Luego **envíe el link de su repositorio de Github en el GES**. El GES tiene una opción para enviar links, ÚSELA. No vaya a poner su link en un txt, pdf, etc. porque eso solo nos causa trabajo adicional.
