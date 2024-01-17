# Proyecto 3: Optimizaciones

## Objetivos

* Utilizar técnicas de programación de optimización aprendidas en clase para acelerar tareas de reconocimiento de imágenes.
* Aplicar la ley de Amdahl para conocer las partes del programa en donde se deberían aplicar optimizaciones.
* Enfocarse en las optimizaciones mayores antes de tratar de hacer micro optimizaciones.

## Preparación

**Antes de comenzar, asegúrense de que hayan <span style="color: red">leído y comprendido</span> todas las instrucciones del proyecto de principio a fin**. Si tienen alguna pregunta, por favor diríjanse a **Slack** y pregunten en los canales correspondientes.

Para comenzar con el proyecto, primero tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/g/UcVbUubs). Tienen permitido trabajar en parejas o de forma individual, por lo que al aceptar la asignación les preguntará si desean crear un grupo nuevo o unirse a uno ya existente. Si crean un grupo nuevo, ingresen un nombre que los represente (seguramente un nombre raro como siempre <i class="em em-rolling_on_the_floor_laughing"></i>...) y que no haya sido tomado por otro.

![Create group](/img/projs/proj01/classroom1.png)

Si desean unirse a un grupo ya creado, tienen que buscar el nombre del grupo y pulsar el botón que dice **join**:

![Join group](/img/projs/proj01/classroom2.png)

**Tienen que tener mucho cuidado al unirse a un grupo ya existente, ya que esto no se puede cambiar después, además, lo consideraremos como <span style="color: red">PLAGIO</span> si lo realizan de manera incorrecta, ya que, al hacer esto, pueden tener acceso al repositorio del otro miembro del grupo y leer su código.**

Ya sea que se unan o creen un nuevo grupo, al finalizar el proceso les creará automáticamente un repositorio con una extensión que termina con su nombre de grupo. Ya habiendo hecho todo eso, pueden ejecutar los siguientes comandos abriendo una terminal (<kbd >CTRL</kbd> <kbd>+</kbd> <kbd>T</kbd>):

```shell
git clone <link del repositorio>
```


## Introducción

En este proyecto, ustedes van a aplicar algunas técnicas de optimizaciones que han aprendido en clase a un problema de la vida real de clasificación de imágenes utilizando una red neural convolucional (Convolutional Neural Network CNN).

<div id="teaser">
<div id="convnetvis"></div>
<span class="glyphicon glyphicon-question-sign" id="convask"></span>
<div id="demomsg">
  *Esta red neural está corriendo en vivo en su navegador.
</div>
</div>
<p align="center">
  <small>Créditos: <strong>CS231N</strong></small>
</p>

Las siguientes secciones los van a introducir un poco a lo que son las redes neurales convolucionales CNNs, una idea a muy alto nivel para saber que está pasando. No se preocupen en absoluto si ustedes no conocen mucho sobre redes neurales, este proyecto se puede terminar inspeccionando el código base y, así, encontrar patrones que se pueden beneficiar bastante de las optimizaciones.  

### ¿Cómo una computadora reconoce imágenes?

La clasificación de imágenes describe un problema en donde a una computadora se le da una imagen y esta, de alguna manera, tiene que ver que hacer para saber qué representa (de un set posible de categorías). Antes del famoso término ***Deep Learning***, la clasificación de imágenes involucraba seleccionar un set de *características* a mano, es decir, un humano experto tenía que reconocer y extraer de la imagen las características de interés para poder efectuar la clasificación.

Actualmente, las redes convolucionales se han vuelto bastante populares para realizar esta tarea. Las CNNs existen desde los 90's pero desde el 2012, gracias a la cantidad masiva de datos y el poder computacional que nos dan las tarjetas de video, son la mejor opción y ya han superado al humano en esta tarea, teniendo un error de clasificación menor al 5% (el error humano al clasificar imágenes del [ILSVRC](http://www.image-net.org/))... En general, las redes neurales asumen que existe cierta función de la entrada (las imágenes) a la salida (un set de categorías). Los algoritmos clásicos tratan de codificar percepción del mundo real en sus funciones, mientras que las CNNs aprenden esta función dinámicamente de un set de imágenes etiquetadas, a este proceso se le conoce como entrenamiento o "traning". Una vez que ya se tiene una función (más bien, una aproximación a esta), se puede aplicar la función a imágenes que el algoritmo nunca ha visto antes.

