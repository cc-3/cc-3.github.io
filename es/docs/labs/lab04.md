# Lab 4 - RISC-V

## Objetivos

* Traducir código de C a RISC-V.
* Escribir funciones en RISC-V con el procedimiento correcto de llamadas a funciones.
* Aprender a depurar nuestros programas en Jupiter.

## Lecturas

![PH](/img/PH.jpg)

* P&amp;H: 2.12

## Preparación

Para comenzar con el laboratorio primero tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/Fq4GlZkV). Recuerden que deben aceptar la asignación de **Github Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd> <kbd>+</kbd> <kbd>T</kbd> ):

```shell
git clone https://github.com/cc-3/lab04-2024-SU-USUARIO-DE-GITHUB
```

## Introducción a ensamblador RISC-V

Los siguientes ejercicios utilizan un ensamblador y simulador de RISC-V, desarrollado por el catedrático de la sección nocturna **Andrés Castellanos**. El simulador se llama **Jupiter** (la versión anterior se llamaba V-Sim, por si mira ese nombre en algún lado) y es un proyecto open source inspirado, inicialmente, en el lengendario [_SPIM_](http://spimsimulator.sourceforge.net/) y, posteriormente, en [_MARS_](http://courses.missouristate.edu/KenVollmar/mars/) y [_VENUS_](http://www.kvakil.me/venus/) para la versión gráfica.

<p align="center">
  <img src="/img/labs/lab03/jupiter.png"  alt="Jupiter"/>
</p>

Para instalarlo en su computadora, siga estas instrucciones:

**Máquina virtual del curso**

Felicidades! No necesita instalar nada, puede ejecutar Jupiter usando el siguiente comando

```
jupiter
```

**Ubuntu 20**

Descargue [este archivo](https://github.com/andrescv/Jupiter/releases/download/v3.1/Jupiter-3.1-linux.zip), luego en su terminal vaya a la carpeta donde lo descargó y ejecute estos comandos

```
unzip Jupiter-3.1-linux.zip
sudo mv image /opt/jupiter
echo 'export PATH=/opt/jupiter/bin:$PATH' >> ~/.bashrc 
source ~/.bashrc
```

Después de esto, ya debería poder usar `jupiter`. Si aun no funciona, la vieja y confiable, reinicie su máquina.

### Cosas básicas en Jupiter:

A continuación, les vamos a dar una pequeña guía de Jupiter, para más información visiten [la documentación completa](https://jupitersim.gitbook.io/jupiter/).

* Pueden crear archivos, editarlos y borrarlos desde la pestaña "Editor".
* Los programas empiezan en la etiqueta global `__start`, es decir que tienen que definir una etiqueta llamada `__start` y declararla como global.

```asm
.globl __start
__start:
  li a0 10
  ecall       # exit
```

Sí, allí dice `.globl`, no `.global`.

* Las etiquetas terminan con dos puntos como ven en el ejemplo anterior.
* Los comentarios comienzan con el simbolo "#" o ";".
* Solo pueden poner una instrucción por línea.
* Cuando hayan terminado de escribir su código, guarden y presionen <kbd>F3</kbd> para ensamblar y poder ejecutar.
* Los programas siempre tienen que terminar con un `ecall` de exit y esto se logra poniendo un 10 en `a0` (exactamente como el ejemplo anterior). Esto le indica al programa que tiene que terminar. Las instrucciones `ecall` son análogas a los "System Calls" (llamadas al sistema) y nos permiten hacer cosas como imprimir a consola o reservar memoria dinámica.

## Ejercicio 1: Familiarizándote con Jupiter

Para este ejercicio ustedes van a familiarizarse con **Jupiter** corriendo un programa sencillo de RISC-V y, luego, contestarán unas preguntas.

1. Abran la interfaz gráfica de Jupiter, escribiendo `jupiter` en su terminal. 
2. Desde el editor abran el archivo llamado **ex1.s** que esta en la carpeta **ex1**.
3. En la barra de herramientas de Jupiter, vayan a settings y asegúrense de que **Assemble Only Selected File** esté seleccionado con un cheque verde.
4. Guarden su programa, luego presionen <kbd>F3</kbd>. Esto va a preparar el código para que pueda ser ejecutado y simulado. Si hacen click a la pestaña "Editor", su simulación se va a reiniciar.
5. En el simulador, para ejecutar la siguiente instrucción, presionen el botón que dice "step".
6. Para regresar un paso atrás, presionen el botón que dice "backstep".
7. Para correr todo el programa hasta que termine, presionen el botón que dice "go".
8. Para volver a empezar el programa nuevamente, presionen el botón que dice "reset".
9. Para ver el contenido de los 32 registros en la parte derecha del simulador, hay una pestaña que dice `Registers`.
10. La consola está en la parte de abajo del simulador.
11. Para ver el contenido de la memoria, en el mismo lugar que los registros hay una pestaña que dice `Memory`, pueden navegar a diferentes secciones de la memoria haciendo click derecho encima de la tabla que muestra el estado de la memoria.

### Preguntas

Ahora que ya han ejecutado su primer programa de RISC-V y que ganaron experiencia con Jupiter pueden contestar las siguientes preguntas en el archivo **ex1.txt** que se encuentra en la carpeta **ex1**.

1. ¿Qué significan las directivas `.data`, `.word`, `.text`? Escriban sólo una de las siguientes letras para responder. Pista: Piensen acerca de las cuatro secciones de memoria.
    * A) Son como etiquetas sirven para hacer referencia a cosas que están en memoria, con `.data` apuntamos hacia los datos con `.word` hacia palabras de 32 bits y con `.text` hacia texto.
    * B) `.data` le indica al ensamblador que guarde los siguientes elementos en la sección estática de la memoria, `.word` que guarde una palabra de 32 bits en memoria en la sección estática de datos y `.text` que estamos en la sección de texto y entonces deberíamos escribir instrucciones de ensamblador.
    * C) `.data` es para guardar datos en la sección de datos de la memoria, `.word` es para guardar palabras de 32 bits en la sección de palabras de la memoria, `.text` es para guardar texto ascii en la sección de texto de la memoria.
    * D) `.data` y `.word` no son directivas de ensamblador, y `.text` siempre está por defecto y ni se tendría que poner.
