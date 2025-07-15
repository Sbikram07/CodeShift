import React from 'react';
import { Button } from '@/components/ui/button';
import logo from '/logo.png';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import CodeAnimator from './CodeAnimator';

import  {HoverEffect}  from "../components/ui/card-hover-effect";
import About from './About';
import Contact from './Contact';


const languages = [
  {
    title: (
      <div className="flex items-center gap-2">
        <img src="/icons8-python.svg" alt="Python" className="h-6 w-6" />
        <span>Python</span>
      </div>
    ),
    description: "Great for AI, scripting, and automation.",
    link: "#",
  },
  {
    title: (
      <div className="flex items-center gap-2">
        <img src="/icons8-javascript.svg" alt="JavaScript" className="h-6 w-6" />
        <span>JavaScript</span>
      </div>
    ),
    description: "Interactive web programming language.",
    link: "#",
  },
  {
    title: (
      <div className="flex items-center gap-2">
        <img src="/icons8-c++.svg" alt="C++" className="h-6 w-6" />
        <span>C++</span>
      </div>
    ),
    description: "High-performance object orientd compiled language.",
    link: "#",
  },
  {
    title: (
      <div className="flex items-center gap-2">
        <img src="/icons8-c-programming.svg" alt="C++" className="h-6 w-6" />
        <span>C</span>
      </div>
    ),
    description: "High-performance low level  compiled language.",
    link: "#",
  },
  {
    title: (
      <div className="flex items-center gap-2">
        <img src="/icons8-java.svg" alt="C++" className="h-6 w-6" />
        <span>Java</span>
      </div>
    ),
    description: "compile once Run anywhere highly supportive programming language ",
    link: "#",
  },
  {
    title: (
      <div className="flex items-center gap-2">
        <img src="/icons8-rust.svg" alt="C++" className="h-6 w-6" />
        <span>Rust</span>
      </div>
    ),
    description: "popular programming language used to build everything from web servers to game engines.",
    link: "#",
  },
];

const Hero = () => {
  const { isLogin } = useAuth();
  const Navigate = useNavigate();

  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-br  from-black via-gray-900 to-black text-white px-6 py-12">
        <div className="max-w-5xl w-full text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Code Shifter Logo" className="w-20 h-20" />
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Shift the Way You Code
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Code Shifter lets you effortlessly convert code from one language to
            another with precision, speed, and developer-first UX.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap mb-10">
            <Button
              className="text-base px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                isLogin ? Navigate("/chat") : Navigate("/login");
              }}
            >
              Try It Now
            </Button>
            <Button
              variant="outline"
              className="text-base px-6 py-3 rounded-lg border-white text-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </div>

          {/* CodeAnimator placed separately with full width */}
          <div className="mt-10 w-full flex justify-center">
            <CodeAnimator />
          </div>
        </div>
        <div className="mt-20 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Languages We Support
          </h2>
          <HoverEffect items={languages} className="max-w-6xl mx-auto px-6" />
        </div>
        <About />
      </section>
      <Contact />
    </>
  );
};

export default Hero;
