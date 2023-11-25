import Input from "../components/Input";
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <h2 className="text-3xl font-bold text-center">
        <span className="title1">Mark</span>
        <span className="title2">Mate</span>
      </h2>
      <p className="text-center text-md mt-2 text-neutral-400">
        An AI Marketing Email Campaign Generator
      </p>

      <Input />
    </div>
  );
}
