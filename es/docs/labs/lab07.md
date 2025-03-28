# Lab 7 - Logisim

## Objetivos
* Aprender a usar Logisim y simular circuitos en dicho programa.
* Aprender las herramientas básicas y el funcionamiento de Logisim.

## Preparación

Para este laboratorio, es necesaria la aplicación Logisim. Si aun no lo ha hecho, puede instalarla con
```
sudo apt install logisim
```

También debe descargar los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/EO1wP8i1). Recuerden que deben aceptar la asignación de **GitHub Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

## Vista General

Logisim es una aplicación que permite simular el comportamiento de circuitos lógicos.

Al abrir la aplicación de Logisim, la interfaz gráfica está dividida en tres partes fundamentales:

* Área de Trabajo.
* Sección de Componentes.
* Sección de Herramientas de acceso directo.

![Logisim](/img/labs/lab05/logisim.png)

La sección de área de trabajo está compuesta por todo el espacio en blanco con puntos negros. Aquí se pueden colocar componentes, conectarlos entre sí utilizando cables.

La sección de componentes está ubicada en el lado izquierdo de la interfaz. Es una ventanilla que contiene numerosas carpetas que contienen los componentes.

La sección de herramientas de acceso directo está ubicada en el lado superior izquierdo. Este posee íconos para la realización de distintas tareas.
Entre dichos íconos se encuentran:

* <img src="/img/labs/lab05/poke.png" alt="poke1" /> Permite interactuar con el circuito, cambiando valores. Es llamado “Poke” en inglés.
* <img src="/img/labs/lab05/select.png" alt="select1" /> Permite editar un componente al seleccionarlo y permite crear o editar cables. Es llamado “Select Tool” en inglés.
* <img src="/img/labs/lab05/label.png" alt="label1" /> Permite crear texto en el área de trabajo.
* <img src="/img/labs/lab05/input.png" alt="input1" /> Este es un acceso directo al componente llamado “Input Pin”. Permite crear entradas al circuito.
* <img src="/img/labs/lab05/output.png" alt="output1" /> Este es un acceso directo al componente llamado “Output Pin”. Permite crear salidas de los circuitos.
* <img src="/img/labs/lab05/not.png" alt="not1" /> Este es un acceso directo a la compuerta lógica “Not”.
* <img src="/img/labs/lab05/and.png" alt="and1" /> Permite crear compuertas lógicas de tipo “And”.
* <img src="/img/labs/lab05/or.png" alt="or1" /> Generacompuertas lógicas de tipo “Or”.

Por el momento, estas son las herramientas que se van a necesitar para este laboratorio.

## Ejercicio 0: Las Bases

Este ejercicio consiste en crear su primer circuito para verificar que todo esté bien instalado y que el autograder le funcione.

1. En el área de herramientas o acceso directo, hacer click en el ícono de la compuerta “And”. Esto creará una sombra de dicha compuerta que seguirá el cursor en el área de trabajo.

2. Colocar la compuerta en el área de trabajo.  Basta con hacer click otra vez para colocar dicho componente.
También, se pueden rotar los componentes presionando las teclas de flechas del teclado. Se pueden colocar en la orientación deseada, pero para este laboratorio, colocar la compuerta en orientación “Este”. La orientación de un componente puede ser alterado al seleccionarlo y buscar la opción “Orientación” u “Orientation”.(Asegurándose de que el ícono de <img src="/img/labs/lab05/select.png" alt="select2" /> esté activo).

3. Los pines de entrada y salida ya han sido colocados, <span style="color: #17325e;">**ustedes no tienen que modificar/reemplazar/mover/alterar/cambiar estos pines, si los cambian el autograder les dará cero de nota y tendrán que volver a descargar los archivos base nuevamente para que les funcioneñ en otras palabras, debe empezar de nuevo el ejercicio**</span>. Hasta este punto su circuito debe verse así:

<p align="center">
  <img src="/img/labs/lab05/ej0unf.png" alt="unf" />
</p>

