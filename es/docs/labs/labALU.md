# Lab 7 - ALU Proyecto 2

## Objetivo

Este laboratorio es bastante corto y representa los primeros **25 puntos** de su proyecto 2 (procesador de RISC-V en Logisim). El motivo principal es que tengan más tiempo para invertir en otras partes del proyecto. Si logran sacar 100 en el laboratorio tendrán una de tres partes terminadas... éxitos.


## Preparación

Para este laboratorio, nuevamente, es necesario que tengan la aplicación de [Logisim](http://www.cburch.com/logisim/index.html). Adicionalmente pueden utilizar la [documentación](http://www.cburch.com/logisim/docs.html) de Logisim para refrescar el conocimiento que adquirieron en los laboratorios anteriores.

También tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/DX-8g8bp). Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

## Ejercicio 1: Arithmetic Logic Unit (ALU)

**Las instrucciones de este ejercicio son una copia literal de las instrucciones del proyecto 2, por favor lean cuidadosamente**.

Su tarea es crear un ALU que soporte todas las operaciones que necesitan las instrucciones de nuestro ISA. Van a estar trabajando en el archivo **alu.circ**. Este tiene tres entradas:

| Nombre de Entrada | Ancho en Bits | Descripción |
|:-----------------:|:-------------:|:------------------------------------------------------:|
| A | 32 | Datos para usar por A en la operación del ALU |
| B | 32 | Datos para usar por B en la operación del ALU |
| ALU Op | 4 | Selecciona la operación que el ALU debería de efectuar |

y cuatro salidas:

| Nombre de Entrada | Ancho en Bits | Descripción |
|:-----------------:|:-------------:|:---------------------------------------------------:|
| Out | 32 | Resultado de la operación efectuada por el ALU |
| Equal | 1 | 1 si A y B son iguales, 0 de lo contrario |
| LT | 1 | 1 si A es menor que B (signed), 0 de lo contrario |
| LTU | 1 | 1 si A es menor que B (unsigned), 0 de lo contrario |

Esta es la lista de operaciones que necesitan implementar. Ustedes tienen que utilizar y les recomendamos utilizar los componentes de logisim que ya efectuan estas operaciones, por favor no las implementen desde 0, sería muy tardado y no es el objetivo del proyecto ni del laboratorio.

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

La salidas `Equal`, `LT`, `LTU` siempre tienen que sacar el valor correcto de comparación sin importar el valor de `ALU Op`. Ustedes no pueden modificar (mover, reemplazar, cortar, pegar, eliminar, etc) los pines de entrada ni de salida que nosotros les damos de lo contrario el autograder no va a funcionar correctamente, tengan en cuenta esto para evitar problemas con el autograder a la hora de hacer submit.


## Calificación

Al finalizar su circuito puede usar ```./check``` para probarlo de forma local. Debido a lo importante que sera el ALU para su proyecto, este lab se calificara con 0 o 100 unicamente.

Cuando haya superado el test local puede hacer ```autograder --upload``` para subir su laboratorio y luego ```autograder --stats``` para comprobar su 100 de nota.

No olvide hacer add + commit + push a su repositorio y subir el link de este al GES.