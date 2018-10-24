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
  album VARCHAR(40) NOT NULL,
  price DECIMAL NOT NULL
);

CREATE TABLE songs(
  id SERIAL PRIMARY KEY NOT NULL,
  song VARCHAR(100) NOT NULL,
  lyrics VARCHAR(1500),
  "albumId" INTEGER,
  price DECIMAL NOT NULL,
  FOREIGN KEY ("albumId") REFERENCES albums(id)
);

CREATE TABLE other(
  id SERIAL PRIMARY KEY NOT NULL,
  other VARCHAR(100) NOT NULL,
  "albumId" INTEGER,
  quantity INTEGER,
  price DECIMAL NOT NULL,
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
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL,
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
        ('hero.main-heading', 'Index Main Heading', 1, 2),
        ('hero.main-heading', 'Events', 5, 2),
        ('hero.sub-heading', 'Funpage', 1, 2),
        ('hero.sub-heading', 'Check out what''s next!', 5, 2);

INSERT INTO albums(id, album, price)
  VALUES(0, 'N/A', 0),
        (1, 'Kill ''em all', 9.99), 
        (2, 'Ride the Lightning', 10.99), 
        (3, 'Master of Puppets', 12.99),
        (4, '...And Justice For All', 9.99),
        (5, 'The Black Album', 11.99),
        (6, 'Load', 6.99),
        (7, 'Reload', 7.49),
        (8, 'Garage, Inc.', 9.99),
        (9, 'St. Anger', 8.49),
        (10, 'Death Magnetic', 13.99),
        (11, 'Hardwired', 14.99);

INSERT INTO songs(song, "albumId", price)
  VALUES('Hit the Lights', 1, 0.99),
        ('The Four Horsemen', 1, 0.99),
        ('Motorbreath', 1, 0.99),
        ('Jump in the Fire', 1, 0.99),
        ('Whiplash', 1, 0.99),
        ('Phantom Lord', 1, 0.99),
        ('No Remorse', 1, 0.99),
        ('Seek & Destroy', 1, 0.99),
        ('Metal Militia', 1, 0.99),
        ('Am I Evil?', 1, 0.99),
        ('Blitzkrieg', 1, 0.99),
        ('Fight Fire with Fire', 2, 0.99),
        ('Ride the Lightning', 2, 0.99),
        ('For Whom the Bell Tolls', 2, 0.99),
        ('Fade to Black', 2, 0.99),
        ('Trapped Under Ice', 2, 0.99),
        ('Escape', 2, 0.99),
        ('Creeping Death', 2, 0.99),
        ('The Call of Ktulu', 2, 0.99),
        ('Battery', 3, 0.99),
        ('Master of Puppets', 3, 0.99),
        ('The Thing That Should Not Be', 3, 0.99),
        ('Welcome Home (Sanitarium)', 3, 0.99),
        ('Disposable Heroes', 3, 0.99),
        ('Leper Messiah', 3, 0.99),
        ('Orion', 3, 0.99),
        ('Damage, Inc.', 3, 0.99),
        ('Blackened', 4, 0.99),
        ('...And Justice For All', 4, 0.99),
        ('Eye of the Beholder', 4, 0.99),
        ('One', 4, 0.99),
        ('The Shortest Straw', 4, 0.99),
        ('The Frayed Ends of Sanity', 4, 0.99),
        ('To Live Is to Die', 4, 0.99),
        ('Dyers Eve', 4, 0.99),
        ('Enter Sandman', 5, 0.99),
        ('Sad But True', 5, 0.99),
        ('Holier Than Thou', 5, 0.99),
        ('The Unforgiven', 5, 0.99),
        ('Wherever I May Roam', 5, 0.99),
        ('Don''t Tread on Me', 5, 0.99),
        ('Through the Never', 5, 0.99),
        ('Nothing Else Matters', 5, 0.99),
        ('Of Wolf and Man', 5, 0.99),
        ('The God That Failed', 5, 0.99),
        ('My Friend of Misery', 5, 0.99),
        ('The Struggle Within', 5, 0.99),
        ('Ain''t My Bitch', 6, 0.99),
        ('2x4', 6, 0.99),
        ('The House Jack Built', 6, 0.99),
        ('Until It Sleeps', 6, 0.99),
        ('King Nothing', 6, 0.99),
        ('Hero of the Day', 6, 0.99),
        ('Bleeding Me', 6, 0.99),
        ('Cure', 6, 0.99),
        ('Poor Twisted Me', 6, 0.99),
        ('Wasting My Hate', 6, 0.99),
        ('Mama Said', 6, 0.99),
        ('Thorn Within', 6, 0.99),
        ('Ronnie', 6, 0.99),
        ('The Outlaw Torn', 6, 0.99),
        ('Fuel', 7, 0.99),
        ('The Memory Remains', 7, 0.99),
        ('Devil''s Dance', 7, 0.99),
        ('The Unforgiven II', 7, 0.99),
        ('Better Than You', 7, 0.99),
        ('Slither', 7, 0.99),
        ('Carpe Diem Baby', 7, 0.99),
        ('Bad Seed', 7, 0.99),
        ('Where the Wild Things Are', 7, 0.99),
        ('Prince Charming', 7, 0.99),
        ('Low Man''s Lyric', 7, 0.99),
        ('Attitude', 7, 0.99),
        ('Fixxxer', 7, 0.99),
        ('Free Speech for the Dumb (Discharge Cover)', 8, 0.99),
        ('It''s Electric (Diamond Head Cover)', 8, 0.99),
        ('Sabbra Cadabra (Black Sabbath Cover)', 8, 0.99),
        ('Turn the Page (Bob Seger Cover)', 8, 0.99),
        ('Die, Die My Darling (Misfits Cover)', 8, 0.99),
        ('Loverman (Nick Cave and the Bad Seeds Cover)', 8, 0.99),
        ('Mercyful Fate (Mercyful Fate Cover)', 8, 0.99),
        ('Astronomy (Blue Öyster Cult Cover)', 8, 0.99),
        ('Whiskey in the Jar (Thin Lizzy Cover)', 8, 0.99),
        ('Tuesday''s Gone (Lynyrd Skynyrd Cover)', 8, 0.99),
        ('The More I See (Discharge Cover)', 8, 0.99),
        ('Helpless (Diamond Head Cover)', 8, 0.99),
        ('The Small Hours (Holocaust Cover)', 8, 0.99),
        ('The Wait (Killing Joke Cover)', 8, 0.99),
        ('Crash Course in Brain Surgery (Budgie Cover)', 8, 0.99),
        ('Last Caress (Misfits Cover)', 8, 0.99),
        ('Am I Evil? (Diamond Head Cover)', 8, 0.99),
        ('Breadfan (Budgie Cover)', 8, 0.99),
        ('The Prince (Diamond Head Cover)', 8, 0.99),
        ('Stone Cold Crazy (Queen Cover)', 8, 0.99),
        ('So What? (Anti-Nowhere League Cover)', 8, 0.99),
        ('Killing Time (Sweet Savage Cover)', 8, 0.99),
        ('Overkill (Motörhead Cover)', 8, 0.99),
        ('Damage Case (Motörhead Cover)', 8, 0.99),
        ('Stone Dead Forever (Motörhead Cover)', 8, 0.99),
        ('Too Late Too Late (Motörhead Cover)', 8, 0.99),
        ('Frantic', 9, 0.99),
        ('St. Anger', 9, 0.99),
        ('Some Kind of Monster', 9, 0.99),
        ('Dirty Window', 9, 0.99),
        ('Invisible Kid', 9, 0.99),
        ('My World', 9, 0.99),
        ('Shoot Me Again', 9, 0.99),
        ('Sweet Amber', 9, 0.99),
        ('The Unnamed Feeling', 9, 0.99),
        ('Purify', 9, 0.99),
        ('All Within My Hands', 9, 0.99),
        ('That Was Just Your Life', 10, 0.99),
        ('The End of the Line', 10, 0.99),
        ('Broken, Beat and Scarred', 10, 0.99),
        ('The Day That Never Comes', 10, 0.99),
        ('All Nightmare Long', 10, 0.99),
        ('Cyanide', 10, 0.99),
        ('The Unforgiven III', 10, 0.99),
        ('The Judas Kiss', 10, 0.99),
        ('Suicide and Redemption', 10, 0.99),
        ('My Apocalypse', 10, 0.99),
        ('Hardwired', 11, 0.99),
        ('Atlas, Rise!', 11, 0.99),
        ('Now That We''re Dead', 11, 0.99),
        ('Moth Into Flame', 11, 0.99),
        ('Dream No More', 11, 0.99),
        ('Halo on Fire', 11, 0.99),
        ('Confusion', 11, 0.99),
        ('ManUNkind', 11, 0.99),
        ('Here Comes Revenge', 11, 0.99),
        ('Am I Savage?', 11, 0.99),
        ('Murder One', 11, 0.99),
        ('Spit Out the Bone', 11, 0.99);


INSERT INTO sizes(size)
  VALUES('S'),('M'),('L'),('XL'),('XXL');

INSERT INTO other(other,"albumId", quantity, price)
  VALUES('Black Ring', 5, 77, 14.99),
        ('Ride the Lightning necklace', 2, 102, 19.99),
        ('Metal waist', 9, 45, 21.99),
        ('Master keyring', 3, 187, 18.99),
        ('Hardwired skull', 11, 76, 29.99),
        ('Belt color desert', 10, 61, 45.99);

INSERT INTO gender(sex)
  VALUES('M'),('W'),('U');

INSERT INTO types(item)
  VALUES('shirt'),
        ('trousers'),
        ('jacket'),
        ('socks'),
        ('hat'),
        ('hoodie');

INSERT INTO clothes(cloth, "itemId", "sizeId", "genderId", "albumId", quantity, price)
  VALUES('Master of puppers shirt', 1, 3, 3, 3, 12, 19.99),
        ('Lightning', 3, 5, 1, 2, 44, 0),
        ('Brown Metallica hat', 5, 2, 3, 0, 19, 23.99),
        ('Leather metal trousers', 2, 5, 2, 0, 33, 49.99),
        ('Metal Horns', 5, 4, 1, 11, 14, 21.99),
        ('Black Snake trousers', 2, 1, 2, 4, 31, 59.99),
        ('Electric Jacket', 3, 1, 1, 8, 11, 120.99);
