export default function Test() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col gap-3 bg-blue-500 p-3 lg:grid lg:max-w-screen-lg lg:flex-none lg:grid-cols-2">
        <div className="col-start-2 flex h-full w-full items-center justify-center rounded bg-red-300">
          a
        </div>
        <div className="col-start-1 row-span-2 row-start-1 flex h-full w-full items-center justify-center rounded bg-yellow-300">
          b
        </div>
        <div className="flex h-full w-full items-center justify-center rounded bg-green-300">
          c
        </div>
      </div>
    </div>
  );
}