<p align="center">
  <img src="/img/projs/proj03/ilsvrc.jpg"/><br>
  <strong>Figura 1: Benchmark competencia ILSVRC</strong><br>
  <small>Ref: <a href="https://arxiv.org/pdf/1409.0575.pdf" target="_blank">https://arxiv.org/pdf/1409.0575.pdf</a></small>
</p>

### ¿Qué hacen las CNNs?

Para este proyecto, nosotros no requerimos que ustedes entiendan cómo funcionan las CNNs a detalle. Sin embargo, queremos darles suficiente información para que tengan conocimiento de los conceptos a alto nivel. Si ustedes quieren aprender más, los alentamos para que tomen algún curso en línea relacionado con **Machine Learning** o **Computer Vision**, hay una buena cantidad de información en internet, no desaprovechen ese recurso.

A alto nivel, una CNN consiste de múltiples capas. Cada capa toma un arreglo multi-dimensional de números como entrada y produce otro arreglo multi-dimensional de números como salida (que posteriormente se vuelve la entrada de otra capa). Cuando se está clasificando imágenes, la entrada a la primera capa es la imagen de entrada (es decir 32x32x3 números para imágenes de 32x32 pixeles y 3 canales de color), mientras que la salida de la capa final es un set de probabilidades de diferentes categorías (es decir, 1x1x10 números si es que hay 10 categorías).


<p align="center">
  <img src="/img/projs/proj03/CNN2.png"/><br>
  <strong>Figura 2: Arquitectura general que usamos para este proyecto</strong><br>
</p>

Cada capa tiene un set de pesos asociados, estos pesos son los que la CNN "aprende" cuando es entrenada con los datos que se le presentan. Dependiendo de la capa, los pesos tienen diferentes interpretaciones, pero el propósito de este proyecto, es suficiente con que sepan que cada capa toma la entrada, realiza algunas operaciones en ella en dependencia de estos pesos y, finalmente, produce una salida. A este paso se le conoce como el "***forward pass***": tomamos una entrada, la pasamos a través de la red, produciendo el resultado deseado como salida. El forward pass es todo lo que se necesita para clasificar imágenes si la CNN ya ha sido entrenada anteriormente (como en este proyecto).  

En la práctica, una red neural realmente resulta ser una simple composición de funciones que reconoce patrones (con una remarcada capacidad limitada), pero puede ser bastante bizarro lo que utiliza para hacer el reconocimiento. Por ejemplo, alguien podría entrenar una red neural para reconocer las diferencias entre "perros" y "lobos". Y puede funcionar bastante bien... ya que esta mira la nieve y los árboles en los bosques en el fondo de las imágenes que contienen lobos.


## Su tarea

Hay mucha investigación en diferentes arquitecturas de redes neurales y métodos de entrenamiento.
Un aspecto crucial de las redes neurales es que, dada una red entrenada, esta pueda clasificar imágenes de una forma rápida y precisa. Para este proyecto, se les estará dando una red pre-entrenada que puede clasificar imágenes RGB de 32x32 en 10 categorías o clases diferentes. Las imágenes a utilizar fueron tomadas del dataset famoso [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html).

La red va a tener los pesos ya entrenados y el algoritmo para calcular el forward pass de la red neural también se les da. Ustedes van invertir su tiempo en acelerar el forward pass, de tal manera que la red pueda clasificar imágenes a una tasa más elevada.

## Paso 1: Entendiendo el Código

Por favor lean esta sección antes de tratar de implementar cualquier cosa. Hay una cantidad considerable de código en este proyecto, así que es crucial que ustedes tengan un conocimiento general de cada archivo.

Este proyecto es más abierto que los proyectos anteriores, ustedes pueden acelerar la aplicación en cualquier número de formas, siempre que este siga teniendo un resultado correcto. ¡Que esto no los intimide! Es posible obtener la aceleración requerida sin aplicar cada optimización existente.


