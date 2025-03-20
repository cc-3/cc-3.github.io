# Lab 6 - Utils

## Objetivos
* Continuar trabajando con C
* Realizar más operaciones con bits
* Dejar listas algunas funciones para el proyecto 2

## Preparación

Obtenga sus archivos base [aquí](https://classroom.github.com/a/PLACEHOLDER). Recuerden que deben aceptar la asignación de **GitHub Classroom** y se les creará automáticamente un repositorio con una extensión que termina con su usuario de GitHub. Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

## Utils

Para su proyecto 2 necesitará varias funciones auxiliares, cuyas tareas van relacionadas con reconstruir inmediatos. En este laboratorio trabajaremos tres de estas funciones: `bitExtender`, `get_store_offset` y `get_branch_distance`.

### bitExtender

En el proyecto 2 estaremos trabajando con números de distintos tamaños. Esta función se encarga de realizar la extensión de signo, sin importar cuántos bits tenga nuestro número. 

Note que en algunos casos se le estarán dando bits "extras" respecto a lo que size le indica. Considere todo lo que vaya más allá de size como dato basura y no lo tome en cuenta al momento de determinar el signo.

Revise estos ejemplos:

```
Me dan field = 0b110011 y size = 4
Me están diciendo que solo los 4 bits menos significativos me sirven
Mi valor en realidad es 0b0011, por lo que tiene signo positivo
Al realizarle la extensión de signo me queda 0b...00000011
(las casillas no mostradas están llenas de 0s porque es positivo)
```

```
Me dan field = 0b110011 y size = 5
Me están diciendo que solo los 5 bits menos significativos me sirven
Mi valor en realidad es 0b10011, por lo que tiene signo negativo
Al realizarle la extensión de signo me queda 0b...11110011
(las casillas no mostradas están llenas de 1s porque es negativo)
```

### get_store_offset

Cuando hacemos la codificación de los store (tipo S) tenemos un inmediato de 12 bits con signo, sin embargo nos toca guardarlo en un espacio de cinco bits para la parte menos significativa, y un espacio de siete bits para la parte más significativa. En esta función su tarea es reconstruir ese número de 12 bits y luego aplicarle una extensión de signo (puede llamar a su función anterior) de modo que le queden 32 bits con signo.

A diferencia del ejemplo anterior, aquí no vienen bits basura adicionales. Vienen exactamente los cinco y siete bits que necesita.

Revise estos ejemplos:

```
Me dan seven = 0b1111111 y five = 0b00000
Primero debo concatenar esos dos números y obtengo 0b111111100000, el cuál es negativo
Luego le realizo la extensión de signo y mi respuesta final debería ser
0b...11111111111111100000
(las casillas no mostradas están llenas de 1s porque es negativo)
```

```
Me dan seven = 0b0000001 y five = 0b00001
Primero debo concatenar esos dos números y obtengo 0b000000100001, el cuál es positivo
Luego le realizo la extensión de signo y mi respuesta final debería ser
0b...00000000000000100001
(las casillas no mostradas están llenas de 0s porque es positivo)
```

### get_branch_distance

Antes de continuar, asegúrese que entiende como codificar un branch (estudiantes de 2025: esta clase la tuvimos por Zoom, aproveche las grabaciones en su GES).

Al codificar un branch, por un breve momento teníamos un inmediato de 13 bits al cuál le pasabamos eliminando el cero menos significativo. Los 12 bits que nos quedaban iban partidos de forma especial...

```
Tengo 13 bits, es decir [12:0]
Elimino el cero menos significativo, me quedo con [12:1]

Tengo disponibles un espacio de siete bits y un espacio de cinco bits

En el espacio de siete bits debo colocar [12 | 10:6]
es decir, el bit 12 y concatenado a este van los bits [10:6]

En el espacio de cinco bits debo colocar [4:1 | 11]
es decir, los bits [4:1] y concatenado a estos va el bit 11
```

Su trabajo en esta función es reconstruir el inmediato, es decir, revertir el proceso anterior.

```
Me dan seven = 0bDBBBBBB y five = 0bAAAAC
(estaré usando algunas letras para hacer un ejemplo lo más genérico posible
cada una de esas letras representa un bit, no un hexadecimal)

Debo usar operaciones bitwise para llegar a esto
0bDCBBBBBBAAAA

Luego debo agregarle el cero que pasé eliminando antes
0bDCBBBBBBAAAA0

Finalmente, debo hacer extensión de signo para llegar a tener 32 bits
0b...DDDDDDDDCBBBBBBAAAA0
(note que el bit 12, es decir nuestra D del ejemplo, cumple con el trabajo
de ser el bit de signo)
```


# Calificación

Puede probar su ejercicio haciendo make y luego ejecutando:
```
make utils
./utils
```

Cuando esté listo, puede obtener su nota con el check:
```shell
./check
```

En esta ocasion tenemos un solo ejercicio de 100 puntos en total, con crédito parcial.

Cada vez que realice un avance, suba su código a Github. Cuando termine el periodo o termine su laboratorio, suba el link de su repositorio al GES.
