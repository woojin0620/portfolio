import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import About from './pages/About';
import Weather from './pages/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
            
                <Routes>
                    
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/about" element={<About />} />

                    <Route path="/weather" element={<Weather />} />
                    
                </Routes>

            </div>
            
        </BrowserRouter>
    );
}


export default App;
