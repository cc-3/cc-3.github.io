# Representación Numérica

- Como las computadoras representan números
- Los humanos pensamos en base 10, esto se debe a que usamos los 10 dedos de las manos para contar. Sin embargo los números pueden ser representado en cualquier base. Por ejemplo 123 (en base 10) se representa como **0b**1111011 (Notar el 0b al inicio) en base 2.
- Los números se guardan en la memoria de la computadora (ram, cache, registros, etc.) como una serie de señales electrónicas (altas y bajas) por lo que se consideran números en base 2.

## Conversión de binario a decimal

- Para convertir un número binario a decimal multiplicamos cada bit, empezando por el bit menos significativo, por potencias de 2.
- Por convención consideraremos el bit menos significativo como el bit más a la derecha del número binario (así como el dígito de menor valor es el que eta más a la derecha en un numero decimal).
### Ejemplo
Representar el número 0b10011011 en base 10. Asuma que se encuentra en notación sin signo.
$$1 {\color{red}\times 2^7} + 0 {\color{red}\times 2^6} + 0  {\color{red}\times 2^5} + 1 {\color{red}\times 2^4} + 1 {\color{red}\times 2^3} +0 {\color{red}\times 2^2} + 1{\color{red}\times 2^1} + 1 {\color{red}\times 2^0}$$
$$=128 + 0 +0+16+8+0+2+1=155$$

Entonces 0b10011011 = 155

## Conversión de decimal a binario

Para hacer la conversión de decimal a binario, hay que dividir el número decimal entre dos y anotar en una columna a la derecha el resto (un 0 si el resultado de la división es par y un 1 si es impar).

### Ejemplo
Representar en numero 109 en base binaria, en su notación sin signo.

| N | N/2 | N%2 |
|:-----:|:----:|:---:|
| 109 | 54 | 1 |
| 54  | 27 | 0 |
| 27  | 13 | 1 |
| 13  | 6  | 1 |
| 6   | 3  | 0 |
| 3   | 1  | 1 |
| 1   | 0  | 1 |

Noten que terminamos la division cuando **N/2** es 0. El número binario resultante serían entonces todos los residuos **N%2** siendo el bit menos significativo el de la primera fila, y el bit más significativo el de la ultima fila: **0b1101101**

## Conversión de binario a hexadecimal

- El sistema hexadecimal tiene como base 16. Para suplir los digitos que faltan, usamos las letras A, B, C, D, E y F para representar los valores 10, 11,12,13, 14 y 15 respectivamente.
- Para convertir un número binario a hexadecimal puede convertir el número a base 10 y luego a base 16 o crear *grupos* de 4 bits (empezando por el bit menos significativo) y convertirlos a hexadecimal directamente.
### Ejemplo
1. Representar el número 0b10011011 en hexadecimal.

	Agrupado tenemos $0\text{b}{\color{red}1001}\, {\color{blue}1011}$.
	1011 corresponde a 11 en base 10, es decir a **'A'** en hexadecimal.
	1001 corresponde a 9 en base 10, es decir a **'9** en hexadecimal.

	Entonces 0b10011011 = 0x9A.

2. Representar el número 0b11101101101101 en hexadecimal.

	Agrupado tenemos $0\text{b}{\color{red}11}{1011}\, {\color{blue}0110} \, {\color{green}1101}$.
	1101 corresponde a **D** en hexadecimal.
	0110 corresponde a **6** en hexadecimal.
	1011 corresponde a **B** en hexadecimal.
	0011 corresponde a **3** en hexadecimal (notar que se le agregó dos ceros).

	Entonces 0b11101101101101 = 0x3B6D.
- Para convertir un número decimal a hexadecimal seguimos un procedimiento similar al empleado para convertir un número decimal a binario, excepto que el dividendo debe cambiarse por 16.

## Representación de números con signo

Hasta el momento, solo se han tratado números binarios que representan números enteros positivos. Pero tambien necesitamos una forma de representar en binario números como el -6, -100, etc.

### 1. Signo Magnitud
Cuando representamos números decimales negativos, se le antepone el símbolo **-** para indicar que el número es negativo. Es posible intentar lo mismo en binario, pero en vez de usar ese símbolo, usar un 0 o un 1 para diferenciar entre numeros positivos y negativos.

- Usaremos el bit más significativo para especificar el signo del número
- Un 1 denotará que el número es negativo y un 0 que el número es positivo.
### Ejemplo:
- El número 0b11110101 = -117 Porque el 0b1110101 = 117 y como el bit más significativo es 1, el número es negativo.
- El número 0b01110101 = 117.
- El número 0b10000001 = -1
- El número 0b00000001 = 1

Hay varias cosas que deben notarse con respecto de esta representación. Estas son las más importantes:

- La cantidad de números que se pueden representar con la misma cantidad de bits disminuye. En los ejemplos anteriores se utilizan 8 bits, pero como el bit más significativo es de signo, el número positivo más grande que podemos representar el $2^7-1=127$ en comparación con $2^8 -1=255$ si no se usara signo.
- Hay dos "0". ¿Cómo se interpreta 0b10000000?
- Sumar y restar requiere más trabajo; más adelante verán que se necesitan circuitos más complejos para realizar estas operaciones.

### 2. Complemento a uno

Para representar un número en complemento a uno se invierten todos los bits de la representación binaria del número (se intercambia 1 por 0 y viceversa).
### Ejemplo
Representar el número -101 en complemento a uno.

El número 101 = 0b01100101 invirtiendo todos los bits obtenemos.
-101 = 0b10011010.

Complemento a uno facilita más las operaciones matemáticas, pero tenemos ciertos problemas aún:
- Existen dos ceros todavia: 0b00000000 y 0b11111111
- Las operaciones matemáticas aún cuestan un poco mas. Por ejemplo, si sumamos 2 y -2 usando 4 bits: 0b0010 + 0b1101 = 0b1111 que es uno de los ceros, pero aún no es el la respuesta que deberiamos obtener.

### 3. Complemento a dos

Para representar un número en complemento a dos se le suma uno al complemento a uno del numero.
### Ejemplo
Representar el número -101 en complemento a dos.

101= 0b01100101 que en complemento a uno es  0b10011010, luego, es necesario sumare 1 a numero anterior:
 0b10011010 +1 = 0b10011001

Con complemento a dos:
- Eliminamos el segundo cero
- Simplificamos las sumas y restas de gran manera: *a+b* siempre utiliza el mismo algoritmo, independientemente de si *a* y *b* son positivos o negativos. *a-b* es lo mismo que sumar *a*  con el complemento a 2 de *b*

## Extensión de Signo

¿Qué pasa si quiero representar un número con 'más' bits?
-	Es de esperar que se preserve el valor del número y el signo
- En complemento a dos se 'rellenan' los 'espacios' faltantes con el bit de signo.
### Ejemplo
Representar el número 0b1111110001 (-15 en decimal) utilizando dieciséis bits.
$-15 = \text{0b}{\color{red}111111}1111110001$
Los números escritos en color rojo se copiaron para extender el signo.
- Tomar en cuenta que 1 word = 4 bytes = 32 bits
- Corrimientos aritméticos y lógicos
- Operadores || y && en c
