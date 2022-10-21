CREATE DEFINER=`root`@`localhost` PROCEDURE `AddOrEditTokens`(
IN _ID int,
IN _Token_body varchar(800)
)
BEGIN
	IF _ID = 0 THEN
		INSERT INTO categorii(Token_body)
        VALUES (_Token_body);
		
        SET _ID = LAST_INSERT_ID();
	ELSE
		UPDATE tokens
        SET Token_body = _Token_body
        where ID = _ID;
	END IF;

	select _ID as 'ID';

END