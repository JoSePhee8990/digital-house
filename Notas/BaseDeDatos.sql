/** MÓDULO 6 BASE DE DATOS --------------------------------------------------------------------- */

/** OPERADORES --------------------------------------------------- */

= 		--> Igual a
>		--> Mayor que
>=		--> Mayor o igual que
<		--> Menor que
<=		--> Menor o igual que
<>		--> Diferente a
!=		--> Diferente a
IS NULL --> Es nulo
BETWEEN --> Entre dos valores
IN 		--> Lista de valores
LIKE	--> Se ajusta a...

-- ORDER BY ---------------------------------- //
-- Se utiliza para ordenar los resultados de una sonulta seg{un el valor de la colmna especificada.
-- Por defecto, se ordena de forma ascendente (ASC) según los valores de la columna.
-- También se puede ordenar de manera descendente (DESC) aclarándolo en la consulta.

-- Ejemplo Query:
SELECT nombre_columna1, nombre_columna2 FROM tabla WHERE condicion ORDEB BY nombre_columna1 ASC/DESC;

-- BETWEEN ----------------------------------- //
-- Cuando necesitamos obtener valores dentro de un rango, usamos el operador BETWEEN
-- BETWEEN incluye los extremos.
-- BETWEEN funciona con números, textos y fechas.
-- Se usa como un filtro de un WHERE

-- Ejemplo Query:
SELECT nombre, edad FROM alumnos WHERE edad BETWEEN 6 AND 12;

-- LIKE -------------------------------------- //
-- Cuando hacemos un filtro con un WHERE, podemos especificar un patrón de búsqueda que nos permita especificar algo congreto que queremos encotnrar en los registros. Eso lo logramos utilizando *comodines*(wildcards).

-- Ejemplo:
-- Los nombres que tengan la letra "a" como segundo carácter.
-- Las direcciones postales que incluyan la calle "Monroe".
-- Los clientes que empiecen con "Los" y terminen con "s".

-- COMODÍN %: Es un sustituto que representa cero, uno, o varios carácteres.
-- COMODÍN _: Es un sustituto para un solo carácter.

-- Ejemplo Query:
SELECT nombre FROM usuarios WHERE edad LIKE '_a%'; -- Devuelve aquellos nombres que tengan la letra "a" como segundo carácter.

SELECT nombre FROM usuarios WHERE direccion LIKE '%Monroe%'; -- Devuelve las direcciones de los usuarios que incluyan la calle "Monroe".

SELECT nombre FROM clientes WHERE nombre LIKE 'Los%s'; -- Devuelve los clientes que empiecen con "Los" y terminen con "s".

/** FUNCIONES DE ALTERACIÓN -------------------------------------- */

-- CONCAT ------------------------------------ //
-- Usamos CONCAT para concatenar dos más expresones:

-- Ejemplos Query:
SELECT CONCAT('Hola', 'a ', 'todos.');
-- >'Hola a todos.'
SELECT CONCAT('La respuesta es: ', 24, '.');
-- >'La respuesta es 24.'
SELECT CONCAT('Nombre: ', first_name, ' ', last_name) FROM actors;
-- > 'Nombre: Emilia Clarke'

-- COALESCE ---------------------------------- //
-- Usamos COALESCE para obtener la primera expresión que no sea NULL.

-- Ejemplos Query:
SELECT COALESCE(NULL, 1, 20, 'Digital House');
-- > 1
SELECT COALESCE(NULL, NULL, 'Digial House');
-- > 'Digital House'

-- DATEDIFF ---------------------------------- //
-- Usamos DATEDIFF para devolver la diferencia (en días) entre dos fechas, tomando como granularidad el intervalo especificado.

-- Ejemplo Query:
SELECT DATEDIFF('2017/08/25', '2017/08/15'):
-- > 10
-- Devuelve 10 por que es la cantidad de días de diferencia entre el día 25 y el 15.

-- EXTRACT ----------------------------------- //
-- Usamos EXTRACT para extraer partes de una fecha.

-- Ejemplo Query:
SELECT EXTRACT(SECOND FROM '2014-02-13 08:44:21');
-- > 21
SELECT EXTRACT(MINUTE FROM '2014-02-13 08:44:21');
-- > 44
SELECT EXTRACT(HOUR FROM '2014-02-13 08:44:21');
-- > 8
SELECT EXTRACT(DAY FROM '2014-02-13 08:44:21');
-- > 13
SELECT EXTRACT(WEEK FROM '2014-02-13 08:44:21');
-- > 6
SELECT EXTRACT(MONTH FROM '2014-02-13 08:44:21');
-- > 2
SELECT EXTRACT(QUARTER FROM '2014-02-13 08:44:21');
-- > 1
SELECT EXTRACT(YEAR FROM '2014-02-13 08:44:21');
-- > 2014

-- REPLACE ----------------------------------- //
-- Usamos REPLACE para reemplazar una secuencia de carácteres por otra en un string.

-- Ejemplo Query:
SELECT REPLACE('abc abc', 'a', 'B');
-- > Bbc Bbc
SELECT REPLACE('abc abc', 'A', 'B');
-- > abc abc
-- no se encuentran coincidencias para reemplazar
SELECT REPLACE('123 123', '2', '5');
-- > 153 153

-- DATE FORMAT ------------------------------- //
-- Usamos DATE_FORMAT para que dada una fecha determinada se pueda formatear la misma según deseeamos.

-- Ejemplo Query:
SELECT DATE_FORMAT('2017-06-15', '%Y');
-- > '2017'
SELECT DATE_FORMAT('2017-06-15', '%W %M %e %Y');
-- > 'Thursday June 15 2017'

-- CASE -------------------------------------- //
-- Usamos CASE para evaluar condiciones y devolver la primera que se cumpla. En esta ejemplo, la tabla resultante tendrá 4 columnas: id, title, rating y rating_categories. Esta última mostrará 'Mala', 'Regular', etc., según el rating de la película.

-- Ejemplo Query:
SELECT id, title, rating
	CASE
		WHEN rating < 4 THEN 'Mala'
		WHEN rating < 6 THEN 'Regular'
		WHEN rating < 8 THEN 'Buena'
		WHEN rating < 9.5 THEN 'Muy buena'
		ELSE 'Excelente'
	END AS rating_categories
FROM movies
ORDER BY rating

/** JOINS -------------------------------------------------------- */

-- INNER JOIN, hará una cruza entre dos tablas. Si cruzámos las tablas de clientes y ventas hubiese algún cliente sni ventas, el INNER JOIN no traería a ese cliente como resultado.

-- LEFT JOIN & RIGHT JOIN -------------------- //
-- Estos tipos de JOINS no excluyen resultados de alguna de las dos tablas. Si hubiese clientes sin ventas, podríamos incluirlos en el resultado mediante LEFT o RIGTH JOIN.

-- Ejemplo Query:
SELECT clientes.id AS id, clientes.nombre, ventas.fecha FROM clientes, ventas;

SELECT clientes.id AS id, clientes.nombre, ventas.fecha FROM clientes INNER JOIN ventas;

-- Si bien ya dimos el primer paso (que es cruzar ambas tablas), aún nos falta aclarar dónde está ese cruce. Es decir, que clave primaria (PK) se curzará con que clave foránea (FK).

-- Ejemplo Query:
SELECT clientes.id AS id, clientes.nombre, ventas.fecha FROM clientes INNER JOIN ventas ON clientes.id = ventas.cliente_id;

-- ¿Y si quisiéramos incluir en el resultado aquellos clientes que NO tengan ventas asociadas?
-- Ejemplo Query:
SELECT clientes.id AS id, clientes.nombre, ventas.fecha FROM clientes LEFT JOIN ventas ON clientes.id = ventas.cliente_id;

-- ¿Y para incluir en el resultado aquellas ventas que NO tienen clientes asociados?
-- Ejemplo Query:
SELECT clientes.id AS id, clientes.nombre, ventas.fecha FROM clientes RIGHT JOIN ventas ON clientes.id = ventas.cliente_id;

-- Cruzando muchas tablas -------------------- //
-- Ejemplo Query:
SELECT clientes.id AS id, clientes.nombre, ventas.fecha FROM clientes INNER JOIN ventas ON cliente.id = ventas.cliente_id INNER JOIN productos ON productos.id = ventas.productos_id;

/** DISTINCTS ---------------------------------------------------- */

-- Nos devuelve valores únicos. En una tabla, una columna puede contener valores duplicados y algunas veces solo se necesita un listado con los valores diferentes.
-- Ejemplo Query:
SELECT DISTINCT columna_1, columna_2 FROM nombre_tabla;

-- Ejemplo Query:
SELECT DISTINCT actors.first_name, actors.last_name FROM actors INNER JOIN actor_movie ON actors.id = actor_movie.actor_id INNER JOIN movies ON movies.id = actor_movie.movie_id WHERE movies.title LIKE '%Harry Potter%';

/** GROUP BY ----------------------------------------------------- */
-- GROUP BY se usa para aagurpar los registros de la tabla resultante de una consulta por una o más columnas.
-- Ejemplo Query:
SELECT columna_1 FROM nombre_tabla WHERE condition GROUP BY columna_1;

SELECT marca FROM autos GROUP BY marca;

SELECT marca, MAX(precio) FROM autos GROUP BY marca;

SELECT genero.nombre, AVG(duracion) FROM peliculas INNER JOIN generos ON generos.id = genero_id GROUP BY genero.nombre;


/** Funciones de agregación -------------------------------------- */

-- Las funciones de agregación realizan cálculos sobre un conjunto de datos y devuelven un único resultado. Excepto COUNT, las funciones de agregación ignorarán los valores NULL.

-- COUNT ------------------------------------- //
-- Devolverá la cantidad de filas/registros que cumplen con el criterio.

SELECT COUNT(*) FROM movies;
-- Devolverá la cantidad de registros de la tabla movies.

SELECT COUNT(id) AS total FROM movies WHERE genre_id = 3;
-- Devolverá la cantidad de películas de la tabla movies con el genero_id 3 en una columna con el nombre "total".

-- AVG, SUM ---------------------------------- //
-- AVG(average) devolverá el promedio de una columna con valores numéricos.
-- SUM(suma) devolverá la suma de una columna con valores numéricos.

SELECT AVG(rating) FROM movies;
-- Devolverá el promedio del rating de las películas de la tabla movies.

SELECT SUM(length) FROM movies;
-- Devolverá la suma de las duraciones de las películas de la tabla movies.

-- MIN, MAX ---------------------------------- //
-- MIN devolverá el valor mínimo de una columna con valores numéricos.
-- MAX devolverá el valor máximo de una columna.

SELECT MIN(rating) FROM movies;
-- Devolverá el rating de la película menos ranqueada.

SELECT MAX(rating) FROM movies;
-- Devolverá el rating de la película mejor ranqueada.

/** HAVING ------------------------------------------------------- */
-- Cumple la misma función que WHERE, a diferencia de que HAVING se va a poder usar en conjunto con las funciones de agregación para filtrar datos agregados.

SELECT columna FROM tabla WHERE condicion GROUP BY columna HAVING condicion ORDER BY columna;

-- Esta consulta devolverá la cantidad de clientes por país (agurpados por país). Solamente se inclirán en el resultado aquellos países que tengan al menos 3 clientes.

SELECT COUNT(cliente_id), pais FROM clientes GROUP BY pais HAVING COUNT(clienteId) > 3;