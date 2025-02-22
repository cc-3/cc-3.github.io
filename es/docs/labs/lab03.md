# Lab 3 - Estructuras y manejo de memoria

## Objetivos

* Utilizar los struct de C.
* Practicar el uso de malloc para la asignación de memoria dinámica.
* Comprender la importancia del free.


## Preparación
Para obtener sus archivos base visite el siguiente link, luego clone su repositorio.

```
https://classroom.github.com/a/tyMAJzFQ
```

```
git clone https://github.com/cc3-ug/lab03-2025-MI_USUARIO.git
```

Un par de recordatorios, si necesita ayuda con esto revise los labs anteriores para más detalle:

* Si está trabajando en las computadoras del lab o en alguna máquina nueva, debe volver a hacer las configuraciones de Github.

* En Github usamos token en lugar de contraseña.



## Ejercicio 1: Manejo de Memoria
Para este ejercicio lea los archivos **tests/include/vector.h**, **tests/vector_test.c** y luego complete el archivo **ex1/vector.c**, en donde les proveemos con la base para la implementación de un arreglo de longitud variable. 

El objetivo del lab es acostumbrarse al uso de los **structs** de C, así como el manejo de memoria en este lenguaje.

**Su tarea: Completar las funciones `vector_new()`, `vector_get()`, `vector_delete()` y `vector_set()` en _ex1/vector.c_ de manera que _tests/vector-test.c_ corra sin errores de manejo de memoria.**

### ¿Cómo funciona un `vector_t`?
* Posee un `int size` que indica cuántos elementos tiene actualmente. Un vector con `size = 5`, por ejemplo, tendrá cinco casillas con índices entre 0 y 4. Por defecto la longitud de su vector será de 1.
* El vector debe aumentar de tamaño automáticamente si el `vector_set()` lo require. Por ejemplo, si su vector tiene `size = 5` pero le piden que haga un set en la casilla con índice 200, usted debe hacer que su vector aumente de tamaño para tener 201 casillas. Revisemos esos números... como los índices comienzan en 0, cuando me pidan el índice 200 yo debo entender que hay 201 casillas.
* Tiene un `int *data`, el cuál es un espacio pedido a través de un `malloc()` que utilizaremos para guardar los valores de las casillas del vector. Los valores guardados por defecto al hacer un `vector_new()` deben ser cero.
* El valor de cualquier casilla que no ha sido explícitamente editado es 0.
* El vector no debe dar error, incluso si se consulta alguna casilla que todavía no existe. Por ejemplo, su vector tiene `size = 5` pero le hacen un `vector_get()` de la posición 10, esto **no** da error; cuando le consulten una casilla que no existe usted devuelve como respuesta un 0.

Es momento de revisar el código de _ex1/vector.c_ si aún lo ha hecho. Aquí hay comentarios complementarios que describen cómo deberían de correr las funciones. Recuerden que los usuarios de su estructura de datos _vector_t_ asumiran que todas las entradas al vector son 0, a menos que hayan sido definidas de otra manera por ellos. Tengan esto en mente, porque _malloc_ no hace esto por ustedes.

### ¿Qué deben hacer?
* Comience con _vector_new_(). Hay algunos comentarios que nos guían en qué realizar.
* Luego implemente _vector_get()_. Piense en lo que se dijo arriba: aunque me consulten una casilla que aún no existe, debo entregar un resultado válido.
* Luego implemente _vector_delete()_. Es muy probable que le salga con solo dos líneas de código, pero el orden de estas es importante.
* Finalice con _vector_set()_. Esta es la que más código llevará (igual no pasa de 15 líneas). Para resolver esta parte piense en las siguientes preguntas ¿qué pasa si la posición donde me piden escribir aún no existe? ¿cómo pido espacio adicional para que ahora ya exista esta nueva posición? ¿que valor debo colocar en las demás posiciones cuando expanda mi vector? Adicionalmente, ya no piense solo en `malloc()` sino en las otras dos funciones `_alloc()`. Hay algunos comentarios por allí para ayudarle.

Saber cómo reorganizar y liberar memoria es importante para la programación en C. Tenga en cuenta que **debería tener un heap vacío al terminar su programa**. Si no lo tenemos, hay que buscar en cuál función debemos colocar `free()`.

Al finalizar, pruebe su programa con:
```
make vector
./vector
```

## Ejercicio 2: Bubble Sort
### ¿Qué es Bubble Sort?

En CC2 usted conoció varios algoritmos de ordenamiento, el más sencillo de ellos era Bubble Sort. La ventaja de este es que es el más fácil de implementar, la desventaja es que puede llegar a ser el más tardado.

Aquí tiene un pseudocódigo de este algoritmo:

```
FOR i FROM 0 TO size - 1 DO
    swapped ← false
    FOR j FROM 0 TO size - i - 1 DO
        IF array[j] > array[j + 1] THEN
            swap(array[j], array[j + 1])
            swapped ← true
        END IF
    END FOR
    IF swapped = false THEN
        BREAK
    END IF
END FOR
```

Note que esta es una versión ligeramente distinta a la vista en CC2, esta es un poco más eficiente.

### ¿Qué deben hacer?

Vaya al archivo _bubble.c_ en la carpeta del ejercicio 2 e implemente las funciones `swap()` y `bubbleSort()`.

`swap()` debe intercambiar el contenido de las casillas indicadas, y `bubbleSort()` debe implementar el algoritmo mostrado en el pseudocódigo anterior.

Resuelva este problema usando solamente notación de punteros. Si utiliza notación de arreglos, es decir `array[pos]`, el autograder le dará cero par este ejercicio.

Al finalizar, pruebe su programa con:
```
make bubble
./bubble
```

## Solución de problemas

Ante cualquier problema de compilación, primero haga clean y luego reintente compilar.
```
make clean
```

En el Makefile ya está la bandera necesaria para poder debuggear, entonces puede diagnosticar sus problemas usando cgdb.
```
cgdb vector
cgdb bubble
```

## Entrega de laboratorio

Recuerde probar su laboratorio usando el autograder.

```
./check
```

Este laboratorio tiene dos series que valen 50 puntos cada una

Luego **envíe el link de su repositorio de Github en el GES**. El GES tiene una opción para enviar links, ÚSELA. Si envía algún txt, pdf, zip, etc. su laboratorio no se calificará, es decir tendrá cero.