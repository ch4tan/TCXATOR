import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from "./Components/Navbar";
import About from './Pages/About';
import Multiple from './Pages/Multiple';
import Single from './Pages/Single';
import NotFound from './Pages/NotFound';

const App = () => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-black via-gray-900 to-gray-800 h-full">
      < BrowserRouter>
          <Navbar />
            <Routes>
              <Route path='/' element={<About />} />
              <Route path='/Multiple' element={<Multiple />} />
              <Route path='/Single' element={<Single />} /> 
              <Route path='*' element={<NotFound />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;