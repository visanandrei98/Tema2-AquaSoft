CREATE DEFINER=`root`@`localhost` PROCEDURE `AddOrEditCategory`(
IN _ID int,
IN _Category_name varchar(800)
)
BEGIN
	IF _ID = 0 THEN
		INSERT INTO categorii(Category_name)
        VALUES (_Category_name);
		
        SET _ID = LAST_INSERT_ID();
	ELSE
		UPDATE categorii
        SET Category_name = _Category_name
        where ID = _ID;
	END IF;

	select _ID as 'ID';

END