### Estructura del Directorio

Cuando obtienen los archivos base de GitHub classroom, el directorio principal tiene una estructura como la siguiente:

```shell
check
data/
LICENSE
Makefile
README.md
snapshot/
src/
submit
test/
```

**<span style="color: red">Para este proyecto, los únicos archivos que deberían de modificar (y por consecuencia los únicos que se subirán al autograder) son</span>**:

* **`src/optimized/layers.c`**
* **`src/optimized/network.c`**
* **`src/optimized/volume.c`**

Esto implica que, mientras ustedes son libres de escribir sus propias funciones de ayuda en cualquiera de estos archivos, el uso de estas estará restringido al archivo donde las definieron, ya que ustedes no pueden editar ni modificar los archivos `.h`.

Por conveniencia, les hemos proveído los archivos **`src/baseline/layers.c`**, **`src/baseline/network.c`**, **`src/baseline/volume.c`**. Los archivos que están en **`src/baseline`** no deberían de ser modificados cuando estén escribiendo su código optimizado, están únicamente para que ustedes puedan:

* Medir la aceleración con respecto a una implementación básica.
* Hacer referencia a una implementación correcta (pero lenta).

### Visión general del Código

Hay un número de `datatypes` que son utilizados en este proyecto. Por `datatype`, nos referimos a estructuras de C con nombres significativos, gracias a `typedef`. Nosotros los alentamos bastante a que miren los archivos `.h` que están en `src/include` para ver los campos que cada `datatype` tiene. Los archivos `.h` es donde ustedes van a encontrar, también, una descripción a alto nivel de lo que hace cada función. Para la implementación en `src/baseline/layers.c`, también hay comentarios con explicaciones detalladas de lo que el código está haciendo.

El primer `datatype` que vamos a considerar es el tipo `volume_t`, que contiene un arreglo 3D (o volumen) de números en precisión doble. Estos son utilizados para representar los resultados de cada capa, así como los pesos asociados a algunas de las capas.

Después, tenemos un número diferente de tipos de capas: `conv`, `relu`, `pool`, `fc` y `softmax`. Ustedes no tienen que entender qué hacen estas diferentes capas, pero cada una de ellas tiene:

* Una estructura de datos que tiene una descripción de los parámetros de la capa. **Noten** que cada capa tiene un set fijo de parámetros que no pueden cambiar durante la ejecución. Estos determinan (por ejemplo) el tamaño de los volúmenes de su entrada y salida y estos son puestos cuando se define la CNN. Por ejemplo, la CNN que estamos utilizando tiene 3 capas `conv`, cada con parámetros un poco diferentes.
* Una función `_forward` que calcula la operación principal de la capa. Estas funciones, toman la estructura de la capa, así como un arreglo de punteros hacia los volúmenes de entrada y salida de la capa. También, aceptan los índices `start` y `end` del arreglo. Esto le permite a cada capa procesar un "batch" de entradas a la vez. Por ejemplo, ustedes podrían tener un arreglo con punteros a volúmenes de entrada y hacer que `start = 5` y `end = 9` para procesar las entradas 5, 6, 7, 8 y 9 al mismo tiempo y escribir los resultados en las posiciones correspondientes del arreglo de salida.
* Dos funciones: `make_` y `_load`. La primera genera una capa con un set de parámetros específicos; la segunda carga los pesos para esta capa desde el "file system".

La última estructura importante es `network_t`, que contiene toda la información que describe una CNN. Esto incluye todas las capas y una instancia de cada uno de los diferentes volúmenes intermedios. Noten que estos volúmenes no son usados para almacenar datos (esto es hecho por los batches que vamos a describir más adelante). Estan allí para que las dimensiones de cada diferente volumen estén disponibles de manera fácil en un solo lugar.

