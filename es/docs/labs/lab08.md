# Lab 7 - Logisim Avanzado

## Objetivo

En este laboratorio ustedes van a aprender sobre otros componentes esenciales de Logisim, en particular, los **splitters** que nos permiten hacer cosas como, descomponer un cable en subsets de bits para luego manipularlos individualmente.

## Preparación

Para este laboratorio, nuevamente, es necesario que tengan la aplicación de [Logisim](http://www.cburch.com/logisim/index.html). Adicionalmente pueden utilizar la [documentación](http://www.cburch.com/logisim/docs.html) de Logisim para refrescar el conocimiento que adquirieron en el laboratorio pasado o leer el lab también [aquí](https://cc-3.github.io/labs/lab05/).

También tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/eOTjIzyc). Recuerden que deben aceptar la asignación de **GitHub Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

## Características Avanzadas de Logisim

Aquí pueden encontrar tres características más de logisim que ustedes van a encontrar bastante utiles, principalmente en el proyecto 2.

### Túneles (Tunnels)

Un [túnel](http://www.cburch.com/logisim/docs/2.6.0/en/libs/base/tunnel.html) les permite dibujar _un cable invisible_ para unir dos puntos. Los túneles son agrupados por etiquetas (case-sensitive) que se les ponen a los cables para identificarlos. Generalmente son utilizados para conectar cables de la siguiente manera:

<p align="center">
  <img src="/img/labs/lab06/tunnels1.png" alt="tunnels 1" />
</p>

Que se traduce (o tiene un efecto similar) a esto:

<p align="center">
  <img src="/img/labs/lab06/tunnels2.png" alt="tunnels 2" />
</p>

Hay que tener ciertas precauciones al utilizar los túneles y siempre mantener un registro de cuales cables están conectados con túneles hacia otros cables, para evitar situaciones como esta:

<p align="center">
  <img src="/img/labs/lab06/tunnels3.png" alt="tunnels 3" />
</p>

Que se traduce (o tiene un efecto similar) a esto:

<p align="center">
  <img src="/img/labs/lab06/tunnels4.png" alt="tunnels 4" />
</p>

Nosotros les recomendamos (**bastante**) utilizar túneles en Logisim, porque hacen los circuitos más limpios, claros y fáciles de depurar.


### Divisores (Splitters)

Los divisores crean una correspondencia entre un valor de multiples bits y subsets de esos bits. A pesar de su nombre, puede dividir un valor de multiples bits en varias partes o subsets de bits (lo que se espera por el nombre), así como también puede combinar partes o subsets de bits en un valor de multiples bits. Por ejemplo para el primer caso, un valor float (IEEE 754) de precisión simple (32 bits) dividido en signo (1 bit), exponente (8 bits) y fracción (23 bits):

<p align="center">
  <img src="/img/labs/lab06/splitters1.png" alt="splitters 1" />
</p>

Para el segundo caso se unen dos entradas de diferentes anchos de bits (3 y 2 bits) que se unen para formar un valor de 5 bits:

<p align="center">
  <img src="/img/labs/lab06/splitters2.png" alt="splitters 2" />
</p>


### Extensores (Extenders)

Cuando estén cambiando el ancho de un cable, siempre deberían de utilizar un [extensor](http://www.cburch.com/logisim/docs/2.6.0/en/libs/base/extender.html) para mayor claridad en su circuito. Por ejemplo, consideren la siguiente implementación en donde se extiende un cable de ancho 8 bits a un cable de ancho de 16 bits:

<p align="center">
  <img src="/img/labs/lab06/extend1.png" alt="extend 1" />
</p>

A pesar de que hace lo que tiene que hacer, no es una buena práctica y alguien que esté revisando su proyecto posiblemente no pueda comprender la intención del circuito anterior. Algo mejor, más simple, fácil de leer y menos propenso a errores sería algo como lo siguiente:

<p align="center">
  <img src="/img/labs/lab06/extend2.png" alt="extend 2" />
</p>

Esto tambíen aplica cuando se quiere pasar de un ancho de bits mayor a un ancho de bits menor. En el siguiente ejemplo, un cable de ancho 8 bits es convertido a un cable de ancho de 4 bits, tirando/ignorando los bits sobrantes:

<p align="center">
  <img src="/img/labs/lab06/extend3.png" alt="extend 3" />
</p>

A pesar de las implicaciones de su nombre, un extensor se puede utilizar también para realizar la misma operación y así evitar el uso de **splitters** para esta tarea:

<p align="center">
  <img src="/img/labs/lab06/extend4.png" alt="extend 4" />
</p>

## Ejercicio 1: Divisores (Splitters)

Para este ejercicio van a utilizar los splitters para crear un par de circuitos simples manipulando un numero de 8 bits. Van a estar trabajando en el archivo **splitters.circ**.

- Vayan al folder llamado "Wiring" y seleccionen un splitter. Este circuito va a tomar un cable y lo va a dividir en un set de cables con un ancho de bits menor.

- Antes de colocar el circuito en el esquemático, cambien el ancho a 8 bits en las propiedades del circuito y "Fan Out" al tamano que considere conveniente, 3 es una buena idea para comenzar. Si ustedes mueven el cursor sobre el esquemático, su cursor debería de verse algo así: ![Splitter](/img/labs/lab06/splitter.gif).

- Tareas a realizar:
    - Out1: Realice un AND entre el bit más significativo y el menos significativo del input
        - Arriba le sugerimos que pusiera un fan out de 3. En el panel de la izquierda configure para que solo el bit 0 vaya a la salida 0 (Top), y que solo el bit 7 vaya a la salida 2 (Bottom), todos los demás bits puede mandarlos hacia la salida 1.
        - Listo! Gracias al splitter, logró separar el bit más significativo y el menos significativo del resto.
    - Out2: Trabajando en signo-magnitud, obtenga el inverso aditivo del input
        - Recordatorio: inverso aditivo significa cambiarle de signo de positivo a negativo, y viceversa.
        - Recordatorio: [Signo Magnitud](https://en.wikipedia.org/wiki/Signed_number_representations#Signed_magnitude_representation) es una otra forma de representar números con signo, la vimos la primera semana de clases.
        - Usted ya partió al input en pedacitos para resolver Out1, puede usar algunos de esos pedacitos y alguna compuerta para obtener el inverso aditivo.
        - Luego puede utilizar otro splitter, ahora colocado al revés para reconstruir su número: de varios pedacitos, pasará a tener un valor de 8 bits.

## Ejercicio 2: Rotate Right

Con el conocimiento que tienen acerca de los splitters y multiplexores, están listos para implementar un bloque de lógica combinacional no trivial: `rotr`, que significa **Rotate Right**. 

La idea es que `rotr A,B` va a rotar el patrón de bits de la entrada `A` a la derecha por `B` bits. Por ejemplo, si `A` fuera $0\text{b}10110101011\color{blue}1\color{blue}0\color{blue}0\color{blue}1\color{blue}1$ y `B` fuera $0\text{b}0101$ (5 en decimal), el output del bloque sería $0\text{b}\color{red}1\color{red}0\color{red}0\color{red}1\color{red}110110101011$. Noten que los 5 bits de más a la derecha de `A` (azul) fueron rotados a la derecha y puestos de vuelta a la izquierda (rojo). En RTL, la operación sería algo como:

```c
R = A >> B | A << (16 - B)
```

Ustedes tienen que implementar el subcircuito llamado **rotr** en el archivo **rotr.circ** que tiene las siguientes entradas y salida:

* **A**, 16 bits, la entrada a ser rotada.
* **B**, 4 bits, la cantidad de rotación (Respóndase a usted mismo, ¿por qué 4 bits? <i class="em em-thinking_face"></i>)
* **C**, 16 bits, salida con el resultado de la rotación.

La salida en el output debería de ser `A` rotado por `B` bits, como se indicó anteriormente. Ustedes **NO** pueden utilizar los shifters que trae Logisim en su solución, pero todos los demás bloques combinacionales (multiplexores, splitters, túneles, constantes, compuertas, sumadores, etc) son permitidos.


> **HINT 1**: Antes de empezar a cablear, deberían de pensar muuuuuuuy bien acerca de como pueden descomponer este problema en pequeñas partes y unirlas. Deberían de sentirse libres de implementar subcircuitos para implementar este ejercicio. Si no los utilizan, se van a arrepentir.

> **HINT 2**: Solo porque les dimos una representación en RTL no significa que esta sea la mejor opción para abordar el problema. Piense en los bits de entrada de `B` y en como pueden utilizar efectivamente los splitters. Piense en cómo resolvio el multiplexor de 4 a 1 la semana pasada, usando su multiplexor de 2 a 1.

Si su cableado de un splitter grande se está volviendo desordenado, a veces cambiar los splitters pueden mantener las cosas más limpias y localizables. Por ejemplo, en lugar de utilizar un splitter de 1 a 16, puede primero dividir en 4, y luego volver a dividir en 4.

¡Este ejercicio lo hará pensar bastante!

## Ejercicio 3: ALU

En este ejercicio ustedes van a implementar un ALU de 32 bits. Van estar trabajando en el archivo llamado **ALU.circ**. Como un recordatorio, ALU significa _Arithmetic Logic Unit_ (Unidad Arimética Lógica). Un ALU es una pieza fundamental de un CPU y realiza operaciones aritméticas y lógicas (bitwise). La función que el ALU realiza (ejemplo add, xor) es determinada por el control de nuestro datapath, que esta determinado por la instrucción que nuestro procesador está ejecutando. El ALU está resaltado en el siguiente diagrama de un datapath simplificado:

<p align="center">
  <img src="/img/labs/lab06/alu.png" alt="ALU" width="400" />
</p>

Este ejercicio es una versión simplificada de lo que le tocará hacer en el proyecto 2. Esperamos que al realizar este ejercicio, el proyecto 2 se les haga un poco más fácil y suave de llevar.

Las 8 funciones que tienen que implementar son: **shift left logical**, **shift right logical**, **shift right arithmetic**, **rotate left**, **rotate right**, **and**, **or** y **xor**. El ALU va a realizar la función deseada sobre 2 entradas de 32 bits y tendrá una salida de 32 bits como resultado. **Noten que Logisim tiene compuertas que hacen todas estas funciones, NO tienen que implementar ninguna por su cuenta, por favor no lo hagan**.

> **HINT 1**: Busquen el folder en Logisim etiquetado como Arithmetic para poder encontrar shifter, que será útil para varias de las operaciones.

> **HINT 2**: Utilizen túneles para mover todas las salidas del cuadro etiquetado "Compute All Possible Operations" al cuadro etiquetado como "Select the Requested Result".

La función seleccionada va a ser determinada por el valor de la señal de control, la siguiente tabla resume todo:

| **Control** |        **Operation**       |
|:-------:|:----------------------:|
|  `000`  |   Shift Left Logical   |
|  `001`  |   Shift Right Logical  |
|  `010`  | Shift Right Arithmetic |
|  `011`  |       Rotate Left      |
|  `100`  |      Rotate Right      |
|  `101`  |           And          |
|  `110`  |           Or           |
|  `111`  |           Xor          |

## Calificación

Cuando crean que tengan ejercicios completos, pueden utilizar el autograder escribiendo en la terminal:

```shell
./check
```

Si todo esta correcto les saldrá algo como esto:

```shell
   ___       __                        __       
  / _ |__ __/ /____  ___  _______ ____/ /__ ____
 / __ / // / __/ _ \/ _ \/ __/ _ \/ _  / -_) __/
/_/ |_\_,_/\__/\___/\_, /_/  \_,_/\_,_/\__/_/
                   /___/

             Machine Structures
     Great Ideas in Computer Architecture
              Advanced Logisim


Exercise           Grade   Message
----------------  -------  ---------
1. Splitters       40      passed
2. Rotate Right    40      passed
3. ALU             40      passed

=> Score: 120/120
```

Al finalizar, recuerde hacer `add`, `commit` y `push` hacia Github. Luego envíe el link de su repositorio en el GES. Si no envía el link, no podremos ponerle nota!
