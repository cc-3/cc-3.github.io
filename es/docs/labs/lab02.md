# Lab 2 - CGDB y punteros

## Objetivos

* Aprender a usar el debugger (depurador) de C
* Encontrar errores en programas usando cgdb
* Practicar el uso de punteros

## Preparación
Para obtener sus archivos base visite el siguiente link, luego clone su repositorio.

```
https://classroom.github.com/a/GaL-ZrRp
```

```
git clone https://github.com/cc3-ug/lab02-2024-MI_USUARIO.git
```

Un par de recordatorios, si necesita ayuda con esto revise los labs anteriores para más detalle:

* Si está trabajando en las computadoras del lab o en alguna máquina nueva, debe volver a hacer las configuraciones de Github.

* En Github usamos token en lugar de contraseña.




## Ejercicio 1: Debugger (depurador)
### ¿Qué es un debugger?
Un **debugger**, como sugiere el nombre, es un programa específicamente diseñado para ayudarlos a encontrar **bugs**, es decir errores en el código (nota: si quieren saber por qué se les llama bugs a los errores, vean [aquí](https://www.quora.com/Why-are-errors-in-software-codes-called-bugs)). Distintos debuggers tienen distintas características, pero es normal que todos los debuggers sean capaces de hacer las siguientes cosas:

  1. Poner un **breakpoint** en el programa. Un breakpoint es una línea específica en su código en donde quisieran que se detenga la ejecución del programa, para que puedan ver lo que está pasando alrededor.

  2. Ejecución por **steps** (línea a línea) por el programa. El código siempre se ejecuta línea a línea, pero pasa muy rápido como para que sepamos qué línea produce algún error. Ser capaces de ejecutar línea a línea el programa les permite observar exactamente qué esta causando un bug en el programa.

Para este ejercicio, necesitarán la [GDB reference card](http://inst.eecs.berkeley.edu/~cs61c/resources/gdb5-refcard.pdf). Para poder usarlo compilaremos con la bandera `-g`. 

```shell
gcc -g -o hello hello.c
```

Esto hará que gcc guarde información en el archivo ejecutable para que cgdb lo interprete. Ahora ejecuten el debugger:

```shell
cgdb hello
```

Vean lo que hace este comando. Están ejecutando el programa `cgdb` en el **ejecutable** `hello` generado por `gcc`. No intenten ejecutar cgdb en el archivo fuente en `hello.c`! Eso no va a funcionar.

**Su tarea: Ejecute el programa en cgdb varias veces, pruebe distintos comandos en cada ejecución**
  1. Ponga un breakpoint en el main.
  2. Use el comando `run` de cgdb.
  3. Use el comando para single-step de cgdb.

Escriban `help` adentro de cgdb para averiguar cómo hacer estas cosas, o usen la reference card.

**Si encuentran un mensaje de error que dice `printf.c: No such file or directory`:** Probablemente entraron a una función `printf`. Si siguen ejecutando paso a paso, pareciera que nunca avanzaran en el código. cgdb está dando el error porque no tienen el archivo en el que se define la función `printf`. Esto es algo molesto, entonces para librarse de esto usen el comando `finish` para ejecutar el programa hasta que termine la función printf. La próxima vez que prueba, utilice el comando `next` para saltar sobre la linea que usa `printf`.

En cgdb, pueden presionar `ESC` para ir a la ventana del código (arriba), y usar `i` para regresar a la ventana de comandos (abajo). La ventana de comandos es donde se introducen los comandos de cgdb.
  
Para este ejercicio, encontrarán un archivo de texto llamado **ex1.txt**, con el siguiente formato:

```shell
1:
2:
3:
4:
5:
6:
7:
8:
9:
```
Aquí tendrán que responder las siguientes preguntas de opción múltiple con el siguiente formato. Los siguiente son solo ejemplos, usted debe colocar la letra de la respuesta que considere correcta.

```shell
1:e
2:f
3:g
4:h
5:i
6:j
7:k
8:l
9:m
```

No responda al azar. Lea la documentación y/o pruebe los comandos para saber que hace cada uno.
 
**Preguntas**

  **1.** ¿Cómo se le dan **argumentos desde la línea de comandos** a un programa al utilizar gdb?
  
  a. args arglist   
  b. run arglist    
  c. gdb args   
  d. Ninguna de las anteriores
    
  **2.** ¿Cómo se añade un breakpoint que sólo ocurre cuando se cumplen **ciertas condiciones** (por ejemplo, ciertas variables alcanzan cierto valor)?
  
  a. expr cond    
  b. cond break expr    
  c. break ... if expr    
  d. Ninguna de las anteriores
  
  **3.** ¿Con qué comando se ejecuta la **siguiente línea del código en C** después de parar en un breakpoint? (si la línea a ejecutar es una llamada a función, debe ejecutarse toda la función)
    
  a. run    
  b. s    
  c. c    
  d. n    
  
  **4.** ¿Cómo se le indica a cgdb, que quieren debuggear el código **adentro de la función**? (esta respuesta es distinta a la pregunta 3, ahora ya no pasamos por encima sino que entramos a debuggear la función)
    
  a. run    
  b. s    
  c. c    
  d. n    
    
  **5.** ¿Cómo se reanuda la ejecución del programa después de parar en un breakpoint?
    
  a. run    
  b. s    
  c. c    
  d. n    

  **6.** ¿Cómo podemos ver el valor de una variable (o expresión) en cgdb?
    
  a. display expr   
  b. signal expr    
  c. print expr   
  d. next expr    
    
  **7.** ¿Qué comando de cgdb se usa para desplegar el valor de una variable **después de cada paso**?
    
  a. display expr   
  b. signal expr    
  c. print expr   
  d. next expr    
    
  **8.** ¿Cómo se imprime una lista de **todas las variables y su valor** en la función actual?
    
  a. info locals   
  b. display locals   
  c. info all   
  d. display all   
  
  **9.** ¿Cómo salimos de cgdb?
    
  a. end    
  b. quit   
  c. exit   
  d. finish   

Después de responder estas preguntas, no olviden hacer el add, commit y push de este archivo hacia Github:
```shell
git add ex1.txt
git commit -m "Ejercicio 1 terminado"
git push  origin master
``` 

## Ejercicio 2: Depurando un problema con fallas usando cgdb
Ahora usarán lo aprendido en el ejercicio 1 para buscar errores en un programa, usando cgdb. Vean el programa `ll_equal.c`. Lean el programa y analicen un poco lo que hace, luego compilen y ejecuten. Así como está, producirá un resultado como el siguiente:

```shell
gcc -g -o ll_equal ll_equal.c
./ll_equal

equal test 1 result = 1
Segmentation fault
```
**Su tarea: Averigüen qué produce el segmentation fault (falla de segmentación)**.

Ejecuten cgdb en el programa, siguiendo las instrucciones aprendidas en los ejercicios anteriores. Les recomendamos añadir un breakpoint en la función `ll_equal()`. Cuando el debugger pare en el breakpoint, ejecuten paso a paso el programa para que puedan descifrar qué es lo que provoca el error.

* Pista 1: Analicen el valor de los punteros `a` y `b` en la función (¡despliéguenlos!). ¿Están siempre apuntando a la dirección correcta?

* Pista 2: Vean el código fuente en `main` para ver la estructura de los nodos y ver exactamente qué se está enviando como argumento a `ll_equal`.

Cuando haya encontrado el problema, arréglelo, compile nuevamente y ejecute el código. ¿Nota la diferencia?

Al finalizar, no olvide subir el archivo modificado a su repositorio.

```shell
git add ll_equal.c
git commit -m "Ejercicio 2 terminado"
git push origin master
``` 

## Aprendiendo algo extra: Debuggeando un programa en C que requiere interacción del usuario
**Esta parte es opcional y no vale puntos, ni siquiera extras.**

Veamos qué pasa cuando, a un programa que requiere interacción del usuario, lo ejecutamos con cgdb. Primero, ejecuten el programa en `interactive_hello.c` para hablar con un programa muy amigable.
```shell
gcc -g -o int_hello interactive_hello.c
./int_hello
```
Ahora, traten de depurarlo paso a paso en cgdb.
```shell
cgdb int_hello
```
¿Qué pasa cuando intentar ejecutar el programa hasta el final? ¿Logró terminar o se quedó trabado?

Vamos a aprender un poco acerca de las redirecciones. Para comenzar, puede ir a leer un poco en los siguientes links:

- [Standard Input](http://linuxcommand.org/lc3_lts0070.php)
- [Discusion en Stack Overflow](https://stackoverflow.com/questions/19467865/how-to-use-redirection-in-c-for-file-input)

Ahora uniremos algunas piezas de conocimiento... ¿Qué se le ocurre hacer con el `run` que vió en el ejercicio 2 y el `<` que acaba de conocer? (Hint: Si está pensando en crear un archivo de texto, va en buen camino)

¿Ya lo pensó un poco por su cuenta? Muy bien, hora de ver la solución sobre cómo enviar datos que nuestro programa de C espera leer.

- Cree un archivo `nombre.txt` y escriba adentro su nombre, en una sola línea. Guarde el archivo en la carpeta de su lab.
- Compile su programa con banderas de debugging `gcc -g -o int_hello interactive_hello.c`
- Inicie el debugger `cgdb int_hello`
- En lugar de solo hacer `run` como antes, haga `run < nombre.txt`

¿Apareció su nombre automágicamente allí escrito? Ese es el poder de las redirecciones, el `<` nos permite enviar el contenido del archivo de texto, hacia el programa que se está debuggeando.

El debugger no es una herramienta muy atractiva visualmente, pero es increiblemente poderosa al momento de buscar errores. Úsela siempre que tenga problemas, aunque las instrucciones no se lo indiquen.

## Ejercicio 3: Punteros y estructuras en C
En **ll_cycle.c** completen la función `ll_has_cycle()` de modo que implemente el siguiente algoritmo para comprobar si una linked list simple tiene un ciclo:
  1. Comiencen con dos punteros apuntando al principio de la lista. Llamaremos al primero `tortoise` (tortuga) y al segundo `hare` (liebre).
  2. Avancen el puntero `hare` dos nodos hacia adelante. Si no se puede debido a punteros nulos, hemos llegado al final de la lista. Por lo tanto, la lista no tiene un ciclo.
  3. Ahora, avancen `tortoise` un nodo. (Revisar si llega a ser un puntero nulo es innecesario. ¿Por qué?)
  4. Si la tortuga y la liebre apuntan al mismo nodo, la lista es cíclica. Si no, regresen al paso 2.
  
Después de implementar correctamente la función `ll_has_cycle()`, el programa que se obtiene después de compilar **ll_cycle.c** mostrará si el resultado de su función está correcto, conforme a lo que esperaba como salida.

Pista: Para este ejercicio debe haber entendido que es un puntero nulo. Recuerda cuándo avanzaba en una linked list en Java? Recuerda las precauciones que debía tomar para no seguir avanzando de más?

Si necesita más explicación del algoritmo aquí hay un [artículo](https://en.wikipedia.org/wiki/Cycle_detection#Floyd.27s_Tortoise_and_Hare) sobre su funcionamiento.

A propósito, los punteros se llaman `tortoise` y `hare` porque el puntero tortoise (tortuga) se incrementa lentamente (como una tortuga, que se mueve muy lento) y el puntero hare (liebre) se incrementa rápidamente (más rápido que una tortuga, como una liebre, o conejo, que se mueve muy rápido).

Al finalizar, compilen y ejecuten el archivo, y verifiquen que el resultado de su código, el cual debería ser más o menos igual a este:

```shell
gcc -g -o ll_cycle ll_cycle.c
./ll_cycle

Checking first list for cycles. There should be none, ll_has_cycle says it has no cycle
Checking second list for cycles. There should be a cycle, ll_has_cycle says it has a cycle
Checking third list for cycles. There should be a cycle, ll_has_cycle says it has a cycle
Checking fourth list for cycles. There should be a cycle, ll_has_cycle says it has a cycle
Checking fifth list for cycles. There should be none, ll_has_cycle says it has no cycle
Checking length-zero list for cycles. There should be none, ll_has_cycle says it has no cycle
```

Si su código tiene errores, use lo aprendido sobre cgdb para encontrarlos y corregirlos. Al terminar, agregue su código a su repositorio.

```shell
git add ll_cycle.c
git commit -m "Lab 2 terminado"
git push origin master
``` 

Para finalizar, la fábula de [la tortuga y la liebre](http://read.gov/aesop/025.html) es relevante siempre, especialmente en este curso. Escribir sus programas en C a paso lento pero seguro (ayudándose de programas como cgdb) es lo que les hará ganar la carrera.

## Entrega de laboratorio

Recuerde probar su laboratorio usando el autograder.

```
./check
```

Las series valen 30, 30 y 40 puntos respectivamente.

Luego **envíe el link de su repositorio de Github en el GES**. El GES tiene una opción para enviar links, ÚSELA. Si envía algún txt, pdf, zip, etc. su laboratorio no se calificará, es decir tendrá cero.