Todos los datos intermedios son representados por `batches`. Ustedes pueden pensar de ellos como un set de datos intermedios asociados a un set de imágenes de entrada. Mientras que su tipo se mira complicado (`batch_t` es equivalente a `volume_t***`), estos son solamente arreglos 2D de punteros hacia volúmenes. La primera dimensión les dice a qué capa pertenece el volumen (V0, V1, etc., en la Figura 2 de arriba) y la segunda dimensión, les dice qué entrada están viendo. En el código base que les hemos dado, nosotros solo utilizamos batches de tamaño 1 (es decir que solo procesamos una imagen a la vez), pero ustedes van a tener que modificar su programa para considerar batches más largos, de tal manera que se pueda paralelizar la tarea. Los batches pueden ser reservados utilizando la función `make_batch` y pueden ser liberados utilizando la función `free_batch`.

Finalmente, la función `net_forward` toma un batch (así como los índices `start`/`end`) y aplica la CNN a cada entrada desde `start` a `end`, llamando a las funciones forward para cada capa. Esta función es utilizada en `net_classify` para tomar un set de imágenes de entrada, ponerlas en el volumen V0 como un batch y, entonces, correr la red neural en ese batch de imágenes. Nostros guardamos las probabilidades (es decir los valores en la última capa de la red) en una matriz 2D de números de precisión doble, de tal manera que podamos ver cómo la red clasifica una imagen. Tengan cuidado con estas funciones: son llamadas por el código de benchmarking, así que la firma y su salida no deberían de ser modificadas por sus optimizaciones.

### Conclusión

Nosotros reconocemos que es mucha información para digerir y que la información de arriba no es suficiente para entender totalmente cada detalle del código. Afortunadamente, ustedes no necesitan hacerlo para hacer que corra de manera más rápida: mirando la estructura del código, ustedes deberían de ver las potenciales fuentes de paralelismo y otras formas de optimizar su código. Más abajo, les daremos los primeros pasos (algunos) para comenzar y, también, les vamos a dar un número de propuestas que pueden intentar. A partir de allí, ustedes deberían de experimentar diferentes técnicas y ver si funcionan bien.

## Paso 2: Perfilamiento y Ley de Amdahl

Siempre que ustedes empiecen a optimizar algún código dado, primero, tienen que determinar en dónde es que se gasta la mayor parte del tiempo. Por ejemplo, acelerar una parte que únicamente toma 5% del tiempo total les va a dar como máximo una aceleración del 5% y es probable que no valga su tiempo y esfuerzo.

En clase, ustedes oyeron acerca de la ley de Amdahl, que es una manera genial para estimar el impacto del performance esperado de una optimización. Como vimos en clase, para aplicar la ley de Amdahl, primero tenemos que encontrar que fracción del tiempo se gastan en diferentes partes del programa.

### Utilizando Gprof

Antes de hacer cualquier cosa primero tienen que descargar el dataset que vamos a estar utilizando:

```shell
cd data
./download
cd ..
```

***Gprof*** es una herramienta que vamos a estar utilizando para perfilar el código base para ver que funciones se pueden beneficiar de alguna optimización. Para correr Gprof, ustedes tienen que compilar el código base utilizando la bandera "**`-pg`**":

```shell
make clean
make baseline CFLAGS="-Wall -Isrc/include -Wno-unused-result -march=haswell -std=c99 -fopenmp -pg -O0"
```

Después, tenemos que correr el código base. Dado que Gprof está recolectando estadísticas acerca del programa, va a tomar un poco más de tiempo que lo usual (a nosotros nos tomó alrededor de dos minutos para que terminara).

```shell
./baseline benchmark
```

Finalmente, necesitamos ver los resultados de Gprof.

```shell
gprof baseline | less
```

Este comando que acabamos de ejecutar debería de mostrar una cantidad de texto. Para este proyecto, estamos interesados en la tabla de arriba que tiene los siguientes headers:

```shell
 %   cumulative   self              self     total
time   seconds   seconds    calls   s/call   s/call  name
```

Las columnas de más interés son:

* `% time`: La cantidad de tiempo que gastamos en una función.
* `calls`: El número de veces que llamamos a una función.
* `name`: El nombre de la función.

### Interpretando los Resultados

