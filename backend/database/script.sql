create database meubanco;

use meubanco;

create table users (
    id int auto_increment primary key not null,
    nome_u varchar(64) not null,
    email varchar(128) not null,
    senha varchar(64) not null,
    criado timestamp default current_timestamp
);

create table produtos (
    id int auto_increment primary key not null,
    nome_p varchar(64) not null,
    preco decimal(10, 2) not null,
    quantidade int not null,
	id_user int not null,
    foreign key (id_user)
    references users (id) on delete cascade
);

create table endereco (
    id int auto_increment primary key not null,
    cep varchar(8) not null,
    rua varchar(512) not null,
    bairro varchar(64) not null,
    cidade varchar(64) not null,
    uf varchar(2) not null,
    iduser int not null,
    foreign key (iduser) references users (id) on delete cascade
);

create table venda (
    id int auto_increment primary key not null,
    id_usuario int not null,
	id_produto int not null,
    criado timestamp default current_timestamp,
    foreign key (id_usuario) references users (id),
	foreign key (id_produto) references produtos (id)
);

create view usuarioproduto as 
select nome_u as usuario, count(id_produto) as quant_prod
from users u
inner join venda v
on u.id = v.id_usuario group by id_usuario;

delimiter $
create trigger tr_venda after insert
on produtos
for each row
begin
    insert into venda (id_usuario, id_produto) values (new.id_user, new.id);
end;

delimiter $
create trigger tr_venda_del before delete
on produtos
for each row
begin
    delete from venda where id_produto = old.id;
end;

delimiter $
create trigger tr_produto_del before delete
on users
for each row
begin
    delete from produtos where id_user = old.id;
end;

delimiter $
create trigger tr_endereco_del before delete
on users
for each row
begin
    delete from endereco where iduser = old.id;
end;