2. Corran por completo el programa. ¿Qué número da como output?
3. ¿Qué representa el número que da como output el programa? Escriban sólo una de las siguientes letras para responder:
    * A) Número áureo
    * B) Factorial de 9
    * C) Fibonnaci de 9
    * D) Factorial de 10
4.  ¿En qué dirección de memoria (en hexadecimal) está almacenado `n`? Pista: Miren el contenido de los registros.
5. Sin utilizar la pestaña "Editor", hagan que el programa calcule el 13º número (tomando en cuenta que el índice empieza en 0) de la sucesión de Fibonacci, modificando manualmente el valor de un registro. Encontrarán útil de primero correr línea por línea el código. Si prefieren ver los valores en decimal, cambien esto haciendo click derecho sobre la tabla de registros y presionando "Decimal Display Mode". ¿Qué registro modificaron?

## Ejercicio 2: Traduciendo de C a RISC-V

Desde Jupiter abran el archivo **ex2.s** que está en la carpeta **ex2**, desde algún editor de texto de su preferencia abran **ex2.c** que está en la misma carpeta. El código ensamblador que se provee (archivo ex2.s) es una traducción del programa escrito en C (archivo ex2.c) pero en RISC-V. Su tarea es encontrar/explicar los siguientes componentes de este archivo escrito en lenguaje ensamblador en el archivo de texto llamado **ex2.txt**.

### Preguntas

