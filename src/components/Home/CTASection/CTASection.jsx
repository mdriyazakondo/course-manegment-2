"use client";
import { FaRocket } from "react-icons/fa";

const CallACtion = () => {
  return (
    <section className="w-full mt-12 py-20 bg-linear-to-b from-blue-500 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Take Your Skills to the Next Level
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Join thousands of learners who are boosting their careers with our
          expert-led courses.
        </p>

        <button className="flex items-center gap-3 bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer">
          <FaRocket size={20} />
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default CallACtion;
