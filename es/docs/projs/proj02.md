# Proyecto 2: CPU


## Introducción

En este proyecto utilizaremos Logisim para implementar un procesador de 32-bits, cuyo ISA es un subset de las instrucciones de RISC-V. Algunos componentes del proyecto serán más sencillos que los componentes de hardware verdaderos para evitar realizar trabajo repetitivo. Nuestro ISA utiliza 32 registros de 32 bits cada uno y una memoria, cuyas direcciones son de 32 bits.

![RISC-V Datapath](/img/projs/proj02/datapath.png)

A continuación, algunos detalles importantes que debemos leer antes de iniciar.

  * Pueden utilizar cualquier bloque ya existente en Logisim para el proyecto.
  * Guarden constantemente. Realicen commits y hagan push al menos una vez por cada día que trabajen.
  * Logisim es un excelente simulador pero ocasionalmente tiene errores, entonces hagamos caso a la indicación anterior. Guarden constantemente...
  * Trabajemos de la misma forma que en un proyecto de software: Construyamos el proyecto pieza por pieza y realicemos pruebas antes de unir un bloque con otros. Podemos construir todos los subcircuitos adicionales que necesitemos, siempre y cuando sigamos las reglas específicas que cada parte impone (más de esto a continuación).
  * Se incluyen algunos tests. Sólo se debe correr el script ./check (esto seguramente tendrán que hacerlo en Linux, se requiere Python 3.X instalado).
  * ¡Necesitaremos más tests! Cada equipo debería hacer sus propios tests adicionales. En la sección de *Testing* hay algunas indicaciones de cómo hacer pruebas adicionales.

Finalmente, las dos indicaciones más importantes:

  * Se les darán algunos armazones (harnesses) a los cuales sus circuitos se conectarán. ASEGURENSE QUE SÍ SE ADAPTAN DE FORMA CORRECTA, TODOS LOS TESTS FALLARÁN SI NO LO HACEN.
  * En el camino nos hemos encontrado con algunos problemas de git merge si ambos miembros del equipo estaban trabajando en el mismo archivo; a veces git los resolvía automáticamente y a veces no. En Logisim es garantizado que git NO RESOLVERÁ ESTO DE FORMA CORRECTA, entonces si trabajamos en equipo NO DEBEMOS MODIFICAR EL MISMO ARCHIVO AL MISMO TIEMPO


## Preparación

**Antes de comenzar, asegúrense de que hayan <span style="color: red">leído y comprendido</span> todas las instrucciones del proyecto de principio a fin**. Si tienen alguna pregunta, por favor diríjanse a **Slack** y pregunten en los canales correspondientes.

Para comenzar con el proyecto, primero tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/KKOa0Ell). Tienen permitido trabajar en parejas o de forma individual, por lo que al aceptar la asignación les preguntará si desean crear un grupo nuevo o unirse a uno ya existente. Si crean un grupo nuevo, ingresen un nombre que represente lo represente  y que no haya sido tomado por otro.

![Create group](/img/projs/proj01/classroom1.png)

Si desean unirse a un grupo ya creado, tienen que buscar el nombre del grupo y pulsar el botón que dice **join**

![Join group](/img/projs/proj01/classroom2.png)

**Tienen que tener mucho cuidado al unirse a un grupo ya existente, ya que esto no se puede cambiar después, además, lo consideraremos como <span style="color: red">PLAGIO</span> si lo realizan de manera incorrecta, ya que, al hacer esto, pueden tener acceso al repositorio del otro miembro del grupo.**

Ya sea que se unan o creen un nuevo grupo, al finalizar el proceso les creará automáticamente un repositorio con una extensión que termina con su nombre de grupo. Ya habiendo hecho todo eso, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd >CTRL</kbd> <kbd>+</kbd> <kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

## Parte 1: Register File

Como aprendimos en clase, RISC-V tiene 32 registros. En el proyecto sólo implementaremos 9 (abajo se indica cuales) para evitar realizar trabajo repetitivo. Todas nuestras señales (rs1, rs2, rd) siguen siendo de 5-bits, pero sólo se estarán usando los registros indicados.

El register file debe poder leer y escribir a los registros que se especifiquen según la instrucción, sin afectar o modificar a cualquier otro registro. Existe una excepción: El registro cero está alambrado a tierra y su valor no puede ser cambiado por ningún motivo.

Los registros que utilizaremos son los siguientes:

Registro por número | Registro por nombre
--- | ---
x0 | zero
x1 | ra
x2 | sp
x5 | t0
x6 | t1
x8 | s0
x9 | s1
x10 | a0
x11 | a1

