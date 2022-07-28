USE musimundos;

SELECT * FROM canciones;
SELECT * FROM albumes;
SELECT * FROM generos;
SELECT * FROM artistas;
SELECT * FROM tipos_de_medio;
SELECT * FROM empleados;
SELECT * FROM clientes;
SELECT * FROM items_de_facturas;
SELECT * FROM facturas;
SELECT * FROM playlists;

SELECT canciones.nombre AS Nombre FROM canciones INNER JOIN generos ON canciones.id_genero = generos.id;
SELECT albumes.titulo, artistas.nombre FROM albumes INNER JOIN artistas ON albumes.id_artista = artistas.id WHERE artistas.nombre = 'Deep Purple';
SELECT canciones.nombre, tipos_de_medio.nombre FROM canciones INNER JOIN tipos_de_medio ON canciones.id_tipo_de_medio = tipos_de_medio.id WHERE tipos_de_medio.nombre = 'MPEG audio file';

SELECT DISTINCT titulo AS Cargo FROM empleados;
SELECT COUNT(id_genero) FROM canciones GROUP BY id_genero;

SELECT COUNT(*) AS Brazil FROM clientes WHERE pais = 'Brazil';
SELECT SUM(total) AS Total FROM facturas;
SELECT MIN(bytes) FROM canciones;

SELECT pais_de_facturacion AS 'País', SUM(total) AS 'Total' FROM facturas GROUP BY pais_de_facturacion HAVING SUM(total) > 100;
SELECT ciudad AS 'Ciudad', COUNT(id) AS 'Clientes' FROM clientes GROUP BY ciudad HAVING COUNT(id) >= 2;

SELECT generos.nombre AS 'Género', COUNT(canciones.id) AS 'No. Canciones' FROM canciones INNER JOIN generos ON canciones.id_genero = generos.id GROUP BY generos.nombre;
SELECT artistas.nombre AS 'Artista', albumes.titulo AS 'Álbum', /*canciones.nombre AS 'Canciones', canciones.milisegundos AS 'Duración',*/ AVG(canciones.milisegundos) AS 'Promedio' FROM canciones
INNER JOIN albumes ON canciones.id_album = albumes.id INNER JOIN artistas ON albumes.id_artista = artistas.id WHERE albumes.titulo = 'Let There Be Rock';
SELECT MAX(total) FROM facturas WHERE id_cliente = 48;