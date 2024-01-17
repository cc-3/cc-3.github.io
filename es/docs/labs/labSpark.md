# Lab 12 - MapReduce y Spark

## Objetivos

 * Obtener experiencia ejecutando MapReduce y conseguir un conocimiento más profundo del paradigma MapReduce.
 * Familiarizarse con Apache Spark y conseguir experiencia con Spark en una instalación local.
 * Aprender  a aplicar el paradigma MapReduce a Spark implementando ciertos algoritmos en Spark.


## Preparación

Tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/MVBf0hH7). Recuerden que tienen que aprovechar el uso de Git y subir el link de su repositorio al GES, así como al autograder, de lo contrario su nota será de **0**.

**Por favor revisen la sección de calificación para conocer el límite de submits que tienen**.

Cuando ya se haya creado el repositorio, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd>CTRL</kbd><kbd>+</kbd><kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

También, tienen que instalar el entorno de Python para este laboratorio. Para hacer esto, ejecuten lo siguiente:

```shell
conda env create -f environment.yml
```

Respondan al mensaje de instalar paquetes con "y" (sin comillas). Después de la instalación, corran el siguiente comando para activar el entorno virtual:

```shell
conda activate lab12
```

Cuando hayan terminado con el laboratorio pueden desactivar el entorno con:

```shell
conda deactivate
```

## Introducción

En clase los hemos expuesto a cluster computing (en particular, al framework MapReduce), como funciona y se ejecuta, pero ahora es tiempo de que ganen experiencia corriendo programas utilizando estos frameworks. En este laboratorio los vamos a introducir a **Spark** para que practiquen escribiendo rutinas de Map y Reduce. Este framework tiene su propia página en linea, así que son libres de probar instalarlo localmente en sus computadoras personales, de todas formas es más fácil utilizar la máquina virtual que les proporcionamos para completar este laboratorio. Asegúrense de entender bien el framework de Spark, ya que lo vamos a estar utilizando en el último proyecto del curso.

### Variables Globales

Cuando estén utilizando Spark o un framework de cluster computing, no utilicen variables globales. Esto mata el propósito de tener múltiples tareas corriendo en paralelo y crea cuellos de botella cuando múltiples tareas tratan de acceder a la misma variable global. Como resultado, muchos algoritmos son implementados sin el uso de variables globales. En Spark pueden hacer uso de variables ***broadcast***, sin embargo, no las vamos a necesitar en este laboratorio.

### Como correr Spark

Para este laboratorio y en el proyecto les vamos a dar un archivo que les va a ayudar a correr los archivos de Spark, pero cuando ustedes utilicen Spark afuera de la clase (que deberían), van a necesitar saber como correr Spark en la línea de comandos. Para poder correr un archivo de Spark `foo.py` (similar a como ustedes corren un programa de Python `foo.py`) solo utilicen el siguiente comando:

```shell
spark-submit foo.py # corre el archivo de spark foo.py
```

Si su archivo de Spark necesita argumentos (así como los archivos del laboratorio), el comando va a ser similar, pero ustedes van a pasar tantos argumentos como necesiten, así:

```shell
spark-submit foo.py arg1 arg2 # pasa los argumentos arg1 y arg2 a foo.py
```

Spark también incluye un intérprete que corre con la versión de Python que tengan instalada, y los va a dejar probar cualquier comando de Spark en el intérprete. El intérprete también puede recibir archivos (pasen los archivos con la bandera --py-files). Si están buscando solo correr el intérprete, el comando es el siguiente:

```shell
pyspark
```

Si quieren pre-cargar unos archivos (digamos a.py, b.py y c.py) pueden correr el siguiente comando:

```shell
pyspark --py-files a.py, b.py, c.py
```

### Tips rápidos de Depuración

Si alguna vez se encuentran preguntándose porqué su salida es extraña o algo está mal cuando corren sus archivos de Spark, recuerden los siguientes tips:

