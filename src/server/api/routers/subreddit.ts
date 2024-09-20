import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { subreddit } from "~/server/db/schema";

export const subredditRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(subreddit).values({
        name: input.name,
      });
    }),
  getSubreddits: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(subreddit)
  })
});

