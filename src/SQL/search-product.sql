SELECT * FROM cake as c
WHERE LOWER(c.name) LIKE ? OR c.price = ?
UNION
SELECT * FROM drinks as d
WHERE LOWER(d.name) LIKE ? OR d.price = ?
UNION
SELECT * FROM pastry as p
WHERE LOWER(p.name) LIKE ? OR p.price = ?