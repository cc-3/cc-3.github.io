# Introducción a RISC V

Estos son algunos de los términos más importantes de este tema:
- ISA (probablemente uno de los términos mas importantes del curso): Es el *pegamento que une el hardware con el software*. *Una especie de "contrato" que nos dice lo que sí podemos hacer porque tiene un soporte por el hardware*. El **ISA** o **Instruction Set Architecture** es el set de instrucciones reales soportadas por el procesador sobre el que estamos trabajando.
- RISC: Reduced Instruction Set Computer
	- Un ejemplo de procesadores RISC son los procesadores MIPS, ARM y RISC-V.
	- Este tipo de procesadores utiliza muchos regitros (32 registros de 32 bits cada uno, por ejemplo)
	- Se caracteriza por tener pocas instrucciones, siendo todas de un tamaño fijo (32 bits, por ejemplo)
	- Existen pocas instrucciones para acceder a memoria, (2 basicamente: **lw** y **sw**)
	- La base de los procesadores RISC es soportar pocas instrucciones, pero hacerlas muy eficientemente
- CISC: Complex Instruction Set Computer
	- x86 x86_64 (Intel)
	- Este tipo de procesadores utiliza pocos regitros
	- Soporta una cantidad de instrucciones mucho mayor a los procesadores RISC, y muchas de estas instrucciones no son de un tamaño fijo
	-  La base de los procesadores CISC es soportar la mayor cantidad de instrucciones posibles para darle multiples opciones a los desarrolladores 

## ¿Qué es RISC-V?
- RISC-V es la quinta versión de procesadores RISC diseñador por Berkeley
- De licencia libre
- Los registros son ¡muy! rápidos (y caros) y se encuentran dentro del procesador
- Tiene un formato rigido: *operacion registro_destino registro_fuente1 registro_fuente2*
- Esta es la distribución de registros utilizada en procesadores RISC-V (nombrados del x0 al x31):

| Registros| Nombre | Función |
|-----|----|---|
| x0  | ZERO | Alambrado a tierra. x0 siempre contiene el valor 0x00000000 |
| x1  | RA | Return Address: Contiene la dirección de retorno de la función actual |
| x2  | SP  | Stack Pointer: Es un puntero a la cabeza del Stack |
| x3   | GP  | Global Pointer: Es un puntero a la sección global de Data |
| x4   | TP  | Thread Pointer: No lo utiilizaremos en este curso, pero cabe mencionar su existencia |
| x5-x7   | t0-t2  | Temporaries: Registros de proposito general que no se conservan en llamadas a funciones |
| x8   | s0/fp  | Saved Register (Frame Pointer): Registro *seguro*, se debe conservar su valor entre llamadas. El frame pointer contiene la dirección justo antes de la llamada a una función. Sirve para regresar el stack a su posición original al regresar de una función |
| x9   | s1  | Saved Register: Registro *seguro* de propósito general, se debe conservar su valor entre llamadas |
| x10-x11   | a0-a1  | Function Arguments & Return Values: Registros utilizados para enviar argumentos en las llamadas a funciones. Tambien son usados como valor de retorno de las funciones |
| x12-x17   | a2-a7  | Function Arguments: Registros utilizados para enviar argumentos en las llamadas a funciones |
| x18-x27   | s2-s11  | Saved Registers: Registros *seguros* de propósito general, se debe conservar su valor entre llamadas |
| x28-x31   | t3-t6  | Temporaries: Registros de proposito general que no se conservan en llamadas a funciones |

## Algunos Ejemplos en RISC-V

#### Convertir un ciclo a Ensamblador en RISC-V

~~~C
int a[20];
int sum = 0;
for(int i = 0; i <20;i++){
    sum+=a[i];
}
~~~

~~~Assembler
# Asumimos A = x8
    addi x5, x0, 0      # sum = 0
    addi x6, x0, 0      # i = 0
    addi x28, x0, 20    # x28 = 20
Condition:
    blt x6, x28, For    # Evaluamos la condición antes de empezar el ciclo
    j EndFor            # Si es falsa terminamos el ciclo
For:
    lw x7, 0(x8)
    add x5, x5, x7      # sum+=A[i]
    addi x8, x8, 4      # A++ ¿Por qué +4?
    addi x6, x6, 1      # i++
    j Condition
EndFor:
~~~

## Partes de un Ciclo
1. Inicialización: fuera del ciclo
2. Condición: para go to step, while y for queremos queremos un true para seguir. False para detenernos
3. Instrucciones: ¿qué me pide el problema?
4. Step: un pequeño cambio entre una iteración y otra, se relaciona con la condición.

# Funciones

Entre llamadas a funciones, pueden haber muchos valores que se sobreescriben. Una solución simple a este problema es guardar estos valores en el Stack. Antes de hacer una llamada a una función, el **caller** debe almacenar valores como los argumentos recibidos (si es que recibio alguno), su **return address**, y los valores que desee preservar en registros seguros (guardando el contenido actual de estos registros antes de sobreescribirlo).

Es importante mencionar que, cualquier espacio reservado en el stack al inicio de una función, debe ser *liberado* antes de retornar de ella. Esto garantiza que cuando se regrese a la función anterior, el stack quedará en la misma posición de antes de ejecutar la función.

## Ejemplo Función
La siguiente función en C
~~~C
int sum(int x, int y){
    return x+y;
}
~~~

Se traduce a

~~~Assembler
function_sum:
    add a0, a0, a1  #los argumentos vienen en a0 y a1, y el valor de retorno se devuelve en a0
    jr ra           #sabemos que ra tiene la dirección de retorno
~~~

Ahora veamos como se codifica la llamada a esta función
~~~C
    int x = 1;
    int y = 1;
    sum(x,y);
~~~

~~~Assembler
    addi a0, zero, 1    #int x = 1
    addi a1, zero, 1    #int y = 1
    addi sp, sp, -12    #reservamos espacio en el stack para las variables y el return address
    sw ra, 0(sp)        #
    sw s0, 4(sp)        #guardamos los registros en el stack
    sw s1, 8(sp)        #
    add s0, a0, zero
    add s1, a1, zero    #guardamos los valores de las variables el registros seguros para no perderlos
    jal function_sum    #saltamos a la funcion
    add t0, zero, a0    #nuestro valor de retorno esta en a0, lo pasamos a cualquier otro registro
    add a0, zero, s0    #restauramos nuestra variable x en a0
    add a1, zero, s1    #restauramos nuestra variable y en a1
    lw ra, 0(sp)        #
    lw s0, 4(sp)        #restauramos los registros seguros y el return address
    lw s1, 8(sp)        #
    addi sp, sp, 12     #regresamos el stack a la posición original
~~~