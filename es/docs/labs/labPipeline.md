# Lab 8 - Pipelining y preparación para el CPU

## Objetivo

Este laboratorio es bastante corto. Consiste únicamente en un ejercicio de _pipelining_, con el objetivo de darles suficiente tiempo para el proyecto 2, empiecen pronto...

## Preparación

Para este laboratorio, nuevamente, es necesario que tengan la aplicación de [Logisim](http://www.cburch.com/logisim/index.html). Adicionalmente, pueden utilizar la [documentación](http://www.cburch.com/logisim/docs.html) de Logisim para refrescar el conocimiento que adquirieron en los laboratorios anteriores.

También, tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/pxWdbD4u). Recuerden que deben aceptar la asignación de **GitHub Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```
## Ejercicio 1: Pipeline
Asuman que, al encender, todos los registros tienen 0.

Consideren el siguiente FSM de 2 entradas, su salida es calculada por medio de una multiplicación de sus entradas y sumada a su estado actual.

![Imagen](/img/labs/lab08/fsm.png)

Asuman que el tiempo de propagación de un bloque de suma es de 50ns, el tiempo de propagación de un bloque de multiplicación es de 55ns, y el clk-to-q delay de un registro es de 5ns. Calculen la máxima frecuencia del reloj en la que puede operar este circuito. Asuman que el tiempo de configuración de un registro es despreciable y que las 2 entradas vienen de registros sincronizados que reciben información de fuentes externas.

Ahora, deben mejorar el desempeño de este circuito, de manera que pueda operar a una frecuencia de reloj más alta. Para ello, deben separar la multiplicación y la suma en dos etapas de _pipeline_. En la primera etapa, se realiza la multiplicación de las 2 entradas y, en la segunda etapa, se le suma el producto al estado actual.

La forma en que se evaluará es muy simple: La secuencia de salidas de este circuito está bien, ssi corresponde a la secuencia de salidas del circuito sin _pipeline_, potencialmente, con algunos ceros en el principio. Por ejemplo, si el circuito da como salidas \[3,5,1,2,4,...\], su circuito correcto podría devolver \[0,3,5,1,2,4,...\] para la misma secuencia de entradas.

Para facilitar el proceso de calificación, se les dará un punto de inicio estándar en los archivos del laboratorio. En ```pipeline.circ```, el sub-circuito ```Non- pipelined``` está estructurado exactamente como la imagen de arriba. El ```main``` está programado para que la salida del subcircuito sin _pipeline_ sea \[3,5,1,2,4,-1,0,0,...\]. Esto, también, los ayudará como ejemplo de cómo usar una memoria con datos desde un archivo. El bloque ROM debería tener los datos correctos, pero, si no, denle click derecho al bloque y elijan la opción "Load image..." y escogan ```ROMdata```.

Noten que necesitarán un registro para guardar un valor intermedio entre etapas del _pipeline_, esto es bastante común en pipelines.

1. Completen el subcircuito ```pipelined```. Tendrán que agregar un registro entre los bloques de producto y suma para separar las dos etapas.
2. Ahora, calculen la nueva frecuencia máxima para la versión con _pipeline_ del circuito.
3. Cuando aprendieron de esto en clase, se les mencionó que si un resultado depende de la salida de una instrucción previa, se suele agregar una "burbuja" en el pipeline para asegurar que el resultado de la primera instrucción esté listo para ser usado en la segunda. Piensen por qué agregar burbujas en este ejemplo es innecesario.

## Calificación

Cuando crean que tengan ejercicios completos, pueden utilizar el autograder, localmente, escribiendo en la terminal:

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
              Lab 8: Pipeline


Exercise           Grade   Message
----------------  -------  ---------
1. Pipeline           100  Passed

=> Score: 100/100
```

Pueden subir su laboratorio para calificación utilizando:

```shell
./submit <TOKEN>
```

## Ejercicio 2: Guía del proyecto de CPU

Queremos incluir esta guía para guiarlos en la tercera parte del proyecto. Aprovechen esta guía para comenzar la parte 3 (CPU).

Empezar esta parte desde cero puede ser intimidante, así que queremos guiarlos en la forma de pensar en este proyecto con un ejemplo de instrucciones tipo R: una suma (la instrucción `add`).

Recuerden las 5 etapas de pipeline del CPU:

1. Instruction fetch
2. Instruction decode
3. Execute
4. Memory
5. Writeback