Primero, lista el top 10 de funciones utilizando el porcentaje de tiempo que nuestro programa gasta en cada una de ellas. La ley de Amdahl nos dice que funciones se pueden beneficiar más de las optimizaciones, así que recomendamos que ustedes pongan su atención a estas funciones.
Noten que algunas funciones que son relativamente sencillas pueden estar en este top 10 porque estas son llamadas muchas veces (en el orden de los millones para algunas, comparado con miles para otras). Mientras que, optimizar estas, pueden acelerar su programa, estas funciones pueden ser tan cortas que podría ser muy difícil de optimizar. Tengan en cuenta esto si quieren optimizar estas.


### Perfilamiento Intermedio

Si ustedes alguna vez quieren perfilar su código optimizado para seguir viendo dónde enfocarse después, pueden correr los siguientes comandos:


```shell
make clean
make optimized CFLAGS="-Wall -Isrc/include -Wno-unused-result -march=haswell -std=c99 -fopenmp -pg -O0"
./optimized benchmark
gprof optimized | less
```

Estos tiempos no van a ser completamente confiables dado que Gprof hace lenta la ejecución, pero les van a dar una idea general de qué fracción del tiempo usa cada función.

## Paso 3: Loop Unrolling y otras optimizaciones

En el paso 2, encontramos las funciones que valían la pena optimizar. Ustedes deberían de optimizar estas aplicando técnicas convencionales de optimización (sin SIMD o múltiples threads). Nosotros no les vamos a decir los pasos exactos a seguir, pero aquí hay algunas propuestas que les van a ayudar a empezar:

* A veces pueden reemplazar una función por múltiples funciones especializadas que realizan la misma cosa pero están optimizadas para valores de entrada específicos. Ustedes, después, deberían de llamar a estas funciones especializadas desde la función original, cuando ustedes piensen que aplique.
* ¿Hay algunos lugares en el programa donde una variable siempre tiene el mismo valor, pero es cargado de la memoria todo el tiempo?
* ¿Hay algunos lugares donde ustedes podrían hacer manualmente el loop unrolling?.
* ¿Pueden clasificar múltiples ejemplos a la vez, en vez de clasificar uno después de otro?
* ¿Hay algún orden mejor para los diferentes loops?

Noten que todas las propuestas de arriba están relacionadas en prácticas generales de optimización. Ustedes no necesariamente necesitan hacer todas estas para poder alcanzar un buen "performance".

Una vez hayan mejorado el performance utilizando estas optimizaciones, ustedes pueden empezar a aplicar vectorización y paralelismo para hacer el programa aún más rápido. Noten que ustedes tienen libertad de aplicar cualquiera de estas optimizaciones y que hay más de una solución correcta. Traten de experimentar con diferentes aproximaciones y vean cuál de todas les da el mejor performance.

## Paso 4: Instrucciones SIMD

En el lab 10, ustedes aprendieron como aplicar instrucciones SIMD para mejorar el performance de un programa. El procesador de las instancias de Amazon soporta la extensión AVX, que les deja hacer operaciones SIMD en valores de 256 bits (no solo 128 bits, como vimos en el laboratorio). Ustedes deberían de utilizar estas extensiones para calcular cuatro operaciones en paralelo (ya que todos los valores de punto flotante son en precisión doble, que son 64 bits).

