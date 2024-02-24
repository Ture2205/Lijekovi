-- Priprema za produkciju
-- Ovo za produkciju ne treba
use master;
go
drop database if exists lijek;
go

create database lijek;
go
alter database lijek collate Croatian_CI_AS;
go
use lijek;


-- Ovo za produkciju treba
--SELECT name, collation_name FROM sys.databases;
--GO
-- Doma primjeniti na ime svoje baze 3 puta
--ALTER DATABASE db_a98acf_tjakopec SET SINGLE_USER WITH
--ROLLBACK IMMEDIATE;
--GO
--ALTER DATABASE db_a98acf_tjakopec COLLATE Croatian_CI_AS;
--GO
--ALTER DATABASE db_a98acf_tjakopec SET MULTI_USER;
--GO
--SELECT name, collation_name FROM sys.databases;
--GO


create table pacijenti(
sifra int not null primary key identity(1,1),
ime varchar(20) not null,
prezime varchar(20) not null,
datumrodenja datetime,
spol varchar(20) not null,
lijek int not null,
recept int not null
);

create table lijekovi(
sifra int not null primary key identity(1,1),
tip varchar(30) not null,
doza int not null,
brojtableta int not null,
nacinprimjene varchar(20),
datumpodizanja datetime
);

create table recepti(
sifra int not null primary key identity(1,1),
datumpodizanja datetime,
doza int not null,
imepacijenta varchar(60)
);

create table dogadaji(
doza int not null primary key identity(1,1),
pacijent int not null,
lijek int not null,
vrijemeuzimanja datetime
);



-- vanjski ključevi
alter table pacijenti add foreign key (recept) references recepti(sifra);
alter table dogadaji add foreign key (pacijent) references pacijenti(sifra);
alter table dogadaji add foreign key (lijek) references lijekovi(sifra);
alter table pacijenti add foreign key (lijek) references lijekovi(sifra);

--inserti recepti

insert into recepti (datumpodizanja,doza,imepacijenta) 
values ('2023-12-15',75,'Mario');

insert into recepti (datumpodizanja,doza,imepacijenta) 
values ('2024-01-03',20,'Maja');

insert into recepti (datumpodizanja,doza,imepacijenta) 
values ('2024-02-10',500,'Iva');

--insert lijekovi
insert into lijekovi (tip, doza, brojtableta, nacinprimjene, datumpodizanja) 
values ('Prvi',1,50,'Oralno','2023-12-15');

insert into lijekovi (tip, doza, brojtableta, nacinprimjene, datumpodizanja) 
values ('Drugi',2,35,'Oralno','2024-01-03');

insert into lijekovi (tip, doza, brojtableta, nacinprimjene, datumpodizanja) 
values ('Treći',3,20,'Oralno','2024-02-10');

--ovo dolje nakon recepti
insert into pacijenti (ime,prezime,datumrodenja,spol,lijek,recept) 
values ('Mario','Turček','1995-05-22','M',1,1);

insert into pacijenti (ime,prezime,datumrodenja,spol,lijek,recept) 
values ('Maja','Bakota','1985-05-19','Ž',2,1);

insert into pacijenti (ime,prezime,datumrodenja,spol,lijek,recept) 
values ('Iva','Ivić','1999-12-31','Ž',3,2);








