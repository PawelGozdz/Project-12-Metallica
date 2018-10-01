CREATE TABLE pages(
  id SERIAL PRIMARY KEY,
  page VARCHAR(20) NOT NULL
);

CREATE TABLE sections(
  id SERIAL PRIMARY KEY,
  section VARCHAR(20) NOT NULL
);

CREATE TABLE variables(
  variable VARCHAR(50) NOT NULL,
  text VARCHAR NOT NULL,
  "pageId" INTEGER,
  "sectionId" INTEGER,
  FOREIGN KEY ("pageId") REFERENCES pages(id),
  FOREIGN KEY ("sectionId") REFERENCES sections(id)
);

INSERT INTO pages(page)
  VALUES('index'),('about'),('contact'),('shop'),('events');

INSERT INTO sections(section)
  VALUES('head'),('hero'),('tours'),('events'),('footer');

INSERT INTO variables(variable, text, "pageId", "sectionId")
  VALUES('head.title', 'Metallica Official Website', 1, 1),
        ('hero.main-heading', 'Index Main Heading', 1, 2),
        ('hero.sub-heading', 'Index Sub Heading', 1, 2),
        ('tours.heading', 'Metallica Tour', 1, 3),
        ('tours.time-num', '2018-12-14 20:00', 1, 3),
        ('tours.time-write', '2018-12-14', 1, 3),
        ('tours.address', 'Starachowice, ul. Nowa 11b', 1, 3),
        ('tours.place', 'Poland', 1, 3),
        ('tours.status', 'sold-out', 1, 3),
        ('tours.status-btn', 'sold-out', 1, 3),
        ('head.title', 'Metallica Word Tour', 5, 1),
        ('hero.main-heading', 'Events', 5, 2),
        ('hero.sub-heading', 'Check where we play next!', 5, 2);

-- `SELECT variable, text, page, section FROM variables
--   INNER JOIN pages ON variables."pageId" = pages.id
--   INNER JOIN sections ON variables."sectionId" = sections.id
--   WHERE page = $1`;