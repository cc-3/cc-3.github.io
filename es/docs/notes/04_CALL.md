# Compiling, Assembling, Linking and Loading (CALL)

## Notas Importantes: Multiplicación y División
- La multiplicación de enteros de **n** bytes puede generar enteros de hasta **2n** bytes
- La multiplicación es una operación mucho más costosa que la suma
- RISC-V maneja la multiplicación de la siguiente forma: **mul rd, rs1, rs2** multiplica **rs1** y **rs2** y deja la *parte baja* del resultado en **rd**, **mulh rd, rs1, rs2** multiplica **rs1** y **rs2** y deja la *parte alta* del resultado en **rd**.
- Para la división existen tambien dos operaciones: **div rd, rs1, rs2** que realiza la división entera **rs1/rs2** y coloca el resultado en **rd**, y **rem rd, rs1, rs2** qye realiza una división entera **rs1/rs2** y coloca el residuo en **rd**

## Interpretación vs Traducción
Un programa en lenguajes compilados, como C, tiene los siguientes niveles de representación:

|Stack de Traducción|
|--|
|Lenguaje de Alto Nivel: C|
|Lenguaje Ensamblador: RISC-V Assembler|
|Código de Máquina: RISC-V Machine Code|
|Hardware: Compuertas Lógicas, Transistores|

#### Ventajas de Traducción
- Se hace unicamente una vez
- Es muy rapida en tiempo de ejecución
- Nos da cierto nivel de *privacidad* en el código fuente: podemos distribuir unicamente el archivo ya compilado

#### Ventajas de Interpretación
- No se necesita compilarlo mós de una vez para una arquitectura y sistema operativo particulares
- No se tiene que recompilar el archivo luego de hacer un cambio
- Un archivo corre sobre todas las combinaciones de sistema operativo y arquitectura siempre que se tenga el interprete instalado
