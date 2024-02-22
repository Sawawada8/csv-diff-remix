import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const handle = (e) => {
    console.log({e: e.target.files})
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-xl bg-green-300">Welcome to Remix</h1>
      <div className="my-10">
      <div className="flex justify-around">
        <div>
          <input type="file" name="csv" onChange={handle} />
        </div>
        <div>
          <input type="file" name="csv2" onChange={handle} />
        </div>
      </div>
      </div>
    </div>
  );
}
