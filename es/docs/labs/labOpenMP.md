# Lab 9 - Thread Level parallelism con OpenMP

## Objetivo

 * Aprender acerca de OpenMP y thread level parallelism


## Referencias Adicional

  * [OpenMP Hands On](http://openmp.org/mp-documents/omp-hands-on-SC08.pdf)
  * [OpenMP Tutorials](https://www.openmp.org/resources/#Tutorials)


## Preparación

Tienen que tener todos los archivos base, estos se encuentran [aquí](https://classroom.github.com/a/AMMyu594). Recuerden que tienen que aprovechar el uso de Git y subir el link de su repositorio al GES, así como al autograder, de lo contrario su nota será de **0**.

**Por favor revisen la sección de calificación para conocer el límite de submits que tienen**.

## Introducción a OpenMP

**OpenMP** es un framework de programación paralela para C/C++ y Fortran. Ha ganado bastante popularidad en los últimos años, principalmente por su simplicidad y buen performance. En este laboratorio vamos a darle un vistazo a una pequeña fracción de sus características, pero en la sección ***Referencia Adicional*** hay links con más información y tutoriales (*para los interesados*).

Hay muchos tipos de paralelismo y patrones para aprovechar ese paralelismo. OpenMP utiliza un modelo de fork y join anidado. Por defecto, un programa de OpenMP es un programa sequencial normal, exceptuando las regiones que el programador explicitamente declara para que se ejecuten en paralelo. En la región paralela, el framework crea (hace un fork) un número de threads. Tipicamente estos threads ejecutan las mismas instrucciones, solo que en diferentes porciones de los datos. Al final de la región paralela, el framework espera por todos los threads a que terminen (hace join) antes de dejar la región y continuar secuencialmente.

<p align="center">
  <img src="/img/labs/lab11/forkjoin.jpg" alt="Fork Join"/>
</p>

OpenMP utiliza *memoria compartida*, esto significa que todos los threads pueden acceder al mismo espacio de direcciones. La alternativa a esto sería *memoria distribuida*, que es lo principal en clusters donde los datos deberían de ser movidos explicitamente entre espacios de direcciones. Muchos programadores encuentran la memoria compartida más fácil de programar, dado que no tienen que preocuparse de mover los datos, pero es usualmente más difícil de implementar en hardware de una manera escalable. Más adelante en este laboratorio vamos a declarar memoria que va a ser local al thread (*solo el thread que la declara puede acceder a esta memoria*) por motivos de performance, pero OpenMP provee la flexibilidad para que los threads puedan compartir memoria sin que el programador lo haga.

## Ejemplo Hola Mundo

Para este laboratorio, vamos a utilizar C. OpenMP es un framework con una interfaz de C, esto quiere decir que no es una parte del lenguaje como tal. La mayoría de características son realmente directivas al compilador. Consideren la siguiente implementación del Hola Mundo (***hello.c***)

```c
int main() {
  #pragma omp parallel
  {
    int thread_ID = omp_get_thread_num();
    printf(" hello world %d\n", thread_ID);
  }
}
```

Este programa va a crear (fork) el número por defecto de threads y cada thread creado va a imprimir "_hello world_" así como también el número que le corresponde. El `#pragma` le dice al compilador que el resto de la linea es una directiva, y en este caso es `omp parallel`. `omp` declara que es para OpenMP y `parallel` le dice que el siguiente bloque de código (lo que está contenido en `{}`) puede ser ejecutado en paralelo. Pueden probarlo con lo siguiente:

```shell
make hello
./hello
```

Corran el comando `./hello` unas cuantas veces. Noten como los números de los threads no necesariamente se imprimen en orden numérico y tampoco en el mismo orden si corren `./hello` multiples veces, esto es porque en una región `omp parallel`, el programador se garantiza que las operaciones se pueden hacer en paralelo, y que no hay un orden entre los threads. También vale la pena notar que la variable `thread_ID` es local a cada thread. En general en OpenMP, las variables que se declaran a fuera de un bloque `omp parallel` tienen una sola copia y son compartidas a traves de todos los threads, mientras que las variables que se declaran adentro de ese bloque tienen una copia privada para cada thread.


## Ejercicio 1: Suma de Vectores

La suma de vectores es un cálculo inherentemente paralelo, así que es bueno para que sea el primer ejercicio. La función `v_add` adentro de ***v_add.c*** va a retornar un arreglo que es la suma de los vectores de entrada `x` y `y` componente por componente. Un primer intento de resolverlo se podría ver así:

```c
void v_add(double* x, double* y, double* z) {
  #pragma omp parallel
  {
    for(int i=0; i<ARRAY_SIZE; i++)
      z[i] = x[i] + y[i];
  }
}
```

Pueden correr esto haciendo lo siguiente:

```shell
make v_add
./v_add
```

Y las pruebas que se ejecutarán van a tomar el tiempo automáticamente y variar el número de threads. Ustedes van a ver que a medida de que se incrementa el número de threads cada vez se va haciendo más lento. Este problema se debe a que cada thread está ejecutando todo el código dentro del bloque `omp parallel`, esto significa que si tienen 8 threads, van a estar sumando los vectores 8 veces. **¡¡NO HAGAN ESTE TIPO DE COSAS!!**. Para obtener una aceleración al incrementar el número de threads, necesitamos que cada thread haga menos trabajo, no la misma cantidad como antes.

<p align="center">
  <img src="/img/labs/lab11/decomp.jpg" alt="Suma Vectores Paralelo"/>
</p>

Su tarea es modificar v_add de tal manera que se note la aceleración (la aceleración se puede estancar a medida de que el número de threads se incrementa). La mejor manera para hacer esto es decrementar la cantidad de trabajo que un thread hace. Para ayudarlos en el proceso, hay dos funciones útiles de OpenMP:

* `int omp_get_num_threads()`
* `int omp_get_thread_num()`


La función `omp_get_num_threads()` va a retornar cuantos threads hay dentro de un bloque `omp parallel`, y `omp_get_thread_num()` va a retornar el ID o número de thread.

Hay dos formas para dividir el trabajo en cada thread, la primera (que no deberían utilizar) es la técnica de **slicing**: cada thread maneja sumas adyacentes, es decir, el thread 0 va a sumar todos los elementos que están en los indices `i` tal que `i % omp_get_num_threads()` es 0, el thread 1 va a sumar todos los elementos tal que `i % omp_get_num_threads()` es 1 y así... noten que este método no va a ser eficiente porque va a sufrir de un problema llamado [**false sharing**](http://en.wikipedia.org/wiki/False_sharing). La segunda manera de hacerlo (y como lo tienen que hacer ustedes) es la técnica de **chunking**: si hay N threads, hay que partir los vectores en N chunks continuos, y hacer que cada thread sume cada chunk (como la figura de arriba).

> PISTA: Puede ser que necesiten un caso especial para prevenir salirse del arreglo. No teman escribir un caso especial.


Para este ejercicio, nosotros les estamos pidiendo que manualmente dividan el trabajo a traves de los threads. Dado que es un patrón comun, los diseñadores de OpenMP hicieron una directiva que hace esto por ustedes automáticamente. Aquí está la función utilizando la directiva: (***Ustedes NO pueden utilizar esta directiva en su solución del ejercicio.***)

```c
void v_add(double* x, double* y, double* z) {
  #pragma omp parallel
  {
    #pragma omp for
    for(int i=0; i<ARRAY_SIZE; i++)
      z[i] = x[i] + y[i];
  }
}
```

## Ejercicio 2: Producto Punto

El siguiente calculo interesante que queremos ver es el producto punto entre dos vectores. A primera vista, implementar esto puede ser no muy diferente a `v_add`, pero el reto es como sumar todos los productos en una misma variable (reducción/reduction). Manejar de forma no inteligente la reducción va a resultar en las famosas condiciones de carrera: todos los threads están tratando de leer y escribir a la misma dirección simultáneamente. Una solución es utilizar una sección crítica. El código en la sección crítica puede ser únicamente ejecutado por un solo thread. Tener una sección crítica naturalmente previene que multiples threads lean y escriban a los mismos datos, un problema que podría llevar a condiciones de carrera. Una solución no muy buena protegería la suma con una sección crítica (dotp.c):

```c
double dotp(double* x, double* y) {
  double global_sum = 0.0;
  #pragma omp parallel
  {
    #pragma omp for
    for(int i=0; i<ARRAY_SIZE; i++)
      #pragma omp critical
        global_sum += x[i] * y[i];
  }
  return global_sum;
}
```

Pruben el código haciendo:

```shell
make dotp
./dotp
```

Noten como el performance es peor a medida que el número de threads se incrementa. Dado que se está poniendo todo el trabajo de la reducción en la sección crítica, hemos desperdiciado el paralelismo y hecho que solo un thread pueda hacer el trabajo cada tiempo (que no es exactamente la idea detrás del paralelismo a nivel de threads). Esto es algo problemático, cada thread está constantemente luchando por la sección crítica y solo uno está haciendo progreso en cualquier momento. A medida que el número de threads incrementa, la cantidad de threads en espera también, y el performance paga el precio. ¿Pueden arreglar ustedes este cuello de botella?

> PISTA: Reduzcan el número de veces que cada thread necesita utilizar la sección crítica.

Pueden hacer esto de dos maneras diferentes también

1. Pueden arreglarlo sin utilizar la palabra clave de OpenMP `reduction`, y tratar de reducir la cantidad de veces que un thread debe de sumar a la variable compartida `global_sum`.
2. Pueden arreglarlo utilizando la palabra clave de OpenMP `reduction` (abran Google para buscar información). Si utilizan esta opción, ya no deberían de tener una sección crítica. Además van a necesitar escribir un `+` en alguna parte utilizando esto.


La sintáxis exacta para utilizar estas directivas puede ser un poco confusa. Aquí va un poco de información adicional:

* Una sección `#pragma omp parallel` puede ser especificada utilizando llaves `{}` que rodeen el código a paralelizar.
* Una sección `#pragma omp for` no debería de estar acompañada con llaves `{}`. Solo pongan la directiva arriba del for.


## Calificación

Al terminar, deben de subir su laboratorio al autograder con:

```shell
./submit <TOKEN>
```

Para este laboratorio su solución será evaluada en un servidor de AWS EC2 por lo que únicamente tienen permitido hacer ***3 submits***. Les aconsejamos probar bien su código antes de enviarlo al autograder. No olviden también subir el link de su repositorio en Github al GES.
