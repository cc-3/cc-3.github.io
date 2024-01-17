# Lab 9 - Localidad de Datos y Caches

## Objetivos
* Entender cómo los patrones de acceso a memoria determinan las tasas de _cache hits_.
* Pensar qué patrones de acceso a memoria producen BUENAS tasas de acierto.
* Aprender sobre una técnica para mejorar los accesos a memoria.

## Preparación
[Aquí](https://classroom.github.com/a/OlFSJ1xg) pueden descargar los archivos que utilizarán para esta práctica.


### Notas
* Para esta práctica de laboratorio se utilizará [**Venus**](https://venus.cs61c.org/), un simulador de código de ensamblador en línea. Este programa permite visualizar los accesos al cache.
* Este laboratorio es complicado, largo y difícil. **Asegúrense de saber lo requerido sobre el tema antes de subir los resultados al autograder y ¡PREGUNTEN si no entienden!**
* No se olviden que el tema de caches viene en el examen parcial, por lo que la visualización de acceso a caches es una manera práctica para aprender sobre los _cache hits_ y _cache misses_.

En este punto, lean **cache.s** para tener una idea de qué es lo que hace. Asegúrense de revisar qué contienen los registros de argumentos antes de proceder a analizar la configuración del cache. 
* Lo más importante de entender de este archivo es que se pondrán en cero algunos elementos de un arreglo (opción 0) o se incrementarán (opción 1).
* Los elementos a editar están determinados por el _step size_ y la cantidad de veces que se realiza este procedimiento lo indica _repcount_. **Estos dos parámetros son los que más afectarán la cantidad de cache hits y misses que ocurrirán.** El valor de _option_ también alterará algunas, así como los parámetros del cache mismo, por supuesto.

## Ejercicio 1: Algunos Escenarios de Acceso a Memoria
Para este ejercicio deben de contestar las preguntas adjuntas, con el formato indicado, en el archivo `ex1.txt`. Intenten razonar cuál va a ser la tasa de aciertos ANTES de correr la simulación. Luego de ejecutar el código, asegúrense de entender **POR QUÉ** ocurre lo que ocurre.

*No duden en preguntar si se sienten confundidos. Eso es totalmente normal y los auxiliares están ahí para ayudarlos.*

Estas son buenas preguntas para hacerse mientras realizan los ejercicios: 
* ¿Qué tan grande es su **cache block**?
* ¿Cuántos accesos **consecutivos** (tomando en cuenta el _step size_) caben en un único block?
* ¿Cuánta data cabe en el cache COMPLETO?
* ¿Qué tan lejos, en memoria, están los bloques que mapean al mismo set (y que pudieran causar conflictos)?
* ¿Cuál es la asociatividad de su cache?
* ¿En qué parte del cache mapea algún bloque particular?
* Al considerar por qué un acceso específico es un hit o un miss: ¿ya se accedió a esta data antes? Si sí, ¿sigue en el cache o no?

### Escenario #1
**Cache Parameters:** (editados en la pestaña de "Cache" en el simulador)
* **Política de colocación:** Direct Mapping
* **Política de reemplazo de bloques:** LRU
* **Tamaño del set (bloques) (setSize):** 1
* **Cantidad de bloques:** 4
* **Tamaño de los bloques del cache (en _words_) (blockSize):** 2

**Parámetros del Programa:** (inicializando los valores de los argumentos en el código)
* **Tamaño del arreglo (arraySize):** 128 bytes
* **Tamaño del salto (stepSize):** 8
* **Número de repeticiones (repCount):** 4
* **Opción:** 0

**Tip**: Si les es difícil visualizar _qué está entrando en el cache_ en cada acceso a memoria simplemente viendo el código, prueben utilizando lápiz y papel: escriban cuál sería el tag:index:offset de las direcciones y averigüen cuáles direcciones de memoria mapean a los distintos sets en cache con los bits del index.

Preguntas:

1. ¿Qué combinación de parámetros produce el _hit rate_ que se puede observar? (Pista: Su respuesta debe de ser de la forma: "Porque [parámetro 1], en bytes, es _exactamente igual_ a [parámetro 2], en bytes.")
2. ¿En cuánto aumenta el hit rate al incrementar la cantidad de repeticiones de manera arbitraria (en %)?
3. ¿Cómo se puede modificar algún _parámetro del programa_ para mejorar el hit rate? **Nota**: No importa que accedan a los mismos elementos en el arreglo, sólo provean una modificación de un parámetro del programa que aumente el hit rate.	
<ol type="none">
	<li>
		<ol type="a">
			<li>Aumentar el tamaño del arreglo.</li>
			<li>Disminuir el tamaño del arreglo.</li>
			<li>Aumentar el tamaño del salto.</li>
			<li>Disminuir el tamaño del salto.</li>
			<li>Aumentar el número de repeticiones.</li>
			<li>Disminuir el número de repeticiones.</li>
			<li>Cambiar a la opción 1.</li>
		</ol>
	</li>
</ol>	

### Escenario #2
**Cache Parameters:**
* **Política de colocación:** N-Way Set Associative
* **Política de reemplazo de bloques:** LRU
* **Tamaño del set (bloques) (setSize):** 4
* **Cantidad de bloques:** 16
* **Tamaño de los bloques del cache (en _words_) (blockSize):** 4

**Parámetros del Programa:** (inicializando los valores de los argumentos en el código)
* **Tamaño del arreglo (arraySize):** 256 bytes
* **Tamaño del salto (stepSize):** 2
* **Número de repeticiones:** 1
* **Opción (repCount):** 1

Preguntas:

4. ¿Cuántos accesos a memoria hay por cada iteración en el ciclo interno? (Pista: No es uno.)	

5. ¿Cuál es el patrón que se repite de aciertos y fallos? 
<ol type="none">
	<li>
		<ol type="a">
			<li>miss/hit</li>
			<li>miss/hit/hit</li>
			<li>miss/hit/hit/hit</li>
			<li>hit/miss/miss/miss</li>
			<li>hit/miss</li>
		</ol>
	</li>
</ol>	

6. ¿Cómo se relaciona el hit rate con el patrón de la pregunta anterior?
<ol type="none">
	<li>
		<ol type="a">
			<li>Aplicando una media geométrica a los valores del patrón se puede obtener el hit rate.</li>
			<li>El hit rate es el resultado de una media aritmética del patrón.</li>
			<li>Se debe de calcular la media ponderada con los resultados del patrón.</li>
			<li>Al patrón se le debe aplicar la media armónica para calcular el hit rate.</li>
			<li>Ninguna de las anteriores.</li>
		</ol>
	</li>
</ol>

7. ¿Qué ocurre si se altera la cantidad de iteraciones de manera arbitraria?
<ol type="none">
	<li>
		<ol type="a">
			<li>La cantidad de cache misses aumenta.</li>
			<li>La cantidad de cache hits aumenta.</li>
			<li>La cantidad de cache misses se queda igual.</li>
			<li>La cantidad de cache hits se queda igual.</li>
			<li>El hit rate aumenta.</li>
			<li>El hit rate disminuye.</li>
			<li>El hit rate se mantiene constante.</li>
		</ol>
	</li>
</ol>

8. ¿Por qué le ocurre, lo indicado en la pregunta anterior, al hit rate?
<ol type="none">
	<li>
		<ol type="a">
			<li>Porque se aprovecha la localidad espacial.</li>
			<li>Porque se aprovecha la localidad temporal.</li>
			<li>Porque no se aprovecha la localidad espacial.</li>
			<li>Porque no se aprovecha la localidad temporal.</li>
			<li>Porque la cantidad de repeticiones no tiene impacto en el hit rate.</li>
		</ol>
	</li>
</ol>

**Nota importante para el archivo `ex1.txt`:** Solo se debe escribir las incógnitas en cada fila, estas deben estar separadas por una coma, sin espacios (si la pregunta posee más de una respuesta). Por ejemplo: 1.blockSize,stepSize,arraySize.

## Ejercicio 2: Ordenamiento de Ciclos y Multiplicación de Matrices
Si recuerdan, las matrices son estructuras de datos bidimensionales en donde cada elemento es accedido por medio de dos índices. Para poder multiplicar dos matrices, se puede utilizar tres ciclos anidados. Asumiendo que las matrices A, B y C son de nxn y guardadas en un arreglo de una dimensión, en donde sus elementos están ubicados de manera contigua en memoria: 

```
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        for (int k = 0; k < n; k++)
            C[i+j*n] += A[i+k*n] * B[k+j*n];
```

**Hecho:** La multiplicación de matrices se encuentran detrás de numerosos algoritmos de álgebra lineal	y la operación eficaz de ello es crítico para muchas aplicaciones dentro de las ciencias aplicadas.

Nótese que en el código superior los ciclos están ordenados como i, j, k. Si se examina el bucle más íntimo, se puede ver que este...:
* recorre B en pasos unitarios.
* recorre A en progresos de tamaño n.
* no recorre C.

**RECORDAR:** Para calcular la multiplicación de matrices de manera correcta, **no importa el orden de los ciclos**.

**PERO**, el orden elegido para acceder a los elementos de las matrices pueden tener **un impacto muy grande en el rendimiento**. Los caches se benefician más (más cache hits; menos misses) cuando el acceso a memoria se aprovecha de la temporalidad espacial y de la espacial, utilizando bloques ya dentro del cache. Optimizando los accesos de memoria de un programa es esencial para aprovecharse de la jerarquía de memoria.

Guíen su atención a **matrixMultiply.c**, en este archivo se realizan varias implementaciones de la multiplicación de matrices con tres ciclos anidados. Compilar y ejecutar el código con el siguiente comando:

``
	make ex2
``

Esto realizará las operaciones de matrices e indicará la _velocidad_ con la que cada iteración complete las multiplicaciones. La unidad "Gflops/s" se lee como "Giga-floating-point-operations per second". 

Preguntas: 
1. ¿Qué ordenamiento(s) rinde(n) mejor?
<ol type="none">
	<li>
		<ol type="a">
			<li>multMat1</li>
			<li>multMat2</li>
			<li>multMat3</li>
			<li>multMat4</li>
			<li>multMat5</li>
			<li>multMat6</li>
		</ol>
	</li>
</ol>

2. ¿Por qué?
<ol type="none">
	<li>
		<ol type="a">
			<li>Porque se aprovecha la localidad espacial.</li>
			<li>Porque se aprovecha la localidad temporal.</li>
			<li>Porque utiliza loop unrolling.</li>
			<li>Porque se realiza cache blocking.</li>
		</ol>
	</li>
</ol>

3. ¿Qué versión (o versiones) muestra(n) ser la(s) más lenta(s)?
<ol type="none">
	<li>
		<ol type="a">
			<li>multMat1</li>
			<li>multMat2</li>
			<li>multMat3</li>
			<li>multMat4</li>
			<li>multMat5</li>
			<li>multMat6</li>
		</ol>
	</li>
</ol>

4. ¿Por qué?
<ol type="none">
	<li>
		<ol type="a">
			<li>Porque no se aprovecha la localidad espacial.</li>
			<li>Porque no se aprovecha la localidad temporal.</li>
			<li>Porque no utiliza loop unrolling.</li>
			<li>Porque no se realiza cache blocking.</li>
		</ol>
	</li>
</ol>

5. ¿Cómo afecta la manera de recorrer las matrices, respecto del índice que se encuentra en el ciclo más íntimo, al rendimiento?
<ol type="none">
	<li>
		<ol type="a">
			<li>Es el que mayor impacto tiene en el rendimiento.</li>
			<li>Su impacto en el rendimiento es irrelevante.</li>
			<li>De este depende si se aprovecha la localidad temporal o no.</li>
			<li>Este influye directamente el aprovechamiento de la localidad espacial.</li>
			<li>Es igual de importante que el resto de índices.</li>
		</ol>
	</li>
</ol>


**Nota importante para el archivo `ex2.txt`:** Similar al archivo de texto del ejercicio anterior, si se requiere de más de una respuesta a una pregunta, estas deben de estar separadas por comas, sin espacios. Por ejemplo: 3.ii,iv.

## Ejercicio 3: Cache Blocking y Transposición de Matrices
### Transposición de Matrices
En algunas ocasiones, se requiere intercambiar las filas con las columnas de una matriz, esta operación se llama una _transposición_. Una implementación eficiente pude ser de gran utilidad al implementar operaciones algebraicas más complejas. La matriz transpuesta de A suele denotarse como A<sup>T</sup>.

![Transposición de una Matriz de 5x5 Arbitraria](/img/labs/lab09/transposeIm1.png)

### Cache Blocking
En el código ejemplo de multiplicación de matrices del ejercicio anterior se puede notar que se recorren las matrices A y B en su totalidad para calcular un único valor para C. Por lo mismo, ¡constantemente se debe de acceder a valores nuevos de memoria, reusando muy poca data en con el cache! Se puede mejorar el reuso de data en los caches implementando un técnica llamada cache blocking. Formalmente, **cache blocking es una técnica que busca reducir la tasa de cache misses _aún más_ al explotar la temporalidad espacial y/o temporal**. En el caso de la transposición de matrices, se considera realizarla un bloque a la vez.

![Transposición de una matriz general de 3x3](/img/labs/lab09/transposeIm2.png)

**Notar:** En la imagen superior, se transpone cada submatriz A<sub>ij</sub> de la matriz A en su posición final de la matriz de salida, una submatriz a la vez. Es importante entender que la transposición de por secciones es equivalente a hacerlo para toda la matriz.

Como se opera y se termina de transponer cada submatriz una a la vez, se consodila el acceso a memoria a un espacio de memoria menor al transponer esa submatriz, aprovechando las localidades temporales (y espaciales), mejorando el rendimiento del cache, acortando el tiempo de ejecución del programa.

Para este laboratorio, se implementará una estructura de cache blocking para la transposición de matrices y se analizará su rendimiento. Su **tarea** es implementar esta técnica en la función _transpose_blocking()_ en **transpose.c**. **NO pueden asumir que el ancho de la matriz (n) es un múltiplo del tamaño del bloque.** 
Luego de implementar la función, pueden probar el código corriendo los siguientes comandos:

``
	make ex3
	./transpose <n> <blocksize>
``

Donde n y blocksize son parámetros que serán especificados por el usuario. Se puede verificar el funcionamiento del código eligiendo n=10000 y blocksize=33. La versión con blocking debería terminar significantemente más rápido.

A continuación, se muestra una guía **por si no saben cómo comenzar**. De lo contrario, pueden saltarse esta parte y comenzar.

_Algunos consejos:_

Pueden empezar viendo la función _transpose_naive_. Notar que el índice _y_ recorre TODA la matriz _src_ de manera vertical en una iteración del ciclo **externo** antes de ser reiniciada a cero. Es decir, _x_ se actualiza hasta que _y_ termine su recorrido. **Este es el comportamiento que se debe corregir.** Lo que se quiere es moverse a la siguiente fila de _dst_ después de recorrer el ancho (eje horizontal) de un solo bloque.
<details> <summary> ¿Qué tan grande es cada bloque? </summary> El número de enteros especificados por _blocksize_. </details> 

**Además**, solo se desea mover en el eje vertical (la altura) de un bloque antes de proseguir al siguiente. No se busca que _x_ imite el comportamiento que se quiere evitar con el parámetro _y_.

**Ayuda:** Una solución estándar requiere de cuatro ciclos _for_.

Finalmente, como no se puede asumir que _n_ es un múltiplo de _blocksize_, la última columna del bloque de cada fila será más corta (no será un cuadrado de _block_size_ por _block_size_). Además, la última fila del bloque estará truncada. Para arreglar este problema, se puede realizar la situación general que _n_ sí es múltiplo de _block_size_ y agregar, como caso especial, una alternativa para lidiar con la excepción de que se está recorriendo una parte del arreglo inexistente. 

**Cuando ya funcione el código**, se deben completar los siguientes ejercicios:

### Alternado los Tamaños de los Arreglos
Fijar el tamaño del bloque a 20 y ejecutar el código con las siguientes variantes de _n_: 50, 100, 500, 1000, 5000.

1. ¿A partir de qué punto se puede notar una mejora en rendimiento al comparar la versión con cache blocking y la versión común?
<ol type="none">
	<li>
		<ol type="a">
			<li>50</li>
			<li>100</li>
			<li>500</li>
			<li>1000</li>
			<li>5000</li>
		</ol>
	</li>
</ol>

2. ¿Por qué el método de cache blocking requiere que la matriz sea de cierto tamaño para que su mejora sea percibida?
<ol type="none">
	<li>
		<ol type="a">
			<li>Porque necesita aprovechar la localidad espacial.</li>
			<li>Porque así puede explotar la localidad temporal.</li>
			<li>Porque el tamaño de la matriz debe ser un múltiplo del tamaño del bloque.</li>
			<li>Por la Ley de Amdahl.</li>
			<li>Ninguna de las anteriores.</li>
		</ol>
	</li>
</ol>

### Cambiando el Tamaño del Bloque
Fijar el ancho de las matrices a 10000 y correr el código con los siguientes valores para _blocksize_: 100, 1000, 2000, 5000, 10000.

3. ¿Cómo se ve afectada la velocidad de ejecución de _transpose_blocking()_ al cambiar el tamaño del bloque?
<ol type="none">
	<li>
		<ol type="a">
			<li>Aumenta de manera lineal.</li>
			<li>Disminuye de manera lineal.</li>
			<li>Aumenta de manera logarítmica.</li>
			<li>Disminuye de manera logarítmica.</li>
			<li>Se mantiene constante.</li>
		</ol>
	</li>
</ol>

4. ¿Por qué ocurre lo indicado en la respuesta anterior?
<ol type="none">
	<li>
		<ol type="a">
			<li>Porque se aprovecha más el uso de los bloques si son más grandes.</li>
			<li>Porque se desaprovecha el uso de los bloques si su tamaño aumenta.</li>
			<li>Porque se aprovecha de la localidad espacial.</li>
			<li>Porque se aprovecha de la localidad temporal.</li>
			<li>Porque es una característica intrínseca de la operación realizada.</li>
		</ol>
	</li>
</ol>

Escribir las respuestas en el archivo `ex3.txt`. Siguiendo las directrices indicadas para los ejercicios anteriores.

**Es relevante notar que en los últimos dos ejercicios no fue necesario conocer los parámetros del cache de sus computadoras. Solo se exhibió un nivel más alto de localidad y se aceleró la ejecución del programa. Esto implica que todos los caches, sin importar sus parámetros específicos, se benefician al ejecutar código que se aprovecha de altos niveles de localidad.**

## Calificación
Recuerden que pueden evaluar, de manera local, sus respuestas ejecutando:
```shell
	./check
```
Al terminar, deben de subir su laboratorio al calificador en línea con:
```shell
	./submit <TOKEN>
```

