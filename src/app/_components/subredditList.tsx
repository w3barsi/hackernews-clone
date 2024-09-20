"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";

export const SubredditList = () => {
  const [data] = api.subreddit.get.useSuspenseQuery();
  const [name, setName] = useState("");

  const utils = api.useUtils();
  const createSubreddit = api.subreddit.create.useMutation({
    onSuccess: async () => {
      await utils.subreddit.get.invalidate();
    },
  });

  return (
    <div className="flex flex-col justify-center gap-3 px-3 py-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createSubreddit.mutate({ name });
          setName("");
        }}
      >
        <Label className="absolute -my-3 ml-6 bg-white p-1" htmlFor="email">
          Create Subreddit
        </Label>
        <div className="">
          <div className="flex items-center gap-3 border border-black p-3">
            <Input
              id="email"
              autoComplete="off"
              className="h-12"
              placeholder="Subreddit Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black px-10 py-3 font-semibold text-white transition hover:bg-white/20 hover:text-black"
              disabled={createSubreddit.isPending}
            >
              {createSubreddit.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      <div className="inline-block">
        {data?.map((subs) => {
          return (
            <Link
              href={`/r/${subs.name}`}
              className="w-auto border px-1"
              key={subs.id}
            >
              {`r/${subs.name}`}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
