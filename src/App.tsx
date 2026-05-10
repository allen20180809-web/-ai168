import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MessageBoard from './pages/MessageBoard';
import Contact from './pages/Contact';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-primary-container selection:text-white">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/messages" element={<MessageBoard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </div>
        <Footer />
        
        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center group hover:w-48 transition-all duration-300 overflow-hidden z-40 cursor-pointer">
          <span className="material-symbols-outlined absolute left-5 group-hover:left-6 transition-all">edit_note</span>
          <span className="ml-8 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-headline">
            提交草稿
          </span>
        </button>
      </div>
    </Router>
  );
}

