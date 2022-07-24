USE musimundos;
/*
SELECT * FROM clientes;
CREATE TABLE tipo_cliente(
	id_tipo_cliente INT(6) PRIMARY KEY NOT NULL,
    titulo VARCHAR(20) NOT NULL
);
ALTER TABLE tipo_cliente ADD COLUMN porcentaje_descuento TINYINT UNSIGNED;
*/

-- SELECT * FROM generos;
-- INSERT INTO generos (`id`, `nombre`) VALUES (26, 'Cumbia');

/*
SELECT * FROM albumes;
SELECT * FROM artistas;
*/

/*
SELECT * FROM albumes
INNER JOIN artistas
ON albumes.id_artista = artistas.id
WHERE artistas.nombre = 'AC/DC';
*/
/*
SELECT * FROM clientes;
SELECT * FROM canciones;
SELECT * FROM generos;
SELECT primer_nombre FROM clientes WHERE pais = 'USA';
SELECT nombre FROM canciones WHERE milisegundos BETWEEN 200000 AND 300000;
SELECT * FROM clientes WHERE pais = 'Spain' OR pais = 'Argentina';
SELECT nombre FROM generos ORDER BY nombre;
SELECT primer_nombre, ciudad FROM clientes ORDER BY pais DESC;
SELECT * FROM canciones WHERE compositor LIKE 'A%';
*/

SELECT CONCAT('La canción ', nombre, ' fue compuesta por ', compositor) AS Titulo FROM canciones;
SELECT *, EXTRACT(MONTH FROM fecha_factura) AS Mes FROM facturas WHERE id_cliente = 2 ORDER BY fecha_factura DESC;