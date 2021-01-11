/*	Drop tables if exist */
DROP TABLE IF EXISTS abilities CASCADE;
DROP TABLE IF EXISTS ability_flavor_text CASCADE;
DROP TABLE IF EXISTS egg_groups CASCADE;
DROP TABLE IF EXISTS encounters CASCADE;
DROP TABLE IF EXISTS encounter_slots CASCADE;
DROP TABLE IF EXISTS encounter_condition_values CASCADE;
DROP TABLE IF EXISTS encounter_condition_value_map CASCADE;
DROP TABLE IF EXISTS encounter_methods CASCADE;
DROP TABLE IF EXISTS evolution_chains CASCADE;
DROP TABLE IF EXISTS evolution_triggers CASCADE;
DROP TABLE IF EXISTS experience CASCADE;
DROP TABLE IF EXISTS genders CASCADE;
DROP TABLE IF EXISTS generations CASCADE;
DROP TABLE IF EXISTS growth_rates CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS item_categories CASCADE;
DROP TABLE IF EXISTS item_pockets CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS location_areas CASCADE;
DROP TABLE IF EXISTS location_area_encounter_rates CASCADE;
DROP TABLE IF EXISTS machines CASCADE;
DROP TABLE IF EXISTS moves CASCADE;
DROP TABLE IF EXISTS move_damage_classes CASCADE;
DROP TABLE IF EXISTS move_effects CASCADE;
DROP TABLE IF EXISTS move_flavor_text CASCADE;
DROP TABLE IF EXISTS move_targets CASCADE;
DROP TABLE IF EXISTS natures CASCADE;
DROP TABLE IF EXISTS pokemon CASCADE;
DROP TABLE IF EXISTS pokemon_abilities CASCADE;
DROP TABLE IF EXISTS pokemon_egg_groups CASCADE;
DROP TABLE IF EXISTS pokemon_evolution CASCADE;
DROP TABLE IF EXISTS pokemon_items CASCADE;
DROP TABLE IF EXISTS pokemon_move_methods CASCADE;
DROP TABLE IF EXISTS pokemon_moves CASCADE;
DROP TABLE IF EXISTS pokemon_shapes CASCADE;
DROP TABLE IF EXISTS pokemon_species CASCADE;
DROP TABLE IF EXISTS pokemon_species_flavor_text CASCADE;
DROP TABLE IF EXISTS pokemon_stats CASCADE;
DROP TABLE IF EXISTS pokemon_types CASCADE;
DROP TABLE IF EXISTS regions CASCADE;
DROP TABLE IF EXISTS stats CASCADE;
DROP TABLE IF EXISTS type_efficacy CASCADE;
DROP TABLE IF EXISTS types CASCADE;
DROP TABLE IF EXISTS version_groups CASCADE;
DROP TABLE IF EXISTS versions CASCADE;
/*		*/



