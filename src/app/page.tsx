import { api, HydrateClient } from "~/trpc/server";
import { SubredditList } from "./_components/subredditList";

export default async function Home() {
  void api.subreddit.get.prefetch();
  return (
    <main className="items-centerj flex justify-center text-black">
      <div className="container">
        <SubredditList />
      </div>
    </main>
  );
}
