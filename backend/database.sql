BEGIN TRANSACTION;
DROP TABLE IF EXISTS "staffs";
CREATE TABLE IF NOT EXISTS "staffs" (
	"rfid"	TEXT NOT NULL,
	"firstname"	TEXT NOT NULL,
	"lastname"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"is_admin"	NUMERIC NOT NULL,
	PRIMARY KEY("rfid")
);
DROP TABLE IF EXISTS "checks";
CREATE TABLE IF NOT EXISTS "checks" (
	"id"	INTEGER NOT NULL,
	"staff_id"	TEXT NOT NULL,
	"date"	TEXT NOT NULL,
	"datetime"	TEXT NOT NULL,
	FOREIGN KEY("staff_id") REFERENCES "staffs"("rfid"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "menus";
CREATE TABLE IF NOT EXISTS "menus" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"price"	REAL NOT NULL,
	"type"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "receipt_menus";
CREATE TABLE IF NOT EXISTS "receipt_menus" (
	"id"	INTEGER NOT NULL,
	"receipt_id"	INTEGER NOT NULL,
	"menu_id"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	"price"	REAL NOT NULL,
	FOREIGN KEY("receipt_id") REFERENCES "receipts"("id"),
	FOREIGN KEY("menu_id") REFERENCES "menus"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "receipts";
CREATE TABLE IF NOT EXISTS "receipts" (
	"id"	INTEGER NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "staffs" ("rfid","firstname","lastname","password","is_admin") VALUES ('D5A7ACAC','dekchai','pluto','$2a$10$U.DDfCLNRS8l9aZ8FroYD.e0R97rztOBv0RMQj2ZCU/KK9a9YIWAW',1);
INSERT INTO "checks" ("id","staff_id","date","datetime") VALUES (1,'D5A7ACAC','2024-09-18','2024-09-18 10:55:43.631 +00:00');
INSERT INTO "menus" ("id","name","price","type") VALUES (1,'Latte',40.0,'HOT'),
 (2,'Cabuchino',45.0,'HOT'),
 (3,'Green tea',30.0,'HOT'),
 (4,'thai tea',30.0,'HOT'),
 (5,'Latte',50.0,'ICED'),
 (6,'Cabuchino',50.0,'ICED'),
 (7,'Green tea',50.0,'ICED'),
 (8,'thai tea',50.0,'ICED'),
 (9,'Chocolate',50.0,'CAKE'),
 (10,'Green Tea',55.0,'CAKE'),
 (11,'Strawberry',55.0,'CAKE'),
 (12,'Macaron',70.0,'CAKE');
COMMIT;
