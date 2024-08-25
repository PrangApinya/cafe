BEGIN TRANSACTION;
DROP TABLE IF EXISTS "menus";
CREATE TABLE IF NOT EXISTS "menus" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"price"	REAL NOT NULL,
	"type"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "receipts";
CREATE TABLE IF NOT EXISTS "receipts" (
	"id"	INTEGER NOT NULL,
	"menu_id"	INTEGER NOT NULL,
	"sweet_level"	INTEGER NOT NULL,
	"topping"	TEXT,
	"timestamp"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("menu_id") REFERENCES "menus"("id")
);
DROP TABLE IF EXISTS "staffs";
CREATE TABLE IF NOT EXISTS "staffs" (
	"id"	INTEGER NOT NULL,
	"firstname"	TEXT NOT NULL,
	"lastname"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"is_admin"	NUMERIC NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "checks";
CREATE TABLE IF NOT EXISTS "checks" (
	"id"	INTEGER NOT NULL,
	"staff_id"	INTEGER NOT NULL,
	"date"	TEXT NOT NULL,
	"datetime"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("staff_id") REFERENCES "staffs"("id")
);
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
INSERT INTO "staffs" ("id","firstname","lastname","password","is_admin") VALUES (1,'Carl','Johnson','abc',1);
COMMIT;