En el archivo **regfile.circ** se encuentra el esqueleto de un register file.


![Register File](/img/projs/proj02/regfile.png)


Este tiene seis entradas:

Nombre | Ancho en bits | Descripción
---  | --- | ---
Clock | 1 | Señal de reloj. Aquí se recibirá una señal de reloj "non gated", es decir, se recibe la señal directa sin ser afectada por ANDs, NOTs o cualquier compuerta.
Write Enable | 1 | Indica si se debería escribir a un registro en el siguiente flanco de subida del reloj.
Read Register 1 | 5 | Registro a leer y cuyo valor será enviado a Read Data 1.
Read Register 2 | 5 | Registro a leer y cuyo valor será enviado a Read Data 2.
Write Register | 5 | Determina cuál registro será modificado en el siguiente flanco de subida (asumiendo que Write Enable = 1).
Write Data | 32 | Los 32 bits de datos a guardarse en el registro, en el siguiente flanco de subida (asumiendo que Write Enable = 1).

El register file tiene las siguientes salidas:

Nombre | Ancho en bits | Descripción
--- | --- | ---
Read Data 1 | 32 | Datos que se están leyendo, según el registro que Read Register 1 pidió.
Read Data 2 | 32 | Datos que se están leyendo, según el registro que Read Register 2 pidió.
s0 Value | 32 | Valor de s0 (salida para DEBUG/TEST).
s1 Value | 32 | Valor de s1 (salida para DEBUG/TEST).
t0 Value | 32 | Valor de t0 (salida para DEBUG/TEST).
t1 Value | 32 | Valor de t1 (salida para DEBUG/TEST).
a0 Value | 32 | Valor de a0 (salida para DEBUG/TEST).
ra Value | 32 | Valor de ra (salida para DEBUG/TEST).
sp Value | 32 | Valor de sp (salida para DEBUG/TEST).

Las salidas para DEBUG/TEST están presentes porque son registros de uso frecuente (por ejemplo, tienen un trabajo importante en las llamadas a funciones). Se utilizarán sólo para pruebas del autograder. En un register file de verdad estas salidas no existirían. Para el proyecto deben estar presentes y funcionar bien para facilitar la calificación.

**IMPORTANTE:** En la primera tabla aparecen nueve registros y en la tabla anterior aparecen siete salidas, eso es intencional. Se estarán **usando** nueve, pero solo se estará **revisando** el valor de siete de ellos.

Pueden modificar regfile.circ como deseen, pero las salidas deben cumplir con el comportamiento que se indica. Deben ser cuidadosos de no modificar (mover, reemplazar, cortar, pegar, eliminar, etc) los pines de entrada o salida. Si necesitan más espacio, pueden moverlos mientras sean cuidadosos de mantener el posicionamiento relativo que estos tienen. Para verificar que nuestros cambios no "rompan" nada, podemos abrir regfile-harness.circ y revisar que no existan errores allí y que todo funcione bien.

HINTS: (1) Cuidado con los muxes. Si estos tienen un enable ese debería estar activo (o mejor aún, buscamos en la ayuda de Logisim cómo quitar esa funcionalidad). (2) Si en algún momento se encuentra con algo que diga three-state o tri-estado, no lo use, desactíve esta opción. En cursos futuros le mencionarán estados de alta impedancia, pero eso no importa en CC3 y en Logisim.

## Parte 2: ALU

Su segunda tarea es crear un ALU que soporte todas las operaciones que necesitan las instrucciones de nuestro ISA (se detallan más adelante). Van a estar trabajando en el archivo **alu.circ**.

![ALU](/img/projs/proj02/alu.png)

Este tiene tres entradas:

| Nombre de Entrada | Ancho en Bits | Descripción |
|:-----------------:|:-------------:|:------------------------------------------------------:|
| A | 32 | Datos para usar por A en la operación del ALU |
| B | 32 | Datos para usar por B en la operación del ALU |
| ALU Op | 4 | Selecciona la operación que el ALU debe de efectuar |

...y cuatro salidas:

| Nombre de Entrada | Ancho en Bits | Descripción |
|:-----------------:|:-------------:|:---------------------------------------------------:|
| Out | 32 | Resultado de la operación efectuada por el ALU |
| Equal | 1 | 1 si A y B son iguales; 0 de lo contrario |
| LT | 1 | 1 si A es menor que B (signed); 0 de lo contrario |
| LTU | 1 | 1 si A es menor que B (unsigned); 0 de lo contrario |