1. ¿Cuál es el registro que representa la variable `k`?
2. ¿Cuáles son los registros que actúan como punteros a los arreglos `source` y `dest` (separados por coma)?
3. ¿De qué número de línea a que número línea se encuentra el loop (separado por coma)?
4. ¿En qué número de línea se copia el contenido de `source` a `dest`?, es decir ¿dónde se puede observar `dest[k] = source[k]`?.
5. ¿Cómo son manipulados los punteros en el código? Escriban sólo una de las siguientes letras para responder:
    * A) En cada iteración se le suma `k` a cada puntero, que es el equivalente en C a `arreglo[k]`.
    * B) En cada iteración se le suma `k * 4` a cada puntero, que es equivalente en C a `arreglo[k]`.
    * C) En cada iteración se le hace corrimiento lógico a la derecha a cada puntero, que es equivalente en C a `arreglo[k]`.
    * D) En cada iteración se le suma `+1` a cada puntero, que es equivalente en C a `arreglo[k]`.


## Ejercicio 3: Factorial

En este ejercicio, tienen que implementar la función de factorial en RISC-V que toma un sólo parámetro entero $n$ y retorna $n!$. Pueden encontrar un esqueleto de esta función en el archivo **factorial.s**, que se encuentra en la carpeta **ex3** del repositorio que clonaron. Ustedes sólo necesitan agregar las instrucciones bajo la etiqueta `factorial`, y el argumento que se pasa a la función va en el registro `a0`. Pueden resolver este problema ya sea de forma recursiva o iterativa. Asegúrense de que su función retorne de forma apropidada lo siguiente $3! = 6$, $7! = 5040$ y $8! = 40320$.

## Ejercicio 4:  List Map (extra)

Para este ejercicio van a utilizar el archivo **list_map.s** que se encuentra en la carpeta **ex4**. En este ejercicio, van a completar una función de **map** con listas encadenadas en RISC-V. La función se simplificará en mutar la lista en cuestión, es decir que tomará una lista encadenada como entrada y va a retornar la lista con los valores modificados. Nuestro procedimiento de "map" toma dos parámetros, el primero será la dirección del nodo "head" de una lista encadenada, cuyos valores son enteros de 32 bits. Entonces, en C, la estructura se define como:

```c
struct node {
  int value;
  struct node *next;
};
```

El segundo parámetro será la dirección de una función que toma un entero como argumento y devuelve un entero. Usaremos la instrucción **jalr** de RISC-V para llamar a esta función con los valores de cada nodo de la lista.

Nuestra función **map** irá recorriendo la lista recursivamente, aplicando la función a cada valor de la lista y almacenando el valor devuelto al nodo correspondiente. En C, la función se vería algo como esta:

```c
void map(struct node *head, int (*f)(int)) {
  if (!head) { return; }
  head->value = f(head->value);
  map(head->next, f);
}
```

Si no habían algo como `int (*f)(int)` antes, no se preocupen demasiado. Significa básicamente que `f` es un puntero a una función de C, y esta función recibe un int como argumento. `f` entonces puede ser utilizado exactamente como cualquier otra función. Les será útil acudir al green card de RISC-V que pueden encontrar [aquí](http://inst.eecs.berkeley.edu/~cs61c/fa17/img/riscvcard.pdf) para completar este ejercicio.

Hay exactamente 9 espacios (8 en `map` y 1 en `main`) en el código que se provee, donde dice `YOUR_INSTRUCTION_HERE`. Reemplacen esos espacios con las instrucciones de su implementación de map, y escriban una simple llamada a `map` con `square` como argumento de la función. Hay comentarios en el código que explican qué debería hacer, o cumplir, cada instrucción. Cuando hayan rellenado los espacios con las instrucciones correctas, pueden correr el código pulsando en <kbd>F3</kbd> y luego el botón **go**, al hacer esto, debería de darles como output lo siguiente:

```shell
9 8 7 6 5 4 3 2 1 0
81 64 49 36 25 16 9 4 1 0
```

La primera línea es la lista original, y la segunda es la lista modificada después de que se aplicó la función **map**.

## Calificación

Si está usando nuestra máquina virtual (es decir, ya tenía Jupiter pre-instalado), para conocer su nota use el comando:

```
./check
```

Si está usando su propio Linux y le tocó instalar Jupiter a usted mismo, use el comando:

```
./check -x
```

Las series valen 20, 20, 60 y 60 puntos respectivamente.

Cuando esté satisfecho con su nota haga add, commit y push. Luego suba el link de su repositorio al GES.
