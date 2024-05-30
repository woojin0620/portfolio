import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Engine, Render, World, Bodies, MouseConstraint} from "matter-js";
import { Button } from 'react-bootstrap';




function About() {

    const scene = useRef();
    let engine = useRef(Engine.create());
    let idRAF = null;
    let mouseConstraint = MouseConstraint.create(engine.current);
    const mobileDevice = parseInt(window.getComputedStyle(document.body).width) < 500;
  
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
          background: 'transparent',
          
        }
      })
  
      World.add(engine.current.world, mouseConstraint);
  
      cancelAnimationFrame(idRAF);
      engine.current.world.gravity.x = 0;
      engine.current.world.gravity.y = 0;
      
  
    World.add(engine.current.world, [
          Bodies.rectangle(cw / 2, ch - 1, cw, 4, {
            isStatic: true,
            render: {
              fillStyle: "transparent"
            }
          }),
          Bodies.rectangle(cw / 2, -1, cw, 4, {
            isStatic: true,
            render: {
              fillStyle: "transparent"
            }
          }),
          Bodies.rectangle(-1, ch / 2, 4, ch, {
            isStatic: true,
            render: {
              fillStyle: "transparent"
            }
          }),
          Bodies.rectangle(cw - 1, ch / 2, 4, ch, {
            isStatic: true,
            render: {
              fillStyle: "transparent"
            }
          })
  //  테두리 Bodies
          ]
      );
      
      for (let i = 0; i < 230; i++) {
        let radius = 2 + Math.random() * 30
        if(mobileDevice){
            radius = 2 + Math.random() *10;
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
  
        
  
  
        
      let inc = 0
      setTimeout(function update() {
      engine.current.world.gravity.y = 1
      
      if(inc > 8){
        engine.current.world.gravity.x = Math.cos(inc / 50)
        engine.current.world.gravity.y = Math.sin(inc / 70)
      }
      inc++
      idRAF = requestAnimationFrame(update.bind(this))
      },500);
      
      
      
      
  
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
      }
    }, [])
  
    
  
    window.onresize = function(){
      document.location.reload();
    }

    return (
        <div className='about'>
        <motion.div initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <div ref={scene} style={{ width: '100%', height: '100%' }}>
        <Link to='/' className='lkhome'><Button variant='light'>뒤로</Button></Link>
        <div className='title'> 
            <h1 className='abh1'>반갑습니다!</h1>
            <p><span>Matter.js</span>를 이용하여 interaction을 적용한 react 페이지 입니다.</p>
            <p>Open Weather API를 활용한 프로젝트를 제작하던중 <span>Matter.js</span>라는 </p>
            <p>재미있어 보이는 라이브러리를 발견하여 시각적 즐거움을 위해 프로젝트에 적용해보았습니다.</p>
            
        </div>
        </div>
        </motion.div>
        </div>
        )
    }

export default About;