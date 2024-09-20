import { SubredditList } from "./_components/subredditList";

export default async function Home() {
  // Doesnt build if using prefetch
  return (
    <main className="items-centerj flex justify-center text-black">
      <div className="container">
        <SubredditList />
      </div>
    </main>
  );
}
