import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
    return (
        <BrowserRouter>
            <div className="App">
            
                <Routes>
                    
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/about" element={<About />} />

                    <Route path="/projects" element={<Projects />} />
                    
                </Routes>

            </div>
            
        </BrowserRouter>
    );
}


export default App;
