USE projeto1;

-- para limpar tabelas no nao-safe mode
-- DELETE FROM ingredientes;
-- DELETE FROM cliente;

-- ingredientes

INSERT INTO ingredientes(nome, quantidade)
	VALUES ('Morango', 300);
    
INSERT INTO ingredientes(nome, quantidade)
	VALUES ('Damasco', 300);
    
INSERT INTO ingredientes(nome, quantidade, custo)
	VALUES ('Framboesa', 200, 16.99);
    
INSERT INTO ingredientes(nome, quantidade, custo)
	VALUES ('Jabuticaba', 10, 16.99);
    
INSERT INTO ingredientes(nome, quantidade, custo)
	VALUES ('Amora', 15, 15.99);
    
INSERT INTO ingredientes(nome)
	VALUES ('Graviola');

-- cliente

INSERT INTO cliente(nome, nascimento, genero, username, senha, saldo)
	VALUES ('Fabio', '1968-03-21', 'M', 'fabiao', 'cloud', 120.00);
    
INSERT INTO cliente(nome, nascimento, genero, username, senha, saldo)
	VALUES ('Larissa', '1998-11-01', 'F', 'lala', 'lab123', 30.00);
    
INSERT INTO cliente(nome, nascimento, username, senha)
	VALUES ('Alex', '1992-05-30', 'alex', 'senha');
    
    