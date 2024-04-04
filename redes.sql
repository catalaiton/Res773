create database redes;
use redes;
create table usuario(
	id_usuario  int primary key auto_increment,
	email varchar(30),
    psw varchar(23)
);
create table comentarios(
	id_usuario int,
	comentario varchar(500),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
ON DELETE CASCADE ON UPDATE CASCADE
);

insert into usuario (email, psw) values ('admin@gmail.com','123456');
insert into usuario (email, psw) values ('admin2@gmail.com','123456');