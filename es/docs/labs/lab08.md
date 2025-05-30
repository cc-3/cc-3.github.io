# Lab 8 - Más Logisim

## Objetivo

En este laboratorio ustedes van a aprender sobre otros componentes esenciales de Logisim, en particular, los **splitters** que nos permiten hacer cosas como, descomponer un cable en subsets de bits para luego manipularlos individualmente.

## Preparación

Para este laboratorio, nuevamente, es necesario que tengan la aplicación de [Logisim](http://www.cburch.com/logisim/index.html). Adicionalmente pueden utilizar la [documentación](http://www.cburch.com/logisim/docs.html) de Logisim para refrescar el conocimiento que adquirieron en el laboratorio pasado o leer el lab también [aquí](https://cc-3.github.io/labs/lab07/).

También tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/KxJPq_aF). Recuerden que deben aceptar la asignación de **GitHub Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

## Más componentes de Logisim

Aquí pueden encontrar tres características más de logisim que ustedes van a encontrar bastante utiles, principalmente en el proyecto 3.

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

Los divisores nos permiten separar los bits de un cable. A pesar de su nombre, puede separar, pero también juntar bits. Por ejemplo para el primer caso, un valor float (IEEE 754) de precisión simple (32 bits) dividido en signo (1 bit), exponente (8 bits) y fracción (23 bits):

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

A pesar de su nombre, un extensor también se puede usar para "recortar" o "eliminar" algunos bits, como en el siguiente ejemplo:

<p align="center">
  <img src="/img/labs/lab06/extend4.png" alt="extend 4" />
</p>

## Ejercicio 1: Divisores (Splitters)

Para este ejercicio van a utilizar los splitters para crear un par de circuitos simples manipulando un número de 8 bits. Van a estar trabajando en el archivo **splitters.circ**.

- Vayan al folder llamado "Wiring" y seleccionen un splitter. Este circuito va a tomar un cable y lo va a dividir en un set de cables con un ancho de bits menor.

- Antes de colocar el circuito en el esquemático, cambien el ancho a 8 bits en las propiedades del circuito y "Fan Out" al tamano que considere conveniente, 3 es una buena idea para comenzar. Si ustedes mueven el cursor sobre el esquemático, su cursor debería de verse algo así: ![Splitter](/img/labs/lab06/splitter.gif).

- Tareas a realizar:
    - Out1: Realice un AND entre el bit más significativo y el menos significativo del input
        - Arriba le sugerimos que pusiera un fan out de 3. En el panel de la izquierda configure para que solo el bit 0 vaya a la salida 0 (Top), y que solo el bit 7 vaya a la salida 2 (Bottom), todos los demás bits puede mandarlos hacia la salida 1.
        - Listo! Gracias al splitter, logró separar el bit más significativo y el menos significativo del resto.
    - Out2: Cambie el valor del bit más significativo del input
        - Usted ya partió al input en pedacitos para resolver Out1, puede usar algunos de esos pedacitos y alguna compuerta para obtener el valor opuesto.
        - Luego puede utilizar otro splitter, ahora colocado al revés para reconstruir su número: de varios pedacitos, pasará a tener un valor de 8 bits.

## Ejercicio 2: Comparadores Equal y Less Than

Implementaremos a mano un par de comparadores sencillos. Nuestro comparador Equal quiere comprobar que **A == B**, mientras que el comparador Less Than quiere comprobar que **A < B** (por favor ponga atención a esto, no queremos Less Or Equal, tampoco queremos B < A).

Cuando revise el archivo notará que tanto A como B son números de dos bits para este ejercicio. Para la comparación Equal debe revisar que ambos números sean iguales, y para el Less Than considerarlos como números sin signo que debe comparar.

Recuerde nuestro proceso para elaborar un circuito:

* Plantee la solución en forma de tabla
    * Por cada bit de sus inputs debería tener una columna de entrada.
    * Por cada problema a resolver (Equal, Less Than) debería tener una columna de salida.
* A partir de la tabla elabore mapas de Karnaugh (̣¿por qué dice mapas en plural?)
* Agrupe sus 1s en cada mapa de Karnaugh
* Obtenga su ecuación gracias a los grupos
* Con la ecuación elabore el circuito correspondiente

Un detalle más... No puede utilizar los comparadores que ya vienen en Logisim para hacer este ejercicio, debe construir su circuito con ANDs, ORs, NOTs y demás elementos que le sirvan, como túneles, splitters, etc.


## Ejercicio 3: ALU

En este ejercicio ustedes van a implementar un ALU sencillo de 32 bits. Van estar trabajando en el archivo llamado **ALU.circ**. Como un recordatorio, ALU significa _Arithmetic Logic Unit_ (Unidad Arimética Lógica). Un ALU es una pieza fundamental de un CPU y realiza operaciones aritméticas y lógicas (bitwise). La función que el ALU realiza (ejemplo add, xor) es determinada por el control de nuestro datapath, que esta determinado por la instrucción que nuestro procesador está ejecutando. El ALU está resaltado en el siguiente diagrama de un datapath simplificado:

<p align="center">
  <img src="/img/labs/lab06/alu.png" alt="ALU" width="400" />
</p>

Este ejercicio es una versión simplificada de lo que le tocará hacer en el proyecto 3. Esperamos que al realizar este ejercicio, el proyecto 3 se les haga un poco más fácil y suave de llevar.

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
1. Splitters       20      passed
2. Comparators     40      passed
3. ALU             40      passed

=> Score: 100/100
```

Al finalizar, recuerde hacer `add`, `commit` y `push` al finalizar el periodo, cada vez que logre un avance, y al terminar su laboratorio completo.

Para este momento del curso ya se sabe las reglas, al finalizar el periodo suba sus avances a Github y suba el link de su repositorio al GES. Si no lo hace tendrá cero, no se aceptará ninguna excusa ni justificación, ese cero no se le cambiará.
