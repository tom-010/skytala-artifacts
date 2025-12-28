import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <Link 
              to="/" 
              className="flex items-center gap-2 group opacity-90 hover:opacity-100 transition-opacity"
              aria-label="Home"
            >
              <LayoutGrid size={16} className="text-[#1D1D1F]" strokeWidth={2} />
              <span className="font-medium tracking-tight text-[13px]">Lumina</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6 text-[12px] font-normal tracking-wide text-[#424245]">
              <Link to="/" className={`hover:text-black transition-colors ${location.pathname === '/' ? 'text-black' : ''}`}>
                Showcase
              </Link>
              <a href="#" className="hover:text-black transition-colors">Resources</a>
              <a href="#" className="hover:text-black transition-colors">Support</a>
              <a href="#" className="hover:text-black transition-colors">Company</a>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-[10px] font-medium text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full hidden sm:block">Internal v2.4</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-12">
        {children}
      </main>

      <footer className="bg-[#F5F5F7] text-[#424245] border-t border-gray-200 py-16 mt-auto text-[12px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 mb-12">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Productivity</a></li>
                <li><a href="#" className="hover:underline">Developer Tools</a></li>
                <li><a href="#" className="hover:underline">Design</a></li>
                <li><a href="#" className="hover:underline">Analytics</a></li>
              </ul>
            </div>
            <div>
               <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="hover:underline">Documentation</a></li>
                 <li><a href="#" className="hover:underline">API Status</a></li>
                 <li><a href="#" className="hover:underline">Jira Board</a></li>
               </ul>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-3">Stay Updated</h4>
              <div className="flex max-w-sm gap-2">
                <input type="email" placeholder="Email address" className="flex-1 rounded-lg border-gray-300 bg-white px-3 py-1.5 focus:border-blue-500 focus:ring-blue-500 outline-none" disabled />
                <button className="bg-[#0071e3] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#0077ED] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">
              Copyright &copy; {new Date().getFullYear()} Lumina Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-gray-900">Privacy Policy</a>
               <a href="#" className="hover:text-gray-900">Terms of Use</a>
               <a href="#" className="hover:text-gray-900">Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};