export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Landing Section */}
      <section className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 text-black">
          <h1 className="text-4xl font-bold mb-4">Test</h1>
          <p className="text-lg mb-6 max-w-2xl">
            This is a dynamic landing section that can be customized with your
            content.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
