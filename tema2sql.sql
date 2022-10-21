create database bazaDeDate;
use bazaDeDate;
create table Articles(ID int,
					Article_no varchar(800),
                    Article_short_description varchar(800),
					Article_date CHAR(10),
                    Collection_date CHAR(10),
                    Article_body varchar(800),
                    Article_source varchar(800),
                    Article_URL varchar(800),
                    Location varchar(800),
                    Article_keywords varchar(800),
                    Article_weight int,
                    Article_citations varchar(800));
create table categorii(ID int, Cateogry_name varchar(800));
create table Tokens(ID int, Token_body varchar(800));                      
select * from Articles;
update Articles set Article_date = str_to_date(Article_date, "%d/%m/%Y");
update Articles set Collection_date = str_to_date(Collection_date, "%d/%m/%Y");
#am creeat capetele de tabel si am setat 
#un numar de 800 caractere pentru a accepta toate liniile excelului
#Excelul l-am salvat .csv si am dat "table data import wizard"

#drop database bazaDeDate; #(pentru a sterge database-ul)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

alter table articles add column Article_money_made_euro int;
alter table articles add column Article_visitors int;

update articles set Article_money_made_euro = "2000" where ID = 1;
update articles set Article_money_made_euro = "150" where ID = 2;
update articles set Article_money_made_euro = "180" where ID = 3;
update articles set Article_money_made_euro = "2500" where ID = 4;
update articles set Article_money_made_euro = "1670" where ID = 5;
update articles set Article_money_made_euro = "300" where ID = 6;


update articles set Article_visitors = "10000" where ID = 1;
update articles set Article_visitors = "16000" where ID = 2;
update articles set Article_visitors = "1000" where ID = 3;
update articles set Article_visitors = "25080" where ID = 4;
update articles set Article_visitors = "12344" where ID = 5;
update articles set Article_visitors = "300" where ID = 6;
#update Tokens set Token_body = "Tok1" where ID = 5;
#update Tokens set Token_body = "Tok2" where ID = 6;
#update Tokens set Token_body = "Tok3" where ID = 7;
#update Tokens set Token_body = "Tok4" where ID = 8;

describe articles;
describe categorii;
describe tokens;

alter table articles modify ID int Primary key;
alter table tokens modify Token_body char(4);
alter table articles drop primary key;
alter table categorii drop primary key;
ALTER TABLE categorii DROP FOREIGN KEY ID;
alter table tokens add constraint foreign key (ID) references articles(ID);




