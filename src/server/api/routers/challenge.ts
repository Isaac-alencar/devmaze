import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const VALUES = ["begginer", "intermediate", "advanced"] as const;

export const challengeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.challenge.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        link: z.string(),
        level: z.enum(VALUES),
        techsId: z.array(z.number()),
      })
    )
    .mutation(async (opts) => {
      const { input, ctx } = opts;

      const challenge = await ctx.db.challenge.create({
        data: {
          name: input.name,
          description: input.description,
          link: input.link,
          level: input.level,
          techs: input.techsId,
        },
      });

      return challenge;
    }),
});
