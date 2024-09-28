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
	"filename" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "receipt_menus";
CREATE TABLE "receipt_menus" (
	"id" INTEGER NOT NULL,
	"receipt_id" INTEGER NOT NULL,
	"menu_id" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"total_price" REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("receipt_id") REFERENCES "receipts"("id"),
	FOREIGN KEY("menu_id") REFERENCES "menus"("id")
);
DROP TABLE IF EXISTS "receipts";
CREATE TABLE "receipts" (
	"id"	INTEGER NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	"total_price" REAL NOT NULL,
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
 (26,'D5A7ACAC','2024-09-26','2024-09-26 08:29:45.038 +00:00');
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
INSERT INTO "staffs" ("rfid","firstname","lastname","password","is_admin") VALUES ('D5A7ACAC','Watchaphon','Tubsang','$2a$10$mU.8kdf8r86bddpoOsWkqeI5sJ5XIedM6BOu3jWgBQ/XIhXNMh1Lm',1);
COMMIT;
