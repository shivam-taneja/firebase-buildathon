
export default function Features() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Line-by-line explanation</h3>
            <p>Get clear, plain-English explanations for every line of code.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Overall summary</h3>
            <p>Understand the code's purpose and functionality at a glance.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Visual flowchart</h3>
            <p>Visualize the code's logic with a customizable flowchart.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
