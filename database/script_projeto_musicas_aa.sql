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


show tables;

#Apagar tabela
drop table tbl_teste;

select * from tbl_musica

