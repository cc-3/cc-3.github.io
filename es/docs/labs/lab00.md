# Lab 0 - Git y Representación de Números

## Objetivos

* Aprender a usar git y crear cuenta de GitHub.
* Comenzar a trabajar con números binarios.

## Lecturas

![PH](/img/PH.jpg)

* Complemente lo visto en clase leyendo COD: 2.4

## Ejercicio 1: Cuenta de GitHub

Por favor lean las siguientes instrucciones cuidadosamente antes de seguir con el laboratorio. La mayor parte de los problemas que tienen los estudiantes durante este laboratorio se pueden prevenir siguiendo atentamente los pasos que se indican.

Para este curso necesitaremos que utilicen **git**, un _sistema de control de versiones distribuido_. Los sistemas de control de versiones son las mejores herramientas para compartir y almacenar código a comparación de mandar correos con archivos adjuntos, utilizar memorias flash, o incluso compartir documentos mediante DropBox o Google Docs.

### Creando una cuenta en Github

Si ya tiene una cuenta de Github creada con su correo de galileo.edu (por ejemplo, por CC1 y CC2) puede utilizar esa. Si aún no tiene, [cree una aquí](https://github.com/join/).

### Configurando git

Ahora que ya tenemos una cuenta, vamos a configurar git para que sepa quiénes son. Abran una terminal <kbd>ctrl</kbd><kbd>alt</kbd><kbd>t</kbd> y ejecuten los siguientes comandos listados abajo, reemplazando **NOMBRE** con su nombre y apellido (entre comillas) y **CORREO** con la dirección de correo que utilizarón para registrarse en GitHub.

```shell
git config --global user.name "Bob Ejemplo"
```

```shell
git config --global user.email "bob.ejemplo@galileo.edu"
```

**IMPORTANTE:** Si cambia de máquina, debe repetir estas configuraciones en la nueva. Por ejemplo, si usa distintas computadoras en el laboratorio debe configurar esto antes de comenzar a trabajar.

### Definiciones útiles

A continuación algunos conceptos importantes relacionados con el uso de git, es importante que los entienda para garantizar su éxito en el curso.

* Un **remote** es su código almacenado de forma remota, en nuestro caso almacenado en Github. Más adelante cuando lleguemos a proyectos, su remote será compartido con su pareja.

* A lo largo de este curso, estarán sincronizando el código que tienen en su computadora personal, con su **remote** en Github.

* Uno de los principales propósitos del **remote** es funcionar como una copia de seguridad, de forma que si algo le sucede a nuestra máquina podemos recuperar nuestro código en vez de comenzar desde cero nuevamente. Solo podremos recuperar el código al cuál ya le hayamos hecho **push**.

* Cuando lleguemos a trabajar en pareja, a través de **push** podremos subir cambios hacia el **remote** y luego nuestra pareja podrá hacer **pull** para obtener estos cambios.

### Obteniendo los archivos

Para obtener sus archivos base visite el siguiente link.

```
https://classroom.github.com/a/DAsWWjLF
```

Allí debe aceptar la asignación para que su repositorio sea creado. Al hacerlo, tendrá un repositorio con un link como este.

```
https://github.com/cc3-ug/lab00-2024-MI_USUARIO.git
```

Abra una terminal y navegue en ella hacia el lugar donde quiera colocar su laboratorio. Como es la primera vez que traeremos información del remote hacia nuestra computadora, usaremos el comando **clone**. Recuerde cambiar `MI_USUARIO` por su usuario.

```
git clone https://github.com/cc3-ug/lab00-2024-MI_USUARIO.git
```

Al ejecutar el comando Github le pedirá su "contraseña", sin embargo desde hace un par de años ya no acepta contraseñas sino tokens, genere el suyo siguiendo los pasos que se indican en esta página.

```
https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
```

Tras haber realizado el **clone** exitosamente, tendrá en su máquina una carpeta con un par de archivos que usaremos en este lab.

### Haciendo push hacia Github

Haremos un **push** de prueba antes de continuar.

Asegurese de estar en la carpeta de su laboratorio (recuerde que en Linux usa el comando **cd** para moverse entre carpetas). Una vez se encuentre allí, cree un archivo que diga "Hola Mundo" ejecutando el siguiente comando.

```shell
echo 'echo "Hola Mundo"' > hello.txt
```

Ahora comprobamos el estado de nuestro repositorio.

```shell
git status
```

Lo que producirá lo siguiente:

```shell
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  hello.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Git nos está diciendo que tenemos un archivo nuevo llamado **hello.txt** pero no lo hemos agregado. Lo agregaremos, realizaremos un **commit** y lo subiremos ejecutando los siguientes comandos (lo que aparece después de # son solo comentarios). Un **commit** es equivalente a una versión de su código.

```shell
git add hello.txt                   # agrega el archivo hello.txt
git commit -m "mensaje del commit"  # ingrese un mensaje descriptivo sobre los cambios realizados
git push origin master              # aquí hacemos el push
```

Explicando un poco más los comandos de arriba.

* `git add [archivo]` le dirá a git que han hecho cambios a ese archivo y que quieren que esos cambios se guarden en el siguiente commit (staging).
* `git commit -m "mensaje"` oficialmente guarda esos cambios que acaban de agregar, y crea un _snapshot_ del contenido actual de todos los archivos en el repositorio. Si algo sale mal más adelante, será posible revertir hacia esta versión.
* `git push origin master` manda todo el contenido del repositorio que está en el branch "master" al repositorio remoto "origin".

Cuando estamos trabajando con git, si alguna vez no están seguros de algo, pero quieren asegurarse de que tienen una copia guardada del contenido actual de su código, solo tienen que correr `git add .` y después `git commit` en la terminal.

Un último comando de git que pueden encontrar bastante util es `git log`. Pueden ejectuar este comando en la terminal y van a ver un historial o log de todos los commits que se han hecho (en el branch actual), incluyendo el tiempo y quien hizo el commit.

Visite su repositorio en su navegador web, si ya puede ver su archivo **hello.txt** su push fue exitoso y ya puede continuar.

## Ejercicio 1: Dibujando con binario

Vamos a utilizar números de 4 bits y usarlos para "dibujar". Si apilamos cinco números de 4 bits uno encima de otro en binario, podemos crear patrones e imágenes. Para ayudarlos a visualizar esto, pueden pensar que un bit en cero es blanco y un bit en uno es negro. Por ejemplo miren el siguiente patrón de bits.

<p align="center"><img src="/img/labs/lab00/ex3.png" alt="Patron de Bits"/></p>

### Preguntas

1. ¿Cuáles son los cinco números en decimal (separados por una coma) que producen el patrón de arriba?
2. ¿Cuáles son los cinco digitos en hexadecimal (separados por una coma) que producen el patrón de arriba?
3. ¿Qué letra se dibuja con los siguientes números en decimal: 1,1,9,9,6?
4. ¿Qué letra se dibuja con el siguiente numero en hexadecimal: 0xF8F88?
5. ¿Cuál es el numero en hexadecimal para dibujar la letra b (minúscula)?

En los archivos del laboratorio van a encontrar un archivo de texto `ex3.txt` con lo siguiente:

```
1:
2:
3:
4:
5:
```

En este archivo tienen que colocar todas sus respuestas de las preguntas de arriba siguiendo ese formato por ejemplo un archivo valido sería:

```
1:1,2,3,4,5
2:0x1,0x2,0x3,0x4,0x5
3:A
4:A
5:0xcafee
```

Si ya contestaron todo y creen que está correcto pueden agregar los cambios, hacer commit y subirlo al repositorio remoto ejecutando los siguientes comandos en la terminal.

```shell
git add ex1.txt
git commit -m "ex. 1 complete"
git push origin master
```

## Ejercicio 2: 1000 billetes de $1

Imaginen que tienen mil billetes de `$1` y 10 sobres. Para este ejercicio tienen que encontrar una manera de poner una cantidad determinada de billetes de `$1` en cada uno de los sobres de tal forma que, sin importar la cantidad de dinero que se les pida (entre `$1` y `$1000`), simplemente entreguen una combinación de los sobres y que siempre estén seguros de que están dando la cantidad correcta.
En los archivos del laboratorio hay un archivo de texto llamado `ex4.txt` en donde encontrarán lo siguiente:

```text
a,b,c,d,e,f,g,h,i,j
```

Cada una de las letras representa un sobre, tienen que reemplazar cada letra por la cantidad de billetes de `$1` que crean correcta, esa cantidad tiene que ser positiva y mayor a cero. Recuerda que la suma de la cantidad de cada uno de los sobres tiene que ser igual a 1000.

Si ya contestaron todo y creen que está correcto pueden agregar los cambios, hacer commit y subirlo al repositorio remoto ejecutando los siguientes comandos en la terminal:

```shell
git add ex2.txt
git commit -m "ex. 2 complete"
git push origin master
```

## Entrega y calificación

Revise en el navegador que sus push hayan sido exitosos, luego suba el link de su repositorio al GES.

El link que subirá debe verse similar a este `https://github.com/cc3-ug/lab00-2024-MI_USUARIO.git`.

El GES tiene una opción para subir links, úsela. No envíe su link adentro de un txt, pdf, etc. de lo contrarion se le restarán puntos.
