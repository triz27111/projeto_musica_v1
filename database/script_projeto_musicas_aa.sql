#Criação do datebase
create database db_controle_musicas_aa;

#Ativa o database a ser utilizado
use db_controle_musicas_aa;

#Criação da tabela de musicas
create table tbl_musica(
   id              int not null primary key auto_increment,
   nome            varchar(100) not null,
   duracao         time not null,
   data_lancamento date not null,
   letra           text,
   link            varchar  (200)
);
create table tbl_banda(
    id              int not null primary key auto_increment,
    nome            varchar(100) not null,
    pais_origem     varchar(45)not null,
    data_criacao   date not null
);
create table tbl_usuario(
    id              int not null primary key auto_increment,
    nome            varchar(100) not null,
    telefone        varchar(45)not null,
    email           varchar(100)not null,
    senha           varchar(100)not null,
    tipo_assinatura         varchar(100)
    
);

-- Tabelas principais
CREATE TABLE tbl_banda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_artista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    id_banda INT,
    FOREIGN KEY (id_banda) REFERENCES tbl_banda(id)
);

CREATE TABLE tbl_album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    id_banda INT,
    FOREIGN KEY (id_banda) REFERENCES tbl_banda(id)
);

CREATE TABLE tbl_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_plano (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_assinaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_plano INT,
    data_inicio DATE,
    data_fim DATE,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_plano) REFERENCES tbl_plano(id)
);

CREATE TABLE tbl_musica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_genero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Tabelas intermediárias para N:N

CREATE TABLE tbl_musica_artista (
    id_musica INT,
    id_artista INT,
    PRIMARY KEY (id_musica, id_artista),
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);

CREATE TABLE tbl_album_artista (
    id_album INT,
    id_artista INT,
    PRIMARY KEY (id_album, id_artista),
    FOREIGN KEY (id_album) REFERENCES tbl_album(id),
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);

CREATE TABLE tbl_musica_genero (
    id_musica INT,
    id_genero INT,
    PRIMARY KEY (id_musica, id_genero),
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

CREATE TABLE tbl_genero_banda (
    id_banda INT,
    id_genero INT,
    PRIMARY KEY (id_banda, id_genero),
    FOREIGN KEY (id_banda) REFERENCES tbl_banda(id),
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);


show tables;

#Apagar tabela
drop table tbl_teste;

select * from tbl_musica

