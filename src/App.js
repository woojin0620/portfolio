import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import Weather from './Weather';
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
