drop database if exists cars_repair;
create database cars_repair char set utf8;
use cars_repair;
select database();
SET FOREIGN_KEY_CHECKS = 0;
SET @@auto_increment_increment=1;
SET @@auto_increment_offset=0;

CREATE TABLE `car_mark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `car_model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(30) NOT NULL,
  `mark_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mark_id` (`mark_id`),
  CONSTRAINT `car_model_ibfk_1` FOREIGN KEY (`mark_id`) REFERENCES `car_mark` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `car_year` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(30) NOT NULL,
  `model_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model_id` (`model_id`),
  CONSTRAINT `car_year_ibfk_1` FOREIGN KEY (`model_id`) REFERENCES `car_model` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO car_mark (mark)
	VALUES ('FORD'),('VW'),('TESLA'),('FIAT'),('AUDI'),('BMW');
    
INSERT INTO car_model (model, mark_id)
	VALUES ('Galaxy', 1 ),('Transit', 1),('Focus',1),('Mondeo',1),
			('Passat', 2),('Golf',2),('Sharan',2),
			('MODEL X', 3),('MODEL S',3),('MODEL 3',3),
			('Scudo', 4),('Tipo',4),('Doblo',4),('Ducato', 4),
			('A4', 5),('A6',5),('A7',5),('A8', 5),
			('M2', 6),('M3',6),('M4',6),('M5', 6);
            
INSERT INTO car_year (year, model_id)
	VALUES ('2006-2010', 1),('2010-2015', 1),('2015-2020', 1),
			('2006-2010', 2),('2010-2015', 2),('2015-2020', 2),
			('2006-2010', 3),('2010-2015', 3),('2015-2020', 3),
			('2006-2010', 4),('2010-2015', 4),('2015-2020', 4),
			('2006-2010', 5),('2010-2015', 5),('2015-2020', 5),
			('2006-2010', 6),('2010-2015', 6),('2015-2020', 6),
			('2006-2010', 7),('2010-2015', 7),('2015-2020', 7),
			('2015-present', 8),('2012-present', 9),('2017-present', 10),
            ('2006-2010', 11),('2010-2015', 11),('2015-2020', 11),
            ('2006-2010', 12),('2010-2015', 12),('2015-2020', 12),
            ('2006-2010', 13),('2010-2015', 13),('2015-2020', 13),
            ('2006-2010', 14),('2010-2015', 14),('2015-2020', 14),
            ('2006-2010', 15),('2010-2015', 15),('2015-2020', 15),
            ('2006-2010', 16),('2010-2015', 16),('2015-2020', 16),
            ('2006-2010', 17),('2010-2015', 17),('2015-2020', 17),
            ('2006-2010', 18),('2010-2015', 18),('2015-2020', 18),
            ('2006-2010', 19),('2010-2015', 19),('2015-2020', 19),
            ('2006-2010', 20),('2010-2015', 20),('2015-2020', 20),
            ('2006-2010', 21),('2010-2015', 21),('2015-2020', 21),
            ('2006-2010', 22),('2010-2015', 22),('2015-2020', 22);

