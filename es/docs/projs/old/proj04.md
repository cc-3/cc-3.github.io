# Proyecto 4: MapReduce

![Python + Apache Spark](/img/projs/proj04/python_spark.png)

## Objetivos

* Familiarizarse con el modelo de programación MapReduce utilizando Apache Spark.
* Aplicar técnicas de paralelismo a nivel de datos para resolver un problema grande.
* Paralelizar un clasificador simple en Spark para predecir ratings de reviews.

## Preparación

**Antes de comenzar, asegúrense de que hayan <span style="color: red">leído y comprendido</span> todas las instrucciones del proyecto de principio a fin**. Si tienen alguna pregunta, por favor diríjanse a **Slack** y pregunten en los canales correspondientes.

También les recomendamos seguir el [Tutorial](#) de Python para que tengan las bases del lenguaje y asegurarse de que tengan instalado Anaconda Python.

Para comenzar con el proyecto, primero tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/g/cICWfZi0). Tienen permitido trabajar en parejas o de forma individual, por lo que al aceptar la asignación les preguntará si desean crear un grupo nuevo o unirse a uno ya existente. Si crean un grupo nuevo, ingresen un nombre que los represente (seguramente un nombre raro como siempre <i class="em em-rolling_on_the_floor_laughing"></i>...) y que no haya sido tomado por otro.

![Create group](/img/projs/proj01/classroom1.png)

Si desean unirse a un grupo ya creado, tienen que buscar el nombre del grupo y pulsar el botón que dice **join**:

![Join group](/img/projs/proj01/classroom2.png)

**Tienen que tener mucho cuidado al unirse a un grupo ya existente, ya que esto no se puede cambiar después, además, lo consideraremos como <span style="color: red">PLAGIO</span> si lo realizan de manera incorrecta, ya que, al hacer esto, pueden tener acceso al repositorio del otro miembro del grupo y leer su código.**

Ya sea que se unan o creen un nuevo grupo, al finalizar el proceso, se creará automáticamente un repositorio con una extensión que termina con su nombre de grupo. Habiendo hecho todo esto, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd >CTRL</kbd> <kbd>+</kbd> <kbd>T</kbd>):

```shell
git clone <link del repositorio>
```

También, tienen que instalar el entorno de Python para este proyecto. Para hacer esto, ejecuten lo siguiente:

```shell
conda env create -f environment.yml
```

Respondan al mensaje de instalar paquetes con "y" (sin comillas). Después de la instalación, corran el siguiente comando para activar el entorno virtual:

```shell
conda activate proj4
```

Cuando hayan terminado con el proyecto pueden desactivar el entorno con:

```shell
conda deactivate
```

## Introducción

En este proyecto, vamos a estar clasificando y prediciendo las ***estrellas*** (***ratings***) de dos datasets bastante grandes. Los datasets contienen mucha información de ***reviews*** (***reseñas***), pero ustedes van a estar enfocados en clasificar el texto del review en cierta cantidad de estrellas. El dataset original contiene reviews con ratings de 0-5, pero para este proyecto ustedes solo van a clasificar los reviews en 3 categorías diferentes o cantidad de estrellas diferentes: **1**, **3**, **5**. Para simplificar el proceso de clasificación y para que mejore la precisión, nosotros hemos tomado el dataset original y agrupado los reviews en estas 3 categorías. Para hacer esto, nosotros tomamos el rating original que se le dio a un review, y lo agrupamos conforme a las siguientes reglas:

* [4, 5) estrellas -> 5 estrellas
* [2, 4) estrellas -> 3 estrellas
* [0, 2) estrellas -> 1 estrella

Esta, definitivamente, no es la mejor manera de agrupar los datos, pero elegimos esto por simplicidad. También, hay muchos modelos y técnicas de *Machine Learning* para clasificar texto, sin embargo, el más simple (y  bastante efectivo) es el  clasificador ***Naive Bayes*** con un modelo de ***Bag of Words (BoW)*** para el texto.


## Entrenamiento

Primero, vamos a calcular la probabilidad (*likelihoods*) de que una palabra ocurra en reviews con cada posible número de estrellas:

$$P(w | s) = \dfrac{1 + num(w, s) }{1 + total(s)}$$

Siendo $num(w, s)$ la cantidad de veces que una palabra $w$ aparece en reviews que tienen $s$ estrellas y $total(s)$ el número de palabras total en reviews que tienen $s$ estrellas. Van a hacer esto para cada palabra que aparezca en el grupo de reviews con $s$ estrellas, para cada posible número de estrellas. Después, van a calcular la probabilidad *a priori* (*priors*) de un review con $s$ número de estrellas, para todos los posibles números de estrellas:

