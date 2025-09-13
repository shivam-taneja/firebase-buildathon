
import Hero from "./components/landing/Hero";
import CoreFunctionality from "./components/landing/CoreFunctionality";
import Features from "./components/landing/Features";
import Audience from "./components/landing/Audience";
import Footer from "./components/landing/Footer";

function App() {
  return (
    <div className="bg-gray-900 text-white">
      <Hero />
      <CoreFunctionality />
      <Features />
      <Audience />
      <Footer />
    </div>
  );
}

export default App;
