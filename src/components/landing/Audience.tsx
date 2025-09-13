
export default function Audience() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Who is this for?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Students & New Learners</h3>
            <p>Learn faster by turning confusing code into clear explanations and diagrams.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Content Creators & Educators</h3>
            <p>Auto-generate step-by-step breakdowns and visuals for tutorials, blogs, or courses.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-.lg text-center">
            <h3 className="text-xl font-bold mb-2">Organizations & Teams</h3>
            <p>Speed up knowledge transfer and onboarding by generating shareable explanations of existing code.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
