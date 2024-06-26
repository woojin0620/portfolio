import React, { useEffect, useRef } from "react";
import { Engine, Render, World, Bodies, MouseConstraint, Body, Mouse } from "matter-js";


function Moving() {

  const scene = useRef();
  let engine = useRef(Engine.create());
  let idRAF = null;
  let mouseConstraint = MouseConstraint.create(engine.current);
  

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
      let radius = 2 + Math.random() * 5
      World.add(engine.current.world, Bodies.circle(
        20 + Math.random() * cw,
        5 + Math.random() * ch,
        radius, {
          render: {
            fillStyle: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"][Math.round(Math.random() * 3)]
          }
      
        }
      ))
      }

      
    let inc = 0
    setTimeout(function update() {
    engine.current.world.gravity.y = 0.5
    
    if(inc > 8){
      engine.current.world.gravity.x = 0
      engine.current.world.gravity.y = 0
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

  const handleAddCircle = e => {
    
    const ball = Bodies.circle(
      e.clientX,
      e.clientY,
      1,
      {
        mass: 1,
        restitution: 1,
        friction: 1,
        render: {
          fillStyle: "transparent"
        }
      })
    World.add(engine.current.world, [ball])
  
}

  return (
    <div onMouseMove={handleAddCircle}>
      
      <div ref={scene} style={{ width: '100%', height: '100%' }}>
        
      </div>
        
    </div>
  )
}

export default Moving;