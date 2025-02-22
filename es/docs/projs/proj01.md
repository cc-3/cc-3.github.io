# Proyecto 1: Compresión

## Objetivos

* Mejorar sus habilidades de programación en C.
* Implementar un algoritmo de compresión sencillo (y dos inventados :P)

## Conocimientos previos

Para realizar este proyecto ustedes tienen que tener claros algunos conceptos. Debe dominar por completo estos temas:

* Operaciones binarias en C (`xor`, `or`, `and`, etc).
* Operaciones aritméticas con signo y sin signo en C.
* Type casting en C.
* Control de flujo en C (condicionales, ciclos, etc).
* Funciones en C.
* Uso correcto de `printf`.

Adicionalmente, estos temas le pueden facilitaar la vida, aunque no es obligatorio aplicarlos en este proyecto:

* Entender qué son las estructuras (`struct`) en C.
* Entender cómo funcionan las uniones (`union`) en C.

Le recomendamos que los conozca desde ya, en el siguiente proyecto los necesitará.

## Introducción

En este proyecto implementaremos tres algoritmos de compresión. El primero de ellos, **Run Length Encoding (RLE)** es uno de los más sencillos que existe, a tal punto que a veces puede llegar a generar un archivo más grande que el original. El siguiente, **Twin Encoding** es una invención nuestra que se basa en RLE y que por lo general obtiene buenos resultados. El tercero, **Mini Encoding** también es una invención nuestra para aprovechar que solo estamos trabajando con texto.

Elegimos esta mezcla de algoritmos sencillos e inventados porque son fáciles de implementar y rápidos de ejecutar. Adicionalmente, al tener algunos inventados por nosotros, nos será más fácil detectar si alguna AI lo implementó por usted.

## Preparación

Lea las instrucciones completas. Pregunte las dudas conceptuales que le surjan antes de empezar a escribir código. Únase al canal de `#proyecto` que hay en Slack.

Cuando haya entendido lo que tiene que hacer, y los algoritmos de codificación, descargue el código base desde aquí

TO DO - COLOCAR CODIGO BASE

Puede trabajar en parejas o de forma individual. No se aceptan grupos de tres o más personas. Puede trabajar mezclado entre las secciones de la matutina, pero al momento de la calificación personal deben llegar en el mismo horario.

Al aceptar la asignación, el primer miembro debe pasar creando el grupo. Ingrese un nombre que represente al grupo y que no esté ya en los grupos existenes. Use un nombre bonito y creativo! (Alguna referencia a su equipo favorito, alguna canción que les guste, su carta favorita de Magic, algún anime, etc., lo que quiera siempre y cuando no sea ofensivo). POR FAVOR no use nombres aburridos como "Proyecto 1", "CC3 seccion X", etc. Grupos con nombres así se nos suelen confundir y terminamos poniéndoles menos atención.

![Create group](/img/projs/proj01/classroom1.png)

Si desean unirse a un grupo ya creado, tienen que buscar el nombre del grupo y pulsar el botón que dice **join**.

![Join group](/img/projs/proj01/classroom2.png)

**Tienen que tener mucho cuidado al unirse a un grupo ya existente, pues al unirse tendrá acceso inmediato al código que ya esté subido por parte del otro grupo. Si se une a un grupo incorrecto lo consideraremos como <span style="color: red">PLAGIO</span> pues podrían pasar robando código de esta manera.**

Después de crear o unirse al grupo, ya puede clonar el repositorio hacia su máquina local.

## Estructura del proyecto

Cuando hayan clonado el repositorio, van a encontrar los siguientes archivos:

```shell
Makefile
part1.c
part2.c
part3.c
README.md  
compress.c
compress.h
types.h  
utils.c  
utils.h
```

Usted debería modificar los siguientes archivos:

* `utils.c` y `utils.h`: Archivo auxiliar donde puede poner funciones que le ayuden.
* `types.h`: Archivo auxiliar donde puede poner definiciones de tipos que le ayuden.
* `part1.c`: Aquí implementará Run Length Encoding.
* `part2.c`: Aquí implementará Twin Encoding.
* `part3.c`: Aquí implementará Mini Encoding.