$$P(s) = \dfrac{N}{size}$$

siendo $N$ el número de reviews con $s$ estrellas y $size$ el número total de reviews.

## Clasificación

Dado un review separado en palabras $(w_1, w_2, w_3, w_4, ...)$, para todos los posibles números de estrellas, van a calcular la probabilidad conjunta:
$$P(s|w_1, w_2, w_3, w_4, ...) = P(s)P(w_1|s)P(w_2|s)P(w_3|s)P(w_4|s)...$$

Su predicción final será el número de estrellas $s$ para el review, de tal manera que $s$ tenga la mayor probabilidad conjunta.

##  Bag of Words (BoW)

Cuando se piensa en la relación de las palabras en una oración con su sentimiento o significado, la secuencia de las palabras parece ser un factor importante. Sin embargo, el modelo de texto **Bag of Words** ignora el orden de las palabras y en su lugar considera cada palabra de forma independiente. Una palabra en un documento (o en un review en nuestro caso) está representada solo por el número de veces que aparece en el documento y nada más (no se considera el orden o las partes de la oración).

Por ejemplo, si tuvieramos un review "*This restaurant is amazing! The best. The food is never bad.*", entonces utilizando *BoW* se representaría de la siguiente manera:

| **Palabra** | **Conteo** |
|:-----------:|:----------:|
| this | 1 |
| restaurant | 1 |
| is | 2 |
| amazing | 1 |
| the | 2 |
| best | 1 |
| food | 1 |
| never | 1 |
| bad | 1 |

## Naive Bayes

Ahora vamos a explicar el clasificador que van a utilizar para esta tarea. Dado algún conjunto de datos $X$, ***Naive Bayes*** va a tratar de predecir la probabilidad $P(Y|X)$ de que esos datos tienen una etiqueta, o categoría, $Y$, es decir la probabilidad *a posteriori*. (En nuestro caso, dado el texto de un review, ustedes van a tratar de predecir el número de estrellas que el review podría tener). Para poder calcular la probabilidad a posteriori, la regla de Bayes se tiene que aplicar:

$$P(Y|X) = \dfrac{P(X|Y)P(Y)}{P(X)}$$

Sin embargo, en la práctica, a pesar de que la probabilidad a posteriori es la deseada, esta es realmente proporcional a la probabilidad conjunta $P(Y|X)$, que es más fácil de calcular, de esta manera **Naive Bayes**, finalmente, trata de estimar:

$$P(Y|X) = P(X|Y)P(Y)$$

Con el objetivo de estimar $P(Y|X)$, el clasificador trata de estimar $P(X|Y)$ y $P(Y)$ dado un set de datos de entrenamiento y sus etiquetas. En nuestro caso, nuestro clasificador Naive Bayes, va a recibir un set de datos de entrenamiento, que son las palabras en un review (datos), y el número de estrellas para ese review (etiqueta) y, después, estimar $P(X| Y)$ y $P(Y)$. Por ejemplo $P(\text{awesome} | 5)$ y $P(5)$.

Para entrenar el clasificador, van a estimar $P(X|Y)$ de la siguiente manera:

$$P(w | s) = \dfrac{1 + num(w, s) }{1 + total(s)}$$

y para estimar $P(Y)$:

$$P(s) = \dfrac{N}{size}$$

Como se explica más arriba en las instrucciones.

## Ejemplo

Si tuvieramos solo 4 reviews para entrenar:

| **Review** | **Numero de estrellas** |
|:---------------------:|:-----------------------:|
| I hate the food. | 1 |
| The food is good. | 3 |
| Service is good. | 3 |
| I love the good food. | 5 |

Dado que hay dos reviews con 3 estrellas y cuatro reviews en total, la probabilidad a priori de que un review sea de 3 estrellas es:

$$P(3) = \dfrac{2}{4}$$

Los mismos cálculos deberían de hacerse para 1 estrella y 5 estrellas, de tal manera que tengamos una tabla que traduzca de número de estrellas a su probabilidad a priori:


| **Número de estrellas** | **Probabilidad a Priori** |
|:---------------------:|:-----------------------:|
| 1 | $\dfrac{1}{4}$ |
| 3 | $\dfrac{2}{4}$ |
| 5 | $\dfrac{1}{4}$ |



Para estimar las probabilidades $P(X|Y)$ (likelihoods), vamos a tomar como ejemplo la estimación de la probabilidad de "good":

$$P(\text{good}|3) = \dfrac{1 + num(\text{good}, 3) }{1 + total(3)} = \dfrac{1 + 2}{1 + 7} = \dfrac{3}{8}$$