5. Luego, hacer click en <img src="/img/labs/lab05/select.png" alt="select5" /> “Select Tool”, y conectar los **Input Pins** y el **Output Pin** con la compuerta **And** creando cables entre ellos (Al mantener presionado el botón izquierdo del mouse, se puede crear un cable del largo deseado y, al soltarlo, dicho botón el cable se creará. ¡Ojo! Sólo se pueden crear cables horizontales y verticales.)

El circuito debe lucir algo parecido a esto:

<p align="center">
  <img src="/img/labs/lab05/ej0Fin.png" alt="fin" />
</p>

6. Y por último, hacer click en <img src="/img/labs/lab05/poke.png" alt="poke2" /> “Poke” y presionar los **Input Pins** para interactuar con ellos. Observar que el **Output Pin** cambia en función de los valores de los **Input Pins**.

¡Y listo! El primer circuito está listo. Ejecute el autograder con `./check`. Si tiene algún problema con el autograder, debe notificarnos de una vez durante el periodo de laboratorio, de lo contrario será mucho más difícil resolverlo después.

## Ejercicio 1: NAND, NOR, XOR y Multiplexores

Ahora es momento para crear circuitos más complejos, van a trabajar en el archivo **ex1.circ**. Se darán cuenta que en la parte izquierda aparecen 5 subcircuitos que tienen que completar (**NAND, NOR, XOR, 2-1 MUX, 4-1 MUX**). En los proyectos de Logisim se pueden crear subcircuitos para mantener organizados los circuitos, ayudando a la estética del proyecto. Para crear un nuevo subcircuito tienen que ir a (Proyecto -> Añadir Circuito) y escribir el nombre del subcircuito, pero esto lo tendrán que hacer más adelante en el proyecto 3, por ahora ya están creados por ustedes. Si quieren tener más información o están interesados lean la siguiente documentación de logisim [link](http://www.cburch.com/logisim/docs/2.3.0/guide/subcirc/index.html).

Su tarea es implementar las compuertas NAND, NOR, XOR y los multiplexores 2-1 y 4-1 utilizando únicamente compuertas **AND, NOT y OR**. Todos los circuitos tienen ya colocados los pines de entrada y salida, nuevamente no los pueden cambiar o no funcionará el autograder.

![NAND](/img/labs/lab05/nand.png)


Cuando hayan completado un subcircuito pueden re-utilizarlo en los demás subcircuitos si creen que es necesario o simplifica el circuito. Para esto tienen que estar en otro subcircuito y hacer click en el subcircuito que ya han terminado y lo pueden utilizar como cualquier otro componente. Por ejemplo en la imagen que se muestra a continuación se utiliza en el subcircuito NOR, el subcircuito NAND.

![NAND Sub](/img/labs/lab05/nandsub.png)


**Nota**: Para los circuitos que simulan los respectivos multiplexores. Se deben seguir las siguientes normas:

* Para el Multiplexor 2-1 de 1 bit:

<p align="center">
  <img src="/img/labs/lab05/mux21.png" alt="mux211" />
</p>

* Para el Multiplexor 4 a 1 de 1 bit:

<p align="center">
  <img src="/img/labs/lab05/mux41.png" alt="mux411" />
</p>

**Recuerden no usar las compuertas lógicas NOR, XOR ni los multiplexores que vienen por defecto.**

## Ejercicio 2: Contador

En nuestro siguiente ejercicio practicaremos usar registros, relojes, sumadores y constantes. Para este ejercicio van a estar trabajando en el archivo **ex2.circ**. Explore los componentes que le salen en el panel superior izquierdo, allí encontrará todas las piezas que necesita.

El ejercicio consiste en realizar un contador utilizando un registro y un sumador. Lo especial de este circuito es que se empezará a utilizar un reloj y a utilizar más bits.

El circuito a diseñar es el siguiente:

<p align="center">
  <img src="/img/labs/lab05/contador.png" alt="contador1" />
</p>

Los componentes a emplear se encuentran en:

<p align="center">
  <img src="/img/labs/lab05/componentes.png" alt="componentes1" />
</p>

Los componentes utilizados son los siguientes:
* Sumador: Ubicado en la librería “Aritmética”.
* Registro: Ubicado en la librería “Memoria”.
* Constante Numérica: Ubicado en la librería “Wiring”.
* Reloj: Ubicado en la librería “Wiring”.

Cabe mencionar que ahora se utilizan **Output Pins** de más de un bit, se puede aumentar el número de bits en la configuración de los componentes. Seleccionar un componente y, en el lado izquierdo, se puede encontrar el mismo menú que se usa para darle orientación a los componentes y asignarles una etiqueta, en donde se está la opción de “Bits De Datos”. Para este ejercicio ya está hecho esto para los *Output pins*, pero si tienen que hacerlo para el registro, para la constante numérica y el sumador.

Una vez se termine de construir el circuito, es hora de simularlo.

Seleccionar la opción “Simular” (ubicado en la parte superior de la pantalla) y presionar la opción de “activar reloj”. Se podrá notar que el circuito funciona por sí solo y que, efectivamente, cumple con su objetivo: ¡contar! (si se hizo correctamente).

Es posible alterar la frecuencia del reloj seleccionando otra vez “Simular” y, luego, “Seleccionar frecuencia del reloj”. Con esto se puede controlar qué tan rápido se contará. Otra función útil es la de “Resetear Simulación” ubicado, también, en “Simular”.

**NOTA**: En lo que se simula el circuito, es posible revisar los estados de los subcircuitos. Para ello, se debe seleccionar la herramienta “Poke”,  hacer click sobre un subcircuito en el área de trabajo y presionar en la lupa que aparece sobre el subcircuito.
Para regresar al circuito principal, hay que hacer click en el módulo del circuito principal, ubicado en la sección de componentes. Esto no lo van a necesitar en este ejercicio, pero será muy útil para el proyecto nuevamente.

## Ejercicio 3: AFD a Lógica Digital

En este último ejercicio practicaremos construir un circuito a partir de un autómata, tal como vimos en clase.

En el curso de Informática 3 se aprende qué es un AFD (o **F**inite **S**tate **M**achine en inglés). Un AFD posee estados finitos y transición entre estados.

El AFD de este laboratorio es una variación del AFD que se ha visto en clase. Este AFD posee estados y transición de estados, pero, además de eso, necesita inputs para cambiar de estado y al cambiar de estado regresa un output.

El AFD es el siguiente:

<p align="center">
  <img src="/img/labs/lab05/AFD.png" alt="AFD1" />
</p>

La tabla de verdad de dicho autómata puede ser útil para visualizar lo que está pasando:

<p align="center">
  <img src="/img/labs/lab05/AFDTabla.png" alt="AFDTabla1" />
</p>

(Note que aquí en el laboratorio le quisimos ahorrar los pasos más complejos, plantear el autómata y construir la tabla)

¿Cómo se lee la tabla?
La primera fila de la tabla se entiende de esta manera: “Dado el estado 00, si el input es 0, entonces se hace una transición al estado 01 y devuelve un output de 1”. Aunque la tabla ya está hecha y ya viene correcta, asegúrese de entender de dónde salió, no para CC3 sino para el resto de su vida como ingeniero o ingeniera.

Para este ejercicio se les provee el circuito **ex3.circ**. El trabajo a realizar es completar el circuito y lograr que se comporte como el AFD mostrado anteriormente. Para esto ustedes solo van a modificar 2 subcircuitos: **StateBitOne** y **StateBitZero**.

Se tienen dos opciones para completar el circuito: 
* fuerza bruta (suma de productos)
* simplificar antes de construir el circuito (mapas de Karnaugh)

Si lo resuelve con mapas de Karnaugh, usará significativamente menos componentes en su respuesta.

# Calificación

Cuando crean que tiene ejercicios completos pueden hacer la prueba localmente escribiendo en la terminal:

```shell
./check
```

Si todo esta correcto obtendrá 10, 30, 30 y 30 puntos en sus ejercicios, respectivamente.

Recuerde probar el autograder al menos una vez antes de terminar los periodos de laboratorio (el ejercicio 0 sale en cinco minutos máximo!) para asegurarse que Logisim y el autograder se están comunicando bien. Cualquier problema, notifíquelo a sus auxiliares o catedrático de inmediato.