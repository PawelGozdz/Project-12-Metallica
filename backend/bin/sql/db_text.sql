CREATE TABLE pages(
  id SERIAL PRIMARY KEY,
  page VARCHAR(20) NOT NULL
);

CREATE TABLE sections(
  id SERIAL PRIMARY KEY NOT NULL,
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

CREATE TABLE albums(
  id INTEGER PRIMARY KEY NOT NULL,
  album VARCHAR(40) NOT NULL
);

CREATE TABLE songs(
  id SERIAL PRIMARY KEY NOT NULL,
  song VARCHAR(100) NOT NULL,
  lyrics VARCHAR(1500),
  "albumId" INTEGER,
  FOREIGN KEY ("albumId") REFERENCES albums(id)
);

CREATE TABLE other(
  id SERIAL PRIMARY KEY NOT NULL,
  other VARCHAR(100) NOT NULL,
  "albumId" INTEGER,
  FOREIGN KEY ("albumId") REFERENCES albums(id)
);

CREATE TABLE sizes(
  id SERIAL PRIMARY KEY NOT NULL,
  size VARCHAR(4) NOT NULL
);

CREATE TABLE gender(
  id SERIAL PRIMARY KEY,
  sex VARCHAR(1)
);

CREATE TABLE types(
  id SERIAL PRIMARY KEY,
  item VARCHAR(20)
);

CREATE TABLE clothes(
  id SERIAL PRIMARY KEY NOT NULL,
  cloth VARCHAR NOT NULL,
  "itemId" INTEGER NOT NULL,
  "sizeId" INTEGER NOT NULL,
  "genderId" INTEGER NOT NULL,
  "albumId" INTEGER NOT NULL,
  FOREIGN KEY ("itemId") REFERENCES types(id),
  FOREIGN KEY ("sizeId") REFERENCES sizes(id),
  FOREIGN KEY ("genderId") REFERENCES gender(id),
  FOREIGN KEY ("albumId") REFERENCES albums(id)
);

INSERT INTO pages(page)
  VALUES('index'),('about'),('contact'),('shop'),('events');

INSERT INTO sections(section)
  VALUES('head'),('hero'),('tours'),('events'),('footer'), ('navigation');

INSERT INTO variables(variable, text, "pageId", "sectionId")
  VALUES('head.title', 'Metallica Official Fanpage', 1, 1),
        ('head.title', 'Metallica Events', 5, 1),
        ('head.description', 'All about Metallica. Music, Events and many more', 1, 1),
        ('head.description', 'Find upcoming Metallica Events, book tickets and have some fun', 5, 1),
        ('navigation.active', 'navigation__active', 1, 6),
        ('navigation.active', 'navigation__active', 5, 6),
        ('hero.main-heading', 'Index Main Heading', 1, 2),
        ('hero.main-heading', 'Events', 5, 2),
        ('hero.sub-heading', 'Funpage', 1, 2),
        ('hero.sub-heading', 'Check out what''s next!', 5, 2);

INSERT INTO albums(id, album)
  VALUES(0, 'N/A'),
        (1, 'Kill ''em all'), 
        (2, 'Ride the Lightning'), 
        (3, 'Master of Puppets'),
        (4, '...And Justice For All'),
        (5, 'The Black Album'),
        (6, 'Load'),
        (7, 'Reload'),
        (8, 'Garage, Inc.'),
        (9, 'St. Anger'),
        (10, 'Death Magnetic'),
        (11, 'Hardwired');

INSERT INTO songs(song, "albumId")
  VALUES('Hit the Lights', 1),
        ('The Four Horsemen', 1),
        ('Motorbreath', 1),
        ('Jump in the Fire', 1),
        ('Whiplash', 1),
        ('Phantom Lord', 1),
        ('No Remorse', 1),
        ('Seek & Destroy', 1),
        ('Metal Militia', 1),
        ('Am I Evil?', 1),
        ('Blitzkrieg', 1),
        ('Fight Fire with Fire', 2),
        ('Ride the Lightning', 2),
        ('For Whom the Bell Tolls', 2),
        ('Fade to Black', 2),
        ('Trapped Under Ice', 2),
        ('Escape', 2),
        ('Creeping Death', 2),
        ('The Call of Ktulu', 2),
        ('Battery', 3),
        ('Master of Puppets', 3),
        ('The Thing That Should Not Be', 3),
        ('Welcome Home (Sanitarium)', 3),
        ('Disposable Heroes', 3),
        ('Leper Messiah', 3),
        ('Orion', 3),
        ('Damage, Inc.', 3),
        ('Blackened', 4),
        ('...And Justice For All', 4),
        ('Eye of the Beholder', 4),
        ('One', 4),
        ('The Shortest Straw', 4),
        ('The Frayed Ends of Sanity', 4),
        ('To Live Is to Die', 4),
        ('Dyers Eve', 4),
        ('Enter Sandman', 5),
        ('Sad But True', 5),
        ('Holier Than Thou', 5),
        ('The Unforgiven', 5),
        ('Wherever I May Roam', 5),
        ('Don''t Tread on Me', 5),
        ('Through the Never', 5),
        ('Nothing Else Matters', 5),
        ('Of Wolf and Man', 5),
        ('The God That Failed', 5),
        ('My Friend of Misery', 5),
        ('The Struggle Within', 5),
        ('Ain''t My Bitch', 6),
        ('2x4', 6),
        ('The House Jack Built', 6),
        ('Until It Sleeps', 6),
        ('King Nothing', 6),
        ('Hero of the Day', 6),
        ('Bleeding Me', 6),
        ('Cure', 6),
        ('Poor Twisted Me', 6),
        ('Wasting My Hate', 6),
        ('Mama Said', 6),
        ('Thorn Within', 6),
        ('Ronnie', 6),
        ('The Outlaw Torn', 6),
        ('Fuel', 7),
        ('The Memory Remains', 7),
        ('Devil''s Dance', 7),
        ('The Unforgiven II', 7),
        ('Better Than You', 7),
        ('Slither', 7),
        ('Carpe Diem Baby', 7),
        ('Bad Seed', 7),
        ('Where the Wild Things Are', 7),
        ('Prince Charming', 7),
        ('Low Man''s Lyric', 7),
        ('Attitude', 7),
        ('Fixxxer', 7),
        ('Free Speech for the Dumb (Discharge Cover)', 8),
        ('It''s Electric (Diamond Head Cover)', 8),
        ('Sabbra Cadabra (Black Sabbath Cover)', 8),
        ('Turn the Page (Bob Seger Cover)', 8),
        ('Die, Die My Darling (Misfits Cover)', 8),
        ('Loverman (Nick Cave and the Bad Seeds Cover)', 8),
        ('Mercyful Fate (Mercyful Fate Cover)', 8),
        ('Astronomy (Blue Öyster Cult Cover)', 8),
        ('Whiskey in the Jar (Thin Lizzy Cover)', 8),
        ('Tuesday''s Gone (Lynyrd Skynyrd Cover)', 8),
        ('The More I See (Discharge Cover)', 8),
        ('Helpless (Diamond Head Cover)', 8),
        ('The Small Hours (Holocaust Cover)', 8),
        ('The Wait (Killing Joke Cover)', 8),
        ('Crash Course in Brain Surgery (Budgie Cover)', 8),
        ('Last Caress (Misfits Cover)', 8),
        ('Am I Evil? (Diamond Head Cover)', 8),
        ('Breadfan (Budgie Cover)', 8),
        ('The Prince (Diamond Head Cover)', 8),
        ('Stone Cold Crazy (Queen Cover)', 8),
        ('So What? (Anti-Nowhere League Cover)', 8),
        ('Killing Time (Sweet Savage Cover)', 8),
        ('Overkill (Motörhead Cover)', 8),
        ('Damage Case (Motörhead Cover)', 8),
        ('Stone Dead Forever (Motörhead Cover)', 8),
        ('Too Late Too Late (Motörhead Cover)', 8),
        ('Frantic', 9),
        ('St. Anger', 9),
        ('Some Kind of Monster', 9),
        ('Dirty Window', 9),
        ('Invisible Kid', 9),
        ('My World', 9),
        ('Shoot Me Again', 9),
        ('Sweet Amber', 9),
        ('The Unnamed Feeling', 9),
        ('Purify', 9),
        ('All Within My Hands', 9),
        ('That Was Just Your Life', 10),
        ('The End of the Line', 10),
        ('Broken, Beat and Scarred', 10),
        ('The Day That Never Comes', 10),
        ('All Nightmare Long', 10),
        ('Cyanide', 10),
        ('The Unforgiven III', 10),
        ('The Judas Kiss', 10),
        ('Suicide and Redemption', 10),
        ('My Apocalypse', 10),
        ('Hardwired', 11),
        ('Atlas, Rise!', 11),
        ('Now That We''re Dead', 11),
        ('Moth Into Flame', 11),
        ('Dream No More', 11),
        ('Halo on Fire', 11),
        ('Confusion', 11),
        ('ManUNkind', 11),
        ('Here Comes Revenge', 11),
        ('Am I Savage?', 11),
        ('Murder One', 11),
        ('Spit Out the Bone', 11);


INSERT INTO sizes(size)
  VALUES('S'),('M'),('L'),('XL'),('XXL');

INSERT INTO other(other,"albumId")
  VALUES('Black Ring', 5),
        ('Ride the Lightning necklace', 2),
        ('Metal waist', 9),
        ('Master keyring', 3),
        ('Hardwired skull', 11),
        ('Belt color desert', 10);

INSERT INTO gender(sex)
  VALUES('M'),('W'),('U');

INSERT INTO types(item)
  VALUES('shirt'),
        ('trousers'),
        ('jacket'),
        ('socks'),
        ('hat'),
        ('hoodie');

INSERT INTO clothes(cloth, "itemId", "sizeId", "genderId", "albumId")
  VALUES('Master of puppers shirt', 1, 3, 3, 3),
        ('Lightning', 3, 5, 1, 2),
        ('Brown Metallica hat', 5, 2, 3, 0),
        ('Leather, black metal trousers', 2, 5, 2, 0),
        ('Metal Horns', 5, 4, 1, 11),
        ('Black Snake', 2, 1, 2, 4),
        ('Electric Car', 3, 1, 1, 8);