**No cree archivos adicionales ni elimine ninguno de los ya existentes, de lo contrario el autograder le dará cero**

**En types.h puede usar los typedef que quiera, así como crear structs y unions. En este archivo no debería haber código, solo definiciones**

**En utils.h coloque las firmas de funciones extras que quiera crear. El código para implementarlas debería ir en utils.c**

Los siguientes archivos no es necesario que los modifique, pero puede leerlos para entender al 100% el flujo del proyecto:

* `Makefile`: Para compilar y probar su código.
* `tests/reg/`: Archivos de prueba, los archivos regulares que se comprimiran.
* `tests/comp/`: Archivos de prueba, los archivos ya comprimidos que se descomprimiran.
* `compress.h` y `compress.c`: Main y punto de inicio del proyecto.

## Run Length Encoding (part1)

El algoritmo Run Length Encoding (RLE) toma un archivo y va viendo su contenido byte por byte o caracter por caracter (para facilitar el proyecto, usaremos solo letras mayúsculas, minúsculas y espacios; el newline será especial; no usaremos números ni símbolos en el input). Cuando vemos varios caracteres iguales los vamos a comprimir colocando un número que indica cuántas repeticiones tuvimos.

Observe este ejemplo:
```
Input:
AABBBB

Output esperado:
2A4B
```

Encontramos dos `A` seguidas, entonces en nuestra salida colocamos `2A`. Luego encontramos cuatro `B` seguidas, entonces en nuestra salida colocamos `4B`.

Otro ejemplo:
```
Input:
XXXXXYZZZZZXXXX

Output esperado:
5X1Y5Z4X
```

Encontramos un grupo de cinco `X` y ponemos `5X`. Luego encontramos una `Y` suelta y ponemos `1Y`. Luego cinco `Z` y ponemos `5Z`. Finalmente encontramos otras cuatro `X` y ponemos `4X`. Note que estas están separadas de las primeras, entonces no las podemos "fusionar" ni nada, forman su propio grupo.

Hasta ahora todo se ve bien, pero considere el siguiente caso:
```
Input:
ABABABAB

Output esperado:
1A1B1A1B1A1B1A1B
```

Note que RLE tiene una debilidad grave. Si no hay caracteres que agrupar, en lugar de comprimir, nuestro archivo crecera; esto es inevitable y es parte del algoritmo.

Los newline serán un caracter especial. Estos solo los debemos copiar sin ponerles número ni nada.
```
Input:
AA
BBBB
CCDD

Output esperado:
2A
4B
2C2D
```

El espacio es un caracter normal, este si lleva número.
```
Input (hay dos espacios entre cada juego de letras):
aa  bb
ccc  ddd

Output esperado:
2a2 2b
3c2 3d
```

Hay algún caso de prueba donde hay espacios al principio o al final, pero no se preocupe mucho por esto, debería tratar al espacio como a un caracter normal.

Si necesita ejemplos adicionales puede pedirlos en `#proyecto` en Slack, o revisar los que vienen en la carpeta `tests`. En la subcarpeta `reg` encuentra los originales descomprimidos. En la subcarpeta `comp` identificados con la extensión `.rle` encuentra los comprimidos usando RLE.

### ¿Qué debe hacer en esta parte?

En el archivo `part1.c` debe implementar las funciones `compress_rle` y `decompress_rle`.

`compress_rle` comprime el input dado y luego lo imprime a pantalla.
```
/* 
  compress_rle recibe un sFile
  Consulte en types.h cómo está definida esta estructura
*/
void compress_rle(sFile *f) {

  /*
    El sFile dado tiene un data
    Este data es el input para su algoritmo RLE
    Comprimalo y coloque el resultado en compressed
  */

  Byte compressed[10];

  /*
    El arreglo compressed se ve muy pequeno
    Cambielo por algo que sí le sirva
    Al finalizar la compresión, imprima a compressed
  */

  printf("%s", compressed);

  /*
    No modifique ese printf
    De lo contrario, el autograder fallará
  */
}
```