Como un recordatorio, ustedes pueden utilizar la [Guía de Intel de Intrinsics](https://software.intel.com/sites/landingpage/IntrinsicsGuide/) como referencia para ver las instrucciones relevantes. Ustedes tienen que utilizar el tipo de dato `__m256d` para almacenar 4 valores `double` en un registro `YMM` y, después, utilizar instrucciones `_mm256_*` intrinsics para operar.


## Paso 5: OpenMP

Finalmente, ustedes deberían de utilizar OpenMP para paralelizar el cómputo. Noten que la forma más fácil de paralelizar la clasificación de un gran número de imágenes es clasificar batches de ellas en paralelo (dado que estos batches son independientes). Noten que ustedes van a necesitar asegurarse que ninguno de los diferentes threads sobreescriban los datos de otro. Solo utilizando `#pragma omp parallel for` puede causar errores, o tal vez no si lo hacen de manera correcta.

Noten que las instancias de Amazon que van a utilizar tienen ocho cores con un thread por cada core. Esto quiere decir que ustedes deberían de esperar una aceleración aprox de ~8x.


## Pruebas de Funcionamiento Correcto

Primero, tienen que descargar el dataset, si es que todavía no lo han hecho:

```shell
cd data
./download
cd ..
```

Luego, tienen que compilar el código de la siguiente manera:

```shell
make clean && make
```

### Benchmark regular

Ustedes pueden correr

```shell
./optimized benchmark
```

Para probar qué tan rápido corre su código en un subset de 1200 imágenes. El código base toma alrededor de trece segundos en terminar en las instancias de Amazon que vamos a utilizar para calificar. Si ustedes corren este programa sin arguments adicionales, van a poder observar la siguiente salida:

```shell
RUNNING BENCHMARK ON 1200 PICTURES...
Making network...
Loading batches...
Loading input batch 0...
Running classification...
78.250000% accuracy
_________ microseconds
```

Su salida va a tener un número que representa qué tanto tiempo le tomó a la red clasificar esas imágenes. Noten que solo estamos midiendo el tiempo de clasificación de su red. El tiempo que le toma para cargar las imágenes, ponerlas en memoria y otras tareas no son incluidas.


La línea de **accuracy** es una referencia rápida para asegurárse de que su implementación es correcta. Si el accuracy es diferente (no igual a 78.25%), eso significa que hay algún problema con su implementación. Para una vista más detallada de lo que está mal con su código, pueden correr `./check simple` o `./check huge` para verificar las capas que pueden tener algún error.


Si el test toma demasiado tiempo, pueden correr el test con un número menor de imágenes:

```shell
./optimized benchmark n
```

Donde _n_ es un entero que representa la cantidad de imágenes que quieren correr en el benchmark. Noten que, en este caso, el accuracy puede no ser el mismo, o igual a 78.25%, dado que estamos probando en un subset diferente de imágenes. Para asegurarse de que su implementación esté correcta, pueden correr los siguientes comandos:


```shell
./baseline benchmark n
```

Ahora, pueden comparar los accuracies que sacaron estos dos comandos y, si estos no son los mismos, esto significa que definitivamente hay algún **bug** en su implementación. Sin embargo, incluso si son las mismas, ustedes siempre deberían utilizar estos dos siguientes métodos para verificar completamente que su implementación está correcta.


### 1. `./check simple`

Este script corre su red con veinte imágenes y saca los valores exactos de cada capa de la red; compara estos valores con otros valores de referencia que nosotros generamos con el código no optimizado y verifica si estos valores son los mismos o no (hasta cierto grado de error, debido a errores de punto flotante).

También, corre su código en subsets de imágenes grandes para tomar en cuenta los errores de paralelismo. Para estas pruebas, nosotros solo comparamos la salida de la última capa de su red con la versión no optimizada.

Esta es una prueba más detallada que solamente correr `./optimized benchmark`, ya que se asegura que su red esté computando virtualmente las mismas operaciones como el código base. Les recomendamos utilizar esta prueba después de hacer cualquier tipo de modificación mayor a su código para asegurarse de que no afecte la validez del código.

### 2. `./check huge`

Este script es lo mismo que el anterior, solamente que corre el código en subsets de imágenes bastante largos. Ustedes no deberían de utilizar este script muy seguido (ya que toma una cantidad de tiempo considerable en ejecutarse), pero les recomendamos que, aunque sea, lo ejecuten una vez antes de subir su proyecto al autograder.

## Debugging

Nosotros recomendamos que utilicen **CGDB** y **Valgrind** para encontrar bugs en su proyecto. Para usar CGDB, necesitamos utilizar la bandera "`-g`" en la variable `CFLAGS` para que los símbolos de depuración se generen. Podemos lograr esto haciendo lo siguiente:

```
make CFLAGS="-Wall -Isrc/include -Wno-unused-result -march=haswell -std=c99 -fopenmp -g -O0"
cgdb ./optimized
```

Luego, en CGDB, ustedes pueden poner breakpoints y ejecutar

```shell
run optimized
```

Para comenzar a depurar. Si ustedes encuentran algún `segmentation fault`, Valgrind es una buena herramienta para encontrar dónde está occurriendo. Un comando ejemplo que podrían ejecutar es:

```shell
valgrind --leak-check=full --show-leak-kinds=all ./optimized benchmark
```

Noten que su programa puede tomar más tiempo en ejecutarse al utilizar Valgrind.

Si no tienen Valgrind instalado pueden utilizar el siguiente comando para instalarlo:

```shell
sudo apt install valgrind
```

## Rúbrica de Calificación

En este proyecto su calificación va a ser determinada basada en qué tan rápido su código corre relativamente a la solución básica que les damos (speedup). Noten que si su implementación no pasa `./check simple`, van a recibir un 0 en el autograder. Vamos a utilizar la siguiente función para determinar su nota:

```python
grade(speedup):
  if 0 <= speedup < 1:
    0
  if 1 <= speedup <= 16:
    1 - (speedup - 16)^2 / 225
  if speedup > 16:
    1
```

Para referencia, aquí están las notas para algunos de los valores de speedup:


| Speedup | Nota |
|:-------:|:----:|
| 16X | 100% |
| 14X | ~98% |
| 12X | ~93% |
| 10X | ~84% |
| 8X | ~72% |
| 6X | ~56% |
| 4X | ~36% |
| 2X | ~13% |

Su speedup va a ser basado en qué tan rápido es su código en nuestras pruebas utilizando AWS. `./check speedup` es un buen estimado de que tan rápido es su código a comparación del que les damos.


## Calificación

Por favor empiecen lo antes posible, porque vamos a utilizar instancias de Amazon para el autograder y este solo puede procesar 4 submits al mismo tiempo (esto por lo general toma bastante tiempo en completarse). Para este proyecto vamos a limitar la cantidad de veces que ustedes pueden hacer submit, a **20 por persona** debido a cuestiones de créditos. Sí, si ustedes van en pareja, en teoría tendrían 40 submits. De esta manera, tal vez motivamos la colaboración. Les recomendamos que prueben en una computadora con un **procesador intel con extensión AVX habilitada** antes de gastar sus créditos. Pueden ir al laboratorio para esto si no tienen una. Las medidas no van a ser exactas, pero les darán una idea. Para ver su _speedup_ aproximado pueden ejecutar los siguientes comandos:


```shell
make clean && make
./check speedup
```

Para ver el _speedup_ real pueden subir su implementación al autograder, haciendo lo siguiente:

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

Repo: proj3_optimizations

Best Score: 100/100

Last Output:

Exercise                      Grade  Message
--------------------------  -------  --------------------
1. Performance Programming      100  passed: speedup: 16X
```

En su página de Dashboard hay un nuevo link llamado [Project 3 Race](https://dashboard.cc-3.site/race), si le dan click van a ver algo parecido a lo siguiente:

![Project 3 Race](/img/projs/proj03/race.png)

Este es un tablero de posiciones, donde pueden ver los speedups alcanzados por sus otros compañeros de todas las secciones, si ustedes quedan dentro de los **primeros 3 lugares** y con un speedup mayor a **12X** pueden recibir cierta cantidad de **puntos extra**, más adelante les diremos cuánto exactamente... Como es un tablero donde aparecen los nombres de forma individual y no los grupos, si el primer y segundo lugar (por ejemplo) pertenecen al mismo grupo, el grupo recibirá los puntos del primer lugar, y entonces el tercer lugar sería el segundo lugar realmente. Esto es al estilo "ANSI C Race", para motivarlos a hacer su mejor esfuerzo y el mejor trabajo posible.

Los auxiliares de este curso harán el proyecto también, si alguno de ustedes supera el speedup de un auxiliar, ustedes pueden obtener otra bonificación.

<p align="center">
  <img src="/img/projs/proj03/giphy.gif" alt="Challenge Accepted"/>
</p>
