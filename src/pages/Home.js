import React, { useState, useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Events, MouseConstraint, Body } from 'matter-js'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


function Home (){
  const [xy,setXY]=useState({x:0,y:0})
      const handleMouseMove=(e)=>{
            setXY({x:e.clientX,y:e.clientY});
        }
        document.onmousemove=(e)=>handleMouseMove(e);

  const scene = useRef();
  const engine = useRef(Engine.create());
  const about = useRef();
  const weather = useRef();
  const wordle = useRef();
  const boogle = useRef();
  const mouseConstraint = MouseConstraint.create(engine.current);
  let idRAF = null;

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

    World.add(engine.current.world, mouseConstraint);

    cancelAnimationFrame(idRAF);
    engine.current.world.gravity.x = 0;
    engine.current.world.gravity.y = 0; //중력값

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2 , ch , cw / 1.05 , 10, { isStatic: true, render : {fillStyle : "none"} }), //하단
      Bodies.rectangle(1 , ch / 2 , 5, ch / 1.2, { isStatic: true, render :{fillStyle : "none"} }), //좌측
      Bodies.rectangle(cw , ch / 2 , 5, ch / 1.2, { isStatic: true, render :{fillStyle : "none"} }), //우측
      Bodies.rectangle(cw / 2 , 1 , cw , 5, { isStatic: true, render :{fillStyle : "none"} }), //상단
      // Bodies.rectangle(cw / 2 , ch / 2 , 250 , 45, { isStatic: true, render :{fillStyle : "none"} }), //중앙
    ]);

    
    
    const abElement = about.current;
    const abCircle = abElement.getBoundingClientRect();
    const abRadius = abCircle.width; // 버튼의 반지름 계산
    const wtElement = weather.current;
    const wtCircle = wtElement.getBoundingClientRect();
    const wtRadius = wtCircle.width;
    const wdElement = wordle.current;
    const wdCircle = wdElement.getBoundingClientRect();
    const wdRadius = wdCircle.width;
    const bgElement = boogle.current;
    const bgCircle = bgElement.getBoundingClientRect();
    const bgRadius = bgCircle.width;
    

    const aboutBody = Bodies.circle(
      window.innerWidth / 4,
      window.innerHeight / 4, //초기 생성 위치
      
      abRadius,
      {
        restitution : 1, //탄력값
        isStatic: false,
        render: {
          visible: true,
          
        }
      }
    );

    const weatherBody = Bodies.circle(
      window.innerWidth / 3.5,
      window.innerHeight / 4,
      
      wtRadius,
      {
        restitution : 1,
        isStatic: false,
        render: {
          visible: false
        }
      }
    );

    const wordleBody = Bodies.circle(
      window.innerWidth / 3,
      window.innerHeight / 4,
      
      wdRadius,
      {
        restitution : 1,
        isStatic: false,
        render: {
          visible: false
        }
      }
    );

    const boogleBody = Bodies.circle(
      window.innerWidth / 2,
      window.innerHeight / 4,
      
      bgRadius,
      {
        restitution : 1,
        isStatic: false,
        render: {
          visible: false
        }
      }
    );

    
  World.add(engine.current.world, [aboutBody, weatherBody, wordleBody, boogleBody]);
  
  for (let i = 0; i < 230; i++) {
    let radius = 2 + Math.random() * 20
    World.add(engine.current.world, Bodies.circle(
      40 + Math.random() * cw - 80,
      40 + Math.random() * 100,
      radius, {
        render: {
          fillStyle: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"][Math.round(Math.random() * 3)]
        }
    
      }
    ))
    }
    

// Matter.js 이벤트 리스너 설정
Events.on(engine.current, 'afterUpdate', () => {
    // Matter.js 바디 위치에 따라 버튼 위치 업데이트
    abElement.style.left = `${aboutBody.position.x - abRadius}px`;
    abElement.style.top = `${aboutBody.position.y - abRadius}px`;
    wtElement.style.left = `${weatherBody.position.x - wtRadius}px`;
    wtElement.style.top = `${weatherBody.position.y - wtRadius}px`;
    wdElement.style.left = `${wordleBody.position.x - wdRadius}px`;
    wdElement.style.top = `${wordleBody.position.y - wdRadius}px`;
    bgElement.style.left = `${boogleBody.position.x -bgRadius}px`;
    bgElement.style.top = `${boogleBody.position.y -bgRadius}px`;
    
});


setTimeout(function update() {
  engine.current.world.gravity.y = 0.5

idRAF = requestAnimationFrame(update.bind(this))
    },500); //설정 시간 뒤 중력값 적용
    
    Engine.run(engine.current)
    Render.run(render)



    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}

    };
  }, []);

    
    
  
  window.onresize = function(){
    document.location.reload(); //창크기 변경시 페이지 새로고침
  }

  return(
    <div className='home'>
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
          }}>
      <div ref={scene} style={{ width: '100%', height: '100%' }}>
      <div className='pointer' style={{position:"absolute",left:xy.x,top:xy.y}}>
        Welcome!
      </div>
    <div className='title'>
      <h1 className='hmh1'>
          <span>H</span>
          <span>e</span>
          <span>l</span>
          <span>l</span>
          <span>o</span>

          <span>W</span>
          <span>o</span>
          <span>r</span>
          <span>l</span>
          <span>d</span>
          <span>!</span>
      </h1>
      
    
    </div>
    <div className='buttons'>
      <Link to='/about'><button ref={about} className='lkabout'>about</button></Link>
      
      <Link to='/weather'><button ref={weather} className='lkweather'>weather</button></Link>

      <Link to='https://woojin0620.github.io/wordle/'><button ref={wordle} className='lkwordle'>wordle</button></Link>

      <Link to='https://woojin0620.github.io/boogle/'><button ref={boogle} className='lkboogle'>boogle</button></Link>
    </div>
    </div>
    </motion.div>
    </div>

    
  )
  }


export default Home;
