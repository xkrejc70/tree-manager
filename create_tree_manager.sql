CREATE DATABASE IF NOT EXISTS tree_manager;
USE tree_manager;
DROP TABLE IF EXISTS tree_nodes;

CREATE TABLE IF NOT EXISTS tree_nodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pid INT DEFAULT NULL,
    CONSTRAINT fk_parent FOREIGN KEY (pid) REFERENCES tree_nodes(id) ON DELETE CASCADE
);

INSERT INTO tree_nodes (pid)
VALUES
(NULL),
(1),
(1),
(1),
(2),
(2);
