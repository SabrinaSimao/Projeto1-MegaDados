USE projeto1;

-- para limpar tabelas no nao-safe mode
-- DELETE FROM ingredientes;
-- DELETE FROM cliente;

-- ingredientes

INSERT INTO ingredientes(nome)
	VALUES ('Morango');
    
INSERT INTO ingredientes(nome)
	VALUES ('Damasco');
    
INSERT INTO ingredientes(nome, custo)
	VALUES ('Framboesa', 16.99);
    
INSERT INTO ingredientes(nome, disponivel, custo)
	VALUES ('Jabuticaba', 0, 16.99);
    
INSERT INTO ingredientes(nome, custo)
	VALUES ('Amora', 15.99);
    
INSERT INTO ingredientes(nome, disponivel)
	VALUES ('Graviola', 0);

-- cliente

INSERT INTO cliente(nome, nascimento, genero, username, senha)
	VALUES ('Fabio', '1968-03-21', 'M', 'fabiao', 'cloud');
    
INSERT INTO cliente(nome, nascimento, genero, username, senha)
	VALUES ('Larissa', '1998-11-01', 'F', 'lala', 'lab123');
    
INSERT INTO cliente(nome, nascimento, username, senha)
	VALUES ('Alex', '1992-05-30', 'alex', 'senha');