SET GLOBAL log_bin_trust_function_creators = 1;
USE projeto1;

DROP PROCEDURE IF EXISTS adiciona_usuario;
DROP PROCEDURE IF EXISTS altera_senha;
DROP FUNCTION IF EXISTS compras_valor;
DROP PROCEDURE IF EXISTS check_senha;
DROP VIEW IF EXISTS ultimas_compras;
DROP TRIGGER IF EXISTS trig_compras;
DROP TRIGGER IF EXISTS trig_saldo_insuficiente;
DELIMITER //



/*Função para criar novo usuario*/
CREATE PROCEDURE adiciona_usuario(IN nome VARCHAR(45), IN nascimento DATE, IN genero ENUM('F','M','OTHER'), IN username VARCHAR(45), senha VARCHAR(45))
BEGIN
    INSERT INTO cliente (nome, nascimento, genero, username, senha) VALUES (nome, nascimento, genero, username, senha);
END//


/*Função para alterar senha*/
CREATE PROCEDURE altera_senha(IN senha VARCHAR(45), IN cliente_id SMALLINT)
BEGIN
	UPDATE cliente SET senha = senha WHERE cliente_id = cliente_id;
END//


CREATE PROCEDURE check_senha(IN username VARCHAR(45), IN senha VARCHAR(45))
BEGIN
	SELECT * from cliente where cliente.username = username and cliente.senha = senha;
END//


/*Função para checar o valor das compras do cliente*/
CREATE FUNCTION compras_valor(id INT) RETURNS DECIMAL(5,2)
BEGIN
    DECLARE valor DECIMAL(5, 2);
    SELECT IFNULL(custo, 0.0) INTO valor FROM compras WHERE id_usuario = id;
    RETURN valor;
END//



/*Função para checar se senha esta na database*/
/*
CREATE FUNCTION check_senha(username VARCHAR(45), senha VARCHAR(45)) RETURNS SMALLINT(1)
BEGIN
	DECLARE tmp VARCHAR(45);
	SELECT senha into tmp FROM cliente WHERE cliente.username = username;
    IF(senha = tmp)
    THEN
    RETURN cliente;
    ELSE
    RETURN 0;
    END IF;
END//
*/



/* view para ver as ultimas 5 compras da loja*/
CREATE VIEW ultimas_compras AS 
    SELECT nome 
    FROM compras 
    INNER JOIN compras_receita ON compras_receita.compras_id 
    INNER JOIN receita ON receita.receita_id 
    ORDER BY compras.compras_id DESC LIMIT 5;

/* Trigger para atualizar saldo ao realizar compra*/
CREATE TRIGGER trig_compras 
BEFORE INSERT ON compras
FOR EACH ROW
BEGIN
    UPDATE cliente 
        SET saldo = saldo - NEW.custo 
        WHERE cliente_id = NEW.cliente_id;
END//


/* Trigger para avisar caso saldo seja insuficiente*/
CREATE TRIGGER trig_saldo_insuficiente 
BEFORE UPDATE ON cliente
FOR EACH ROW
BEGIN
    IF NEW.saldo < 0.0 THEN
        SIGNAL SQLSTATE '12345'
            SET MESSAGE_TEXT = 'Saldo insuficiente.';
    END IF;
END//


DELIMITER ;