`decompress_rle` realiza la operación opuesta, pero recibe su input de la misma manera.
```
/* 
  decompress_rle recibe un sFile
  Consulte en types.h cómo está definida esta estructura
*/
void decompress_rle(sFile *f) {

  /*
    El sFile dado tiene un data
    Este data es el input para su algoritmo RLE
    Ahora le toca descomprimir, es decir revertir el proceso anterior
    Coloque su resultado en decompressed
  */

  Byte decompressed[10];

  /*
    El arreglo decompressed se ve muy pequeno
    Cambielo por algo que sí le sirva
    Al finalizar la descompresión, imprima a decompressed
  */

  printf("%s", decompressed);

  /*
    No modifique ese printf
    De lo contrario, el autograder fallará
  */
}
```

## Twin Encoding (part2)

Para este momento se habrá dado cuenta que RLE no es muy eficiente. Además, si ya fue a explorar los casos de prueba, habrá visto que no hay muchas repeticiones, entonces nos aprovecharemos de esto para hacer una mejora.

Conozcamos el Twin Encoding a través de algunos ejemplos.

#### Ejemplo 1
```
Input:
AAABBBB
XXXXYYYYY

Output esperado:
4AB
EXY
```

Ese output está algo extrano... entendámoslo:
```
AAABBBB se convirtió en 4AB

Tenemos tres A y cuatro B
En lugar de escribir esto como 3 y 4 lo escribiremos como 0x34
"Empacaremos" un par de números en un solo byte

Y el 4 que miramos de dónde salió?
Revise la tabla ascii y busque el 0x34
Es justamente el 4 que vemos en el output!
```

Ahora que ya sabe que estamos usando la tabla ascii, trate de explicar por su cuenta la `E` que aparece abajo. Aquí está la explicación:
```
XXXXYYYYY se convirtió en EXY

Tenemos cuatro X y cinco Y
En lugar de escribir esto como 4 y 5 lo escribiremos como 0x45
El 0x45 es justamente la E que vemos en el output!
```

#### Ejemplo 2
```
Input:
aaaaazzzzzzzzzzz

Output esperado:
[az
```

Tenemos cinco `a` y once `z`, entonces al comprimir estaremos guardando un `0x5b`. Al revisar la tabla ascii se dará cuenta que `0x5b` es el corchete cuadrado `[`

Note que al usar el Twin Encoding es posible que aparezcan algunos caracteres raros o no visibles. Baje a la sección de Consejos para ver algunas sugerencias sobre cómo visualizar estos caracteres.

#### Ejemplo 3
```
Input:
aaaaazzzzzzzzzzzbbbb
XXXXYYYYY

Output esperado:
[az@b
EXY
```

Veamos la explicación:
```
Cinco repeticiones de 'a' y once repeticiones de 'z' forman 0x5b
0x5b es el corchete cuadrado '['

La 'b' no tiene quien la acompane
Note que aunque hay más caracteres en la línea de abajo,
estos no los tomamos en cuenta
Desde el principio dijimos que el newline es especial

Cuatro repeticiones de 'b' y no tener acompanante formarán 0x40
0x40 es la arroba '@'

Pasamos a la línea de abajo

Cuatro repeticiones de `X` y cinco repeticiones de `Y` forman 0x45
0x45 es la letra 'E'
```

#### Ejemplo 4
```
Input:
kkkkkkkooZZZZZMMMMMMMMMM


Output esperado:
rkoPZM
```
Un último ejemplo, intencionalmente sin explicación, para que pueda practicar un poco.

Si necesita ejemplos adicionales puede pedirlos en `#proyecto` en Slack, o revisar los que vienen en la carpeta `tests`. En la subcarpeta `reg` encuentra los originales descomprimidos. En la subcarpeta `comp` identificados con la extensión `.twin` encuentra los comprimidos usando Twin Encoding, recuerde que estos posiblemente contengan caracteres raros o no visibles.

