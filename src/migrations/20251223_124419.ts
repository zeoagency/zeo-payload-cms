import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`first_name\` text NOT NULL,
  	\`last_name\` text NOT NULL,
  	\`nickname\` text,
  	\`job_position\` text,
  	\`short_description\` text,
  	\`bio\` text,
  	\`profile_image_id\` integer,
  	\`social_links_twitter\` text,
  	\`social_links_linkedin\` text,
  	\`social_links_github\` text,
  	\`social_links_website\` text,
  	\`linkedin_link\` text,
  	\`twitter_link\` text,
  	\`order_number\` numeric,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text,
  	FOREIGN KEY (\`profile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`users_nickname_idx\` ON \`users\` (\`nickname\`);`)
  await db.run(sql`CREATE INDEX \`users_profile_image_idx\` ON \`users\` (\`profile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`users_dato_id_idx\` ON \`users\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`menus_items_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text,
  	\`external\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`menus_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`menus_items_children_order_idx\` ON \`menus_items_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`menus_items_children_parent_id_idx\` ON \`menus_items_children\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`menus_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text,
  	\`external\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`menus\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`menus_items_order_idx\` ON \`menus_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`menus_items_parent_id_idx\` ON \`menus_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`menus\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`menus_slug_idx\` ON \`menus\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`menus_dato_id_idx\` ON \`menus\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`menus_updated_at_idx\` ON \`menus\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`menus_created_at_idx\` ON \`menus\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`phone_number\` text,
  	\`image_id\` integer,
  	\`image_mobile_id\` integer,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`image_asset_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_image_idx\` ON \`pages_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_image_mobile_idx\` ON \`pages_blocks_hero\` (\`image_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_image_asset_idx\` ON \`pages_blocks_hero\` (\`image_asset_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_dato_id_idx\` ON \`pages\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`phone_number\` text,
  	\`image_id\` integer,
  	\`image_mobile_id\` integer,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`image_asset_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_image_idx\` ON \`_pages_v_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_image_mobile_idx\` ON \`_pages_v_blocks_hero\` (\`image_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_image_asset_idx\` ON \`_pages_v_blocks_hero\` (\`image_asset_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_dato_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_dato_id_idx\` ON \`_pages_v\` (\`version_dato_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to\` text NOT NULL,
  	\`type\` text DEFAULT 'permanent' NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`priority\` numeric DEFAULT 0,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`articles_table_of_contents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`section_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_table_of_contents_order_idx\` ON \`articles_table_of_contents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`articles_table_of_contents_parent_id_idx\` ON \`articles_table_of_contents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`articles_ratings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`user_id\` text,
  	\`rating\` numeric,
  	\`created_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_ratings_order_idx\` ON \`articles_ratings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`articles_ratings_parent_id_idx\` ON \`articles_ratings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`description_small\` text,
  	\`content\` text,
  	\`image_id\` integer,
  	\`author_id\` integer,
  	\`category_id\` integer,
  	\`published_at\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`dato_id\` text,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`publish_at\` text,
  	\`average_rating\` numeric,
  	\`total_ratings\` numeric,
  	\`views\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`articles_slug_idx\` ON \`articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`articles_image_idx\` ON \`articles\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_author_idx\` ON \`articles\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_category_idx\` ON \`articles\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_published_at_idx\` ON \`articles\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_meta_image_idx\` ON \`articles\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_dato_id_idx\` ON \`articles\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_updated_at_idx\` ON \`articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`articles_created_at_idx\` ON \`articles\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`articles__status_idx\` ON \`articles\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`articles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`articles_rels_order_idx\` ON \`articles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_parent_idx\` ON \`articles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_path_idx\` ON \`articles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_tags_id_idx\` ON \`articles_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`articles_rels_articles_id_idx\` ON \`articles_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_version_table_of_contents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`section_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_version_table_of_contents_order_idx\` ON \`_articles_v_version_table_of_contents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_table_of_contents_parent_id_idx\` ON \`_articles_v_version_table_of_contents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_version_ratings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` text,
  	\`rating\` numeric,
  	\`created_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_version_ratings_order_idx\` ON \`_articles_v_version_ratings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_ratings_parent_id_idx\` ON \`_articles_v_version_ratings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_description_small\` text,
  	\`version_content\` text,
  	\`version_image_id\` integer,
  	\`version_author_id\` integer,
  	\`version_category_id\` integer,
  	\`version_published_at\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_dato_id\` text,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_publish_at\` text,
  	\`version_average_rating\` numeric,
  	\`version_total_ratings\` numeric,
  	\`version_views\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_parent_idx\` ON \`_articles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_slug_idx\` ON \`_articles_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_image_idx\` ON \`_articles_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_author_idx\` ON \`_articles_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_category_idx\` ON \`_articles_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_published_at_idx\` ON \`_articles_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_meta_image_idx\` ON \`_articles_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_dato_id_idx\` ON \`_articles_v\` (\`version_dato_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_updated_at_idx\` ON \`_articles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version_created_at_idx\` ON \`_articles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_version_version__status_idx\` ON \`_articles_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_created_at_idx\` ON \`_articles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_updated_at_idx\` ON \`_articles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_latest_idx\` ON \`_articles_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_articles_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	\`articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_order_idx\` ON \`_articles_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_parent_idx\` ON \`_articles_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_path_idx\` ON \`_articles_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_tags_id_idx\` ON \`_articles_v_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`_articles_v_rels_articles_id_idx\` ON \`_articles_v_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE TABLE \`guides_table_of_contents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`section_id\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`guides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`guides_table_of_contents_order_idx\` ON \`guides_table_of_contents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`guides_table_of_contents_parent_id_idx\` ON \`guides_table_of_contents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`guides\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`description_small\` text,
  	\`content\` text,
  	\`image_id\` integer,
  	\`author_id\` integer,
  	\`category_id\` integer,
  	\`published_at\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`dato_id\` text,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`publish_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`guides_slug_idx\` ON \`guides\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`guides_image_idx\` ON \`guides\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`guides_author_idx\` ON \`guides\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`guides_category_idx\` ON \`guides\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`guides_published_at_idx\` ON \`guides\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`guides_dato_id_idx\` ON \`guides\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`guides_updated_at_idx\` ON \`guides\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`guides_created_at_idx\` ON \`guides\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`guides__status_idx\` ON \`guides\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`guides_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`guides\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`guides_rels_order_idx\` ON \`guides_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`guides_rels_parent_idx\` ON \`guides_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`guides_rels_path_idx\` ON \`guides_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`guides_rels_tags_id_idx\` ON \`guides_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`_guides_v_version_table_of_contents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`section_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_guides_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_guides_v_version_table_of_contents_order_idx\` ON \`_guides_v_version_table_of_contents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_table_of_contents_parent_id_idx\` ON \`_guides_v_version_table_of_contents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_guides_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_description_small\` text,
  	\`version_content\` text,
  	\`version_image_id\` integer,
  	\`version_author_id\` integer,
  	\`version_category_id\` integer,
  	\`version_published_at\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_dato_id\` text,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_publish_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`guides\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_guides_v_parent_idx\` ON \`_guides_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_slug_idx\` ON \`_guides_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_image_idx\` ON \`_guides_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_author_idx\` ON \`_guides_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_category_idx\` ON \`_guides_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_published_at_idx\` ON \`_guides_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_dato_id_idx\` ON \`_guides_v\` (\`version_dato_id\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_updated_at_idx\` ON \`_guides_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version_created_at_idx\` ON \`_guides_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_version_version__status_idx\` ON \`_guides_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_created_at_idx\` ON \`_guides_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_updated_at_idx\` ON \`_guides_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_latest_idx\` ON \`_guides_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_guides_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_guides_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_guides_v_rels_order_idx\` ON \`_guides_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_rels_parent_idx\` ON \`_guides_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_rels_path_idx\` ON \`_guides_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_guides_v_rels_tags_id_idx\` ON \`_guides_v_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`books\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`publisher\` text,
  	\`publish_year\` numeric,
  	\`description\` text,
  	\`cover_title_first\` text,
  	\`cover_title_second\` text,
  	\`cover_description\` text,
  	\`image_id\` integer NOT NULL,
  	\`purchase_url\` text,
  	\`file_id\` integer,
  	\`autopilotapp_contact_list_id\` text,
  	\`category_id\` integer,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`books_slug_idx\` ON \`books\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`books_image_idx\` ON \`books\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`books_file_idx\` ON \`books\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`books_category_idx\` ON \`books\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`books_dato_id_idx\` ON \`books\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`books_updated_at_idx\` ON \`books\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`books_created_at_idx\` ON \`books\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`videos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`description_small\` text,
  	\`description\` text,
  	\`video_id\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`duration\` text,
  	\`author_id\` integer,
  	\`category_id\` integer,
  	\`published_at\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`dato_id\` text,
  	\`workflow_status\` text DEFAULT 'draft',
  	\`publish_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`videos_slug_idx\` ON \`videos\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`videos_thumbnail_idx\` ON \`videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_author_idx\` ON \`videos\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_category_idx\` ON \`videos\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_published_at_idx\` ON \`videos\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_dato_id_idx\` ON \`videos\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_updated_at_idx\` ON \`videos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`videos_created_at_idx\` ON \`videos\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`videos__status_idx\` ON \`videos\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`videos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`videos_rels_order_idx\` ON \`videos_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`videos_rels_parent_idx\` ON \`videos_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`videos_rels_path_idx\` ON \`videos_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`videos_rels_tags_id_idx\` ON \`videos_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`_videos_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_description_small\` text,
  	\`version_description\` text,
  	\`version_video_id\` text,
  	\`version_video_url\` text,
  	\`version_thumbnail_id\` integer,
  	\`version_duration\` text,
  	\`version_author_id\` integer,
  	\`version_category_id\` integer,
  	\`version_published_at\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_dato_id\` text,
  	\`version_workflow_status\` text DEFAULT 'draft',
  	\`version_publish_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_videos_v_parent_idx\` ON \`_videos_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_slug_idx\` ON \`_videos_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_thumbnail_idx\` ON \`_videos_v\` (\`version_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_author_idx\` ON \`_videos_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_category_idx\` ON \`_videos_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_published_at_idx\` ON \`_videos_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_dato_id_idx\` ON \`_videos_v\` (\`version_dato_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_updated_at_idx\` ON \`_videos_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version_created_at_idx\` ON \`_videos_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_version_version__status_idx\` ON \`_videos_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_created_at_idx\` ON \`_videos_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_updated_at_idx\` ON \`_videos_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_latest_idx\` ON \`_videos_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_videos_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_videos_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_videos_v_rels_order_idx\` ON \`_videos_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_rels_parent_idx\` ON \`_videos_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_rels_path_idx\` ON \`_videos_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_videos_v_rels_tags_id_idx\` ON \`_videos_v_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`podcasts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`audio_url\` text,
  	\`image_id\` integer,
  	\`published_at\` text,
  	\`duration\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`podcasts_slug_idx\` ON \`podcasts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_image_idx\` ON \`podcasts\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_published_at_idx\` ON \`podcasts\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_seo_seo_image_idx\` ON \`podcasts\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_dato_id_idx\` ON \`podcasts\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_updated_at_idx\` ON \`podcasts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_created_at_idx\` ON \`podcasts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`phone_number\` text,
  	\`image_id\` integer,
  	\`image_mobile_id\` integer,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`image_asset_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_order_idx\` ON \`services_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_parent_id_idx\` ON \`services_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_path_idx\` ON \`services_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_image_idx\` ON \`services_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_image_mobile_idx\` ON \`services_blocks_hero\` (\`image_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_hero_image_asset_idx\` ON \`services_blocks_hero\` (\`image_asset_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_first\` text,
  	\`title_second\` text,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`image_id\` integer,
  	\`url\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_services_items_order_idx\` ON \`services_blocks_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_items_parent_id_idx\` ON \`services_blocks_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_items_icon_idx\` ON \`services_blocks_services_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_items_image_idx\` ON \`services_blocks_services_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`right_title\` text,
  	\`right_link_text\` text,
  	\`right_link_url\` text,
  	\`side_title_first\` text,
  	\`side_title_second\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_services_order_idx\` ON \`services_blocks_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_parent_id_idx\` ON \`services_blocks_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_services_path_idx\` ON \`services_blocks_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_what_we_do\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`right_title_small\` text,
  	\`right_title_big\` text,
  	\`right_description\` text,
  	\`left_title_small\` text,
  	\`left_title_big\` text,
  	\`left_description\` text,
  	\`standalone_image_id\` integer,
  	\`section3_title_small\` text,
  	\`section3_title_big\` text,
  	\`section3_description_small\` text,
  	\`section3_description\` text,
  	\`section3_image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`standalone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_what_we_do_order_idx\` ON \`services_blocks_what_we_do\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_what_we_do_parent_id_idx\` ON \`services_blocks_what_we_do\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_what_we_do_path_idx\` ON \`services_blocks_what_we_do\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_what_we_do_standalone_image_idx\` ON \`services_blocks_what_we_do\` (\`standalone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_what_we_do_section3_image_idx\` ON \`services_blocks_what_we_do\` (\`section3_image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_process_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` numeric,
  	\`title\` text,
  	\`summary\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`url\` text,
  	\`url_text\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_process_items_order_idx\` ON \`services_blocks_process_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_process_items_parent_id_idx\` ON \`services_blocks_process_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_process_items_image_idx\` ON \`services_blocks_process_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_process_order_idx\` ON \`services_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_process_parent_id_idx\` ON \`services_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_process_path_idx\` ON \`services_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`job_title\` text,
  	\`sentence\` text,
  	\`profile_image_id\` integer,
  	\`contact_url\` text,
  	\`quote\` text,
  	\`quote2\` text,
  	\`author\` text,
  	\`company\` text,
  	\`image_id\` integer,
  	\`company_logo_id\` integer,
  	FOREIGN KEY (\`profile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_order_idx\` ON \`services_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_parent_id_idx\` ON \`services_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_profile_image_idx\` ON \`services_blocks_testimonials_items\` (\`profile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_image_idx\` ON \`services_blocks_testimonials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_items_company_logo_idx\` ON \`services_blocks_testimonials_items\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display\` integer DEFAULT true,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`title_small_description\` text,
  	\`display_all_references_link\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_order_idx\` ON \`services_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_parent_id_idx\` ON \`services_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_testimonials_path_idx\` ON \`services_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stories_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`case_study_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_items_order_idx\` ON \`services_blocks_stories_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_items_parent_id_idx\` ON \`services_blocks_stories_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_items_image_idx\` ON \`services_blocks_stories_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_items_case_study_idx\` ON \`services_blocks_stories_items\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stories_reference_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_stories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_reference_logos_order_idx\` ON \`services_blocks_stories_reference_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_reference_logos_parent_id_idx\` ON \`services_blocks_stories_reference_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_reference_logos_logo_idx\` ON \`services_blocks_stories_reference_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_stories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_order_idx\` ON \`services_blocks_stories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_parent_id_idx\` ON \`services_blocks_stories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_stories_path_idx\` ON \`services_blocks_stories\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_order_idx\` ON \`services_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_items_parent_id_idx\` ON \`services_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_order_idx\` ON \`services_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_parent_id_idx\` ON \`services_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_faq_path_idx\` ON \`services_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_about_zeo_attended_conferences_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_about_zeo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_attended_conferences_links_order_idx\` ON \`services_blocks_about_zeo_attended_conferences_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_attended_conferences_links_parent_id_idx\` ON \`services_blocks_about_zeo_attended_conferences_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_attended_conferences_links_ima_idx\` ON \`services_blocks_about_zeo_attended_conferences_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_about_zeo_tools_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_about_zeo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_tools_links_order_idx\` ON \`services_blocks_about_zeo_tools_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_tools_links_parent_id_idx\` ON \`services_blocks_about_zeo_tools_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_tools_links_image_idx\` ON \`services_blocks_about_zeo_tools_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_about_zeo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`sub_section1_title_small\` text,
  	\`sub_section1_title_big\` text,
  	\`sub_section1_description\` text,
  	\`sub_section1_image_id\` integer,
  	\`sub_section1_logo1_id\` integer,
  	\`sub_section1_logo2_id\` integer,
  	\`sub_section2_title_small\` text,
  	\`sub_section2_title_big\` text,
  	\`sub_section2_description\` text,
  	\`sub_section2_image_id\` integer,
  	\`sub_section2_logo1_id\` integer,
  	\`sub_section3_title_small\` text,
  	\`sub_section3_title_big\` text,
  	\`sub_section3_description\` text,
  	\`sub_section3_image_id\` integer,
  	\`sub_section3_logo1_id\` integer,
  	\`sub_section3_logo2_id\` integer,
  	\`attended_conferences_title_line1\` text,
  	\`attended_conferences_title_line2\` text,
  	\`attended_conferences_title_line3\` text,
  	\`tools_title_line1\` text,
  	\`tools_title_line2\` text,
  	\`tools_description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`sub_section1_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section1_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section1_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section2_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section2_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section3_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section3_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_order_idx\` ON \`services_blocks_about_zeo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_parent_id_idx\` ON \`services_blocks_about_zeo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_path_idx\` ON \`services_blocks_about_zeo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section1_sub_section1_imag_idx\` ON \`services_blocks_about_zeo\` (\`sub_section1_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section1_sub_section1_logo_idx\` ON \`services_blocks_about_zeo\` (\`sub_section1_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section1_sub_section1_lo_1_idx\` ON \`services_blocks_about_zeo\` (\`sub_section1_logo2_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section2_sub_section2_imag_idx\` ON \`services_blocks_about_zeo\` (\`sub_section2_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section2_sub_section2_logo_idx\` ON \`services_blocks_about_zeo\` (\`sub_section2_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section3_sub_section3_imag_idx\` ON \`services_blocks_about_zeo\` (\`sub_section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section3_sub_section3_logo_idx\` ON \`services_blocks_about_zeo\` (\`sub_section3_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_about_zeo_sub_section3_sub_section3_lo_1_idx\` ON \`services_blocks_about_zeo\` (\`sub_section3_logo2_id\`);`)
  await db.run(sql`CREATE TABLE \`services_sub_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_sub_services_items_order_idx\` ON \`services_sub_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_sub_services_items_parent_id_idx\` ON \`services_sub_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_sub_services_items_icon_idx\` ON \`services_sub_services_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`services_processes_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` numeric,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_processes_items_order_idx\` ON \`services_processes_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_processes_items_parent_id_idx\` ON \`services_processes_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_stories_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`case_study_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_stories_items_order_idx\` ON \`services_stories_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_stories_items_parent_id_idx\` ON \`services_stories_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_stories_items_image_idx\` ON \`services_stories_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_stories_items_case_study_idx\` ON \`services_stories_items\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`services_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`quote2\` text,
  	\`author\` text,
  	\`company\` text,
  	\`image_id\` integer,
  	\`company_logo_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_testimonials_order_idx\` ON \`services_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_testimonials_parent_id_idx\` ON \`services_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_testimonials_image_idx\` ON \`services_testimonials\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_testimonials_company_logo_idx\` ON \`services_testimonials\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`services_reference_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_reference_logos_order_idx\` ON \`services_reference_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_reference_logos_parent_id_idx\` ON \`services_reference_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_reference_logos_logo_idx\` ON \`services_reference_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`services_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_faq_order_idx\` ON \`services_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_faq_parent_id_idx\` ON \`services_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_about_zeo_attended_conferences_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_about_zeo_attended_conferences_links_order_idx\` ON \`services_about_zeo_attended_conferences_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_attended_conferences_links_parent_id_idx\` ON \`services_about_zeo_attended_conferences_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_attended_conferences_links_image_idx\` ON \`services_about_zeo_attended_conferences_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_about_zeo_tools_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_about_zeo_tools_links_order_idx\` ON \`services_about_zeo_tools_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_tools_links_parent_id_idx\` ON \`services_about_zeo_tools_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_tools_links_image_idx\` ON \`services_about_zeo_tools_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`hero_title_small\` text,
  	\`hero_title_big\` text,
  	\`hero_description\` text,
  	\`hero_image_id\` integer,
  	\`hero_image_asset_id\` integer,
  	\`sub_services_title_small\` text,
  	\`sub_services_title_big\` text,
  	\`sub_services_description\` text,
  	\`sub_services_side_title_first\` text,
  	\`sub_services_side_title_second\` text,
  	\`what_title\` text,
  	\`what_description\` text,
  	\`what_right_title_small\` text,
  	\`what_right_title_big\` text,
  	\`what_right_description\` text,
  	\`what_left_title_small\` text,
  	\`what_left_title_big\` text,
  	\`what_left_description\` text,
  	\`what_standalone_image_id\` integer,
  	\`what_section3_title_small\` text,
  	\`what_section3_title_big\` text,
  	\`what_section3_description_small\` text,
  	\`what_section3_description\` text,
  	\`what_section3_image_id\` integer,
  	\`standalone_image_id\` integer,
  	\`section2_right_title_small\` text,
  	\`section2_right_title_big\` text,
  	\`section2_right_description\` text,
  	\`section2_left_title_small\` text,
  	\`section2_left_title_big\` text,
  	\`section2_left_description\` text,
  	\`section3_title_small\` text,
  	\`section3_title_big\` text,
  	\`section3_description_small\` text,
  	\`section3_description\` text,
  	\`section3_image_id\` integer,
  	\`processes_title\` text,
  	\`processes_description\` text,
  	\`stories_title_small\` text,
  	\`stories_title_big\` text,
  	\`stories_description\` text,
  	\`testimonials_section_title_small\` text,
  	\`testimonials_section_title_big\` text,
  	\`testimonials_section_title_small_description\` text,
  	\`testimonials_section_display_all_references_link\` integer DEFAULT false,
  	\`faq_section_title_small\` text,
  	\`faq_section_title_big\` text,
  	\`about_zeo_title_small\` text,
  	\`about_zeo_title_big\` text,
  	\`about_zeo_description\` text,
  	\`about_zeo_sub_section1_title_small\` text,
  	\`about_zeo_sub_section1_title_big\` text,
  	\`about_zeo_sub_section1_description\` text,
  	\`about_zeo_sub_section1_image_id\` integer,
  	\`about_zeo_sub_section1_logo1_id\` integer,
  	\`about_zeo_sub_section1_logo2_id\` integer,
  	\`about_zeo_sub_section2_title_small\` text,
  	\`about_zeo_sub_section2_title_big\` text,
  	\`about_zeo_sub_section2_description\` text,
  	\`about_zeo_sub_section2_image_id\` integer,
  	\`about_zeo_sub_section2_logo1_id\` integer,
  	\`about_zeo_sub_section3_title_small\` text,
  	\`about_zeo_sub_section3_title_big\` text,
  	\`about_zeo_sub_section3_description\` text,
  	\`about_zeo_sub_section3_image_id\` integer,
  	\`about_zeo_sub_section3_logo1_id\` integer,
  	\`about_zeo_sub_section3_logo2_id\` integer,
  	\`about_zeo_attended_conferences_title_line1\` text,
  	\`about_zeo_attended_conferences_title_line2\` text,
  	\`about_zeo_attended_conferences_title_line3\` text,
  	\`about_zeo_tools_title_line1\` text,
  	\`about_zeo_tools_title_line2\` text,
  	\`about_zeo_tools_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`what_standalone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`what_section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`standalone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section1_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section1_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section1_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section2_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section2_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section3_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_zeo_sub_section3_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_hero_hero_image_idx\` ON \`services\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_hero_hero_image_asset_idx\` ON \`services\` (\`hero_image_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`services_what_what_standalone_image_idx\` ON \`services\` (\`what_standalone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_what_what_section3_image_idx\` ON \`services\` (\`what_section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_standalone_image_idx\` ON \`services\` (\`standalone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_section3_section3_image_idx\` ON \`services\` (\`section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section1_about_zeo_sub_section1_i_idx\` ON \`services\` (\`about_zeo_sub_section1_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section1_about_zeo_sub_section1_l_idx\` ON \`services\` (\`about_zeo_sub_section1_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section1_about_zeo_sub_section1_1_idx\` ON \`services\` (\`about_zeo_sub_section1_logo2_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section2_about_zeo_sub_section2_i_idx\` ON \`services\` (\`about_zeo_sub_section2_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section2_about_zeo_sub_section2_l_idx\` ON \`services\` (\`about_zeo_sub_section2_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section3_about_zeo_sub_section3_i_idx\` ON \`services\` (\`about_zeo_sub_section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section3_about_zeo_sub_section3_l_idx\` ON \`services\` (\`about_zeo_sub_section3_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`services_about_zeo_sub_section3_about_zeo_sub_section3_1_idx\` ON \`services\` (\`about_zeo_sub_section3_logo2_id\`);`)
  await db.run(sql`CREATE INDEX \`services_seo_seo_image_idx\` ON \`services\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_dato_id_idx\` ON \`services\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`services_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_rels_order_idx\` ON \`services_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_parent_idx\` ON \`services_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_path_idx\` ON \`services_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_case_studies_id_idx\` ON \`services_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`phone_number\` text,
  	\`image_id\` integer,
  	\`image_mobile_id\` integer,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`image_asset_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_order_idx\` ON \`_services_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_parent_id_idx\` ON \`_services_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_path_idx\` ON \`_services_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_image_idx\` ON \`_services_v_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_image_mobile_idx\` ON \`_services_v_blocks_hero\` (\`image_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_hero_image_asset_idx\` ON \`_services_v_blocks_hero\` (\`image_asset_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title_first\` text,
  	\`title_second\` text,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`image_id\` integer,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_items_order_idx\` ON \`_services_v_blocks_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_items_parent_id_idx\` ON \`_services_v_blocks_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_items_icon_idx\` ON \`_services_v_blocks_services_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_items_image_idx\` ON \`_services_v_blocks_services_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`right_title\` text,
  	\`right_link_text\` text,
  	\`right_link_url\` text,
  	\`side_title_first\` text,
  	\`side_title_second\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_order_idx\` ON \`_services_v_blocks_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_parent_id_idx\` ON \`_services_v_blocks_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_services_path_idx\` ON \`_services_v_blocks_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_what_we_do\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`right_title_small\` text,
  	\`right_title_big\` text,
  	\`right_description\` text,
  	\`left_title_small\` text,
  	\`left_title_big\` text,
  	\`left_description\` text,
  	\`standalone_image_id\` integer,
  	\`section3_title_small\` text,
  	\`section3_title_big\` text,
  	\`section3_description_small\` text,
  	\`section3_description\` text,
  	\`section3_image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`standalone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_what_we_do_order_idx\` ON \`_services_v_blocks_what_we_do\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_what_we_do_parent_id_idx\` ON \`_services_v_blocks_what_we_do\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_what_we_do_path_idx\` ON \`_services_v_blocks_what_we_do\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_what_we_do_standalone_image_idx\` ON \`_services_v_blocks_what_we_do\` (\`standalone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_what_we_do_section3_image_idx\` ON \`_services_v_blocks_what_we_do\` (\`section3_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_process_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`step\` numeric,
  	\`title\` text,
  	\`summary\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`url\` text,
  	\`url_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_process_items_order_idx\` ON \`_services_v_blocks_process_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_process_items_parent_id_idx\` ON \`_services_v_blocks_process_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_process_items_image_idx\` ON \`_services_v_blocks_process_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_process_order_idx\` ON \`_services_v_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_process_parent_id_idx\` ON \`_services_v_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_process_path_idx\` ON \`_services_v_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`job_title\` text,
  	\`sentence\` text,
  	\`profile_image_id\` integer,
  	\`contact_url\` text,
  	\`quote\` text,
  	\`quote2\` text,
  	\`author\` text,
  	\`company\` text,
  	\`image_id\` integer,
  	\`company_logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`profile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_order_idx\` ON \`_services_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_parent_id_idx\` ON \`_services_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_profile_image_idx\` ON \`_services_v_blocks_testimonials_items\` (\`profile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_image_idx\` ON \`_services_v_blocks_testimonials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_items_company_logo_idx\` ON \`_services_v_blocks_testimonials_items\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display\` integer DEFAULT true,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`title_small_description\` text,
  	\`display_all_references_link\` integer DEFAULT false,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_order_idx\` ON \`_services_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_parent_id_idx\` ON \`_services_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_testimonials_path_idx\` ON \`_services_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_stories_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`case_study_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_stories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_items_order_idx\` ON \`_services_v_blocks_stories_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_items_parent_id_idx\` ON \`_services_v_blocks_stories_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_items_image_idx\` ON \`_services_v_blocks_stories_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_items_case_study_idx\` ON \`_services_v_blocks_stories_items\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_stories_reference_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_stories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_reference_logos_order_idx\` ON \`_services_v_blocks_stories_reference_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_reference_logos_parent_id_idx\` ON \`_services_v_blocks_stories_reference_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_reference_logos_logo_idx\` ON \`_services_v_blocks_stories_reference_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_stories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_order_idx\` ON \`_services_v_blocks_stories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_parent_id_idx\` ON \`_services_v_blocks_stories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_stories_path_idx\` ON \`_services_v_blocks_stories\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_items_order_idx\` ON \`_services_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_items_parent_id_idx\` ON \`_services_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_order_idx\` ON \`_services_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_parent_id_idx\` ON \`_services_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_faq_path_idx\` ON \`_services_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_about_zeo_attended_conferences_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_about_zeo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_attended_conferences_links_order_idx\` ON \`_services_v_blocks_about_zeo_attended_conferences_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_attended_conferences_links_parent_id_idx\` ON \`_services_v_blocks_about_zeo_attended_conferences_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_attended_conferences_links__idx\` ON \`_services_v_blocks_about_zeo_attended_conferences_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_about_zeo_tools_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v_blocks_about_zeo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_tools_links_order_idx\` ON \`_services_v_blocks_about_zeo_tools_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_tools_links_parent_id_idx\` ON \`_services_v_blocks_about_zeo_tools_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_tools_links_image_idx\` ON \`_services_v_blocks_about_zeo_tools_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_blocks_about_zeo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`sub_section1_title_small\` text,
  	\`sub_section1_title_big\` text,
  	\`sub_section1_description\` text,
  	\`sub_section1_image_id\` integer,
  	\`sub_section1_logo1_id\` integer,
  	\`sub_section1_logo2_id\` integer,
  	\`sub_section2_title_small\` text,
  	\`sub_section2_title_big\` text,
  	\`sub_section2_description\` text,
  	\`sub_section2_image_id\` integer,
  	\`sub_section2_logo1_id\` integer,
  	\`sub_section3_title_small\` text,
  	\`sub_section3_title_big\` text,
  	\`sub_section3_description\` text,
  	\`sub_section3_image_id\` integer,
  	\`sub_section3_logo1_id\` integer,
  	\`sub_section3_logo2_id\` integer,
  	\`attended_conferences_title_line1\` text,
  	\`attended_conferences_title_line2\` text,
  	\`attended_conferences_title_line3\` text,
  	\`tools_title_line1\` text,
  	\`tools_title_line2\` text,
  	\`tools_description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`sub_section1_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section1_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section1_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section2_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section2_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section3_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sub_section3_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_order_idx\` ON \`_services_v_blocks_about_zeo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_parent_id_idx\` ON \`_services_v_blocks_about_zeo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_path_idx\` ON \`_services_v_blocks_about_zeo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section1_sub_section1_i_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section1_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section1_sub_section1_l_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section1_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section1_sub_section1_1_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section1_logo2_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section2_sub_section2_i_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section2_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section2_sub_section2_l_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section2_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section3_sub_section3_i_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section3_sub_section3_l_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section3_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_blocks_about_zeo_sub_section3_sub_section3_1_idx\` ON \`_services_v_blocks_about_zeo\` (\`sub_section3_logo2_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_sub_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_sub_services_items_order_idx\` ON \`_services_v_version_sub_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_sub_services_items_parent_id_idx\` ON \`_services_v_version_sub_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_sub_services_items_icon_idx\` ON \`_services_v_version_sub_services_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_processes_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`step\` numeric,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_processes_items_order_idx\` ON \`_services_v_version_processes_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_processes_items_parent_id_idx\` ON \`_services_v_version_processes_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_stories_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`case_study_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`case_study_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_stories_items_order_idx\` ON \`_services_v_version_stories_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_stories_items_parent_id_idx\` ON \`_services_v_version_stories_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_stories_items_image_idx\` ON \`_services_v_version_stories_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_stories_items_case_study_idx\` ON \`_services_v_version_stories_items\` (\`case_study_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`quote2\` text,
  	\`author\` text,
  	\`company\` text,
  	\`image_id\` integer,
  	\`company_logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_testimonials_order_idx\` ON \`_services_v_version_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_testimonials_parent_id_idx\` ON \`_services_v_version_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_testimonials_image_idx\` ON \`_services_v_version_testimonials\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_testimonials_company_logo_idx\` ON \`_services_v_version_testimonials\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_reference_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_reference_logos_order_idx\` ON \`_services_v_version_reference_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_reference_logos_parent_id_idx\` ON \`_services_v_version_reference_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_reference_logos_logo_idx\` ON \`_services_v_version_reference_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_order_idx\` ON \`_services_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_parent_id_idx\` ON \`_services_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_about_zeo_attended_conferences_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_attended_conferences_links_order_idx\` ON \`_services_v_version_about_zeo_attended_conferences_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_attended_conferences_links_parent_id_idx\` ON \`_services_v_version_about_zeo_attended_conferences_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_attended_conferences_links_idx\` ON \`_services_v_version_about_zeo_attended_conferences_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_about_zeo_tools_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_tools_links_order_idx\` ON \`_services_v_version_about_zeo_tools_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_tools_links_parent_id_idx\` ON \`_services_v_version_about_zeo_tools_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_tools_links_image_idx\` ON \`_services_v_version_about_zeo_tools_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_hero_title_small\` text,
  	\`version_hero_title_big\` text,
  	\`version_hero_description\` text,
  	\`version_hero_image_id\` integer,
  	\`version_hero_image_asset_id\` integer,
  	\`version_sub_services_title_small\` text,
  	\`version_sub_services_title_big\` text,
  	\`version_sub_services_description\` text,
  	\`version_sub_services_side_title_first\` text,
  	\`version_sub_services_side_title_second\` text,
  	\`version_what_title\` text,
  	\`version_what_description\` text,
  	\`version_what_right_title_small\` text,
  	\`version_what_right_title_big\` text,
  	\`version_what_right_description\` text,
  	\`version_what_left_title_small\` text,
  	\`version_what_left_title_big\` text,
  	\`version_what_left_description\` text,
  	\`version_what_standalone_image_id\` integer,
  	\`version_what_section3_title_small\` text,
  	\`version_what_section3_title_big\` text,
  	\`version_what_section3_description_small\` text,
  	\`version_what_section3_description\` text,
  	\`version_what_section3_image_id\` integer,
  	\`version_standalone_image_id\` integer,
  	\`version_section2_right_title_small\` text,
  	\`version_section2_right_title_big\` text,
  	\`version_section2_right_description\` text,
  	\`version_section2_left_title_small\` text,
  	\`version_section2_left_title_big\` text,
  	\`version_section2_left_description\` text,
  	\`version_section3_title_small\` text,
  	\`version_section3_title_big\` text,
  	\`version_section3_description_small\` text,
  	\`version_section3_description\` text,
  	\`version_section3_image_id\` integer,
  	\`version_processes_title\` text,
  	\`version_processes_description\` text,
  	\`version_stories_title_small\` text,
  	\`version_stories_title_big\` text,
  	\`version_stories_description\` text,
  	\`version_testimonials_section_title_small\` text,
  	\`version_testimonials_section_title_big\` text,
  	\`version_testimonials_section_title_small_description\` text,
  	\`version_testimonials_section_display_all_references_link\` integer DEFAULT false,
  	\`version_faq_section_title_small\` text,
  	\`version_faq_section_title_big\` text,
  	\`version_about_zeo_title_small\` text,
  	\`version_about_zeo_title_big\` text,
  	\`version_about_zeo_description\` text,
  	\`version_about_zeo_sub_section1_title_small\` text,
  	\`version_about_zeo_sub_section1_title_big\` text,
  	\`version_about_zeo_sub_section1_description\` text,
  	\`version_about_zeo_sub_section1_image_id\` integer,
  	\`version_about_zeo_sub_section1_logo1_id\` integer,
  	\`version_about_zeo_sub_section1_logo2_id\` integer,
  	\`version_about_zeo_sub_section2_title_small\` text,
  	\`version_about_zeo_sub_section2_title_big\` text,
  	\`version_about_zeo_sub_section2_description\` text,
  	\`version_about_zeo_sub_section2_image_id\` integer,
  	\`version_about_zeo_sub_section2_logo1_id\` integer,
  	\`version_about_zeo_sub_section3_title_small\` text,
  	\`version_about_zeo_sub_section3_title_big\` text,
  	\`version_about_zeo_sub_section3_description\` text,
  	\`version_about_zeo_sub_section3_image_id\` integer,
  	\`version_about_zeo_sub_section3_logo1_id\` integer,
  	\`version_about_zeo_sub_section3_logo2_id\` integer,
  	\`version_about_zeo_attended_conferences_title_line1\` text,
  	\`version_about_zeo_attended_conferences_title_line2\` text,
  	\`version_about_zeo_attended_conferences_title_line3\` text,
  	\`version_about_zeo_tools_title_line1\` text,
  	\`version_about_zeo_tools_title_line2\` text,
  	\`version_about_zeo_tools_description\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_dato_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_what_standalone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_what_section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_standalone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section1_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section1_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section1_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section2_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section2_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section3_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section3_logo1_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_zeo_sub_section3_logo2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_hero_version_hero_image_idx\` ON \`_services_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_hero_version_hero_image_asset_idx\` ON \`_services_v\` (\`version_hero_image_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_what_version_what_standalone_image_idx\` ON \`_services_v\` (\`version_what_standalone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_what_version_what_section3_image_idx\` ON \`_services_v\` (\`version_what_section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_standalone_image_idx\` ON \`_services_v\` (\`version_standalone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_section3_version_section3_image_idx\` ON \`_services_v\` (\`version_section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section1_version_about_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section1_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section1_version_abo_1_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section1_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section1_version_abo_2_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section1_logo2_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section2_version_about_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section2_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section2_version_abo_1_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section2_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section3_version_about_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section3_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section3_version_abo_1_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section3_logo1_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_about_zeo_sub_section3_version_abo_2_idx\` ON \`_services_v\` (\`version_about_zeo_sub_section3_logo2_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_seo_version_seo_image_idx\` ON \`_services_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_dato_id_idx\` ON \`_services_v\` (\`version_dato_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_rels_order_idx\` ON \`_services_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_parent_idx\` ON \`_services_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_path_idx\` ON \`_services_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_rels_case_studies_id_idx\` ON \`_services_v_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_metrics_order_idx\` ON \`case_studies_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_metrics_parent_id_idx\` ON \`case_studies_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`description\` text,
  	\`summary\` text,
  	\`client_id\` integer,
  	\`challenge\` text,
  	\`solution\` text,
  	\`results\` text,
  	\`content\` text,
  	\`image_id\` integer,
  	\`logo_id\` integer,
  	\`category_id\` integer,
  	\`testimonial_quote\` text,
  	\`testimonial_author\` text,
  	\`testimonial_position\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`client_id\`) REFERENCES \`customer_references\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_client_idx\` ON \`case_studies\` (\`client_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_image_idx\` ON \`case_studies\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_logo_idx\` ON \`case_studies\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_category_idx\` ON \`case_studies\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_seo_seo_image_idx\` ON \`case_studies\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_dato_id_idx\` ON \`case_studies\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies__status_idx\` ON \`case_studies\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_case_studies_id_idx\` ON \`case_studies_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_version_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_metrics_order_idx\` ON \`_case_studies_v_version_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_metrics_parent_id_idx\` ON \`_case_studies_v_version_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_description\` text,
  	\`version_summary\` text,
  	\`version_client_id\` integer,
  	\`version_challenge\` text,
  	\`version_solution\` text,
  	\`version_results\` text,
  	\`version_content\` text,
  	\`version_image_id\` integer,
  	\`version_logo_id\` integer,
  	\`version_category_id\` integer,
  	\`version_testimonial_quote\` text,
  	\`version_testimonial_author\` text,
  	\`version_testimonial_position\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_dato_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_client_id\`) REFERENCES \`customer_references\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_parent_idx\` ON \`_case_studies_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_slug_idx\` ON \`_case_studies_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_client_idx\` ON \`_case_studies_v\` (\`version_client_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_image_idx\` ON \`_case_studies_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_logo_idx\` ON \`_case_studies_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_category_idx\` ON \`_case_studies_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_seo_version_seo_image_idx\` ON \`_case_studies_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_dato_id_idx\` ON \`_case_studies_v\` (\`version_dato_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_updated_at_idx\` ON \`_case_studies_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_created_at_idx\` ON \`_case_studies_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version__status_idx\` ON \`_case_studies_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_created_at_idx\` ON \`_case_studies_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_updated_at_idx\` ON \`_case_studies_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_latest_idx\` ON \`_case_studies_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_order_idx\` ON \`_case_studies_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_parent_idx\` ON \`_case_studies_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_path_idx\` ON \`_case_studies_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_case_studies_id_idx\` ON \`_case_studies_v_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE TABLE \`static_articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`content\` text,
  	\`image_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`static_articles_slug_idx\` ON \`static_articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`static_articles_image_idx\` ON \`static_articles\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`static_articles_seo_seo_image_idx\` ON \`static_articles\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`static_articles_dato_id_idx\` ON \`static_articles\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`static_articles_updated_at_idx\` ON \`static_articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`static_articles_created_at_idx\` ON \`static_articles\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`static_articles__status_idx\` ON \`static_articles\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_static_articles_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_content\` text,
  	\`version_image_id\` integer,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_dato_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`static_articles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_static_articles_v_parent_idx\` ON \`_static_articles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_version_version_slug_idx\` ON \`_static_articles_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_version_version_image_idx\` ON \`_static_articles_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_version_seo_version_seo_image_idx\` ON \`_static_articles_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_version_version_dato_id_idx\` ON \`_static_articles_v\` (\`version_dato_id\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_version_version_updated_at_idx\` ON \`_static_articles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_version_version_created_at_idx\` ON \`_static_articles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_version_version__status_idx\` ON \`_static_articles_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_created_at_idx\` ON \`_static_articles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_updated_at_idx\` ON \`_static_articles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_static_articles_v_latest_idx\` ON \`_static_articles_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`seo_dictionary_terms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`teaser\` text,
  	\`definition\` text,
  	\`category_id\` integer,
  	\`authority_links\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`seo_dictionary_terms_slug_idx\` ON \`seo_dictionary_terms\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_category_idx\` ON \`seo_dictionary_terms\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_seo_seo_image_idx\` ON \`seo_dictionary_terms\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_dato_id_idx\` ON \`seo_dictionary_terms\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_updated_at_idx\` ON \`seo_dictionary_terms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_created_at_idx\` ON \`seo_dictionary_terms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`seo_dictionary_terms_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`seo_dictionary_terms_id\` integer,
  	\`articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`seo_dictionary_terms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`seo_dictionary_terms_id\`) REFERENCES \`seo_dictionary_terms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_rels_order_idx\` ON \`seo_dictionary_terms_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_rels_parent_idx\` ON \`seo_dictionary_terms_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_rels_path_idx\` ON \`seo_dictionary_terms_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_rels_seo_dictionary_terms_id_idx\` ON \`seo_dictionary_terms_rels\` (\`seo_dictionary_terms_id\`);`)
  await db.run(sql`CREATE INDEX \`seo_dictionary_terms_rels_articles_id_idx\` ON \`seo_dictionary_terms_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE TABLE \`ai_dictionary_terms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`teaser\` text,
  	\`definition\` text,
  	\`category_id\` integer,
  	\`authority_links\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ai_dictionary_terms_slug_idx\` ON \`ai_dictionary_terms\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_category_idx\` ON \`ai_dictionary_terms\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_seo_seo_image_idx\` ON \`ai_dictionary_terms\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_dato_id_idx\` ON \`ai_dictionary_terms\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_updated_at_idx\` ON \`ai_dictionary_terms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_created_at_idx\` ON \`ai_dictionary_terms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ai_dictionary_terms_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`ai_dictionary_terms_id\` integer,
  	\`articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`ai_dictionary_terms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ai_dictionary_terms_id\`) REFERENCES \`ai_dictionary_terms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_rels_order_idx\` ON \`ai_dictionary_terms_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_rels_parent_idx\` ON \`ai_dictionary_terms_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_rels_path_idx\` ON \`ai_dictionary_terms_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_rels_ai_dictionary_terms_id_idx\` ON \`ai_dictionary_terms_rels\` (\`ai_dictionary_terms_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_dictionary_terms_rels_articles_id_idx\` ON \`ai_dictionary_terms_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE TABLE \`algorithm_updates\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`description\` text,
  	\`confirmed\` integer DEFAULT false,
  	\`category_id\` integer,
  	\`image_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`algorithm_updates_slug_idx\` ON \`algorithm_updates\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`algorithm_updates_date_idx\` ON \`algorithm_updates\` (\`date\`);`)
  await db.run(sql`CREATE INDEX \`algorithm_updates_category_idx\` ON \`algorithm_updates\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`algorithm_updates_image_idx\` ON \`algorithm_updates\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`algorithm_updates_seo_seo_image_idx\` ON \`algorithm_updates\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`algorithm_updates_dato_id_idx\` ON \`algorithm_updates\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`algorithm_updates_updated_at_idx\` ON \`algorithm_updates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`algorithm_updates_created_at_idx\` ON \`algorithm_updates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`end_date\` text,
  	\`location\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`registration_url\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_slug_idx\` ON \`events\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`events_date_idx\` ON \`events\` (\`date\`);`)
  await db.run(sql`CREATE INDEX \`events_image_idx\` ON \`events\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`events_seo_seo_image_idx\` ON \`events\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`events_dato_id_idx\` ON \`events\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`events_updated_at_idx\` ON \`events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`webinars\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`description\` text,
  	\`image_id\` integer,
  	\`video_url\` text,
  	\`speaker_id\` integer,
  	\`registration_url\` text,
  	\`category_id\` integer,
  	\`start_date\` text,
  	\`end_date\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`speaker_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`webinars_slug_idx\` ON \`webinars\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`webinars_date_idx\` ON \`webinars\` (\`date\`);`)
  await db.run(sql`CREATE INDEX \`webinars_image_idx\` ON \`webinars\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`webinars_speaker_idx\` ON \`webinars\` (\`speaker_id\`);`)
  await db.run(sql`CREATE INDEX \`webinars_category_idx\` ON \`webinars\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`webinars_seo_seo_image_idx\` ON \`webinars\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`webinars_dato_id_idx\` ON \`webinars\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`webinars_updated_at_idx\` ON \`webinars\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`webinars_created_at_idx\` ON \`webinars\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`webinars_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`webinars\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`webinars_rels_order_idx\` ON \`webinars_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`webinars_rels_parent_idx\` ON \`webinars_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`webinars_rels_path_idx\` ON \`webinars_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`webinars_rels_categories_id_idx\` ON \`webinars_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`webinars_rels_users_id_idx\` ON \`webinars_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`open_positions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`department\` text,
  	\`location\` text,
  	\`description\` text,
  	\`requirements\` text,
  	\`application_url\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`open_positions_slug_idx\` ON \`open_positions\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`open_positions_seo_seo_image_idx\` ON \`open_positions\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`open_positions_dato_id_idx\` ON \`open_positions\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`open_positions_updated_at_idx\` ON \`open_positions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`open_positions_created_at_idx\` ON \`open_positions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tools\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`url\` text,
  	\`image_id\` integer,
  	\`category_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tools_image_idx\` ON \`tools\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_category_idx\` ON \`tools\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_dato_id_idx\` ON \`tools\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_updated_at_idx\` ON \`tools\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tools_created_at_idx\` ON \`tools\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`marketing_tools_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`marketing_tools\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`marketing_tools_features_order_idx\` ON \`marketing_tools_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`marketing_tools_features_parent_id_idx\` ON \`marketing_tools_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`marketing_tools\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`url\` text,
  	\`image_id\` integer,
  	\`logo_id\` integer,
  	\`category_id\` integer,
  	\`pricing\` text,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`marketing_tools_slug_idx\` ON \`marketing_tools\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`marketing_tools_image_idx\` ON \`marketing_tools\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`marketing_tools_logo_idx\` ON \`marketing_tools\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`marketing_tools_category_idx\` ON \`marketing_tools\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`marketing_tools_dato_id_idx\` ON \`marketing_tools\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`marketing_tools_updated_at_idx\` ON \`marketing_tools\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`marketing_tools_created_at_idx\` ON \`marketing_tools\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`seo_checklists_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`completed\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`seo_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`seo_checklists_items_order_idx\` ON \`seo_checklists_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`seo_checklists_items_parent_id_idx\` ON \`seo_checklists_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`seo_checklists\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`seo_checklists_slug_idx\` ON \`seo_checklists\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`seo_checklists_seo_seo_image_idx\` ON \`seo_checklists\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`seo_checklists_dato_id_idx\` ON \`seo_checklists\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`seo_checklists_updated_at_idx\` ON \`seo_checklists\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`seo_checklists_created_at_idx\` ON \`seo_checklists\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`packages_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	\`included\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_features_order_idx\` ON \`packages_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_features_parent_id_idx\` ON \`packages_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`price\` text,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`highlighted\` integer DEFAULT false,
  	\`dato_id\` text,
  	\`cover_image_id\` integer,
  	\`cover_title_first\` text NOT NULL,
  	\`cover_title_second\` text,
  	\`short_description\` text,
  	\`author_id\` integer,
  	\`autopilotapp_contact_list_id\` text,
  	\`form_has_people_count_field\` integer DEFAULT false,
  	\`form_action_text\` text,
  	\`file_id\` integer,
  	\`title2\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`packages_slug_idx\` ON \`packages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`packages_dato_id_idx\` ON \`packages\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_cover_image_idx\` ON \`packages\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_author_idx\` ON \`packages\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_file_idx\` ON \`packages\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_updated_at_idx\` ON \`packages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`packages_created_at_idx\` ON \`packages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`packages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_rels_order_idx\` ON \`packages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`packages_rels_parent_idx\` ON \`packages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_rels_path_idx\` ON \`packages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`packages_rels_categories_id_idx\` ON \`packages_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`type\` text DEFAULT 'article',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_dato_id_idx\` ON \`categories\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_slug_idx\` ON \`tags\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tags_dato_id_idx\` ON \`tags\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`tags_updated_at_idx\` ON \`tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_at_idx\` ON \`tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customer_reference_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`order_number\` numeric,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`customer_reference_categories_slug_idx\` ON \`customer_reference_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`customer_reference_categories_dato_id_idx\` ON \`customer_reference_categories\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_reference_categories_updated_at_idx\` ON \`customer_reference_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customer_reference_categories_created_at_idx\` ON \`customer_reference_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customer_references\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer,
  	\`category_id\` integer,
  	\`url\` text,
  	\`order_number\` numeric,
  	\`dato_id\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`customer_reference_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`customer_references_logo_idx\` ON \`customer_references\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_references_category_idx\` ON \`customer_references\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_references_dato_id_idx\` ON \`customer_references\` (\`dato_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_references_updated_at_idx\` ON \`customer_references\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customer_references_created_at_idx\` ON \`customer_references\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_messages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`subject\` text NOT NULL,
  	\`message\` text NOT NULL,
  	\`status\` text DEFAULT 'new',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_messages_updated_at_idx\` ON \`contact_messages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_messages_created_at_idx\` ON \`contact_messages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`company\` text,
  	\`message\` text NOT NULL,
  	\`status\` text DEFAULT 'new',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_submissions_updated_at_idx\` ON \`contact_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_submissions_created_at_idx\` ON \`contact_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`job_applications\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`position\` text NOT NULL,
  	\`cover_letter\` text,
  	\`resume_id\` integer,
  	\`status\` text DEFAULT 'submitted',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`resume_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`job_applications_resume_idx\` ON \`job_applications\` (\`resume_id\`);`)
  await db.run(sql`CREATE INDEX \`job_applications_updated_at_idx\` ON \`job_applications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`job_applications_created_at_idx\` ON \`job_applications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`meetup_registrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`company\` text,
  	\`job_title\` text,
  	\`dietary_restrictions\` text,
  	\`status\` text DEFAULT 'registered',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`meetup_registrations_updated_at_idx\` ON \`meetup_registrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`meetup_registrations_created_at_idx\` ON \`meetup_registrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`sponsor_applications\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company_name\` text NOT NULL,
  	\`contact_name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`sponsorship_level\` text NOT NULL,
  	\`message\` text,
  	\`status\` text DEFAULT 'submitted',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`sponsor_applications_updated_at_idx\` ON \`sponsor_applications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sponsor_applications_created_at_idx\` ON \`sponsor_applications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`menus_id\` integer,
  	\`pages_id\` integer,
  	\`redirects_id\` integer,
  	\`articles_id\` integer,
  	\`guides_id\` integer,
  	\`books_id\` integer,
  	\`videos_id\` integer,
  	\`podcasts_id\` integer,
  	\`services_id\` integer,
  	\`case_studies_id\` integer,
  	\`static_articles_id\` integer,
  	\`seo_dictionary_terms_id\` integer,
  	\`ai_dictionary_terms_id\` integer,
  	\`algorithm_updates_id\` integer,
  	\`events_id\` integer,
  	\`webinars_id\` integer,
  	\`open_positions_id\` integer,
  	\`tools_id\` integer,
  	\`marketing_tools_id\` integer,
  	\`seo_checklists_id\` integer,
  	\`packages_id\` integer,
  	\`categories_id\` integer,
  	\`tags_id\` integer,
  	\`customer_reference_categories_id\` integer,
  	\`customer_references_id\` integer,
  	\`contact_messages_id\` integer,
  	\`contact_submissions_id\` integer,
  	\`job_applications_id\` integer,
  	\`meetup_registrations_id\` integer,
  	\`sponsor_applications_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`menus_id\`) REFERENCES \`menus\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`articles_id\`) REFERENCES \`articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`guides_id\`) REFERENCES \`guides\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`books_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`videos_id\`) REFERENCES \`videos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`podcasts_id\`) REFERENCES \`podcasts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`static_articles_id\`) REFERENCES \`static_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`seo_dictionary_terms_id\`) REFERENCES \`seo_dictionary_terms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ai_dictionary_terms_id\`) REFERENCES \`ai_dictionary_terms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`algorithm_updates_id\`) REFERENCES \`algorithm_updates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`webinars_id\`) REFERENCES \`webinars\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`open_positions_id\`) REFERENCES \`open_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`marketing_tools_id\`) REFERENCES \`marketing_tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`seo_checklists_id\`) REFERENCES \`seo_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`packages_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customer_reference_categories_id\`) REFERENCES \`customer_reference_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customer_references_id\`) REFERENCES \`customer_references\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_messages_id\`) REFERENCES \`contact_messages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_submissions_id\`) REFERENCES \`contact_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_applications_id\`) REFERENCES \`job_applications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`meetup_registrations_id\`) REFERENCES \`meetup_registrations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sponsor_applications_id\`) REFERENCES \`sponsor_applications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_menus_id_idx\` ON \`payload_locked_documents_rels\` (\`menus_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`articles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_guides_id_idx\` ON \`payload_locked_documents_rels\` (\`guides_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_books_id_idx\` ON \`payload_locked_documents_rels\` (\`books_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_videos_id_idx\` ON \`payload_locked_documents_rels\` (\`videos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_podcasts_id_idx\` ON \`payload_locked_documents_rels\` (\`podcasts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_static_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`static_articles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_seo_dictionary_terms_id_idx\` ON \`payload_locked_documents_rels\` (\`seo_dictionary_terms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ai_dictionary_terms_id_idx\` ON \`payload_locked_documents_rels\` (\`ai_dictionary_terms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_algorithm_updates_id_idx\` ON \`payload_locked_documents_rels\` (\`algorithm_updates_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_webinars_id_idx\` ON \`payload_locked_documents_rels\` (\`webinars_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_open_positions_id_idx\` ON \`payload_locked_documents_rels\` (\`open_positions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tools_id_idx\` ON \`payload_locked_documents_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_marketing_tools_id_idx\` ON \`payload_locked_documents_rels\` (\`marketing_tools_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_seo_checklists_id_idx\` ON \`payload_locked_documents_rels\` (\`seo_checklists_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_packages_id_idx\` ON \`payload_locked_documents_rels\` (\`packages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customer_reference_categor_idx\` ON \`payload_locked_documents_rels\` (\`customer_reference_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customer_references_id_idx\` ON \`payload_locked_documents_rels\` (\`customer_references_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_messages_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_messages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_job_applications_id_idx\` ON \`payload_locked_documents_rels\` (\`job_applications_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_meetup_registrations_id_idx\` ON \`payload_locked_documents_rels\` (\`meetup_registrations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sponsor_applications_id_idx\` ON \`payload_locked_documents_rels\` (\`sponsor_applications_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`description\` text,
  	\`phone_number\` text,
  	\`image_id\` integer,
  	\`image_mobile_id\` integer,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`image_asset_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_hero_order_idx\` ON \`homepage_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_hero_parent_id_idx\` ON \`homepage_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_hero_path_idx\` ON \`homepage_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_hero_image_idx\` ON \`homepage_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_hero_image_mobile_idx\` ON \`homepage_blocks_hero\` (\`image_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_hero_image_asset_idx\` ON \`homepage_blocks_hero\` (\`image_asset_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_first\` text,
  	\`title_second\` text,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`image_id\` integer,
  	\`url\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_blocks_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_services_items_order_idx\` ON \`homepage_blocks_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_services_items_parent_id_idx\` ON \`homepage_blocks_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_services_items_icon_idx\` ON \`homepage_blocks_services_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_services_items_image_idx\` ON \`homepage_blocks_services_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`right_title\` text,
  	\`right_link_text\` text,
  	\`right_link_url\` text,
  	\`side_title_first\` text,
  	\`side_title_second\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_services_order_idx\` ON \`homepage_blocks_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_services_parent_id_idx\` ON \`homepage_blocks_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_services_path_idx\` ON \`homepage_blocks_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_case_studies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_case_studies_order_idx\` ON \`homepage_blocks_case_studies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_case_studies_parent_id_idx\` ON \`homepage_blocks_case_studies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_case_studies_path_idx\` ON \`homepage_blocks_case_studies\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`job_title\` text,
  	\`sentence\` text,
  	\`profile_image_id\` integer,
  	\`contact_url\` text,
  	\`quote\` text,
  	\`quote2\` text,
  	\`author\` text,
  	\`company\` text,
  	\`image_id\` integer,
  	\`company_logo_id\` integer,
  	FOREIGN KEY (\`profile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_items_order_idx\` ON \`homepage_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_items_parent_id_idx\` ON \`homepage_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_items_profile_image_idx\` ON \`homepage_blocks_testimonials_items\` (\`profile_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_items_image_idx\` ON \`homepage_blocks_testimonials_items\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_items_company_logo_idx\` ON \`homepage_blocks_testimonials_items\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display\` integer DEFAULT true,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`title_small_description\` text,
  	\`display_all_references_link\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_order_idx\` ON \`homepage_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_parent_id_idx\` ON \`homepage_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_testimonials_path_idx\` ON \`homepage_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_resources_boxes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`link_url\` text,
  	\`link_title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_blocks_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_boxes_order_idx\` ON \`homepage_blocks_resources_boxes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_boxes_parent_id_idx\` ON \`homepage_blocks_resources_boxes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_resources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`content_counts_suffix\` text,
  	\`content_counts_link_text\` text,
  	\`guidebook_title\` text,
  	\`guidebook_image_id\` integer,
  	\`guidebook_link_url\` text,
  	\`fullbox_title\` text,
  	\`fullbox_description\` text,
  	\`fullbox_image_id\` integer,
  	\`fullbox_link_url\` text,
  	\`digitalzone_link_prefix\` text,
  	\`digitalzone_link_suffix\` text,
  	\`digitalzone_link_url\` text,
  	\`agile_approach_title_first_line\` text,
  	\`agile_approach_title_second_line\` text,
  	\`agile_approach_first_question\` text,
  	\`agile_approach_first_answer\` text,
  	\`agile_approach_second_question\` text,
  	\`agile_approach_second_answer\` text,
  	\`agile_approach_image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`guidebook_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fullbox_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`agile_approach_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_order_idx\` ON \`homepage_blocks_resources\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_parent_id_idx\` ON \`homepage_blocks_resources\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_path_idx\` ON \`homepage_blocks_resources\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_guidebook_guidebook_image_idx\` ON \`homepage_blocks_resources\` (\`guidebook_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_fullbox_fullbox_image_idx\` ON \`homepage_blocks_resources\` (\`fullbox_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_resources_agile_approach_agile_approach__idx\` ON \`homepage_blocks_resources\` (\`agile_approach_image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_international_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`event_type\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_blocks_international\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_international_items_order_idx\` ON \`homepage_blocks_international_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_international_items_parent_id_idx\` ON \`homepage_blocks_international_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_international_items_image_idx\` ON \`homepage_blocks_international_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_international\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_international_order_idx\` ON \`homepage_blocks_international\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_international_parent_id_idx\` ON \`homepage_blocks_international\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_international_path_idx\` ON \`homepage_blocks_international\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_event_europa\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`title_small\` text,
  	\`title_big\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`link_text\` text,
  	\`link_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_event_europa_order_idx\` ON \`homepage_blocks_event_europa\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_event_europa_parent_id_idx\` ON \`homepage_blocks_event_europa\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_event_europa_path_idx\` ON \`homepage_blocks_event_europa\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_event_europa_logo_idx\` ON \`homepage_blocks_event_europa\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_event_europa_image_idx\` ON \`homepage_blocks_event_europa\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_other_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`title_first\` text,
  	\`description_first\` text,
  	\`title_second\` text,
  	\`description_second\` text,
  	\`image_id\` integer,
  	\`display_image_at_right\` integer DEFAULT false,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_blocks_other_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_other_services_items_order_idx\` ON \`homepage_blocks_other_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_other_services_items_parent_id_idx\` ON \`homepage_blocks_other_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_other_services_items_image_idx\` ON \`homepage_blocks_other_services_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_blocks_other_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_blocks_other_services_order_idx\` ON \`homepage_blocks_other_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_other_services_parent_id_idx\` ON \`homepage_blocks_other_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_blocks_other_services_path_idx\` ON \`homepage_blocks_other_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`homepage_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`job_title\` text,
  	\`sentence\` text,
  	\`profile_image_id\` integer,
  	\`contact_url\` text,
  	FOREIGN KEY (\`profile_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_testimonials_items_order_idx\` ON \`homepage_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_testimonials_items_parent_id_idx\` ON \`homepage_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_testimonials_items_profile_image_idx\` ON \`homepage_testimonials_items\` (\`profile_image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title_first\` text,
  	\`title_second\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`image_id\` integer,
  	\`url\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_services_items_order_idx\` ON \`homepage_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_items_parent_id_idx\` ON \`homepage_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_items_icon_idx\` ON \`homepage_services_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_items_image_idx\` ON \`homepage_services_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_international_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`event_type\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_international_items_order_idx\` ON \`homepage_international_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_international_items_parent_id_idx\` ON \`homepage_international_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_international_items_image_idx\` ON \`homepage_international_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_other_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`title_first\` text,
  	\`description_first\` text,
  	\`title_second\` text,
  	\`description_second\` text,
  	\`image_id\` integer,
  	\`display_image_at_right\` integer DEFAULT false,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_other_services_items_order_idx\` ON \`homepage_other_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_other_services_items_parent_id_idx\` ON \`homepage_other_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_other_services_items_image_idx\` ON \`homepage_other_services_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_resources_boxes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`button_text\` text,
  	\`link_url\` text,
  	\`link_title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_resources_boxes_order_idx\` ON \`homepage_resources_boxes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_resources_boxes_parent_id_idx\` ON \`homepage_resources_boxes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_phone_number\` text,
  	\`hero_image_id\` integer,
  	\`hero_image_mobile_id\` integer,
  	\`hero_cta_text\` text,
  	\`hero_cta_url\` text,
  	\`testimonials_display\` integer DEFAULT true,
  	\`testimonials_cta_text\` text,
  	\`testimonials_cta_url\` text,
  	\`services_title_small\` text,
  	\`services_title_big\` text,
  	\`services_description\` text,
  	\`services_right_title\` text,
  	\`services_right_link_text\` text,
  	\`services_right_link_url\` text,
  	\`international_title_small\` text,
  	\`international_title_big\` text,
  	\`digitalzone_logo_id\` integer,
  	\`digitalzone_title_small\` text,
  	\`digitalzone_title_big\` text,
  	\`digitalzone_description\` text,
  	\`digitalzone_image_id\` integer,
  	\`digitalzone_link_text\` text,
  	\`digitalzone_link_url\` text,
  	\`resources_title_small\` text,
  	\`resources_title_big\` text,
  	\`resources_content_counts_suffix\` text,
  	\`resources_content_counts_link_text\` text,
  	\`resources_guidebook_title\` text,
  	\`resources_guidebook_image_id\` integer,
  	\`resources_guidebook_link_url\` text,
  	\`resources_fullbox_title\` text,
  	\`resources_fullbox_description\` text,
  	\`resources_fullbox_image_id\` integer,
  	\`resources_fullbox_link_url\` text,
  	\`resources_digitalzone_link_prefix\` text,
  	\`resources_digitalzone_link_suffix\` text,
  	\`resources_digitalzone_link_url\` text,
  	\`resources_agile_approach_title_first_line\` text,
  	\`resources_agile_approach_title_second_line\` text,
  	\`resources_agile_approach_first_question\` text,
  	\`resources_agile_approach_first_answer\` text,
  	\`resources_agile_approach_second_question\` text,
  	\`resources_agile_approach_second_answer\` text,
  	\`resources_agile_approach_image_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`digitalzone_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`digitalzone_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`resources_guidebook_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`resources_fullbox_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`resources_agile_approach_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_hero_hero_image_idx\` ON \`homepage\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_hero_image_mobile_idx\` ON \`homepage\` (\`hero_image_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_digitalzone_digitalzone_logo_idx\` ON \`homepage\` (\`digitalzone_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_digitalzone_digitalzone_image_idx\` ON \`homepage\` (\`digitalzone_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_resources_guidebook_resources_guidebook_image_idx\` ON \`homepage\` (\`resources_guidebook_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_resources_fullbox_resources_fullbox_image_idx\` ON \`homepage\` (\`resources_fullbox_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_resources_agile_approach_resources_agile_approa_idx\` ON \`homepage\` (\`resources_agile_approach_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_seo_seo_image_idx\` ON \`homepage\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`case_studies_id\` integer,
  	\`customer_references_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customer_references_id\`) REFERENCES \`customer_references\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_rels_order_idx\` ON \`homepage_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_rels_parent_idx\` ON \`homepage_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_rels_path_idx\` ON \`homepage_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`homepage_rels_case_studies_id_idx\` ON \`homepage_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_rels_customer_references_id_idx\` ON \`homepage_rels\` (\`customer_references_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_offices\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`city\` text NOT NULL,
  	\`country\` text NOT NULL,
  	\`address\` text,
  	\`phone\` text,
  	\`email\` text,
  	\`coordinates_latitude\` numeric,
  	\`coordinates_longitude\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_offices_order_idx\` ON \`site_settings_offices\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_offices_parent_id_idx\` ON \`site_settings_offices\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_order_idx\` ON \`site_settings_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_parent_id_idx\` ON \`site_settings_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`general_site_name\` text,
  	\`general_site_description\` text,
  	\`general_logo_id\` integer,
  	\`general_favicon_id\` integer,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_address\` text,
  	\`social_twitter\` text,
  	\`social_facebook\` text,
  	\`social_linkedin\` text,
  	\`social_instagram\` text,
  	\`social_youtube\` text,
  	\`default_seo_title\` text,
  	\`default_seo_description\` text,
  	\`default_seo_image_id\` integer,
  	\`scripts_header_scripts\` text,
  	\`scripts_footer_scripts\` text,
  	\`newsletter_enabled\` integer DEFAULT true,
  	\`newsletter_title\` text,
  	\`newsletter_description\` text,
  	\`newsletter_button_text\` text,
  	\`newsletter_placeholder_text\` text,
  	\`newsletter_success_message\` text,
  	\`newsletter_form_action\` text,
  	\`footer_copyright\` text,
  	\`footer_description\` text,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`general_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`general_favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`default_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_general_general_logo_idx\` ON \`site_settings\` (\`general_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_general_general_favicon_idx\` ON \`site_settings\` (\`general_favicon_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_default_seo_default_seo_image_idx\` ON \`site_settings\` (\`default_seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`page_settings_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_settings_footer_links_order_idx\` ON \`page_settings_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_settings_footer_links_parent_id_idx\` ON \`page_settings_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`not_found_title\` text,
  	\`not_found_description\` text,
  	\`not_found_image_id\` integer,
  	\`not_found_cta_text\` text,
  	\`not_found_cta_url\` text,
  	\`footer_copyright\` text,
  	\`newsletter_title\` text,
  	\`newsletter_description\` text,
  	\`newsletter_placeholder\` text,
  	\`newsletter_button_text\` text,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`not_found_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_settings_not_found_not_found_image_idx\` ON \`page_settings\` (\`not_found_image_id\`);`)
  await db.run(sql`CREATE TABLE \`translations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`data\` text,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`team_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`team_page_seo_seo_image_idx\` ON \`team_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`culture_page_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culture_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culture_page_sections_order_idx\` ON \`culture_page_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culture_page_sections_parent_id_idx\` ON \`culture_page_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`culture_page_sections_image_idx\` ON \`culture_page_sections\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`culture_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`hero_image_id\` integer,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`culture_page_hero_hero_image_idx\` ON \`culture_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`culture_page_seo_seo_image_idx\` ON \`culture_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`events_page_seo_seo_image_idx\` ON \`events_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_page_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	\`url\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_page_sections_order_idx\` ON \`resources_page_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_page_sections_parent_id_idx\` ON \`resources_page_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_page_sections_icon_idx\` ON \`resources_page_sections\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_page_special_content_page_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resources_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_page_special_content_page_links_order_idx\` ON \`resources_page_special_content_page_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resources_page_special_content_page_links_parent_id_idx\` ON \`resources_page_special_content_page_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`resources_page_special_content_page_links_image_idx\` ON \`resources_page_special_content_page_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`resources_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`special_content_special_title_small\` text,
  	\`special_content_special_title_big\` text,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`resources_page_seo_seo_image_idx\` ON \`resources_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`tools_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`tools_page_seo_seo_image_idx\` ON \`tools_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`seo_dictionary_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`seo_dictionary_page_seo_seo_image_idx\` ON \`seo_dictionary_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`ai_dictionary_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`ai_dictionary_page_seo_seo_image_idx\` ON \`ai_dictionary_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`algorithm_updates_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`dato_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`algorithm_updates_page_seo_seo_image_idx\` ON \`algorithm_updates_page\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page_what_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`digitalzone_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_what_items_order_idx\` ON \`digitalzone_page_what_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_what_items_parent_id_idx\` ON \`digitalzone_page_what_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_what_items_icon_idx\` ON \`digitalzone_page_what_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page_experience_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`digitalzone_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_experience_items_order_idx\` ON \`digitalzone_page_experience_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_experience_items_parent_id_idx\` ON \`digitalzone_page_experience_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_experience_items_image_idx\` ON \`digitalzone_page_experience_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page_schedule_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`time\` text,
  	\`title\` text,
  	\`description\` text,
  	\`speaker\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`digitalzone_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_schedule_items_order_idx\` ON \`digitalzone_page_schedule_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_schedule_items_parent_id_idx\` ON \`digitalzone_page_schedule_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page_speakers_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`title\` text,
  	\`company\` text,
  	\`bio\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`digitalzone_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_speakers_items_order_idx\` ON \`digitalzone_page_speakers_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_speakers_items_parent_id_idx\` ON \`digitalzone_page_speakers_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_speakers_items_image_idx\` ON \`digitalzone_page_speakers_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page_sponsors_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`logo_id\` integer,
  	\`url\` text,
  	\`tier\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`digitalzone_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_sponsors_items_order_idx\` ON \`digitalzone_page_sponsors_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_sponsors_items_parent_id_idx\` ON \`digitalzone_page_sponsors_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_sponsors_items_logo_idx\` ON \`digitalzone_page_sponsors_items\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page_pricing_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`price\` text,
  	\`currency\` text,
  	\`features\` text,
  	\`cta_text\` text,
  	\`cta_url\` text,
  	\`featured\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`digitalzone_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_pricing_tiers_order_idx\` ON \`digitalzone_page_pricing_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_pricing_tiers_parent_id_idx\` ON \`digitalzone_page_pricing_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page_past_videos_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`year\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`digitalzone_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_past_videos_videos_order_idx\` ON \`digitalzone_page_past_videos_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_past_videos_videos_parent_id_idx\` ON \`digitalzone_page_past_videos_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`digitalzone_page_past_videos_videos_thumbnail_idx\` ON \`digitalzone_page_past_videos_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`digitalzone_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_cta_url\` text,
  	\`hero_cta_text\` text,
  	\`hero_image_id\` integer,
  	\`hero_event_date\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`about_title\` text,
  	\`about_description\` text,
  	\`what_title\` text,
  	\`what_description\` text,
  	\`experience_title\` text,
  	\`experience_description\` text,
  	\`schedule_title\` text,
  	\`speakers_title\` text,
  	\`sponsors_title\` text,
  	\`sponsor_form_title\` text,
  	\`sponsor_form_description\` text,
  	\`sponsor_form_submit_button_text\` text,
  	\`pricing_title\` text,
  	\`pricing_description\` text,
  	\`past_videos_title\` text,
  	\`past_videos_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`digitalzone_page_hero_hero_image_idx\` ON \`digitalzone_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`meetup_page_schedule_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`time\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`meetup_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`meetup_page_schedule_items_order_idx\` ON \`meetup_page_schedule_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`meetup_page_schedule_items_parent_id_idx\` ON \`meetup_page_schedule_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`meetup_page_speakers_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`title\` text,
  	\`talk_hour\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`meetup_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`meetup_page_speakers_items_order_idx\` ON \`meetup_page_speakers_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`meetup_page_speakers_items_parent_id_idx\` ON \`meetup_page_speakers_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`meetup_page_speakers_items_image_idx\` ON \`meetup_page_speakers_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`meetup_page_sponsors_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`logo_id\` integer,
  	\`url\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`meetup_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`meetup_page_sponsors_items_order_idx\` ON \`meetup_page_sponsors_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`meetup_page_sponsors_items_parent_id_idx\` ON \`meetup_page_sponsors_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`meetup_page_sponsors_items_logo_idx\` ON \`meetup_page_sponsors_items\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`meetup_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_title_long\` text,
  	\`hero_title_short\` text,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_register_button_text\` text,
  	\`hero_image_id\` integer,
  	\`hero_image_mobile_id\` integer,
  	\`hero_event_date\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`schedule_title\` text,
  	\`speakers_title\` text,
  	\`sponsors_title\` text,
  	\`register_title\` text,
  	\`register_description\` text,
  	\`register_register_button_text\` text,
  	\`register_register_link\` text,
  	\`footer_contact_email_address\` text,
  	\`footer_phone_number\` text,
  	\`footer_contact_us_text\` text,
  	\`footer_copyright_title_small\` text,
  	\`footer_copyright_title_big\` text,
  	\`footer_submit_success_message\` text,
  	\`footer_submit_fail_message\` text,
  	\`footer_e_mail_address_label\` text,
  	\`footer_submit_button_text\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`meetup_page_hero_hero_image_idx\` ON \`meetup_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`meetup_page_hero_hero_image_mobile_idx\` ON \`meetup_page\` (\`hero_image_mobile_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page_ai_platforms_platforms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`geo_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_ai_platforms_platforms_order_idx\` ON \`geo_page_ai_platforms_platforms\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_ai_platforms_platforms_parent_id_idx\` ON \`geo_page_ai_platforms_platforms\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_ai_platforms_platforms_logo_idx\` ON \`geo_page_ai_platforms_platforms\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page_methodology_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`geo_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_methodology_steps_order_idx\` ON \`geo_page_methodology_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_methodology_steps_parent_id_idx\` ON \`geo_page_methodology_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page_industry_cases_cases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`geo_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_industry_cases_cases_order_idx\` ON \`geo_page_industry_cases_cases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_industry_cases_cases_parent_id_idx\` ON \`geo_page_industry_cases_cases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page_comparison_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`geo_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_comparison_items_order_idx\` ON \`geo_page_comparison_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_comparison_items_parent_id_idx\` ON \`geo_page_comparison_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page_results_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`metric\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`geo_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_results_items_order_idx\` ON \`geo_page_results_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_results_items_parent_id_idx\` ON \`geo_page_results_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page_trust_signals_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`geo_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_trust_signals_logos_order_idx\` ON \`geo_page_trust_signals_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_trust_signals_logos_parent_id_idx\` ON \`geo_page_trust_signals_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_trust_signals_logos_logo_idx\` ON \`geo_page_trust_signals_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`geo_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_faq_items_order_idx\` ON \`geo_page_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`geo_page_faq_items_parent_id_idx\` ON \`geo_page_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`geo_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_description\` text,
  	\`hero_title_small\` text,
  	\`hero_title_big\` text,
  	\`hero_image_id\` integer,
  	\`hero_cta_text\` text,
  	\`hero_cta_url\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`ai_platforms_title\` text,
  	\`ai_platforms_description\` text,
  	\`methodology_title\` text,
  	\`methodology_description\` text,
  	\`industry_cases_title\` text,
  	\`comparison_title\` text,
  	\`results_title\` text,
  	\`video_title\` text,
  	\`video_video_url\` text,
  	\`trust_signals_title\` text,
  	\`faq_title\` text,
  	\`cta_title\` text,
  	\`cta_description\` text,
  	\`cta_button_text\` text,
  	\`cta_button_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`geo_page_hero_hero_image_idx\` ON \`geo_page\` (\`hero_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`menus_items_children\`;`)
  await db.run(sql`DROP TABLE \`menus_items\`;`)
  await db.run(sql`DROP TABLE \`menus\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`articles_table_of_contents\`;`)
  await db.run(sql`DROP TABLE \`articles_ratings\`;`)
  await db.run(sql`DROP TABLE \`articles\`;`)
  await db.run(sql`DROP TABLE \`articles_rels\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_version_table_of_contents\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_version_ratings\`;`)
  await db.run(sql`DROP TABLE \`_articles_v\`;`)
  await db.run(sql`DROP TABLE \`_articles_v_rels\`;`)
  await db.run(sql`DROP TABLE \`guides_table_of_contents\`;`)
  await db.run(sql`DROP TABLE \`guides\`;`)
  await db.run(sql`DROP TABLE \`guides_rels\`;`)
  await db.run(sql`DROP TABLE \`_guides_v_version_table_of_contents\`;`)
  await db.run(sql`DROP TABLE \`_guides_v\`;`)
  await db.run(sql`DROP TABLE \`_guides_v_rels\`;`)
  await db.run(sql`DROP TABLE \`books\`;`)
  await db.run(sql`DROP TABLE \`videos\`;`)
  await db.run(sql`DROP TABLE \`videos_rels\`;`)
  await db.run(sql`DROP TABLE \`_videos_v\`;`)
  await db.run(sql`DROP TABLE \`_videos_v_rels\`;`)
  await db.run(sql`DROP TABLE \`podcasts\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_services_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_services\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_what_we_do\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_process_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stories_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stories_reference_logos\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_stories\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_about_zeo_attended_conferences_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_about_zeo_tools_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_about_zeo\`;`)
  await db.run(sql`DROP TABLE \`services_sub_services_items\`;`)
  await db.run(sql`DROP TABLE \`services_processes_items\`;`)
  await db.run(sql`DROP TABLE \`services_stories_items\`;`)
  await db.run(sql`DROP TABLE \`services_testimonials\`;`)
  await db.run(sql`DROP TABLE \`services_reference_logos\`;`)
  await db.run(sql`DROP TABLE \`services_faq\`;`)
  await db.run(sql`DROP TABLE \`services_about_zeo_attended_conferences_links\`;`)
  await db.run(sql`DROP TABLE \`services_about_zeo_tools_links\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_rels\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_services_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_services\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_what_we_do\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_process_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_stories_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_stories_reference_logos\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_stories\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_about_zeo_attended_conferences_links\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_about_zeo_tools_links\`;`)
  await db.run(sql`DROP TABLE \`_services_v_blocks_about_zeo\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_sub_services_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_processes_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_stories_items\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_reference_logos\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_about_zeo_attended_conferences_links\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_about_zeo_tools_links\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`_services_v_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_metrics\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_version_metrics\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_rels\`;`)
  await db.run(sql`DROP TABLE \`static_articles\`;`)
  await db.run(sql`DROP TABLE \`_static_articles_v\`;`)
  await db.run(sql`DROP TABLE \`seo_dictionary_terms\`;`)
  await db.run(sql`DROP TABLE \`seo_dictionary_terms_rels\`;`)
  await db.run(sql`DROP TABLE \`ai_dictionary_terms\`;`)
  await db.run(sql`DROP TABLE \`ai_dictionary_terms_rels\`;`)
  await db.run(sql`DROP TABLE \`algorithm_updates\`;`)
  await db.run(sql`DROP TABLE \`events\`;`)
  await db.run(sql`DROP TABLE \`webinars\`;`)
  await db.run(sql`DROP TABLE \`webinars_rels\`;`)
  await db.run(sql`DROP TABLE \`open_positions\`;`)
  await db.run(sql`DROP TABLE \`tools\`;`)
  await db.run(sql`DROP TABLE \`marketing_tools_features\`;`)
  await db.run(sql`DROP TABLE \`marketing_tools\`;`)
  await db.run(sql`DROP TABLE \`seo_checklists_items\`;`)
  await db.run(sql`DROP TABLE \`seo_checklists\`;`)
  await db.run(sql`DROP TABLE \`packages_features\`;`)
  await db.run(sql`DROP TABLE \`packages\`;`)
  await db.run(sql`DROP TABLE \`packages_rels\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`tags\`;`)
  await db.run(sql`DROP TABLE \`customer_reference_categories\`;`)
  await db.run(sql`DROP TABLE \`customer_references\`;`)
  await db.run(sql`DROP TABLE \`contact_messages\`;`)
  await db.run(sql`DROP TABLE \`contact_submissions\`;`)
  await db.run(sql`DROP TABLE \`job_applications\`;`)
  await db.run(sql`DROP TABLE \`meetup_registrations\`;`)
  await db.run(sql`DROP TABLE \`sponsor_applications\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_services_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_services\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_case_studies\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_resources_boxes\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_resources\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_international_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_international\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_event_europa\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_other_services_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_blocks_other_services\`;`)
  await db.run(sql`DROP TABLE \`homepage_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_services_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_international_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_other_services_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_resources_boxes\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`DROP TABLE \`homepage_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_offices\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`page_settings_footer_links\`;`)
  await db.run(sql`DROP TABLE \`page_settings\`;`)
  await db.run(sql`DROP TABLE \`translations\`;`)
  await db.run(sql`DROP TABLE \`team_page\`;`)
  await db.run(sql`DROP TABLE \`culture_page_sections\`;`)
  await db.run(sql`DROP TABLE \`culture_page\`;`)
  await db.run(sql`DROP TABLE \`events_page\`;`)
  await db.run(sql`DROP TABLE \`resources_page_sections\`;`)
  await db.run(sql`DROP TABLE \`resources_page_special_content_page_links\`;`)
  await db.run(sql`DROP TABLE \`resources_page\`;`)
  await db.run(sql`DROP TABLE \`tools_page\`;`)
  await db.run(sql`DROP TABLE \`seo_dictionary_page\`;`)
  await db.run(sql`DROP TABLE \`ai_dictionary_page\`;`)
  await db.run(sql`DROP TABLE \`algorithm_updates_page\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page_what_items\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page_experience_items\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page_schedule_items\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page_speakers_items\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page_sponsors_items\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page_pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page_past_videos_videos\`;`)
  await db.run(sql`DROP TABLE \`digitalzone_page\`;`)
  await db.run(sql`DROP TABLE \`meetup_page_schedule_items\`;`)
  await db.run(sql`DROP TABLE \`meetup_page_speakers_items\`;`)
  await db.run(sql`DROP TABLE \`meetup_page_sponsors_items\`;`)
  await db.run(sql`DROP TABLE \`meetup_page\`;`)
  await db.run(sql`DROP TABLE \`geo_page_ai_platforms_platforms\`;`)
  await db.run(sql`DROP TABLE \`geo_page_methodology_steps\`;`)
  await db.run(sql`DROP TABLE \`geo_page_industry_cases_cases\`;`)
  await db.run(sql`DROP TABLE \`geo_page_comparison_items\`;`)
  await db.run(sql`DROP TABLE \`geo_page_results_items\`;`)
  await db.run(sql`DROP TABLE \`geo_page_trust_signals_logos\`;`)
  await db.run(sql`DROP TABLE \`geo_page_faq_items\`;`)
  await db.run(sql`DROP TABLE \`geo_page\`;`)
}
