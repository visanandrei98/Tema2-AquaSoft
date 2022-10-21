CREATE DEFINER=`root`@`localhost` PROCEDURE `AddOrEditArticle`(
IN _ID int,
IN _Article_no varchar(800),
IN _Article_short_description varchar(800),
IN _Article_date CHAR(10),
IN _Collection_date CHAR(10),
IN _Article_body varchar(800),
IN _Article_source varchar(800),
IN _Article_URL varchar(800),
IN _Location varchar(800),
IN _Article_keywords varchar(800),
IN _Article_weight int,
IN _Article_citations varchar(800)
)
BEGIN
	IF _ID = 0 THEN
		INSERT INTO articles(Article_no, Article_short_description, Article_date, Collection_date, Article_body, Article_source, Article_URL, Location, Article_keywords, Article_weight, Article_citations)
        VALUES (_Article_no, _Article_short_description, _Article_date, _Collection_date, _Article_body, _Article_source, _Article_URL, _Location, _Article_keywords, _Article_weight, _Article_citations);
		
        SET _ID = LAST_INSERT_ID();
	ELSE
		UPDATE articles
        SET Article_no = _Article_no,
        Article_short_description = _Article_short_description,
        Article_date = _Article_date,
        Collection_date = _Collection_date,
        Article_body = _Article_body,
        Article_source = _Article_source,
        Article_URL = _Article_URL,
        Location = _Location,
        Article_keywords = _Article_keywords,
        Article_weight = _Article_weight,
        Article_citations = _Article_citations
        where ID = _ID;
	END IF;

	select _ID as 'ID';

END