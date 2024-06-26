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
  const github = useRef();
  const mouseConstraint = MouseConstraint.create(engine.current);
  const mobileDevice = parseInt(window.getComputedStyle(document.body).width) < 768

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
    const ghElement = github.current;
    const ghCircle = ghElement.getBoundingClientRect();
    const ghRadius = ghCircle.width;
    

    const aboutBody = Bodies.circle(
      window.innerWidth / 4,
      window.innerHeight / 4, //초기 생성 위치
      
      abRadius,
      {
        restitution : 1, //탄력값
        isStatic: false,
        render: {
          visible: false,
          
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

    let githubBodyX = window.innerWidth / 1;
    let githubBodyY = window.innerHeight / 4;

    if (parseInt(window.getComputedStyle(document.body).width) < 1200){
      githubBodyX = window.innerWidth / 3;
  }
    //가로 1200px 미만일시 초기생성위치 수정

    const githubBody = Bodies.circle(
      githubBodyX,
      githubBodyY,
      
      ghRadius,
      {
        restitution : 1,
        isStatic: false,
        render: {
          visible: true,
          sprite:{
          texture: `${process.env.PUBLIC_URL}/githublogo.png`, // public 디렉터리의 PNG 이미지 경로
            xScale: (ghCircle.width / (9 * ghRadius)), // 이미지의 x축 스케일 조정
            yScale: (ghCircle.height / (9 * ghRadius)) // 이미지의 y축 스케일 조정
          }
        }
      }
    );

    
  World.add(engine.current.world, [aboutBody, weatherBody, wordleBody, boogleBody, githubBody]);
  
  for (let i = 0; i < 230; i++) {
    let radius = 2 + Math.random() * 20
    if(mobileDevice){
      radius = 2+ Math.random() * 15
    }
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
    
    function setElementPosition(element, body, radius) {
      element.style.left = `${body.position.x - radius}px`;
      element.style.top = `${body.position.y - radius}px`;
  }
  
  setElementPosition(abElement, aboutBody, abRadius);
  setElementPosition(wtElement, weatherBody, wtRadius);
  setElementPosition(wdElement, wordleBody, wdRadius);
  setElementPosition(bgElement, boogleBody, bgRadius);
  setElementPosition(ghElement, githubBody, ghRadius);
}); // Matter.js 바디 위치에 따라 버튼 위치 업데이트


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
      <Link to='/about'><button ref={about} className='lkabout'>what is this?</button></Link>
      
      <Link to='/weather'><button ref={weather} className='lkweather'>weather</button></Link>

      <Link to='https://woojin0620.github.io/wordle/'><button ref={wordle} className='lkwordle'>wordle</button></Link>

      <Link to='https://woojin0620.github.io/boogle/'><button ref={boogle} className='lkboogle'>boogle</button></Link>

      <Link to='https://github.com/woojin0620/'><button ref={github} className='lkgithub'></button></Link>
    </div>
    </div>
    </motion.div>
    </div>

    
  )
  }


export default Home;
