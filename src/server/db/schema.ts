// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `hackernews-clone_${name}`);

const timestamp = {
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
}

export const subreddit = createTable("subreddits", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 25 }).notNull(),
  ...timestamp
})

export const post = createTable(
  "posts",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text("title", { length: 256 }),
    post: text("post", { length: 1024 }),
    userId: text("user"),
    subredditId: integer("subreddit_id").references(() => subreddit.id),

    ...timestamp
  },
  (post) => ({
    nameIndex: index("name_idx").on(post.id),
  })
);

export const comment = createTable("comments", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  body: text("body", { length: 1024 }),
  postId: int("post_id", { mode: "number" }).references(() => post.id),
  parentCommentId: int("parrent_comment_id", { mode: "number" }).references(() => post.id),

  ...timestamp
})