### ¿Qué debe hacer en esta parte?

En el archivo `part2.c` debe implementar las funciones `compress_twin` y `decompress_twin`.

`compress_twin` comprime el input dado y luego lo imprime a pantalla.
```
/* 
  compress_twin recibe un sFile
  Consulte en types.h cómo está definida esta estructura
*/
void compress_twin(sFile *f) {

  /*
    El sFile dado tiene un data
    Este data es el input para su algoritmo Twin
    Comprimalo y coloque el resultado en compressed
  */

  Byte compressed[10];

  /*
    El arreglo compressed se ve muy pequeno
    Cambielo por algo que sí le sirva
    Al finalizar la compresión, imprima a compressed
  */

  printf("%s", compressed);

  /*
    No modifique ese printf
    De lo contrario, el autograder fallará
  */
}
```

`decompress_twin` realiza la operación opuesta, pero recibe su input de la misma manera.
```
/* 
  decompress_twin recibe un sFile
  Consulte en types.h cómo está definida esta estructura
*/
void decompress_twin(sFile *f) {

  /*
    El sFile dado tiene un data
    Este data es el input para su algoritmo Twin
    Ahora le toca descomprimir, es decir revertir el proceso anterior
    Coloque su resultado en decompressed
  */

  Byte decompressed[10];

  /*
    El arreglo decompressed se ve muy pequeno
    Cambielo por algo que sí le sirva
    Al finalizar la descompresión, imprima a decompressed
  */

  printf("%s", decompressed);

  /*
    No modifique ese printf
    De lo contrario, el autograder fallará
  */
}
```

## Mini Encoding (part3)

TO DO - ESCRIBIR EXPLICACIÓN DEL ALGORITMO

### ¿Qué debe hacer en esta parte?

TO DO - ESCRIBIR EXPLICACIÓN DEL CÓDIGO

## Probando el proyecto

Compile su proyecto usando el make
```
make compress
```

Si tiene algún error raro, haga un clean y luego reintente el make anterior
```
make clean
make compress
```

Una vez compruebe que su proyecto compila, primero debería probar con archivos individuales y/o con el make. Una vez que los primeros archivos salgan bien, ya puede probar con el autograder.

### Probando con archivos individuales

Mande a llamar al ejecutable `./compress` que se generó, usando alguna de estas banderas.

* `-d` para descomprimir o `-c` para comprimir, utilice solo una de estas a la vez.
* `-r` para RLE, `-t` para Twin o `-m` para Mini, utilice solo una de estas a la vez.

Combinelas para elegir qué modo quiere usar. Aquí algunos ejemplos:
```
Comprimir usando RLE (banderas -c y -r)
Comprima alguno de los archivos de la carpeta tests/reg

./compress -c -r tests/reg/hello.input

Descomprimir usando Twin (banderas -d y -t)
Descomprima alguno de los archivos de la carpeta tests/comp

./compress -d -t tests/comp/hello.twin
```

Esto le imprimira a pantalla el resultado. Si le resulta incómodo y prefiere verlo en un archivo, recuerde que en Linux existe la redirección `>`. Recuerde que al comprimir en Twin o Mini podrían haber algunos caracteres no visibles o extranos, consulte más adelante la sección de Consejos para más información.

### Probando con el make

El make le permite probar de forma fácil varios archivos a la vez. Por defecto prueba los archivos `uno`, `dos` y `tres` que son bastante básicos.

Utilice el comando correspondiente según lo que quiera probar:
```
make compress_rle
make decompress_rle
make compress_twin
make decompress_twin
make compress_mini
make decompress_mini
```

Si todo sale bien, el make le mostrará algo como esto:
```
uno_rle TEST PASSED!

dos_rle TEST PASSED!

tres_rle TEST PASSED!
---------Compress RLE Tests Complete---------
```