Esta es la lista de operaciones que necesitan implementar. Ustedes tienen que utilizar los componentes de logisim que ya efectúan estas operaciones, por favor no las implementen desde cero, sería muy tardado y no es el objetivo del proyecto.

| Valor de ALU Op | Instrucción |
|:---------------:|-----------------------------------|
| 0 | sll: Out = A << B[4:0] |
| 1 | srl: Out = (unsigned) A >> B[4:0] |
| 2 | add: Out = A + B |
| 3 | and: Out = A & B |
| 4 | or: Out = A \| B |
| 5 | xor: Out = A ^ B |
| 6 | slt: Out = (A < B) ? 1 : 0 Signed |
| 7 | mul: Out = (X * Y)[31:0] |
| 8 | mulh: Out = (A * B)[63:32] |
| 9 | div: Out =(unsigned) A / B |
| 10 | rem: Out = A % B |
| 11 | sub: Out = A - B |

Algunas cosas adicionales que tienen que tener en mente:

La salidas `Equal`, `LT`, `LTU` siempre tienen que sacar el valor correcto de comparación sin importar el valor de `ALU Op`. Nuevamente, tienen que tener cuidado con los inputs y output pins, no los modifiquen por ningún motivo.

Su ALU debería de encajar con el harness **alu_harness.circ**. Sigan las mismas instrucciones que en el register file. En particular, ustedes deberían de asegurar que su ALU es cargado correctamente por el harness antes de que hagan submit.

## Parte 3: CPU

Se les provee un esqueleto del procesador en **cpu.circ**. Su procesador tendrá una instancia de su ALU y Register File, así como una unidad de memoria que ya se les provee. Ustedes son los responsables de construir el datapath y control completos, desde cero. Su procesador debe implementar el ISA que se detalla más abajo.

![CPU](/img/projs/proj02/cpu.png)

Su procesador obtendrá su programa del armazón (harness) **riscv.circ**. Su procesador tendrá un output llamado FETCH_ADDRESS que indica cuál instrucción queremos, esta dirección será entregada al harness y este nos dará una instrucción. La instrucción será recibida por el procesador y será ejecutada. Revisen riscv.circ para ver exactamente qué sucede.

El procesador tiene dos inputs que vienen del harness:

Input Name | Bit Width | Descripción
--- | --- | ---
INSTRUCTION | 32 | Aquí se recibe la instrucción que se obtuvo en la dirección identificada por FETCH_ADDRESS.
CLOCK | 1 | Input del reloj. Puede ser necesario estar enviando esta señal a varios subcircuitos. Esta señal no debe pasar por ninguna compuerta (NOT, AND, etc).

El procesador debe tener los siguientes outputs, que entregará al harness:

Output Name | Bit Width | Descripción
--- | --- | ---
s0 | 32 | Contenido de s0, sólo para pruebas.
s1 | 32 | Contenido de s1, sólo para pruebas.
t0 | 32 | Contenido de t0, sólo para pruebas.
t1 | 32 | Contenido de t1, sólo para pruebas.
a0 | 32 | Contenido de a0, sólo para pruebas.
ra | 32 | Contenido de ra, sólo para pruebas.
sp | 32 | Contenido de sp, sólo para pruebas.
FETCH_ADDRESS | 32 | Dirección que indica qué instrucción queremos obtener del harness. En respuesta a esto, el harness enviará alguna instrucción a través de INSTRUCTION.

Como en la parte 1, tengan cuidado al mover componentes y asegúrense que los pines de input y output coincidan con el harness.

### Memoria

Se les provee una memoria ya implementada. :D

Un resumen de sus inputs y outputs.

Nombre | Tipo | Bit Width | Descripción
--- | --- | --- | ---
ADDRESS | input | 32 | Dirección a leer o escribir en la memoria.
WRITE DATA | input | 32 | Valor a escribirse en la memoria.
WRITE ENABLE | input | 1 | En = 1 en las instrucciones que escriben; En = 0 en las demás.
Clk | input | 1 | Señal de reloj que viene desde cpu.circ.
READ DATA | output | 32 | Datos leídos en la dirección especificada.

### Control

Las señales de control tienen un papel muy importante en el proyecto. Se sugiere volver a leer el capítulo 4 del libro para darse cuenta dónde podemos necesitar un MUX y, por lo tanto, alguna señal de control.

Existen varias formas de implementar las señales de control. Por ejemplo, pueden construir una palabra de control y guardarla en una memoria ROM (micro-código) o pueden construir un circuito que elija qué acción tomar basándose en algunos bits del opcode, func3 y func7.