/* Create tables and columns */
CREATE TABLE generations(
	id					INT			NOT NULL,
	main_region			VARCHAR(12)	NOT NULL,
	identifier			VARCHAR(16)	NOT NULL,
	"name"				VARCHAR(16)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE regions(
	id					INT			NOT NULL,
	identifier			VARCHAR(12)	NOT NULL,
	"name"				VARCHAR(12) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE version_groups(
	id					INT			NOT NULL,
	identifier			VARCHAR(40)	NOT NULL,
	generation_id		INT			NOT NULL,
	"order"				SMALLINT	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE versions(
	id					INT			NOT NULL,
	version_group_id	INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	is_main_series		BOOLEAN		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE locations(
	id					INT			NOT NULL,
	region_id			INT,
	identifier			VARCHAR(40) NOT NULL,
	"name"				VARCHAR(40) NOT NULL,
	subtitle			VARCHAR(40),
	PRIMARY KEY (id)
);

CREATE TABLE location_areas(
	id					INT			NOT NULL,
	location_id			INT			NOT NULL,
	game_index			SMALLINT	NOT NULL,
	identifier			VARCHAR(40),
	"name"				VARCHAR(40),
	PRIMARY KEY (id)
);

CREATE TABLE encounter_methods(
	id					INT			NOT NULL,
	identifier			VARCHAR(20) NOT NULL,
	"order"				SMALLINT	NOT NULL,
	"name"				VARCHAR(40)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE location_area_encounter_rates(
	id					SERIAL		PRIMARY KEY,
	location_area_id	INT			NOT NULL,
	encounter_method_id	INT			NOT NULL,
	version_id			INT			NOT NULL,
	rate				SMALLINT	NOT NULL
);

CREATE TABLE abilities(
	id					INT			NOT NULL,
	"name"				VARCHAR(30)	NOT NULL,
	generation_id		INT 		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE ability_flavor_text(
	id					SERIAL		PRIMARY KEY,
	ability_id 			INT 		NOT NULL,
	version_group_id	INT			NOT NULL,
	flavor_text			VARCHAR(255) NOT NULL
);

CREATE TABLE egg_groups(
	id					INT			NOT NULL,
	identifier			VARCHAR(20) NOT NULL,
	"name"				VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE encounters(
	id					INT			NOT NULL,
	version_id			INT			NOT NULL,
	location_area_id	INT			NOT NULL,
	encounter_slot_id INT			NOT NULL,
	pokemon_id			INT			NOT NULL,
	min_level			SMALLINT	NOT NULL,
	max_level			SMALLINT	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE encounter_slots(
	id					INT			NOT NULL,
	version_group_id	INT			NOT NULL,
	encounter_method_id INT			NOT NULL,
	slot				SMALLINT,
	rarity				SMALLINT 	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE encounter_condition_value_map(
	id					SERIAL		PRIMARY KEY,
	encounter_id INT NOT NULL,
	encounter_condition_value_id INT NOT NULL
);

CREATE TABLE encounter_condition_values(
	id					INT			NOT NULL,
	encounter_condition VARCHAR(20)	NOT NULL,
	"description"		VARCHAR(40)	NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	is_default			BOOLEAN		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE evolution_chains(
	id					INT			NOT NULL,
	baby_trigger_item_id INT,
	PRIMARY KEY (id)
);

CREATE TABLE evolution_triggers(
	id					INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	"description"		VARCHAR(20)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE experience(
	id					SERIAL		PRIMARY KEY,
	growth_rate_id		INT			NOT NULL,
	"level"				SMALLINT	NOT NULL,
	experience			INT			NOT NULL
);

CREATE TABLE genders(
	id					INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE growth_rates(
	id					INT			NOT NULL,
	identifier			VARCHAR(40)	NOT NULL,
	formula				TEXT		NOT NULL,
	"name"				VARCHAR(40)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE items(
	id					INT			NOT NULL,
	identifier			VARCHAR(40)	NOT NULL,
	"name"				VARCHAR(40)	NOT NULL,
	category_id			INT			NOT NULL,
	"cost"				INT			NOT NULL,
	short_effect		VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE item_categories(
	id					INT			NOT NULL,
	pocket_id			INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE item_pockets(
	id					INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE machines(
	id					SERIAL		PRIMARY KEY,
	machine_number		INT			NOT NULL,
	version_group_id	INT			NOT NULL,
	item_id				INT			NOT NULL,
	move_id				INT			NOT NULL
);

CREATE TABLE moves(
	id					INT			NOT NULL,
	identifier			VARCHAR(40)	NOT NULL,
	"name"				VARCHAR(40)	NOT NULL,
	generation_id		INT			NOT NULL,
	"type_id"			INT			NOT NULL,
	"power"				SMALLINT,
	pp					SMALLINT	NOT NULL,
	accuracy			SMALLINT,
	priority			SMALLINT	NOT NULL,
	target_id			INT			NOT NULL,
	damage_class_id		INT			NOT NULL,
	effect_id			INT			NOT NULL,
	effect_chance		SMALLINT,
	PRIMARY KEY (id)
);

CREATE TABLE move_damage_classes(
	id					INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE move_effects(
	id					INT			NOT NULL,
	short_effect		VARCHAR(255) NOT NULL,
	effect				TEXT		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE move_flavor_text(
	id					SERIAL		PRIMARY KEY,
	move_id				INT			NOT NULL,
	version_group_id	INT			NOT NULL,
	flavor_text			TEXT		NOT NULL
);

CREATE TABLE move_targets(
	id					INT			NOT NULL,
	identifier			VARCHAR(40)	NOT NULL,
	"name"				VARCHAR(20) NOT NULL,
	"description"		VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE natures(
	id					INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	decreased_stat_id	INT			NOT NULL,
	increased_stat_id	INT			NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pokemon(
	id					INT			NOT NULL,
	identifier			VARCHAR(40)	NOT NULL,
	species_id			INT			NOT NULL,
	height				SMALLINT	NOT NULL,
	"weight"			SMALLINT	NOT NULL,
	base_experience		SMALLINT	NOT NULL,
	"order"				SMALLINT	NOT NULL,
	is_default			BOOLEAN		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pokemon_abilities(
	id					SERIAL		PRIMARY KEY,
	pokemon_id			INT			NOT NULL,
	ability_id			INT			NOT NULL,
	is_hidden			BOOLEAN		NOT NULL
);

CREATE TABLE pokemon_egg_groups(
	id					SERIAL		PRIMARY KEY,
	species_id			INT			NOT NULL,
	egg_group_id		INT			NOT NULL
);

CREATE TABLE pokemon_evolution(
	id					INT			NOT NULL,
	evolved_species_id	INT			NOT NULL,
	evolution_trigger_id INT		NOT NULL,
	trigger_item_id		INT,
	minimum_level		SMALLINT,
	gender_id			INT,
	location_id			INT,
	held_item_id		INT,
	time_of_day			VARCHAR(10),
	known_move_id		INT,
	known_move_type_id	INT,
	minimum_happiness	SMALLINT,
	minimum_beauty		SMALLINT,
	minimum_affection	SMALLINT,
	relative_physical_stats	SMALLINT,
	party_species_id	INT,
	party_type_id		INT,
	trade_species_id	INT,
	needs_overworld_rain BOOLEAN	NOT NULL,
	turn_upside_down	BOOLEAN		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pokemon_items(
	id					SERIAL		PRIMARY KEY,
	pokemon_id			INT			NOT NULL,
	version_id			INT			NOT NULL,
	item_id				INT			NOT NULL,
	rarity				SMALLINT	NOT NULL
);

CREATE TABLE pokemon_move_methods(
	id					INT			NOT NULL,
	identifier			VARCHAR(40)	NOT NULL,
	"name"				VARCHAR(40)	NOT NULL,
	"description"		VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pokemon_moves(
	id					SERIAL		PRIMARY KEY,
	pokemon_id			INT			NOT NULL,
	version_group_id	INT			NOT NULL,
	move_id				INT			NOT NULL,
	pokemon_move_method_id INT		NOT NULL,
	"level"				SMALLINT	NOT NULL,
	"order"				SMALLINT
);

CREATE TABLE pokemon_shapes(
	id					INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	awesome_name		VARCHAR(20)	NOT NULL,
	"description"		VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pokemon_species(
	id					INT			NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	genus				VARCHAR(40) NOT NULL,
	generation_id		INT			NOT NULL,
	evolves_from_species_id INT,
	evolution_chain_id	INT			NOT NULL,
	color_id			INT			NOT NULL,
	shape_id			INT			NOT NULL,
	habitat_id			INT,
	gender_rate			SMALLINT	NOT NULL,
	capture_rate		SMALLINT	NOT NULL,
	base_happiness		SMALLINT	NOT NULL,
	is_baby				BOOLEAN		NOT NULL,
	hatch_counter		SMALLINT	NOT NULL,
	has_gender_differences BOOLEAN	NOT NULL,
	growth_rate_id		INT			NOT NULL,
	forms_switchable	BOOLEAN		NOT NULL,
	"order"				SMALLINT	NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pokemon_species_flavor_text(
	id					SERIAL		PRIMARY KEY,
	species_id			INT			NOT NULL,
	version_id			INT			NOT NULL,
	flavor_text			TEXT		NOT NULL
);

CREATE TABLE pokemon_stats(
	id					SERIAL		PRIMARY KEY,
	pokemon_id			INT			NOT NULL,
	stat_id				INT			NOT NULL,
	base_stat			SMALLINT	NOT NULL,
	effort				SMALLINT	NOT NULL,
	"order"				SMALLINT	NOT NULL
);

CREATE TABLE pokemon_types(
	id					SERIAL		PRIMARY KEY,
	pokemon_id			INT			NOT NULL,
	"type_id"			INT			NOT NULL,
	slot				SMALLINT	NOT NULL
);

CREATE TABLE stats(
	id					INT			NOT NULL,
	damage_class_id		INT,
	identifier			VARCHAR(20) NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	is_battle_only		BOOLEAN		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE type_efficacy(
	id					SERIAL		PRIMARY KEY,
	damage_type_id		INT			NOT NULL,
	target_type_id		INT			NOT NULL,
	damage_factor		SMALLINT	NOT NULL
);

CREATE TABLE types(
	id					INT			NOT NULL,
	identifier			VARCHAR(20)	NOT NULL,
	"name"				VARCHAR(20)	NOT NULL,
	generation_id		INT			NOT NULL,
	damage_class_id		INT			NOT NULL,
	PRIMARY KEY (id)
);

-- CREATE TABLE users(
-- 	id					UUID		NOT NULL,
-- 	username			VARCHAR(255) NOT NULL,
-- 	"hash"				TEXT		NOT NULL,
-- 	email				VARCHAR(255) NOT NULL,
-- 	display_name		VARCHAR(12)	NOT NULL,
-- 	created_date		DATE		NOT NULL,
-- 	caught				INT[],
-- 	selected_style		VARCHAR(2),
-- 	friend_code_3ds		VARCHAR(14),
-- 	friend_code_switch	VARCHAR(14),
-- 	PRIMARY KEY (id, username),
-- 	UNIQUE(id, username)
-- );
/*		*/



/* Copy data from .csv files to tables */
COPY abilities
FROM '.\data\abilities.csv' DELIMITER ',' CSV HEADER;

COPY ability_flavor_text
FROM '.\data\ability_flavor_text.csv' DELIMITER ',' CSV HEADER;

COPY egg_groups
FROM '.\data\egg_groups.csv' DELIMITER ',' CSV HEADER;

COPY encounters
FROM '.\data\encounters.csv' DELIMITER ',' CSV HEADER;

COPY encounter_slots
FROM '.\data\encounter_slots.csv' DELIMITER ',' CSV HEADER;

COPY encounter_condition_values
FROM '.\data\encounter_condition_values.csv' DELIMITER ',' CSV HEADER;

COPY encounter_condition_value_map
FROM '.\data\encounter_condition_value_map.csv' DELIMITER ',' CSV HEADER;

COPY encounter_methods
FROM '.\data\encounter_methods.csv' DELIMITER ',' CSV HEADER;

COPY evolution_chains
FROM '.\data\evolution_chains.csv' DELIMITER ',' CSV HEADER;

COPY evolution_triggers
FROM '.\data\evolution_triggers.csv' DELIMITER ',' CSV HEADER;

COPY experience
FROM '.\data\experience.csv' DELIMITER ',' CSV HEADER;

COPY genders
FROM '.\data\genders.csv' DELIMITER ',' CSV HEADER;

COPY generations
FROM '.\data\generations.csv' DELIMITER ',' CSV HEADER;

COPY growth_rates
FROM '.\data\growth_rates.csv' DELIMITER ',' CSV HEADER;

COPY item_categories
FROM '.\data\item_categories.csv' DELIMITER ',' CSV HEADER;

COPY item_pockets
FROM '.\data\item_pockets.csv' DELIMITER ',' CSV HEADER;

COPY items
FROM '.\data\items.csv' DELIMITER ',' CSV HEADER;

COPY locations
FROM '.\data\locations.csv' DELIMITER ',' CSV HEADER;

COPY location_areas
FROM '.\data\location_areas.csv' DELIMITER ',' CSV HEADER;

COPY location_area_encounter_rates
FROM '.\data\location_area_encounter_rates.csv' DELIMITER ',' CSV HEADER;

COPY machines
FROM '.\data\machines.csv' DELIMITER ',' CSV HEADER;

COPY moves
FROM '.\data\moves.csv' DELIMITER ',' CSV HEADER;

COPY move_damage_classes
FROM '.\data\move_damage_classes.csv' DELIMITER ',' CSV HEADER;

COPY move_effects
FROM '.\data\move_effects.csv' DELIMITER ',' CSV HEADER;

COPY move_flavor_text
FROM '.\data\move_flavor_text.csv' DELIMITER ',' CSV HEADER;

COPY move_targets
FROM '.\data\move_targets.csv' DELIMITER ',' CSV HEADER;

COPY natures
FROM '.\data\natures.csv' DELIMITER ',' CSV HEADER;

COPY pokemon
FROM '.\data\pokemon.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_abilities
FROM '.\data\pokemon_abilities.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_egg_groups
FROM '.\data\pokemon_egg_groups.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_evolution
FROM '.\data\pokemon_evolution.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_items
FROM '.\data\pokemon_items.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_move_methods
FROM '.\data\pokemon_move_methods.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_moves
FROM '.\data\pokemon_moves.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_shapes
FROM '.\data\pokemon_shapes.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_species
FROM '.\data\pokemon_species.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_species_flavor_text
FROM '.\data\pokemon_species_flavor_text.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_stats
FROM '.\data\pokemon_stats.csv' DELIMITER ',' CSV HEADER;

COPY pokemon_types
FROM '.\data\pokemon_types.csv' DELIMITER ',' CSV HEADER;

COPY regions
FROM '.\data\regions.csv' DELIMITER ',' CSV HEADER;

COPY stats
FROM '.\data\stats.csv' DELIMITER ',' CSV HEADER;

COPY type_efficacy
FROM '.\data\type_efficacy.csv' DELIMITER ',' CSV HEADER;

COPY types
FROM '.\data\types.csv' DELIMITER ',' CSV HEADER;

COPY version_groups
FROM '.\data\version_groups.csv' DELIMITER ',' CSV HEADER;

COPY versions
FROM '.\data\versions.csv' DELIMITER ',' CSV HEADER;
/*		*/



/* Add Foreign Keys to tables */
ALTER TABLE version_groups
ADD FOREIGN KEY (generation_id) REFERENCES generations (id);

ALTER TABLE versions
ADD FOREIGN KEY (version_group_id) REFERENCES version_groups (id);

ALTER TABLE locations
ADD FOREIGN KEY (region_id) REFERENCES regions (id);

ALTER TABLE location_areas
ADD FOREIGN KEY (location_id) REFERENCES locations (id);

ALTER TABLE location_area_encounter_rates
ADD FOREIGN KEY (location_area_id) REFERENCES location_areas (id),
ADD FOREIGN KEY (encounter_method_id) REFERENCES encounter_methods (id),
ADD FOREIGN KEY (version_id) REFERENCES versions (id);

ALTER TABLE abilities
ADD FOREIGN KEY (generation_id) REFERENCES generations (id);

ALTER TABLE ability_flavor_text
ADD FOREIGN KEY (ability_id) REFERENCES abilities (id),
ADD FOREIGN KEY (version_group_id) REFERENCES version_groups (id);

ALTER TABLE encounters
ADD FOREIGN KEY (version_id) REFERENCES versions (id),
ADD FOREIGN KEY (location_area_id) REFERENCES location_areas (id),
ADD FOREIGN KEY (encounter_slot_id) REFERENCES encounter_slots (id),
ADD FOREIGN KEY (pokemon_id) REFERENCES pokemon (id);

ALTER TABLE encounter_slots
ADD FOREIGN KEY (version_group_id) REFERENCES version_groups (id),
ADD FOREIGN KEY (encounter_method_id) REFERENCES encounter_methods (id);

ALTER TABLE encounter_condition_value_map
ADD FOREIGN KEY (encounter_id) REFERENCES encounters (id),
ADD FOREIGN KEY (encounter_condition_value_id) REFERENCES encounter_condition_values (id);

ALTER TABLE evolution_chains
ADD FOREIGN KEY (baby_trigger_item_id) REFERENCES items (id);

ALTER TABLE experience
ADD FOREIGN KEY (growth_rate_id) REFERENCES growth_rates (id);

ALTER TABLE items
ADD FOREIGN KEY (category_id) REFERENCES item_categories (id);

ALTER TABLE item_categories
ADD FOREIGN KEY (pocket_id) REFERENCES item_pockets (id);

ALTER TABLE machines
ADD FOREIGN KEY (version_group_id) REFERENCES version_groups (id),
ADD FOREIGN KEY (item_id) REFERENCES items (id),
ADD FOREIGN KEY (move_id) REFERENCES moves (id);

ALTER TABLE moves
ADD FOREIGN KEY (generation_id) REFERENCES generations (id),
ADD FOREIGN KEY ("type_id") REFERENCES types (id),
ADD FOREIGN KEY (target_id) REFERENCES move_targets (id),
ADD FOREIGN KEY (damage_class_id) REFERENCES move_damage_classes (id),
ADD FOREIGN KEY (effect_id) REFERENCES move_effects (id);

ALTER TABLE move_flavor_text
ADD FOREIGN KEY (move_id) REFERENCES moves (id),
ADD FOREIGN KEY (version_group_id) REFERENCES version_groups (id);

ALTER TABLE natures
ADD FOREIGN KEY (decreased_stat_id) REFERENCES stats (id),
ADD FOREIGN KEY (increased_stat_id) REFERENCES stats (id);

ALTER TABLE pokemon
ADD FOREIGN KEY (species_id) REFERENCES pokemon_species (id);

ALTER TABLE pokemon_abilities
ADD FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
ADD FOREIGN KEY (ability_id) REFERENCES abilities (id);

ALTER TABLE pokemon_egg_groups
ADD FOREIGN KEY (species_id) REFERENCES pokemon_species (id),
ADD FOREIGN KEY (egg_group_id) REFERENCES egg_groups (id);

ALTER TABLE pokemon_evolution
ADD FOREIGN KEY (evolved_species_id) REFERENCES pokemon_species (id),
ADD FOREIGN KEY (evolution_trigger_id) REFERENCES evolution_triggers (id),
ADD FOREIGN KEY (trigger_item_id) REFERENCES items (id),
ADD FOREIGN KEY (gender_id) REFERENCES genders (id),
ADD FOREIGN KEY (location_id) REFERENCES locations (id),
ADD FOREIGN KEY (held_item_id) REFERENCES items (id),
ADD FOREIGN KEY (known_move_id) REFERENCES moves (id),
ADD FOREIGN KEY (known_move_type_id) REFERENCES types (id),
ADD FOREIGN KEY (party_species_id) REFERENCES pokemon_species (id),
ADD FOREIGN KEY (party_type_id) REFERENCES types (id),
ADD FOREIGN KEY (trade_species_id) REFERENCES pokemon_species (id);

ALTER TABLE pokemon_items
ADD FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
ADD FOREIGN KEY (version_id) REFERENCES versions (id),
ADD FOREIGN KEY (item_id) REFERENCES items (id);

ALTER TABLE pokemon_moves
ADD FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
ADD FOREIGN KEY (version_group_id) REFERENCES version_groups (id),
ADD FOREIGN KEY (move_id) REFERENCES moves (id),
ADD FOREIGN KEY (pokemon_move_method_id) REFERENCES pokemon_move_methods (id);

ALTER TABLE pokemon_species
ADD FOREIGN KEY (generation_id) REFERENCES generations (id),
ADD FOREIGN KEY (evolves_from_species_id) REFERENCES pokemon_species (id),
ADD FOREIGN KEY (evolution_chain_id) REFERENCES evolution_chains (id),
ADD FOREIGN KEY (shape_id) REFERENCES pokemon_shapes (id),
ADD FOREIGN KEY (growth_rate_id) REFERENCES growth_rates (id);

ALTER TABLE pokemon_species_flavor_text
ADD FOREIGN KEY (species_id) REFERENCES pokemon_species (id),
ADD FOREIGN KEY (version_id) REFERENCES versions (id);

ALTER TABLE pokemon_stats
ADD FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
ADD FOREIGN KEY (stat_id) REFERENCES stats (id);

ALTER TABLE pokemon_types
ADD FOREIGN KEY (pokemon_id) REFERENCES pokemon (id),
ADD FOREIGN KEY ("type_id") REFERENCES types (id);

ALTER TABLE stats
ADD FOREIGN KEY (damage_class_id) REFERENCES move_damage_classes (id);

ALTER TABLE type_efficacy
ADD FOREIGN KEY (damage_type_id) REFERENCES types (id),
ADD FOREIGN KEY (target_type_id) REFERENCES types (id);

ALTER TABLE types
ADD FOREIGN KEY (generation_id) REFERENCES generations (id),
ADD FOREIGN KEY (damage_class_id) REFERENCES move_damage_classes (id);
/*		*/