Esta guía los ayudará a completar cada uno de estos pasos, de la instrucción ```add```. Cada sección tendrá preguntas para que analicen, detalles importantes y referencias al contenido del curso, pero no les dirá cómo implementarla exactamente. Tal vez necesiten leer y entender cada pregunta antes de pasar a la siguiente y podrán ver las respuestas haciendo click a cada pregunta. Mientras implementen el proyecto, siéntanse libres de poner cosas en subcircuitos conforme lo vean necesario.

### Etapa 1: Instruction fetch
La parte principal de esta estapa es, ¿cómo se obtiene la instrucción actual? De las clases, se sabe que las instrucciones son almacenadas en una memoria de instrucciones (texto) y cada instrucción se puede obtener con una dirección.

1. <details> <summary> ¿Qué archivo tiene la memoria de datos? ¿Cómo se conecta a su archivo <code>cpu.circ</code>? </summary> Está en el archivo riscv.circ; le da una entrada al cpu llamada <code>Instruction</code> y recibe una salida llamada <code>fetch_addr</code>. </details>
2. <details> <summary> En el CPU, ¿cómo afecta la dirección que tenemos en la salida <code>fetch_addr</code> a la entrada <code>Instruction</code>?  </summary> La instrucción que riscv.circ envía al CPU debe ser la instrucción en la posición <code>fetch_addr</code> de la memoria de texto. </details>
3. <details> <summary> ¿Cómo sabemos qué valor debería tener <code>fetch_addr</code>? (pista: también se le llama PC)</summary> <code>fetch_address</code> es la dirección de la instrucción que actualmente está siendo ejecutada, así que se guarda en el registro PC. Para este proyecto, está bien que PC empiece en 0, el valor por defecto de los registros.</details>
4. <details> <summary> En este proyecto, ¿qué cantidad de bits tiene el PC? </summary>32 bits.</details>
5. <details> <summary> Para programas sencillos sin ningún jump o branch, ¿cómo debería cambiar el PC de línea a línea?  </summary>El PC se debe incrementar en 1 instrucción para poder recibir la siguiente instrucción, ya que la dirección almacenada en el PC representa la instrucción a ejecutar.</details>
6. En los archivos del proyecto, ya está el PC. implementen el comportamiento del PC para programas simples (sin jumps o branches). Tendrán que agregar esto más adelante, pero por ahora sólo piensen en ejecutar un programa con ```add``` . Piensen a dónde debe estar conectada la salida del PC. ¡No se olviden de conectar el clock!

### Etapa 2: Instruction decode
Ya que tienen la instucción en el tunnel ```Instruction```, deben separarla en el paso de decodificación de acuerdo a lo que han aprendido en clase acerca de formatos de instrucciones de Risc-V.

1. <details> <summary> ¿Qué tipo de instrucción es <code>add</code>? ¿Cuáles son sus diferentes campos y qué bits se necesitan para cada uno?  </summary>(Vean las instrucciones del proyecto :D)</details>
2. <details> <summary> En Logisim, ¿qué se utiliza para separar (split out) diferentes grupos de bits?  </summary> ¡Un splitter!       </details>
3. Implementen la etapa de decodificación de los campos de la instrucción usando la entrada ```instruction```. Deberían usar _tunnels_ para etiquetar y agrupar los bits.
4. <details> <summary> Ahora deben obtener datos de los registros correspondientes usando el <i>register file</i>. ¿Qué campos de bits deben estar conectados al <i>register file</i>? ¿A qué entradas del register file deberían conectarse? </summary> Los campos <code>rs1 y rs2</code> deben ir a <code> Read register </code> 1 y 2.</details>
5. Implementen la forma de leer del ```register file```. Van a tener que usar su regfile.circ de la parte 1 (seguro ya la tienen hecha :), si no, ya van un poco tarde). ¡No se olviden de conectar el clock!

### Etapa 3: Execute
Esta etapa, también conocida como _ALU stage_, es la etapa en la cual se computan la mayoría de instrucciones. Aquí se introducirá la idea de implementar un ```módulo de control```.

