create database bazaDeDate;
use bazaDeDate;
create table Articles(ID int,
					Article_no varchar(500),
                    Article_short_description varchar(500),
					Article_date CHAR(10),
                    Collection_date CHAR(10),
                    Article_body varchar(500),
                    Article_source varchar(500),
                    Article_URL varchar(500),
                    Location varchar(500),
                    Article_keywords varchar(500),
                    Article_weight int,
                    Article_citations varchar(500));
select * from Articles;
update Articles set Article_date = str_to_date(Article_date, "%d/%m/%Y");
update Articles set Collection_date = str_to_date(Collection_date, "%d/%m/%Y");
#am creeat capetele de tabel si am setat 
#un numar de 500 caractere pentru a accepta toate liniile excelului
#Excelul l-am salvat .csv si am dat "table data import wizard"

#drop database bazaDeDate; (pentru a sterge database-ul)





