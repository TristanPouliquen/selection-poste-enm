INSERT INTO `app_state` VALUES
(1, 0, NULL);

INSERT INTO `groups`(id, name) VALUES
(1, 'Groupe 1'),
(2, 'Groupe 2'),
(3, 'Groupe 3'),
(4, 'Groupe 4'),
(5, 'N/A');

INSERT INTO appeal_courts(id, name) VALUES
(1, 'Agen'),
(2, 'Aix-en-Provence'),
(3, 'Amiens'),
(4, 'Angers'),
(5, 'Basse-Terre'),
(6, 'Bastia'),
(7, 'Besançon'),
(8, 'Bordeaux'),
(9, 'Bourges'),
(10, 'Caen'),
(11, 'Cayenne'),
(12, 'Chambéry'),
(13, 'Colmar'),
(14, 'Dijon'),
(15, 'Douai'),
(16, 'Fort-de-France'),
(17, 'Grenoble'),
(18, 'Limoges'),
(19, 'Lyon'),
(20, 'Metz'),
(21, 'Montpellier'),
(22, 'Nancy'),
(23, 'Nîmes'),
(24, 'Nouméa'),
(25, 'Orléans'),
(26, 'Papeete'),
(27, 'Paris'),
(28, 'Pau'),
(29, 'Poitiers'),
(30, 'Reims'),
(31, 'Rennes'),
(32, 'Riom'),
(33, 'Rouen'),
(34, 'Saint-Denis'),
(35, 'Saint-Pierre-et-Miquelon'),
(36, 'Toulouse'),
(37, 'Versailles');

