import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import {AnimatePresence} from "framer-motion"
import Background from "./components/Background"

const App = () => {
  const location = useLocation;

  return (
    <div data-theme = "claimgen" className="min-h-screen relative">
      <Toaster/>
      <Background/>
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.path}>
            <Route path = "/" element = {<AuthPage/>}></Route>  
          </Routes>
          
        </AnimatePresence>
      </main>

    </div>
  );
}

export default App