Ya que "good" aparece en 2 reviews con 3 estrellas (The food is good, Service is good) y hay 7 palabras en total en reviews con 3 estrellas (The, food, is, good, Service, is, good). Este cálculo se tiene que repetir para cada palabra que aparece, al menos, una vez en un review con 3 estrellas y, de igual forma, para las palabras con reviews de 1 y 5 estrellas. Al final, van a tener una tabla con las probabilidades (likelihoods) para cada posible número de estrellas, donde cada fila traduce una palabra a su probabilidad dado el número de estrellas:

| $W$ | $P(W\|1)$ | $P(W\|3)$ | $P(W\|5)$ |
|:-------:|:--------------:|:--------------:|:--------------:|
| I | $\dfrac{2}{5}$ | $\dfrac{1}{8}$ | $\dfrac{2}{6}$ |
| hate | $\dfrac{2}{5}$ | $\dfrac{1}{8}$ | $\dfrac{1}{6}$ |
| the | $\dfrac{2}{5}$ | $\dfrac{2}{8}$ | $\dfrac{2}{6}$ |
| food | $\dfrac{2}{5}$ | $\dfrac{2}{8}$ | $\dfrac{2}{6}$ |
| is | $\dfrac{1}{5}$ | $\dfrac{3}{8}$ | $\dfrac{1}{6}$ |
| good | $\dfrac{1}{5}$ | $\dfrac{3}{8}$ | $\dfrac{2}{6}$ |
| service | $\dfrac{1}{5}$ | $\dfrac{2}{8}$ | $\dfrac{1}{6}$ |
| love | $\dfrac{1}{5}$ | $\dfrac{1}{8}$ | $\dfrac{2}{6}$ |

Ya entrenado el modelo, se procede al proceso de clasificación. Si se utiliza el clasificador Naive Bayes con un dato sin etiqueta, $X$, entonces para todas las posibles etiquetas o categorías, $Y = y_1, y_2, y_3...$, las probabilidades conjuntas $P(Y=y_1, X)$, $P(Y=y_2, X)$, $P(Y=y_3, X)$... son calculadas y, después, el dato es clasificado con la etiqueta que tiene la mayor probabilidad conjunta. En este caso, la probabilidad conjunta es calculada como:

$$P(Y=y, X) = P(Y=y)P(x_1 | Y=y)P(x_2 | Y=y) P(x_3 | Y=y)...$$

Donde Naive Bayes hace la suposición de que las probabilidades de cada $x_i$ son independientes dada la etiqueta $y$. En nuestro caso, las etiquetas son 1, 3, y 5 estrellas y cada dato es un review $x_i$.

Más concretamente, supongan que tenemos los mismos cuatro reviews anteriores para entrenar y ustedes quieren, ahora, predecir el número de estrellas correspondientes al review "Good food!". Para cada posible número de estrellas, ustedes calcularían la probabilidad para ese número de estrellas, dado este review, como:

$$P(s| \text{good}, \{food}) = P(s)P(\{good} | s)P(\text{food} | s)$$

Para cada diferente número de estrellas:

* $P(1| \text{good}, \text{food}) = (\dfrac{1}{4})(\dfrac{1}{5})(\dfrac{2}{5}) = \dfrac{2}{100}$
* $P(3| \text{good}, \text{food}) = (\dfrac{2}{4})(\dfrac{3}{8})(\dfrac{2}{8}) = \dfrac{12}{256}$
* $P(5| \text{good}, \text{food}) = (\dfrac{1}{4})(\dfrac{2}{6})(\dfrac{2}{6}) = \dfrac{4}{144}$

Dada la probabilidad conjunta del review "Good food", siendo 3 estrellas es la más alta, Naive Bayes va a clasificar este review como 3 estrellas.

Por último, multiplicar muchos números de punto flotante puede resultar en problemas de precisión (¿se recuerdan por qué?). Para resolver este problema, su implementación para la clasificación va a calcular el logaritmo natural de las probabilidades (likelihoods) y las probabilidades a priori y, luego, sumarlas (en vez de multiplicar los likelihoods por las probabilidades a priori):

* $P(1| \text{good}, \text{food}) = log(\dfrac{1}{4}) + log(\dfrac{1}{5}) + log(\dfrac{2}{5})$
* $P(3| \text{good}, \text{food}) = log(\dfrac{2}{4}) + log(\dfrac{3}{8}) + log(\dfrac{2}{8})$
* $P(5| \text{good}, \text{food}) = log(\dfrac{1}{4}) + log(\dfrac{2}{6}) + log(\dfrac{2}{6})$