* Asegúrense de utilizar la función de acción [take](http://spark.apache.org/docs/latest/api/python/pyspark.html#pyspark.RDD.take). La función **take** puede ser utilizada sobre cualquier objeto *RDD* (así que prácticamente cualquier objeto que ustedes quieran paralelizar). Esta función toma un argumento `N`, que es un entero y va a retornar los primeros `N` elementos dentro de su objeto RDD.
* También pueden probar sus funciones (map, reduce, etc) adentro del intérprete de Spark (pyspark, mencionado arriba). Simplemente importen la función que quieren probar en pyspark (explicado arriba) y van a ser capaces de correr la función y verificar que la salida es la que ustedes esperan. Aquí hay un pequeño ejemplo de `wordcount.py`:

```shell
pyspark --py-files wordcount.py # corre el interprete de spark con el archivo wordcount.py
>>> from wordcount import flat_map # importa la funcion que quieren probar, flat_map, en este caso
>>> file = sc.sequenceFile("data/billOfRights.txt.seq") # carga el archivo sequencial billOfRights.txt.seq
>>> file.take(5) # retorna los primeros 5 elementos del RDD file
[(<doc_name_1>, <text 1>), (<doc_name_2>, <text 2>), ..., (<doc_name_5>, <text 5>)]
>>> flat_map_output = file.flatMap(flat_map) # corre la funcion importada flat_map sobre file
>>> flat_map_output.take(5) # retorna las primeras 5 palabras en el documento.
['Amendment', 'I', 'Congress', 'shall', 'make']
```

### Documentación y Otros Recursos

* Una guía rápida de programación en Spark (hagan click en la pestaña de Python para ver el código de Python) está disponile [aquí](http://spark.apache.org/docs/latest/rdd-programming-guide.html).
* Aquí hay un [link](#) a la documentación de la API. Para este laboratorio, no necesitan navegar mucho en ella, pero tomen un tiempo para verla cuando estén haciendo el proyecto.


## Python

Talvez algunos ya estén familiarizados con Python ya que ha ganado popularidad en los últimos años (es el lenguaje más utilizado en universidades para cursos introductorios de programación), además siempre está en las primeras posiciones de los lenguajes de programación más usados donde reposan los grandes como C y no hay que olvidar que es el scripting language por excelencia que utilizan compañias como Google, Facebook, etc. Se preguntarán ¿por qué aprender Python? además de ser una nueva herramienta en su toolbox de conocimientos, es un lenguaje flexible, rápido a pesar de ser interpretado y con dynamic typing (obvio no se compara con uno compilado y con static typing).

Antes de empezar este laboratorio, asumimos que ya leyeron el tutorial de Python que se les proporciona en el siguiente [link](/tutorials/python/), es imperativo que lean el tutorial, en otros años han tratado de saltarse este paso y el resultado no es muy bueno, **LEAN EL TUTORIAL**.

## Ejercicio 1: Grafos Dirigidos (Warm-Up)

Este ejercicio no tiene nada que ver con MapReduce, pero les servirá para practicar sus habilidades de Python. Tienen que implementar el método `path` de la clase `DirectedGraph`, el constructor de esta clase recibe de parámetro una matriz de booleans, la cual representará la matriz de adyacencias de un grafo dirigido. Los estados iran del 0, hasta length - 1 de la matriz. El método `path(self, start, end)` devuelve una lista de Python con el camino más corto desde el estado  `start` al estado `end`, el resultado (los elementos de la lista) debe contener los estados por los que se deben de pasar incluyendo el estado `start` (el inicio) y `end` (el final).

Si nuestro grafo `G` fuera el siguiente:

<p align="center">
  <img src="/img/labs/lab12/BFS.png" alt="BFS Ejemplo"/>
</p>

y quisieramos el camino más corto del estado 2 a los demás estados, obtendriamos el siguiente resultado:

```
from state: 2
  to state: 0 = shortest path: 2 -> 0, distance: 1
  to state: 1 = shortest path: 2 -> 0 -> 1, distance: 2
  to state: 3 = shortest path: 2 -> 3, distance: 1
  to state: 4 = shortest path: 2 -> 3 -> 4, distance: 2
  to state: 5 = shortest path: 2 -> 3 -> 5, distance: 2
  to state: 6 = shortest path: 2 -> 3 -> 4 -> 6, distance: 3
  to state: 7 = shortest path: 2 -> 3 -> 5 -> 7, distance: 3
```

Para este ejercicio les recomendamos utilizar ***Breadth-first search*** (BFS), para los que no se recuerdan aquí hay una variante que solo toma en cuenta el arreglo de predecesores $\pi$ (¿Por qué solo predecesores?):

```c
BFS(G, s) {
  for each vertex u ∈ V[G] – {s} {
   visited[u] = false
   π[u] = null
  }
  visited[s] = true
  π[s] = null
  Q = [s]
  while (Q != ∅ ) {
   u = Q.dequeue()
   for each v ∈ Adj[u] {
     if not visited[v] {
       visited[v] = true
       π[v] = u
       Q.enqueue(v)
     }
   }
  }
  return π
}
```

Pueden probar su implementación utilizando el siguiente comando:

```shell
make graph
```

Esto probará su implementación con el grafo que se muestra en la figura de arriba, de esta manera pueden saber si el resultado que obtienen es el correcto.

## Ejemplo: Ejecutando un contador de palabras

En este ejemplo vamos a ejecutar el ***hola mundo*** de MapReduce que es un contador de palabras. Pueden probarlo con:

```shell
make sparkwc-small
```
Esto ejecutará `wordcount.py` con `billOfRights.txt.seq`. El resultado debería estar en `wc-out-wordcount-small/part-00000`. Una característica interesante de Spark es que es un motor de cómputo distribuido en memoria, asi que no tiene un almacenamiento de archivos predeterminado. Por ello, utilizamos el **[Hadoop](http://hadoop.apache.org/) Distributed File System (HDFS)** para poder guardar el resultado. Los exhortamos a leer acerca de Hadoop por su cuenta. en general, Hadoop requiere que el directorio de salida no exista al ejecutar un programa de MapReduce, pero el `makefile` se encarga de esto, removiendo el directorio de salida anterior. Traten con el archivo más grande, `complete-works-mark-twain.txt.seq`:

```shell
make sparkwc-medium
```
Su salida para este comando estar en el directorio `spark-wc-out-wordcount-medium`. Busquen en el archivo alguna palabra como "the" para entender mejor la salida. Tomen un tiempo para ver y analizar `wordcount.py`, traten de entender lo que está haciendo el código les va a servir para el siguiente ejercicio del laboratorio.

## Ejercicio 2: Document Word Count

Abran `docwordcount.py`. Noten que tiene casi el mismo código que `wordcount.py`, que acaban de probar. Modifíquenlo para contar la cantidad de documentos que contienen cada palabra en lugar de la cantidad de veces que aparece una palabra en la entrada.

Para ayudarlos a entender el código, hemos agregado varios comentarios, pero siéntanse libres de revisar las [transformaciones](http://spark.apache.org/docs/latest/programming-guide.html#transformations) y [acciones](http://spark.apache.org/docs/latest/programming-guide.html#actions) en la página de Spark para una explicación más detallada de algunos métodos que pueden usarse en Spark.

En esta parte, les será útil revisar los links de transformaciones y acciones de arriba, ya que hay métodos que pueden usar para ayudarlos a ordenar una salida o remover items duplicados. Para ayudarlos a distinguir cuándo aparece una palabra en un documento, tal vez quieran hacer uso del `document_id` también -- esto se menciona en los comentarios de `flat_map()`.

Finalmente, asegúrense de ordenar en orden alfabético el resultado final. (pista: ¿Habrá alguna otra transformación que puedan usar?)

Pueden probar `docwordcount.py` usando cualquiera de estos dos comandos (para los 2 datasets):

```shell
make sparkdwc-small  # Output in spark-wc-out-docwordcount-small/
```
O
```shell
make sparkdwc-medium # Output in spark-wc-out-docwordcount-medium/
```

## Ejercicio 3: Full Text Index Creation

Abran `index.py`. Noten que el código es similar a `docwordcount.py`. Modifíquenlo para desplegar cada palabra y una lista de ocurrencias (identificador de documento, seguido del índice de **CADA** vez que la palabra esté en ese documento). Asegúrense de que los índices empiecen con cero. La salida tendría que tener lineas que se vean como lo siguiente:

```
(word1	document1-id, word# word# ...)
(word1	document2-id, word# word# ...)
. . .
(word2	document1-id, word# word# ...)
(word2	document3-id, word# word# ...)
. . .
```

Noten que hay una linea para CADA documento en el que la palabra aparezca y CADA par de palabra y documento debe tener solo UNA lista de índices. Recuerden que también necesitan desplegar el `document ID`.

Para este ejercicio, tal vez no necesiten todas las funciones definidas. Si una función no se utiliza, siéntanse libres de remover el método que la llama. Asegúrense de que su resultado esté ordenado, al igual que los otros ejercicios.

Pueden probar su `index.py` usando cualquiera de los dos comandos (para cada dataset):

```shell
$ make index-small # Output in spark-wc-out-index-small/
```
O

```shell
$ make index-medium # Output in spark-wc-out-index-medium/
```

La salida de `make-index-medium` será un archivo muy grande. Para poder ver el contenido de manera más sencilla, pueden usar los comandos `cat`, `head`, `more`, y `grep`:

```shell
$ head -25 OUTPUTFILE       # view the first 25 lines of output
$ cat OUTPUTFILE | more     # scroll through output one screen at a time (use Space)
$ cat OUTPUTFILE | grep the # output only lines containing 'the' (case-sensitive)
```
Verifiquen su salida. Abran `complete-works-mark-twain.txt` y eligan algunas palabras. Cuenten manualmente algunos índices de la palabra y asegúrense de que todos aparezcan en su archivo de salida.

## Calificación

Al terminar, deben de subir su laboratorio al autograder con:

```shell
./submit <TOKEN>
```

Para este laboratorio su solución será evaluada en un servidor de AWS EC2 por lo que únicamente tienen permitido hacer ***3 submits***. Les aconsejamos probar bien su código antes de enviarlo al autograder. No olviden también subir el link de su repositorio en Github al GES.
