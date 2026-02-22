import { pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const websites = pgTable('websites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  domain: varchar('domain', { length: 255 }).notNull(),
  siteId: varchar('site_id', { length: 64 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  websiteId: integer('website_id').notNull(),
  visitorId: varchar('visitor_id', { length: 255 }),
  sessionId: varchar('session_id', { length: 255 }).notNull(),
  entryPage: varchar('entry_page', { length: 2048 }),
  entryTime: timestamp('entry_time').notNull(),
  lastHeartbeatAt: timestamp('last_heartbeat_at').notNull(),
  referrer: varchar('referrer', { length: 2048 }),
  utmSource: varchar('utm_source', { length: 255 }),
  utmCampaign: varchar('utm_campaign', { length: 255 }),
  deviceSize: varchar('device_size', { length: 32 }),
  os: varchar('os', { length: 128 }),
  browser: varchar('browser', { length: 128 }),
  country: varchar('country', { length: 128 }),
  countryCode: varchar('country_code', { length: 16 }),
  region: varchar('region', { length: 128 }),
  city: varchar('city', { length: 128 }),
  exitPage: varchar('exit_page', { length: 2048 }),
  exitTime: timestamp('exit_time'),
  activeTime: integer('active_time'),
});
