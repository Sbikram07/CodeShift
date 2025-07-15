import React from "react";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm md:text-base">
        {/* Brand & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-600 p-2 rounded-lg">
           <img src="/code-solid.svg" alt="code logo"  className="min-w-5 min-h-6"/>
            </div>
            <h2 className="text-xl font-bold">SyntaxFlow</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            The fastest and most secure way to convert between code formats.
            Built with privacy and performance in mind.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-xl text-gray-400">
            <a
              href="https://github.com/Sbikram07/CodeShift"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Converter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                API
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Examples
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Status
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © 2025 SyntaxShift. All rights reserved. Built with{" "}
        <span className="text-red-500">❤️</span> for developers.
      </div>
    </footer>
  );
};

export default Contact;
