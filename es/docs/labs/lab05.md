# Lab 5 - Hanoi en RISC-V

## Objetivos

* Divertirse con RISC-V
* Aprender un juego nuevo
* Practicar llamadas a funciones en ensamblador

## Lecturas

![PH](/img/PH.jpg)

* P&amp;H: 2.12

## Preparación

Para comenzar con el laboratorio primero tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/5AbGVaj3). Recuerden que deben
aceptar la asignación de **Github Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub.
Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

> **NOTA**: Tienen que reemplazar <link del repositorio\> con el link del repositorio que se creó.

## Torre de Hanoi

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

## Ejercicio del laboratorio

Ahora que entiende el juego y el algoritmo, vamos a traducirlo a RISC-V. Vaya al archivo `hanoi.s` y vea lo que se le provee.

Hay un pequeño main, identificado con la etiqueta `__start`, así como una función para imprimir llamada `hanoiPrint`.

Su tarea es hacer la parte más importante, traduzca la función `hanoi` de C a RISCV-V. No debe reinventar el algoritmo, ya todo está bonito y funcionando, listo para que usted lo traduzca.

Al traducir, tome en cuenta lo siguiente:

* Al traducir un condicional, lo más cómodo es usar lógica negada, pero existen también otras opciones si no le gustó esa.

* Cuando traduciomos una función tenemos 6 pasos.
    * Paso 1 (caller): preparar los argumentos en un lugar conocido
    * Paso 2 (caller pasa a callee): saltamos usando jal
    * Paso 3 (callee): prólogo, proteja los registros que considere necesarios
    * Paso 4 (callee): cuerpo de la función
    * Paso 5 (callee): epílogo, restauro lo que protegí; si voy a devolver algo, me aseguro de colocarlo en un lugar conocido
    * Paso 6 (callee regresa a caller): regresamos usando jr

* Analice bien... hacemos MUCHAS llamadas recursivas, entonces a cada rato le estaremos cayendo encima a los registros **a0**, **a1**, etc. entonces nos conviene guardar sus valores originales en algún lugar **seguro**.

Creo que ya son suficientes pistas, hora de ir a escribir algo de código! Para que calcule cuánto trabajo es, su función `hanoi` debería quedarle entre 40 y 50 líneas.

## Calificación

Si está usando nuestra máquina virtual (es decir, ya tenía Jupiter pre-instalado), para conocer su nota use el comando:

```
./check
```

Hay un par de alumnos que tenían algún Linux distinto a Ubuntu y tuvieron que instalar Jupiter por su cuenta, recuerden el `jupiterRoute` que vimos la vez pasada.

Cuando esté satisfecho con su nota haga add, commit y push. Luego suba el link de su repositorio al GES.