**Es obligatorio que sus componentes estén unidos y las señales de control necesarias estén implementadas.** Si en la calificación del proyecto sólo tiene componentes sueltos (como el ALU y Reg File de la primera fase) y estos no se comunican entre sí, su nota será cero.

Consejo final: ¡Modularicen! Creen los subcircuitos que sean necesarios y diséñenlos bien antes de empezar a construirlos.

### ISA

![Formato de instrucciones](/img/projs/proj02/instruction_format.png)

Las instrucciones a implementar son las siguientes:

|Instruction|Type|Opcode|Funct3|Funct7/IMM|Operation|
|--- |--- |--- |--- |--- |--- |
|add rd, rs1, rs2|R|0x33|0x0|0x00|R[rd] ← R[rs1] + R[rs2]|
|mul rd, rs1, rs2|R|0x33|0x0|0x01|R[rd] ← (R[rs1] * R[rs2])[31:0]|
|sub rd, rs1, rs2|R|0x33|0x0|0x20|R[rd] ← R[rs1] - R[rs2]|
|sll rd, rs1, rs2|R|0x33|0x1|0x00|R[rd] ← R[rs1] << R[rs2|
|mulh rd, rs1, rs2|R|0x33|0x1|0x01|R[rd] ← (R[rs1] * R[rs2])[63:32]|
|slt rd, rs1, rs2|R|0x33|0x2|0x00|R[rd] ← (R[rs1] < R[rs2]) ? 1 : 0 (signed)|
|xor rd, rs1, rs2|R|0x33|0x4|0x00|R[rd] ← R[rs1] ^ R[rs2]|
|div rd, rs1, rs2|R|0x33|0x4|0x01|R[rd] ← R[rs1] / R[rs2]|
|srl rd, rs1, rs2|R|0x33|0x5|0x00|R[rd] ← R[rs1] >> R[rs2]|
|or rd, rs1, rs2|R|0x33|0x6|0x00|R[rd] ← R[rs1] \| R[rs2]|
|rem rd, rs1, rs2|R|0x33|0x6|0x01|R[rd] ← (R[rs1] % R[rs2]|
|and rd, rs1, rs2|R|0x33|0x7|0x00|R[rd] ← R[rs1] & R[rs2]|
|lb rd, offset(rs1)|I|0x03|0x0||R[rd] ← SignExt(Mem(R[rs1] + offset, byte))|
|lh rd, offset(rs1)|I|0x03|0x1||R[rd] ← SignExt(Mem(R[rs1] + offset, half))|
|lw rd, offset(rs1)|I|0x03|0x2||R[rd] ← Mem(R[rs1] + offset, word)|
|addi rd, rs1, imm|I|0x13|0x0||R[rd] ← R[rs1] + imm|
|slli rd, rs1, imm|I|0x13|0x1|0x00|R[rd] ← R[rs1] << imm|
|slti rd, rs1, imm|I|0x13|0x2||R[rd] ← (R[rs1] < imm) ? 1 : 0|
|xori rd, rs1, imm|I|0x13|0x4||R[rd] ← R[rs1] ^ imm|
|srli rd, rs1, imm|I|0x13|0x5|0x00|R[rd] ← R[rs1] >> imm|
|ori rd, rs1, imm|I|0x13|0x6||R[rd] ← R[rs1] \| imm|
|andi rd, rs1, imm|I|0x13|0x7||R[rd] ← R[rs1] & imm|
|sw rs2, offset(rs1)|S|0x23|0x2||Mem(R[rs1] + offset) ← R[rs2]|
|beq rs1, rs2, offset|SB|0x63|0x0||if(R[rs1] == R[rs2]) then {PC ← PC + {offset, 1b'0}}|
|blt rs1, rs2, offset|SB|0x63|0x4||if(R[rs1] less than  R[rs2] (signed)) then {PC ← PC + {offset, 1b'0}}|
|bltu rs1, rs2, offset|SB|0x63|0x6||if(R[rs1] less than  R[rs2] (unsigned)) then {PC ← PC + {offset, 1b'0}}|
|lui rd, offset|U|0x37|||R[rd] ← {offset, 12b'0}|
|jal rd, imm|UJ|0x6f|||R[rd] ← PC  +  4, PC ← PC + {imm, 1b'0}|
|jalr rd,rs, imm|I|0x67|0x0||R[rd] ← PC  +  4, PC ← R[rs] + {imm}|


## Testing

Para la parte 1 y 2, con el check local es suficiente y si lo pasan significa que esas partes ya las tienen funcionando al 100%. Para la parte 2, el check local también es bastante completo, pero ustedes pueden hacer más pruebas si lo desean. Como no podemos probar cada componente que ustedes vayan implementando, la mejor opción es escribir programas de RISC-V pequeños e ir revisando su datapath de diferentes maneras.

Una vez que hayan escrito su programa de RISC-V, lo van a tener que cargar en la ROM que está en **riscv.circ** y empezar la ejecución. Para eso, primero, abran riscv.circ y localicen la memoria ROM.

![ROM](/img/projs/proj02/rom.png)

Hagan click a la memoria y, después, en la barra de herramientas de la izquierda, hagan click en "(click here to edit)", esto va a abrir un diálogo en donde ustedes pueden cargar su archivo con el código de RISC-V y este ensamblará y generará código de máquina por ustedes que va a ser la salida de la memoria ROM.

![Testing](/img/projs/proj02/test.png)


## Notas sobre Logisim

Si Logisim les da algún problema extraño, REINICIEN LOGISIM Y VUELVAN A CARGAR SU CIRCUITO. No pierdan tiempo buscando errores si no han hecho esto. Si reiniciar no ha resuelto el problema, allí sí ya les corresponde revisar su circuito.

Logisim tiene un "Reference", en la pestaña "Help", y les dice las especificaciones de cada componente.

Do NOT gate the clock! (esto no tiene una traducción directa). Los clocks tienen que llegar directo a los circuitos, ni en CC3 ni en un curso donde usen hardware deberían colocar compuertas antes que la señal de reloj entre al componente.

Si están usando varias ventanas de Logisim tengan mucho cuidado cuando hagan copy-paste de una ventana a otra. Asegúrense que sí se copió el circuito completo que querían y que funcione bien después de pegarlo.

Cuando importen otro archivo (Project -> Load Library -> Logisim Library...), este aparecerá como un folder en el panel de la izquierda. Los archivos esqueleto deberían de tener importado todo lo necesario.

Cambiar los atributos antes de colocar un componente cambia el default. Si quieren colocar varios pines de 32 bits (por ejemplo), habría que cambiarlo antes de colocar el primero. Si sólo quieren cambiar algún valor para un componente, primero lo colocan y, luego, lo cambian.

Cuando cambian los inputs y outputs de un subcircuito que ya colocaron en main, Logisim automáticamente añade o remueve puertos según los cambios que hagan. Esto, muchas veces, afecta el tamaño o posición del subcircuito. Si ya habían cables conectados, Logisim intentará moverlos, pero no siempre lo hace bien. Se recomienda que si van a cambiar los inputs y outputs de un circuito, primero desconecten todos los cables que este pueda tener en main o lo eliminen del main y lo vuelvan a colocar después de cambiarlo. **Recuerden que sólo pueden hacer esto para los subcircuitos que USTEDES agregan**.

Los cables rojos significan que algo está mal conectado. Algunos casos pueden no ser tan obvios, revisen bien todas las conexiones cercanas.

![Red Wires](/img/projs/proj02/error_wire.png)


Logisim tiene algunas herramientas de análisis combinacional (nos puede construir mapas de Karnaugh o circuitos completos con sólo darle una tabla :D). Esta herramienta les puede ser útil en algún momento de sus vidas, pero la recomendación es no usarla en CC3. Recuerden que durante los exámenes tendrán que hacer mapas o circuitos a mano, sin acceso a su computadora.


## Calificación

Ustedes pueden verificar que cada parte funcione correctamente utilizando el autograder local, corriendo el siguiente comando en la terminal:

```shell
./check
```

Si las tres partes del proyecto están correctas les saldrá algo como esto:

```shell
   ___       __                        __       
  / _ |__ __/ /____  ___  _______ ____/ /__ ____
 / __ / // / __/ _ \/ _ \/ __/ _ \/ _  / -_) __/
/_/ |_\_,_/\__/\___/\_, /_/  \_,_/\_,_/\__/_/
                   /___/

             Machine Structures
     Great Ideas in Computer Architecture
               Project 2: CPU


Exercise            Grade  Message
----------------  -------  ---------
1. ALU                 10  passed
2. Register File       10  passed
3. CPU                 80  passed

=> Score: 100/100
```

**IMPORTANTE:** Para tener derecho a nota debe presentar un procesador conectado y funcionando. Es posible obtener los puntos de ALU y de Register File con componentes sueltos y desconectados, sin emgargo si usted presenta esto se le pondrá CERO de nota. En otras palabras, todas las notas de 20 o menos se convierten en CERO.
