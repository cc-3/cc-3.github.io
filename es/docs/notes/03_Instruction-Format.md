# RISC V Instruction Formats
- **Gran idea:** almacenar los programas en la computadora (Programa almacenado)
¡Lectura recomendada: https://es.wikipedia.org/wiki/John_von_Neumann !
- Nacen dos grandes arquitecturas:
    1. Harvard (instrucciones y datos separados)
    2. Von Neumann (programas y datos en una memoria en común)
    
- Program counter: alambrado a un sumador para moverse de 4 en 4 (que es el tamaño de instruccción) ó cuando hay saltos.
- ¿qué pasa con los programas que se distriuyen en forma binaria?
- 6 tipos básicos de instrucciones:
    1. R: operaciones aritméticas con dos registros
    2. I: operaciones con valores inmediatos
    3. S: para stores
    4. B: para branch's
    5. U: para upper immediate (20 bits)
    6. J: para jump
## Formato R
32 bits dividido en 6 campos (7,5,5,3,5,7 bits respectivamente)

funct7|rs2|rs1|funct3|rd|opcode
--|--|--|--|--|--
7 bits | 5 bits | 5 bits | 3 bits | 5 bits | 7 bits

- el opcode nos especifica parcialmente que instrucción es
- funct7 + funct3: combinado con el opcode, decriben que operación hacer.
- Las tipo I y las R tienen el mismo funct3
## Formato I
imm | rs1 | funct3 | rd | opcode
--|--|--|--|--
12 bits | 5 bits | 3 bits | 5 bits | 7 bits

- imm puede tener valores en el rango [-2048, 2047]
- Las instrucciones **load** son tipo I

## Formato S
imm[5:11]|rs2|rs1|function3|imm[0:4]|opcode
--|--|--|--|--|--
7 bits | 5 bits | 5 bits | 3 bits | 5 bits | 7 bits

- A pesar de que en assembler los **loads** y **stores** son similares, en lenguaje de máquina son dos tipos diferentes de instrucciones. Esto se debe a que los **stores** no tienen registro destino
- La razón por la que los 5 bits menos significativos del valor inmediato están donde estan, es para mantener rs1 y rs2 en las mismas posiciones

## Formato J
imm[20] | imm[10:1] | imm[11] | imm[19:12] | rd | opcode
--|--|--|--|--|--
1 bits | 10 bits | 1 bits | 8 bits | 5 bits | 7 bits

## Formato B
imm[12] | imm[10:5] | rs2 | rs1 | func3 | imm[4:1] | imm[11] | opcode
--|--|--|--|--|--|--|--
1 bit | 6 bits| 5 bits | 5 bits | 3 bits | 4 bits | 1 bit | 7 bits

- El valor inmediato representa la cantidad de **halfwords** (2 bytes) que se van a saltar, en representación complemento a 2. Se utilizan **halfwords** y no **words** para mantener compatibilidad con la versión reducida de de RISC-V que utiliza instrucciones de 16 bits.
