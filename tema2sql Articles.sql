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
                    
select * from Articles;
update Articles set Article_date = str_to_date(Article_date, "%d/%m/%Y");
update Articles set Collection_date = str_to_date(Collection_date, "%d/%m/%Y");
#am creeat capetele de tabel si am setat 
#un numar de 500 caractere pentru a accepta toate liniile excelului
#Excelul l-am salvat .csv si am dat "table data import wizard"

drop database bazaDeDate; #(pentru a sterge database-ul)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';




