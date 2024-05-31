import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import About from './pages/About';
import Weather from './pages/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    const handleTouchStart = (event) => {
        
        const touch = event.touches[0];
        const touchEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          screenX: touch.screenX,
          screenY: touch.screenY,
          clientX: touch.clientX,
          clientY: touch.clientY
        });
  
        touch.target.dispatchEvent(touchEvent);
      };
  
      window.addEventListener('touchstart', handleTouchStart);
    // 터치를 클릭으로 인식하도록 변경

    window.onresize = function(){
        document.location.reload(); //창크기 변경시 페이지 새로고침
      };

      window.addEventListener('orientationchange', function() {
        document.location.reload(); //화면 회전시 페이지 새로고침
    });

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
