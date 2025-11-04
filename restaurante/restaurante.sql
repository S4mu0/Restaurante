CREATE DATABASE restaurante_db;
USE restaurante_db;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    categoria ENUM('food','drink') NOT NULL,
    imagen_url VARCHAR(255) NOT NULL
);
