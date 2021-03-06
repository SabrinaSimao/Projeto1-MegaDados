SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

DROP SCHEMA IF EXISTS projeto1;
CREATE SCHEMA projeto1;
USE projeto1;

CREATE TABLE ingredientes(
	ingredientes_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    quantidade DECIMAL(4,1) DEFAUlT 0,
    custo DECIMAL(5,2) NOT NULL DEFAULT 14.99,
    PRIMARY KEY (ingredientes_id)
);

CREATE TABLE receita(
	receita_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    ativa SMALLINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (receita_id),
    cliente_id SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente (cliente_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE receita_ingrediente(
	ingredientes_id SMALLINT UNSIGNED NOT NULL,
	receita_id SMALLINT UNSIGNED NOT NULL,
	PRIMARY KEY  (ingredientes_id,receita_id),
	FOREIGN KEY (ingredientes_id) REFERENCES ingredientes (ingredientes_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (receita_id) REFERENCES receita (receita_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE cliente(
	cliente_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
    nascimento DATE NOT NULL,
    genero ENUM('F','M','OTHER') DEFAULT 'OTHER',
    username VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
    saldo DECIMAL(5,2) NOT NULL DEFAULT 00.00,
	PRIMARY KEY (cliente_id)
);


CREATE TABLE compras(
	compras_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    data_pagamento DATETIME NOT NULL,
    custo DECIMAL(5,2) NOT NULL DEFAULT 00.00,
    cliente_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (compras_id, cliente_id),
    FOREIGN KEY (cliente_id) REFERENCES cliente (cliente_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE compras_receita(
	compras_id SMALLINT UNSIGNED NOT NULL,
	receita_id SMALLINT UNSIGNED NOT NULL,
	PRIMARY KEY  (compras_id,receita_id),
	FOREIGN KEY (compras_id) REFERENCES compras (compras_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (receita_id) REFERENCES receita (receita_id) ON DELETE RESTRICT ON UPDATE CASCADE
);
