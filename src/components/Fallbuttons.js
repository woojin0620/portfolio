import React from 'react'
import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Events, Composite, MouseConstraint } from 'matter-js'
import { color } from 'framer-motion';


function FallButtons () {
  const scene = useRef();
  const engine = useRef(Engine.create());
  const buttonRef = useRef();
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
    engine.current.world.gravity.y = 0;

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2 , ch , cw / 1.05 , 10, { isStatic: true, render : {fillStyle : "red"} }),
      Bodies.rectangle(1 , ch / 2 , 10, ch / 1.2, { isStatic: true, render :{fillStyle : "red"} }),
      Bodies.rectangle(cw , ch / 2 , 10, ch / 1.2, { isStatic: true, render :{fillStyle : "red"} }),
      Bodies.rectangle(cw / 2 , 1 , cw , 10, { isStatic: true, render :{fillStyle : "red"} }),
    ]);

    
    
    const buttonElement = buttonRef.current;
    const buttonRect = buttonElement.getBoundingClientRect();
    const radius = buttonRect.width; // 버튼의 반지름 계산

    const buttonBody = Bodies.circle(
      window.innerWidth / 3,
      window.innerHeight / 4,
      
      radius,
      {
        restitution : 1,
        isStatic: false,
        render: {
          visible: true
        }
      }
    );

    

  World.add(engine.current.world, buttonBody);

    

// Matter.js 이벤트 리스너 설정
Events.on(engine.current, 'afterUpdate', () => {
    // Matter.js 바디 위치에 따라 버튼 위치 업데이트
    buttonElement.style.left = `${buttonBody.position.x - radius}px`;
    buttonElement.style.top = `${buttonBody.position.y - radius}px`;
});

setTimeout(function update() {
  engine.current.world.gravity.y = 0.5

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
  }, []);

    


  
  window.onresize = function(){
    document.location.reload();
  }

  return (
    <div>
      
      <div ref={scene} style={{ width: '100%', height: '100%' }}>
        <button ref={buttonRef} style={{position : 'absolute', width : '100px', height : '100px', borderRadius : '50%'}}>button</button>
      </div>
        
        
    </div>
  )
}


export default FallButtons