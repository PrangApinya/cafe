BEGIN TRANSACTION;
DROP TABLE IF EXISTS "checks";
CREATE TABLE "checks" (
	"id"	INTEGER NOT NULL,
	"staff_id"	TEXT NOT NULL,
	"date"	TEXT NOT NULL,
	"datetime"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("staff_id") REFERENCES "staffs"("rfid")
);
DROP TABLE IF EXISTS "menus";
CREATE TABLE "menus" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"price"	REAL NOT NULL,
	"type"	TEXT NOT NULL,
	"filename"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "receipt_menus";
CREATE TABLE "receipt_menus" (
	"id"	INTEGER NOT NULL,
	"receipt_id"	INTEGER NOT NULL,
	"menu_id"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	"total_price"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("menu_id") REFERENCES "menus"("id"),
	FOREIGN KEY("receipt_id") REFERENCES "receipts"("id")
);
DROP TABLE IF EXISTS "receipts";
CREATE TABLE "receipts" (
	"id"	INTEGER NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	"total_price"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "staffs";
CREATE TABLE "staffs" (
	"rfid"	TEXT NOT NULL,
	"firstname"	TEXT NOT NULL,
	"lastname"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"is_admin"	NUMERIC NOT NULL,
	PRIMARY KEY("rfid")
);
INSERT INTO "checks" ("id","staff_id","date","datetime") VALUES (23,'D5A7ACAC','2024-09-26','2024-09-26 07:34:26.511 +00:00'),
 (24,'D5A7ACAC','2024-09-26','2024-09-26 08:06:16.745 +00:00'),
 (25,'D5A7ACAC','2024-09-26','2024-09-26 08:06:25.963 +00:00'),
 (26,'D5A7ACAC','2024-09-26','2024-09-26 08:29:45.038 +00:00'),
 (27,'D5A7ACAC','2024-09-27','2024-09-27 14:31:44.199 +00:00'),
 (28,'D5A7ACAC','2024-09-28','2024-09-28 07:57:48.853 +00:00'),
 (29,'aaaaaaab','2024-09-28','2024-09-28 08:01:37.457 +00:00'),
 (30,'aaaaaaab','2024-09-28','2024-09-28 08:03:13.106 +00:00'),
 (31,'D5A7ACAC','2024-09-28','2024-09-28 10:28:43.434 +00:00'),
 (32,'D5A7ACAC','2024-09-28','2024-09-28 10:32:07.950 +00:00'),
 (33,'aaaaaaac','2024-09-28','2024-09-28 10:41:45.275 +00:00'),
 (34,'D5A7ACAC','2024-09-28','2024-09-28 12:51:37.320 +00:00');
INSERT INTO "menus" ("id","name","price","type","filename") VALUES (1,'Latte',40.0,'HOT','latte.png'),
 (2,'Cabuchino',45.0,'HOT','capo.png'),
 (3,'Green tea',30.0,'HOT','tea.png'),
 (4,'thai tea',30.0,'HOT','teat.png'),
 (5,'Latte',50.0,'ICED','latteice.png'),
 (6,'Cabuchino',50.0,'ICED','capoice.png'),
 (7,'Green tea',50.0,'ICED','gteaice.png'),
 (8,'thai tea',50.0,'ICED','teaice.png'),
 (9,'Chocolate',50.0,'CAKE','cakec.png'),
 (10,'Green Tea',55.0,'CAKE','caketea.png'),
 (11,'Strawberry',55.0,'CAKE','cakes.png'),
 (12,'Macaron',70.0,'CAKE','cakem.png');
INSERT INTO "receipt_menus" ("id","receipt_id","menu_id","quantity","total_price") VALUES (17,13,7,2,100.0),
 (18,13,11,2,110.0),
 (19,14,2,1,45.0),
 (20,14,12,2,140.0),
 (21,15,8,1,50.0),
 (22,15,5,1,50.0),
 (23,15,9,1,50.0),
 (24,16,3,1,30.0),
 (25,16,9,1,50.0),
 (26,16,12,1,70.0);
INSERT INTO "receipts" ("id","timestamp","total_price") VALUES (13,'2024-09-28 14:40:32.396 +00:00',210.0),
 (14,'2024-09-28 14:41:06.022 +00:00',185.0),
 (15,'2024-09-28 14:41:45.220 +00:00',150.0),
 (16,'2024-09-28 15:07:43.142 +00:00',150.0);
INSERT INTO "staffs" ("rfid","firstname","lastname","password","is_admin") VALUES ('D5A7ACAC','Watchaphon','Tubsang','$2a$10$mU.8kdf8r86bddpoOsWkqeI5sJ5XIedM6BOu3jWgBQ/XIhXNMh1Lm',1),
 ('aaaaaaab','dekchai','pluto','$2a$10$Qegd/533Y.tafmQCH5IMk.8BF3wNRlmho5jpWUKd1u.GAtaceNOy.',1),
 ('aaaaaaac','prang','apinya','$2a$10$tNq/Xp766KmHQEuoiv0avONfVh8/vO1aYseH2FrTCzpFAGg42o1rq',0),
 ('aaaaaaad','donny','galaxy','$2a$10$r1kneasN7xgBSb1S7spDz.h7LI49rRcPozOxAjLJsaLG4cJcYJIIW',0);
COMMIT;