INSERT INTO tribunals (id, name, group_id, appeal_court_id) VALUES
(1, 'Agen', 3, 1),
(2, 'Auch', 4, 1),
(3, 'Cahors', 4, 1),
(4, 'Aix-en-Provence', 2, 2),
(5, 'Digne-les-Bains', 4, 2),
(6, 'Draguignan', 2, 2),
(7, 'Grasse', 2, 2),
(8, 'Marseille', 1, 2),
(9, 'Nice', 2, 2),
(10, 'Tarascon', 4, 2),
(11, 'Toulon', 2, 2),
(12, 'Amiens', 2, 3),
(13, 'Beauvais', 3, 3),
(14, 'Compiègne', 4, 3),
(15, 'Laon', 4, 3),
(16, 'Saint-Quentin', 4, 3),
(17, 'Senlis', 3, 3),
(18, 'Soissons', 4, 3),
(19, 'Angers', 2, 4),
(20, 'Laval', 3, 4),
(21, 'Le Mans', 2, 4),
(22, 'Saumur', 4, 4),
(23, 'Ajaccio', 4, 5),
(24, 'Bastia', 4, 5),
(25, 'Basse-Terre', 5, 6),
(26, 'Pointe-à-Pitre', 5, 6),
(27, 'Belfort', 4, 7),
(28, 'Besançon', 3, 7),
(29, 'Lons-le-Saunier', 3, 7),
(30, 'Montbéliard', 4, 7),
(31, 'Vesoul', 3, 7),
(32, 'Angoulême', 3, 8),
(33, 'Bergerac', 4, 8),
(34, 'Bordeaux', 1, 8),
(35, 'Libourne', 4, 8),
(36, 'Périgueux', 3, 8),
(37, 'Bourges', 3, 9),
(38, 'Châteauroux', 4, 9),
(39, 'Nevers', 4, 9),
(40, 'Alençon', 4, 10),
(41, 'Argentan', 4, 10),
(42, 'Caen', 2, 10),
(43, 'Cherbourg', 4, 10),
(44, 'Coutances', 3, 10),
(45, 'Lisieux', 3, 10),
(46, 'Cayenne', 5, 11),
(47, 'Albertville', 4, 12),
(48, 'Annecy', 3, 12),
(49, 'Bonneville', 4, 12),
(50, 'Chambéry', 3, 12),
(51, 'Thonon-les-Bains', 3, 12),
(52, 'Colmar', 3, 13),
(53, 'Mulhouse', 2, 13),
(54, 'Saverne', 4, 13),
(55, 'Strasbourg', 2, 13),
(56, 'Châlon-sur-Saône', 3, 14),
(57, 'Chaumont', 4, 14),
(58, 'Dijon', 2, 14),
(59, 'Mâcon', 4, 14),
(60, 'Arras', 3, 15),
(61, 'Avesnes-sur-Helpe', 3, 15),
(62, 'Béthune', 2, 15),
(63, 'Boulogne-sur-Mer', 2, 15),
(64, 'Cambrai', 4, 15),
(65, 'Lille', 1, 15),
(66, 'Saint-Omer', 4, 15),
(67, 'Valenciennes', 2, 15),
(68, 'Fort-de-France', 5, 16),
(69, 'Bourgoin-Jallieu', 4, 17),
(70, 'Gap', 4, 17),
(71, 'Grenoble', 2, 17),
(72, 'Valence', 2, 17),
(73, 'Vienne', 3, 17),
(74, 'Brive-la-Gaillarde', 4, 18),
(75, 'Guéret', 4, 18),
(76, 'Limoges', 3, 18),
(77, 'Tulle', 4, 18),
(78, 'Bourg-en-Bresse', 2, 19),
(79, 'Lyon', 1, 19),
(80, 'Roanne', 4, 19),
(81, 'Saint-Étienne', 2, 19),
(82, 'Villefranche-sur-Saône', 4, 19),
(83, 'Metz', 2, 20),
(84, 'Sarreguemines', 3, 20),
(85, 'Thionville', 4, 20),
(86, 'Béziers', 3, 21),
(87, 'Carcassonne', 4, 21),
(88, 'Montpellier', 2, 21),
(89, 'Narbonne', 4, 21),
(90, 'Perpignan', 2, 21),
(91, 'Rodez', 4, 21),
(92, 'Bar-le-Duc', 4, 22),
(93, 'Briey', 4, 22),
(94, 'Épinal', 3, 22),
(95, 'Nançy', 2, 22),
(96, 'Verdun', 4, 22),
(97, 'Alès', 4, 23),
(98, 'Avignon', 2, 23),
(99, 'Carpentras', 4, 23),
(100, 'Mende', 4, 23),
(101, 'Nîmes', 2, 23),
(102, 'Privas', 3, 23),
(103, 'Blois', 3, 25),
(104, 'Montargis', 4, 25),
(105, 'Orléans', 2, 25),
(106, 'Tours', 2, 25),
(107, 'Papeete', 5, 26),
(108, 'Auxerre', 4, 27),
(109, 'Bobigny', 1, 27),
(110, 'Créteil', 1, 27),
(111, 'Évry', 1, 27),
(112, 'Fontainebleau', 4, 27),
(113, 'Meaux', 2, 27),
(114, 'Melun', 2, 27),
(115, 'Paris', 1, 27),
(116, 'Sens', 4, 27),
(117, 'Bayonne', 3, 28),
(118, 'Dax', 4, 28),
(119, 'Mont-de-Marsan', 4, 28),
(120, 'Pau', 3, 28),
(121, 'Tarbes', 3, 28),
(122, 'La Rochelle', 3, 29),
(123, 'La Roche-sur-Yon', 3, 29),
(124, 'Les Sables d''Olonne', 4, 29),
(125, 'Niort', 3, 29),
(126, 'Poitiers', 2, 29),
(127, 'Saintes', 3, 29),
(128, 'Châlon-en-Champagne', 3, 30),
(129, 'Charleville-Mézières', 3, 30),
(130, 'Reims', 3, 30),
(131, 'Troyes', 3, 30),
(132, 'Brest', 2, 31),
(133, 'Lorient', 3, 31),
(134, 'Nantes', 2, 31),
(135, 'Quimper', 3, 31),
(136, 'Rennes', 2, 31),
(137, 'Saint-Brieuc', 2, 31),
(138, 'Saint-Malo', 3, 31),
(139, 'Saint-Nazaire', 3, 31),
(140, 'Vannes', 3, 31),
(141, 'Clermont-Ferrand', 2, 32),
(142, 'Cusset', 4, 32),
(143, 'Le Puy-en-Velay', 4, 32),
(144, 'Montluçon', 4, 32),
(145, 'Moulins', 4, 32),
(146, 'Dieppe', 4, 33),
(147, 'Évreux', 2, 33),
(148, 'Le Havre', 2, 33),
(149, 'Rouen', 2, 33),
(150, 'Mamoudzou', 5, 34),
(151, 'Saint-Denis', 5, 34),
(152, 'Saint-Pierre-et-Miquelon', 5, 35),
(153, 'Albi', 4, 36),
(154, 'Castres', 4, 36),
(155, 'Foix', 4, 36),
(156, 'Montauban', 3, 36),
(157, 'Saint-Gaudens', 4, 36),
(158, 'Toulouse', 1, 36),
(159, 'Chartres', 2, 37),
(160, 'Nanterre', 1, 37),
(161, 'Pointoise', 1, 37),
(162, 'Versailles', 1, 37),
(163, 'Douai', 3, 15),
(164, 'Dunkerque', 3, 15),
(165, 'Nouméa', 3, 24); --check group

INSERT INTO roles (id, name) VALUES
(1, 'Juge'),
(2, 'Juge d''instruction (JI)'),
(3, 'Juge des enfants (JE)'),
(4, 'Juge de l''application des peines (JAP)'),
(5, 'Substitut du procureur général'),
(6, 'Substitut du procureur de la République'),
(7, 'Juge des contentieux de la protection (JCP)'),
(8, 'Juge aux affaires familiales (JAF)'),
(9, 'Juge (pôle social)'),
(10, 'Juge (correctionnel)'),
(11, 'Juge (civil)');