1. <details> <summary> Para la instrucción <code>add</code>, ¿cuáles deberían ser las entradas del ALU?  </summary> Read Data 1 y 2 deben ir a los puertos A y B del ALU</details>
2. <details> <summary> En el ALU, ¿cuál es el propósito del switch llamado <code>ALU_ctr</code>?  </summary>Elige la operación que el ALU debe realizar.</details>
3. <details> <summary> Aunque para un add es posible poner un valor constante en el control del ALU, ¿por qué sería malo hacer esto conforme siguen implementando más instrucciones del proyecto?  </summary>En otras instrucciones, las entradas del ALU pueden cambiar, por lo que es necesario algún tipo de (sub)circuito que cambie los valores de entrada y/o salida, dependiendo de la instrucción siendo ejecutada.</details>
4. Ahora implementen un subcircuito para el módulo de control. Este módulo debe recibir como entradas el opcode y funct y, como salidas, los valores adecuados para el manejo correcto del ALU para cada instrucción. Hay varias formar de lograr esto (pueden ver el instructivo del proyecto para más ayuda). Al implementar más instrucciones, este módulo puede hacerce más complejo.
5. Utilicen el ALU de la parte anterior y conéctenlo correctamente. ¿Es necesario conectar el clock? ¿Por qué, o por qué no?

### Etapa 4: Memory
En esta etapa se pueden almacenar datos a una memoria con instrucciones "store", y recuperar datos con instrucciones de "load". Como ```add``` no utiliza la memoria, la guía no se enfocará mucho en esta etapa.
Vean el módulo de memoria en el proyecto. En este punto no se explicará lo que debe tener en cada una de sus entradas, pero siéntanse libres de implementarlo por su cuenta cuando aprendan qué hacer. Pueden conectarle el clock mientras tanto.

### Etapa 5: Write back
La estapa de escritura es donde el resultado de la operación se guarda de regreso a los registros. Aunque no todas las instrucciones escriben de regreso a los registros (piensen en cuales), ```add``` si lo hace.

1. <details> <summary> Viendo el ISA, ¿qué instrucciones sí usan esta etapa?  </summary> add recibe un dato del ALU y lo guarda en un registro. lw recibe un dato de la memoria y lo escribe en un registro. Hay muchas instrucciones más que hacen esto. </details>
2. Implementen la etapa de escritura de modo que sea capaz de obtener datos, tanto del ALU como de la memoria, y escribirlos al Register File. Luego, cuando implementen saltos/branches, tal vez tengan que agregar más cosas a este MUX. Sin embargo, por el momento, deben poder escoger entre el ALU y la memoria, ya que sólo una salida puede llegar al módulo de registros. Conecten un cable de las salidas del ALU y MEM hacia un multiplexor.
3. <details> <summary> ¿Qué debería tener el selector del mux? ¿De qué depende esta entrada?  </summary> El selector escoge qué salida (ALU o MEM) llega al Reg. File y la salida correcta depende de qué instrucción está ejecutándose. Esto sugiere que la entrada del selector debería venir del módulo de control, porque el control se encarga de descifrar qué instrucción se ejecuta (con el opcode y las funct). </details>
4. Ahora viene el segundo (y posiblemente más importante) rol de los módulos de control: determinar qué valores salen del módulo al CPU, para poder controlar el flujo de ejecución. A esto se le llaman Señales de Control.

Un ejemplo de estas es la señal que controla el MUX mencionado anteriormente, comúnmente llamado WBsel. WBsel determina el valor que se escribe de regreso a los registros.

Hay más señales de control que pueden encontrar en el material de la clase y van a tener que definir algunas más. Si notan que van a necesitar un mux en alguna parte del proyecto, muy posiblemente van a tener que definir una señal de control para el mux.

5. Hay varias formas de implementar el control para que traduzca los opcodes/functs a la instrucción correspondiente y luego configurar las señales de control correctamente. Una forma (vista en clase) es con una ROM. Los otros métodos usan lógica de ```and```s y ```or```s para alcanzar el objetivo. Prueben implementar las señales de control pertinentes a la instrucción ```add```.
6. <details> <summary> Ya que tienen las entradas del mux, necesitan conectar la salida. ¿A dónde va la salida?  </summary> Como el output son los datos que quieren escribir al register file, debería conectarse a la entrada <code>Write Data</code> del Register File </details>
7. Hay dos entradas más al Register File que son importantes para escribir datos: RegWEn y Write Register. Uno de estos viene de la etapa de decodificación y, para el otro, deberán hacer una nueva señal de control. Terminen la etapa de Write Back conectando del módulo de control, y de la etapa de decodificación, las entradas correspondientes al register file.

Si han hecho todos estos pasos correctamente, deberían tener un procesador que funciona para sumar. Para el resto del proyecto, van a estar implementando más instrucciones de la misma forma; conectando salidas a entradas, agregando muxes y otros componentes de Logisim y definiendo señales de control nuevas. Debería ser más fácil ahora que tienen un esqueleto básico para trabajar. Recuerden el contenido del curso ya tienen bastante información y los ayudará a seguir construyendo los circuitos que tienen ahora. ¡Éxitos!
