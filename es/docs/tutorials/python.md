# Tutorial de Python 3

<p align="center">
<img src="/img/python.svg" alt="Python"/>
</p>

El objetivo de este tutorial es que ustedes puedan aprender sobre lo básico de **Python 3**, no esperamos que se vuelvan expertos con esta introducción. En este curso no es fundamental que dominen al 100% este lenguaje de programación y realmente solo necesitan conocer lo básico para poder completar satisfactoriamente los laboratorios y proyectos que utilicen este lenguaje.

## Instalación

Actualmente hay 2 diferentes versiones soportadas de Python: **2.7** y **3.X**. Para este curso vamos a estar utilizando Python 3 y más especificamente utilizar Anaconda Python. Para instalar Anaconda en sus computadoras tienen que hacer lo siguiente:

```shell
wget https://repo.anaconda.com/archive/Anaconda3-2019.03-Linux-x86_64.sh
bash Anaconda3-2019.03-Linux-x86_64.sh
source ~/.bashrc
```

Esto va a instalar Anaconda Python **3.7**, para verificar la version pueden correr el siguiente comando:

```shell
python --version
```

Para abrir el intérprete de Python solo necesitan escribir:

```shell
python
```

Si su instalación es correcta resultará en algo como esto:

```shell
Python 3.7.3 (default, Mar 27 2019, 22:11:17)
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

## Introducción

Python es un lenguaje de programación ***multiparadigma*** y con ***tipos dinámicos***. El código escrito en Python se dice que es similar al pseudocódigo, ya que permite expresar ideas bastante poderosas en muy pocas líneas de código y al mismo tiempo ser bastante leíble. Como ejemplo, aquí hay una implementación del clásico algoritmo **quicksort** escrito en Python:

```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3,6,8,10,1,2,1]))
```
<pre id="quicksort-out"></pre>

<button class="brun" onclick="quicksort()">Run</button> <button id="bquicksort" class="bclear" onclick="rm('bquicksort', 'quicksort-out')" style="visibility: hidden;">Clear</button>


## Tipos de datos básicos

Como en muchos lenguajes, Python tiene un número de tipos de datos básicos incluyendo enteros, floats, booleans y strings. Estos tipos de datos se comportan como lo han visto en otros lenguajes de programación (C por ejemplo).

### Números

Los enteros y los floats funcionan como ustedes han visto que funcionan en otros lenguajes:

```python
x = 3
print(type(x)) # type: sirve para obtener el tipo de un objeto
print(x)
print(x + 1)
print(x - 1)
print(x * 2)
print(x / 2)   # division exacta
print(x // 2)  # division entera
print(x ** 3)  # exponentes
x += 1
print(x)
x *= 2
print(x)
y = 2.5
print(type(y))
print(y)
print(y + 1)
print(y * 2)
print(y / 2)
print(y ** 2)
```

<pre id="nums-out"></pre>

<button class="brun" onclick="nums()">Run</button> <button id="bnums" class="bclear" onclick="rm('bnums', 'nums-out')" style="visibility: hidden;">Clear</button>


Noten que Python no tiene los operadores de incremento unario (`x++`) o decremento (`x--`). Python también tiene tipos para manejo de números completos, todo esto lo pueden ver en la [documentación](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)

### Booleans

Python implementa todos los operadores usuales para hacer lógica booleana, pero usa palabras en Inglés en vez de símbolos (`&&`, `||`, etc.):

```python
t = True
f = False
print(type(t))
print(t and f) # AND lógico
print(t or f)  # OR lógico
print(not t)   # NOT lógico
print(t != f)  # XOR lógico
```

<pre id="bools-out"></pre>

<button class="brun" onclick="bools()">Run</button> <button id="bbools" class="bclear" onclick="rm('bbools', 'bools-out')" style="visibility: hidden;">Clear</button>

### Strings

Python tiene buen soporte de strings:

```python
hello = 'hello'           # las literales string pueden ser declaradas con apóstofre
world = "world"           # o comillas, no importa la verdad...
print(hello)
print(len(hello))         # con len obtenemos el length del string
hw = hello + ' ' + world  # concatenación, así como en Java
print(hw)
hw12 = '%s %s %d' % (hello, world, 12) # formato de texto al estilo sprintf
print(hw12)
```

<pre id="strings1-out"></pre>

<button class="brun" onclick="strings1()">Run</button> <button id="bstrings1" class="bclear" onclick="rm('bstrings1', 'strings1-out')" style="visibility: hidden;">Clear</button>

Los objetos de tipo string tienen un montón de métodos útiles; Por ejemplo:

```python
s = 'hello'
# Pone la letra del principio en mayuscula
print(s.capitalize())  
# Pasa el string a mayusculas
print(s.upper())       
# Justifica un string, rellenando con espacios
print(s.rjust(7))      
# Centra un string, rellanando con espacios
print(s.center(7))
# Reemplaza todas las apariciones de un substring por otro
print(s.replace('l', '(ell)'))  
# Quita todos los caracteres de whitespace del principio y final
print('  world '.strip())
```

<pre id="strings2-out"></pre>

<button class="brun" onclick="strings2()">Run</button> <button id="bstrings2" class="bclear" onclick="rm('bstrings2', 'strings2-out')" style="visibility: hidden;">Clear</button>

Pueden encontrar una lista de todos los métodos en la [documentación](https://docs.python.org/3/library/stdtypes.html#string-methods).

## Contenedores

Python incluye bastantes tipos de contenedores: listas, diccionarios, sets y tuplas.

### Listas

Una lista en Python es equivalente a un arreglo en C o Java, pero es dinámico (puede cambiar su tamaño, es decir no es fijo) y puede tener elementos de diferentes tipos:\

```python
# Crea una lista
xs = [3, 1, 2]  
print(xs)
# Para acceder a un elemento de la lista, los indices van de 0 a length - 1
print(xs[1])
# Los indices negativos empiezan desde el final de la lista
print(xs[-1])     
# Las listas pueden contener elementos de diferentes tipos
xs[2] = 'foo'    
print(xs)         
# Añade un elemento al final de la lista
xs.append('bar')
print(xs)         
# Quita y devuelve el último elemento de la lista
x = xs.pop()  
print(x, xs)      
# para obtener el length de la lista
print(len(xs))
```

<pre id="lists-out"></pre>

<button class="brun" onclick="lists()">Run</button> <button id="blists" class="bclear" onclick="rm('blists', 'lists-out')" style="visibility: hidden;">Clear</button>

Puden encontrar más detalles en la [documentación](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists) de listas.

#### Slicing
Además de acceder a los elementos de una lista uno a la vez, Python provee una sintaxis para acceder a sublistas, a esto se le conoce como ***slicing***:


```python
# Creamos una nueva lista
nums = [0, 1, 2, 3, 4]
print(nums)   
# Agarra una sublista desde el indice 2 hasta el indice 3 es decir [2,4)      
print(nums[2:4])   
# Agarra una sublista desde el indice 2 hasta el final de la lista, es decir [2,4]
print(nums[2:])     
# Agarra una sublista desde el principio de la misma hasta el indice 2 sin incluir, es decir [0,2)
print(nums[:2])    
# Agarra toda la lista "[0, 1, 2, 3, 4]"
print(nums[:])     
# El slice puede ser negativo, en este caso agarra desde el principio hasta el penultimo elemento, es decir [0,3]
print(nums[:-1])    
# Asigna una sublista al slice
nums[2:4] = [8, 9]
print(nums)  
```

<pre id="lists1-out"></pre>

<button class="brun" onclick="lists1()">Run</button> <button id="blists1" class="bclear" onclick="rm('blists1', 'lists1-out')" style="visibility: hidden;">Clear</button>

#### Ciclos

Pueden iterar sobre elementos de una lista de la siguiente manera:

```python
animals = ['cat', 'dog', 'monkey']
for animal in animals:
    print(animal)
```

<pre id="lists2-out"></pre>

<button class="brun" onclick="lists2()">Run</button> <button id="blists2" class="bclear" onclick="rm('blists2', 'lists2-out')" style="visibility: hidden;">Clear</button>

Si quieren acceder al indice de cada elemento dentro del ciclo, pueden utilizar la funcion “enumerate”:

```python
animals = ['cat', 'dog', 'monkey']
for idx, animal in enumerate(animals):
    print('#%d: %s' % (idx + 1, animal))
```

<pre id="lists3-out"></pre>

<button class="brun" onclick="lists3()">Run</button> <button id="blists3" class="bclear" onclick="rm('blists3', 'lists3-out')" style="visibility: hidden;">Clear</button>

#### List comprehensions

Cuando estamos programando, frecuentemente vamos a querer transformar un tipo de dato hacia otro. Como un ejemplo simple, consideren el siguiente código que calcula numeros al cuadrado:

```python
nums = [0, 1, 2, 3, 4]
squares = []
for x in nums:
    squares.append(x ** 2)
print(squares)
```

<pre id="lists4-out"></pre>

<button class="brun" onclick="lists4()">Run</button> <button id="blists4" class="bclear" onclick="rm('blists4', 'lists4-out')" style="visibility: hidden;">Clear</button>

Pueden hacer este código más simple utilizando una list comprehension:

```python
nums = [0, 1, 2, 3, 4]
squares = [x ** 2 for x in nums] # list comprehension
print(squares)
```

<pre id="lists5-out"></pre>

<button class="brun" onclick="lists5()">Run</button> <button id="blists5" class="bclear" onclick="rm('blists5', 'lists5-out')" style="visibility: hidden;">Clear</button>

Las list comprehension pueden contener condiciones:

```python
nums = [0, 1, 2, 3, 4]
even_squares = [x ** 2 for x in nums if x % 2 == 0]
print(even_squares)
```

<pre id="lists6-out"></pre>

<button class="brun" onclick="lists6()">Run</button> <button id="blists6" class="bclear" onclick="rm('blists6', 'lists6-out')" style="visibility: hidden;">Clear</button>

### Diccionarios

Un diccionario guarda un par (key, value), similar a un Map en java. Pueden utilizarlo así:

```python
# crea un nuevo diccionario con algunos datos
d = {'cat': 'cute', 'dog': 'furry'}
# toma el valor del key 'cat'
print(d['cat'])
# verifica que el key 'cat' este en el diccionario d
print('cat' in d)
# añade un par key, value al diccionario d
d['fish'] = 'wet'
print(d['fish'])
# el key 'monkey' no existe, pero podemos poner un valor por defecto, en este caso N/A
print(d.get('monkey', 'N/A'))
# como fish existe no imprime el valor por defecto
print(d.get('fish', 'N/A'))
# podemos eliminar elementos del diccionario
del d['fish']
# come fish lo quitamos y ya no existe, tiene que devolver el valor por defecto
print(d.get('fish', 'N/A'))
```

<pre id="dicts-out"></pre>

<button class="brun" onclick="dicts()">Run</button> <button id="bdicts" class="bclear" onclick="rm('bdicts', 'dicts-out')" style="visibility: hidden;">Clear</button>

Pueden encontrar todo lo que necesitan saber de diccionarios en la [documentación](https://docs.python.org/3/library/stdtypes.html#dict).

#### Ciclos

Es fácil iterar sobre las keys de un diccionario:

```python
d = {'person': 2, 'cat': 4, 'spider': 8}
for animal in d:
    legs = d[animal]
    print('A %s has %d legs' % (animal, legs))
```

<pre id="dicts1-out"></pre>

<button class="brun" onclick="dicts1()">Run</button> <button id="bdicts1" class="bclear" onclick="rm('bdicts1', 'dicts1-out')" style="visibility: hidden;">Clear</button>


Si quieren acceder a las keys y sus valores correspondientes pueden utilizar el método “items”:

```python
d = {'person': 2, 'cat': 4, 'spider': 8}
for animal, legs in d.items():
    print('A %s has %d legs' % (animal, legs))
```

<pre id="dicts2-out"></pre>

<button class="brun" onclick="dicts2()">Run</button> <button id="bdicts2" class="bclear" onclick="rm('bdicts2', 'dicts2-out')" style="visibility: hidden;">Clear</button>

#### Dictionary comprehensions

Estos son similares a las list comprehensions, pero ayuda a construir diccionarios fácilmente, por ejemplo:

```python
nums = [0, 1, 2, 3, 4]
even_num_to_square = {x: x ** 2 for x in nums if x % 2 == 0}
print(even_num_to_square)
```

<pre id="dicts3-out"></pre>

<button class="brun" onclick="dicts3()">Run</button> <button id="bdicts3" class="bclear" onclick="rm('bdicts3', 'dicts3-out')" style="visibility: hidden;">Clear</button>

### Sets

Un set es un la colección no ordenada de elementos distintos. Como ejemplo simple, consideren lo siguiente:

```python
animals = {'cat', 'dog'}
# Verifica que un elemento este en el set
print('cat' in animals)   
print('fish' in animals)
# Añade un elemento al set
animals.add('fish')      
print('fish' in animals)
# Numero de elementos en un set
print(len(animals))       
# Añadir un elemento que ya esta en el set, lo permite pero no pasa nada
animals.add('cat')     
print(len(animals))   
# Remueve un elemento del set
animals.remove('cat')  
print(len(animals))
```

<pre id="sets-out"></pre>

<button class="brun" onclick="sets()">Run</button> <button id="bsets" class="bclear" onclick="rm('bsets', 'sets-out')" style="visibility: hidden;">Clear</button>

Otra vez, todo lo que quieran saber acerca de los sets lo pueden encontrar en la [documentación](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset).

#### Loops

Iterear sobre un set tienen la misma sintaxis que iterar sobre una lista, sin embargo como los sets no tienen orden, no pueden asumir sobre en que orden se van a visitar los elementos del set:

```python
animals = {'cat', 'dog', 'fish'}
for idx, animal in enumerate(animals):
    print('#%d: %s' % (idx + 1, animal))
```

<pre id="sets1-out"></pre>

<button class="brun" onclick="sets1()">Run</button> <button id="bsets1" class="bclear" onclick="rm('bsets1', 'sets1-out')" style="visibility: hidden;">Clear</button>

#### Set comprehensions

como las listas y los diccionarios, podemos construir sets fácilmente utilizando set comprehensions:

```python
from math import sqrt
nums = {int(sqrt(x)) for x in range(30)}
print(nums)
```

<pre id="sets2-out"></pre>

<button class="brun" onclick="sets2()">Run</button> <button id="bsets2" class="bclear" onclick="rm('bsets2', 'sets2-out')" style="visibility: hidden;">Clear</button>

### Tuplas

Una tupla es una lista ordenada de elementos “fija”. Una tupla es bastante similar a una lista, una de las más importantes diferencias es que las tuplas se pueden utilizar como keys en un diccionario y como elementos de los sets, mientras que las listas no. Aquí hay un ejemplo:

```python
# Crea un diccionario con keys de tuplas
d = {(x, x + 1): x for x in range(10)}  
# Crea una tupla
t = (5, 6)      
print(type(t))
print(d[t])
print(d[(1, 2)])
```

<pre id="tuples-out"></pre>

<button class="brun" onclick="tuples()">Run</button> <button id="btuples" class="bclear" onclick="rm('btuples', 'tuples-out')" style="visibility: hidden;">Clear</button>

La [documentación](https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences) tiene mas información acerca de las tuplas.

## Funciones

Las funciones de Python se definen utilizando el keyword def. Por ejemplo:

```python
def sign(x):
    if x > 0:
        return 'positive'
    elif x < 0:
        return 'negative'
    else:
        return 'zero'

for x in [-1, 0, 1]:
    print(sign(x))
```

<pre id="funct-out"></pre>

<button class="brun" onclick="funct()">Run</button> <button id="bfunct" class="bclear" onclick="rm('bfunct', 'funct-out')" style="visibility: hidden;">Clear</button>

Vamos a definir funciones que toman argumentos, y opcionalmente argumentos keyword, como esto:

```python
def hello(name, loud=False):
    if loud:
        print('HELLO, %s' % name.upper())
    else:
        print('Hello, %s!' % name)

hello('Bob')
hello('Fred', loud=True)
```

<pre id="funct1-out"></pre>

<button class="brun" onclick="funct1()">Run</button> <button id="bfunct1" class="bclear" onclick="rm('bfunct1', 'funct1-out')" style="visibility: hidden;">Clear</button>

Hay mucha información acerca de como definir funciones en Python en la [documentación](https://docs.python.org/3/tutorial/controlflow.html#defining-functions).


## Funciones Lambda

Python tiene una sintaxis definida para funciones anónimas, ***lambda functions***, están son bastante utiles para pasarlas como argumento a otras funciones:

```python
# importamos la funcion reduce
from functools import reduce
# definimos una funcion anonima y se la asignamos a una variable x
x = lambda l: l ** 2
# podemos usar la funcion anonima como cualquier otra funcion
print(x(2))
# pero lo mas importante es que la podemos pasar como argumento
def foo(f):
    return f(4)
print(foo(lambda x: x + 1))
# aunque esto no implica que con las funciones normales puedan hacer esto...
def bar(x):
    return x ** 2
print(foo(bar))
# por lo general se utilizan con las funciones map, reduce y filter de python que trabajan con listas
print(list(map(lambda x: x ** 2, [1, 2, 3, 4, 5])))
print(list(filter(lambda x: x > 2, [1, 2, 3, 4, 5])))
print(reduce(lambda a, b: a + b, [1, 2, 3, 4, 5]))
# pero tambien se ven muy seguido cuando se trabaja con el paradigma MapReduce y Spark
# que es parte de su proyecto y este laboratorio !!!
```

<pre id="funct2-out"></pre>

<button class="brun" onclick="funct2()">Run</button> <button id="bfunct2" class="bclear" onclick="rm('bfunct2', 'funct2-out')" style="visibility: hidden;">Clear</button>

## Clases

La sintaxis para definir clases en Python es bastante simple:

```python
class Greeter:

    # Constructor
    def __init__(self, name):
        self.name = name  # Crea un atributo para la clase

    # Un metodo de la clase
    def greet(self, loud=False):
        if loud:
            print('HELLO, %s!' % self.name.upper())
        else:
            print('Hello, %s' % self.name)


# Crea una instancia de la clase
g = Greeter('Fred')  
# Llama al metodo de la clase; imprime "Hello, Fred"
g.greet()   
# Llama al metodo de la clase; imprime "HELLO, FRED!"
g.greet(loud=True)   
```

<pre id="cls-out"></pre>

<button class="brun" onclick="cls()">Run</button> <button id="bcls" class="bclear" onclick="rm('bcls', 'cls-out')" style="visibility: hidden;">Clear</button>

Con esto concluimos el tutorial de Python 3, pueden obtener más información en la [documentación](https://docs.python.org/3/) de Python 3 oficial o incluso seguir el [tutorial](https://docs.python.org/3/tutorial/) completo que ellos tienen.