## Su Tarea

Su tarea va a ser terminar el clasificador Naive Bayes. Todo el código para el clasificador Naive Bayes va estar en `classifier.py`. Las partes que ustedes tienen que completar están claramente indicadas. Tomen un poco tiempo para entender los comentarios en el archivo.

Ustedes son libres de implementar las funciones correspondientes de cualquier forma (utilizando MapReduce y Spark, obviamente). Sin embargo, solo vamos a aceptar código que esté en `classifier.py`. Si su código tiene otras dependencias y/o no funciona junto con `run.py`, no va a funcionar y tendrán una nota de **0** puntos. El archivo que corre el clasificador es `run.py`. Siéntanse libres de modificar este archivo para depurar, pero recuerden que ninguno de sus cambios a este archivo se van a utilizar para la calificación final.

En general, las funciones que se tienen que implementar son:

```python
def calculate_priors(self, rdd, size):

def calculate_words_per_num_stars(self, rdd):

def calculate_likelihoods(self, rdd):

def predict(self, rdd):
```

## Pruebas

### Dataset

Primero tienen que descargar el dataset con el que vamos a estar trabajando haciendo lo siguiente:

```shell
cd data
python preprocess.py
cd ..
```

Esto va a descargar el dataset, procesarlo y generar los siguientes archivos:

```shell
reviews-train-sample.txt
reviews-test-sample.txt
reviews-labels-sample.txt
reviews-train-small.txt
reviews-test-small.txt
reviews-labels-small.txt
reviews-train-medium.txt
reviews-test-medium.txt
reviews-labels-medium.txt
reviews-train-large.txt
reviews-test-large.txt
reviews-labels-large.txt
```

Estos archivos son cargados por `run.py` en un RDD de Spark, donde cada línea de los archivos de entrenamiento (train) representa un diccionario de Python con la siguiente estructura:

```python
{
  'id': review_id,
  'text': review_text,
  'stars': review_stars
}
```

Cada línea de los archivos de prueba (test) representa un diccionario de Python con la siguiente estructura:

```python
{
  'id': review_id,
  'text': review_text
}
```

Noten que el número de estrellas no está presente en estos archivos, ya que es tarea del clasificador predecir ese número. De todas maneras las etiquetas correctas están en los archivos de etiquetas (labels) que se utilizan para verificar el porcentaje de acierto, estos tienen la siguiente estructura:

```python
{
  'id': review_id,
  'stars': review_stars
}
```

Recuerden que review_stars solo puede considerar **1**, **3** o **5**, y que el texto es "texto crudo" (_raw text_), que no está separado por palabras.


### Tokenizar texto en palabras

Ya que hay diferentes maneras en Python de tokenizar un texto en palabras, ustedes tienen que utilizar lo siguiente
para realizar esta tarea:

```python
# texto a tokenizar
text = 'Hello World!!'
# remueve la puntuacion
text2 = text.translate(str.maketrans('', '', string.punctuation)).strip()
# genera un arreglo de palabras en minuscula
words = [w.lower() for w in text2.split(' ')]
print(words)
```

<pre id="tokenizer-out"></pre>

<button class="brun" onclick="tokenizer()">Run</button> <button id="btokenizer" class="bclear" onclick="rm('btokenizer', 'tokenizer-out')" style="visibility: hidden;">Clear</button>

De esta forma su resultado será igual al esperado por el autograder si por alguna razón no llegan al tiempo esperado.


### Depuración

Para este proyecto no hay autograder local. Pero vamos a dejar el output del staff para un dataset de ejemplo. Este dataset de ejemplo contiene 10 reviews para entrenamiento y 5 reviews para clasificación. Siéntanse libres de utilizarlo para depurar su salida de cada parte de su implementación. Cuando ustedes corran el dataset de ejemplo, `run.py` va a generar automáticamente un archivo llamado `debug_diffs.txt` en el directorio `out/`, que va a contener las diferencias de su implementación con respecto a las del staff (si es que hay alguna) o indicar que todo está correcto. Noten que como es un dataset demasiado pequeño, no se tienen que preocupar del porcentaje de acierto si es bajo o 0. Pueden correr el dataset de ejemplo utilizando:

```shell
./check sample
```

Si todo esta correcto les tiene que salir algo similar a esto:

```
[PRIORS]
OK [✓]

[WORDS PER # STARS]
OK [✓]

[LIKELIHOODS]
OK [✓]

[PREDICTION]
OK [✓]
```

De lo contrario contendrá las diferencias de cada una de las partes, por ejemplo:

```
[PRIORS]
prior for 1 stars, P(1), should be 0.100000 instead of -1.000000
prior for 3 stars, P(3), should be 0.100000 instead of -1.000000
prior for 5 stars, P(5), should be 0.800000 instead of -1.000000

[WORDS PER # STARS]
words per 1 stars should be 22 instead of -1
words per 3 stars should be 722 instead of -1
words per 5 stars should be 905 instead of -1

...
```

### Benchmark

Una vez hayan implementado todas las partes faltantes, hay tres datasets para que ustedes prueben y así ver el porcentaje de acierto y el tiempo que se toma en ejecutar su programa. Pueden probar su código de Spark en cada uno de estos datasets utilizando el comando:

```shell
./check (small|medium|large)
```

El cual generará un archivo `.txt` con el nombre del dataset utilizado que contendrá la información mencionada, por ejemplo si utilizan `./check large`, esto generaría un archivo llamado `out/large.txt` con la siguiente información:

```
time: 32.44 seconds
accuracy: 75.23
```

Cada dataset está estructurado de la siguiente forma:

| Dataset | # reviews para entrenamiento | # reviews para test | % acierto Staff | Tiempo Staff |
|:-------:|:----------------------------:|:-------------------:|:---------------:|:------------:|
| small | 3750 | 1250 | 38.24 | ~5 segundos |
| medium | 37500 | 12500 | 65.36 | ~10 segundos |
| large | 375000 | 125000 | 75.23 | ~30 segundos |

El dataset pequeño debería de correr bastante rápido, así que deberían de utilizar este para probar su implementación y asegurarse de que corresponden con los benchmarks del staff. Si su implementación es mejor, y logra más porcentaje de acierto que el nuestro, ¡genial!, sin embargo, por favor noten que vamos a poner límites de tiempo. Es decir, si su porcentaje de acierto es igual o mejor que el del staff, pero es significativamente más lento que nuestra implementación, no van a obtener una buena nota en el autograder.

Ya que es el último proyecto, la calificación va a ser bastante simple. Vamos a correr su implementación en un dataset más grande (2 millones de reviews). Si es igual o mejor que el porcentaje de acierto que el staff, y no toma mucho tiempo para correr, ustedes van a obtener la nota completa. Si ustedes lograron el benchmark para los tres datasets que les damos, pueden estar 100% seguros que van a lograrlo en el autograder. De todas maneras, se van a dar créditos parciales de la siguiente manera:

* 20% si su implementación corre sin errores
* 20% si obtienen un porcentaje de acierto diferente de 0
* 10% si calculan correctamente `calculate_priors`
* 10% si calculan correctamente `calculate_words_per_num_stars`
* 20% si calculan correctamente `calculate_likelihoods`
* 20% si calculan correctamente `predict`

Para los 4 últimos puntos, vamos a probar estas funciones aisladas para darles los créditos parciales.

## Calificación

Por favor empiecen lo antes posible, porque vamos a utilizar instancias de Amazon para el autograder y este solo puede procesar 4 submits al mismo tiempo (esto por lo general toma bastante tiempo en completarse). Para este proyecto vamos a limitar la cantidad de veces que ustedes pueden hacer submit, a **5 por persona**. Sí, si ustedes van en pareja, en teoría tendrían 10 submits. De esta manera, tal vez, motivamos la colaboración. Les recomendamos que prueben en las computadoras de los laboratorios antes de desperdiciar créditos, si es que en su computadora no pueden lograr los tiempos del staff. Las medidas no van a ser exactas, pero les darán una idea.

Pueden subir su implementación al autograder, haciendo lo siguiente:

```shell
./submit <TOKEN>
```

lo que va a resultar en algo parecido a esto:

```shell
   ___       __                        __       
  / _ |__ __/ /____  ___  _______ ____/ /__ ____
 / __ / // / __/ _ \/ _ \/ __/ _ \/ _  / -_) __/
/_/ |_\_,_/\__/\___/\_, /_/  \_,_/\_,_/\__/_/
                   /___/

             Machine Structures
     Great Ideas in Computer Architecture

Repo: proj4_spark

Best Score: 100/100

Last Output:

Exercise                                   Grade  Message
----------------------------------------   -----  -------
1. Compiling implementation                   20  passed
2. Non-zero accuracy                          20  passed
3. Correct calculate_priors                   10  passed
4. Correct calculate_words_per_num_stars      10  passed
5. Correct calculate_likelihoods              20  passed
6. Correct predict                            20  passed
```

Esperamos que hayan disfrutado el curso, muchos éxitos <i class="em em---1"></i> en lo que viene.
