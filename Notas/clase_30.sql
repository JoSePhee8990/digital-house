USE movies_db;

SELECT * FROM series;
SELECT * FROM genres;
SELECT * FROM actors;
SELECT * FROM episodes;
SELECT * FROM actor_episode;
SELECT * FROM movies;
SELECT * FROM actor_movie;
SELECT * FROM seasons;

-- Micro desafío - Paso 1:
SELECT series.title AS 'Título', genres.name AS 'Género' FROM series
INNER JOIN genres
ON series.genre_id = genres.id;

SELECT episodes.title AS 'Titulo de Episodio', CONCAT(actors.first_name, ' ', actors.last_name)
AS 'Nombre del Actor' FROM episodes
INNER JOIN actor_episode
ON episodes.id = actor_episode.episode_id
INNER JOIN actors
ON actors.id = actor_episode.actor_id;

-- Micro desafío - Paso 2:
SELECT DISTINCT CONCAT(actors.first_name, ' ', actors.last_name) AS 'Actores' FROM actors
INNER JOIN actor_movie
ON actors.id = actor_movie.actor_id
INNER JOIN movies
ON movies.id = actor_movie.movie_id
WHERE movies.title LIKE 'La Guerra de las galaxias%';

-- Micro desafío - Paso 3:
SELECT movies.title AS 'Título de Película', COALESCE(genres.name, 'No tiene Género') AS 'Género' FROM movies
LEFT JOIN genres
ON movies.genre_id = genres.id;

-- Micro desafío - Paso 4:
SELECT title AS 'Título',  DATEDIFF(end_date, release_date) AS 'Duración' FROM series;

-- Micro desafío - Paso 5:
SELECT first_name FROM actors WHERE LENGTH(first_name) > 6 ORDER BY first_name;

SELECT COUNT(*) FROM episodes;

SELECT series.title AS 'Título de la Serie', COUNT(seasons.serie_id) AS 'Total de Temporadas'
FROM series INNER JOIN seasons
ON seasons.serie_id = series.id GROUP BY series.title;

SELECT genres.name AS 'Género', COUNT(movies.id) AS 'Películas' FROM genres
INNER JOIN movies
ON movies.genre_id = genres.id
GROUP BY genres.name HAVING COUNT(movies.id) >= 3;
