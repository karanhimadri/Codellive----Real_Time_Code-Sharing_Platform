import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './pages/Footer';
import CodeSpace from './pages/CodeSpace';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FeaturesSection from './pages/FeaturePage';
import FAQSection from './pages/FAQs';
import ContactUsSection from './pages/ContactUs';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/code-space' element={<CodeSpace />} />
        <Route path='/features' element={<FeaturesSection />} />
        <Route path='/faqs' element={<FAQSection />} />
        <Route path='/contact' element={<ContactUsSection />} />
      </Routes>
      <Footer />
      <ToastContainer
        autoClose={2500}
        toastClassName="flex items-center space-x-2 px-4 py-2"
        bodyClassName="flex items-center"
      />
    </div>
  );
};

export default App;
