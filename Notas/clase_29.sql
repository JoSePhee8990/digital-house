USE movies_db;
/*
SELECT * FROM actor_episode;
SELECT * FROM actor_movie;
SELECT * FROM actors;
SELECT * FROM episodes;
SELECT * FROM genres;
SELECT * FROM migrations;
SELECT * FROM movies;
SELECT * FROM password_resets;
SELECT * FROM seasons;
SELECT * FROM series;
SELECT * FROM users;
*/

-- MICRO DESAFÍO #1
INSERT INTO genres(`name`, `ranking`, `active`) VALUES ('Investigación', 13, 1);
UPDATE genres SET name='Investigación Científica' WHERE ranking = 13;
DELETE FROM genres WHERE id = 13;
SELECT * FROM movies;
SELECT first_name, last_name, rating FROM actors;
SELECT title AS titulo FROM series;

-- MICRO DESAFÍO #2
SELECT first_name, last_name FROM actors WHERE rating > 7.5;
SELECT title, rating, awards FROM movies WHERE rating > 7.5 AND awards = 2;
SELECT title, rating FROM movies ORDER BY rating;

-- MICRO DESAFÍO #3
SELECT title FROM movies LIMIT 3;
SELECT title FROM movies ORDER BY rating DESC LIMIT 5;
SELECT title FROM movies ORDER BY rating DESC LIMIT 5 OFFSET 5;
SELECT first_name, last_name FROM actors LIMIT 10;
SELECT first_name, last_name FROM actors LIMIT 10 OFFSET 20;

-- MICRO DESAFÍO #4
SELECT title, rating FROM movies WHERE title LIKE 'Harry Potter%';
SELECT first_name FROM actors WHERE first_name LIKE 'Sam%';
SELECT title, release_date FROM movies WHERE release_date BETWEEN '2004-01-01' AND '2008-12-31';