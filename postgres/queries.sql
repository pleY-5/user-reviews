SELECT  * FROM
(SELECT * FROM reviews WHERE restaurant_id = NUMBER) a
INNER JOIN
(SELECT * FROM users) b
ON a.user_id = b.user_id;

SELECT  * FROM
(SELECT * FROM reviews WHERE restaurant_name = NAME) a
INNER JOIN
(SELECT * FROM users) b
ON a.user_id = b.user_id;