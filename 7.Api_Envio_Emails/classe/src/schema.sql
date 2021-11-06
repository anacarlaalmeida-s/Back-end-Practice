create database newsletter;

create table emails (
	id serial primary key,
  	nome text not null,
  	email text not null
); 