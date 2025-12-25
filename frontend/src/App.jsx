import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Result from './pages/Result';
import Home from './pages/Home';
import ByCredit from './pages/ByCredit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    // Changed to Zinc/Indigo palette for a high-end SaaS feel
    <div className='min-h-screen text-slate-900 bg-[#fcfdff] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] selection:bg-indigo-100'>
      <ToastContainer position='bottom-right' />
      
      {/* Enhanced Login Overlay with heavier blur */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-slate-900/20 transition-all">
          <Login />
        </div>
      )}

      <div className='max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24'>
        <Navbar />
        
        {/* Added a subtle slide-up animation to the entire route container */}
        <main className='animate-in fade-in slide-in-from-bottom-4 duration-1000'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/result' element={<Result />} />
            <Route path='/buy' element={<ByCredit />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default App;