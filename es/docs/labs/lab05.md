# Lab 5 - Recursión en RISC-V

## Objetivos

* Practicar llamadas a funciones en ensamblador
* Identificar qué datos debemos proteger en el stack

## Lecturas

![PH](/img/PH.jpg)

* P&amp;H: 2.12

## Preparación

Para comenzar con el laboratorio primero tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/il_u0Yyq). Recuerden que deben aceptar la asignación de **Github Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

> **NOTA**: Tienen que reemplazar <link del repositorio\> con el link del repositorio que se creó.

## Ejercicio 1: Fibonacci

La función de Fibonacci está definida de la siguiente manera:

```
F(0) = 0  
F(1) = 1  
F(n) = F(n-1) + F(n-2)   (para n ≥ 2)
```

Como podrá ver, la función es recursiva y crece rápidamente.

#### ¿Qué tiene qué hacer?

Dentro del archivo `fib.s` implemente en ensamblador de RISC-V la función de Fibonacci de forma recursiva (no use la versión iterativa). La recomendación que siempre se le ha hecho en clase es que primero resuelva el problema en C, o en el lenguaje de alto nivel de su preferencia, y hasta que ya lo tenga listo y funcionando se ponga a traducir a ensamblador.

Al traducir, tome en cuenta lo siguiente:

* Al traducir un condicional, lo más cómodo es usar lógica negada, pero existen también otras opciones si no le gustó esa.

* Cuando traducimos una función tenemos 6 pasos.
    * Paso 1 (caller): preparar los argumentos en un lugar conocido
    * Paso 2 (caller pasa a callee): saltamos usando jal
    * Paso 3 (callee): prólogo, proteja los registros que considere necesarios
    * Paso 4 (callee): cuerpo de la función
    * Paso 5 (callee): epílogo, restauro lo que protegí; si voy a devolver algo, me aseguro de colocarlo en un lugar conocido
    * Paso 6 (callee regresa a caller): regresamos usando jr

* Para este ejercicio en particular considere las siguientes protecciones: 
    * ¿Mi argumento se ve contaminado en algún momento? ¿Necesito protegerlo?
    * ¿Alguno de mis resultados parciales se ve contaminado en algún momento? ¿Necesito proteger alguno?

## Ejercicio 2: Torre de Hanoi

La Torre de Hanoi es un juego que nos permite apreciar la recursión. Este consiste en mover todos los discos de una torre a otra, ayudándose de una tercera torre auxiliar. La única restricción que existe es que se mueven los discos uno a la vez, y no se puede colocar un disco grande sobre uno más pequeño.

Puede probar el juego en [este enlace](https://www.mathsisfun.com/games/towerofhanoi.html).

Si usted busca un poco, encontrará que existe un algoritmo para resolver la torre de Hanoi, aquí puede encontrarlo como [pseudocódigo](https://www.tutorialspoint.com/data_structures_algorithms/tower_of_hanoi.htm) y abajo lo puede ver en C.

```c
void hanoi(int numeroDeDiscos, int T_origen, int T_destino, int T_alterna) {
    if (numeroDeDiscos == 1) {
        hanoiPrint(T_origen, T_destino);
    } else {
        hanoi(numeroDeDiscos - 1, T_origen, T_alterna, T_destino);
        hanoi(1, T_origen, T_destino, T_alterna);
        hanoi(numeroDeDiscos - 1, T_alterna, T_destino, T_origen);
    }
}

void hanoiPrint(int T_origen, int T_destino) {
    printf("mueva el disco de la torre: ");
    printf("%i", T_origen);
    printf(" hacia la torre: ");
    printf("%i", T_destino);
    printf("\n");
}
```

Tómese algunos minutos para leer y entender el algoritmo, así como para jugar un poco la torre de Hanoi. Si quiere probar este programa de C, entre a su carpeta `hanoi` y allí encontrará el archivo `hanoi.c` que está listo para compilar y ejecutarse.

#### ¿Qué tiene qué hacer?

Traduzca la función `hanoi` de C a RISCV-V. No debe reinventar el algoritmo, ya todo está bonito y funcionando, listo para que usted lo traduzca.

* Analice bien... hacemos MUCHAS llamadas recursivas, entonces a cada rato le estaremos cayendo encima a los registros **a0**, **a1**, etc. entonces nos conviene guardar sus valores originales en algún lugar **seguro**.

Para que calcule cuánto trabajo es, la función `hanoi` queda con aprox 30-50 líneas.

## Calificación

Si está usando nuestra máquina virtual (es decir, ya tenía Jupiter pre-instalado), para conocer su nota use el comando:

```
./check
```

Los ejercicios valen 40 y 60 puntos respectivamente.

Cuando esté satisfecho con su nota haga add, commit y push. Luego suba el link de su repositorio al GES.