Si hay alguna diferencia entre la salida esperada y la de su programa, verá algo como esto:
```
1,3c1,3
< salida esperada
< hay una pequena diferencia
< aqui
---
> mi salida
> hay una gran diferencia
> aca
```

Esto lo está produciendo la utilidad `diff` de Linux. El `diff` solo nos muestra las diferencias, entonces entre menos líneas aparezcan es mejor. Nuestro objetivo es que ya no nos muestre nada sino solo queden los `PASSED` mencionados arriba.

Si quiere agregar más pruebas aparte de las tres que trae, vaya a su `Makefile` y agregue aquí los tests adicionales que desee (solo nombre, sin extensión).
```
# Put your tests here
BASIC_TESTS := uno dos tres
```

No modifique nada más del `Makefile` o tendrá problemas graves para compilar.

### Probando con el autograder

Si ya hizo bastantes pruebas con archivos individuales y siente que su proyecto ya está listo, es momento de la verdad, puede probar usando el `./check` de siempre.
```
   ___       __                        __       
  / _ |__ __/ /____  ___  _______ ____/ /__ ____
 / __ / // / __/ _ \/ _ \/ __/ _ \/ _  / -_) __/
/_/ |_\_,_/\__/\___/\_, /_/  \_,_/\_,_/\__/_/
                   /___/

             Machine Structures
     Great Ideas in Computer Architecture
            Proj 01: Compression


Exercise              Grade  Message
------------------  -------  ---------
RLE compression          17  passed
RLE decompression        17  passed
Twin compression         17  passed
Twin decompression       17  passed
Mini compression         17  passed
Mini decompression       17  passed
```

Si obtiene algo como esto, felicidades, su proyecto está terminado.

## Consejos

TO DO - COLOCAR CONSEJOS

## Preguntas Frecuentes

### 1. ¿Cómo puedo empezar?

Lea y entienda todos los archivos. Lea y entienda todos los algoritmos de compresión. Se recomienda comenzar en orden, es decir con la compresión RLE pues las otras están basadas en ella.

### 2. Al ojo estoy obteniendo los resultados esperados, pero no obtengo el PASSED ni puntos en el autograder.

Probablemente su salida tiene algún caracter adicional. Asegúrese de estar usando los `printf` que aparecían en el código base. Si por accidente los cambió, puede buscarlos aquí arriba en las instrucciones.

### 3. ¿Puedo crear mis propias funciones?

Sí, cree todas las que necesite para tener código entendible y ordenado.

Si las planea usar en un solo archivo, las puede declarar allí mismo. Recuerde que en C debería tener la firma de su función cerca del inicio y luego la implementación abajo.

Si las planea usar en varios archivos, coloque las firmas en `utils.h` y su implementación en `utils.c`. 

No renombre, cambie declaraciones, ni elimine ninguna de las funciones existentes.

## Entrega

Al igual que los laboratorios, el proyecto se entrega vía Github. Al finalizarlo haga add, commit y push. Ambos miembros del equipo tienen que subir el link del repositorio al GES. **No se les pondrá nota si no tienen link en el GES.**

En este y los demás proyectos debe hacer commits continuamente. **Si no tiene suficientes commits, se le restarán puntos.**

¿Cuánto es suficientes commits? Usted lo sabrá al empezar a trabajar, nosotros estimamos que un commit por cada día que trabaje en el proyecto es un buen punto de partida.

Ambas personas deben realizar commits. **Si un miembro no realizó commits, se le restarán puntos.**

En Slack en los próximos días encontrará una guía sobre cómo usar git cuando trabajamos en equipo. Léala y entiéndala para evitar problemas al subir sus archivos.

## Instruction Bounty Hunter

Este es un proyecto nuevo, entonces las instrucciones están recién escritas. Si nota algún error (algún comando no funciona, algún link está roto, algún ejemplo está mal) indíquelo a su catedrático a través de Slack y se le darán algunos puntos extras. Solo la primera persona en reportar cada error se lleva los puntos.

La falta de `ñ` y de tildes no es un error válido para puntos extras, simplemente mi teclado está en inglés :P