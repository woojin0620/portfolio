import React, { useEffect, useRef } from "react";
import { Engine, Render, World, Bodies, MouseConstraint, Body, Mouse } from "matter-js";


function Flyballs() {

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
  
        Bodies.rectangle(cw / 2, ch / 2.02, 310, 20, {
          isStatic: true,
          render: {
            fillStyle: "none"
          }
        }),
        
        Bodies.rectangle(cw / 2, (ch / 2) - 45, 210, 40, {
          isStatic: true,
          render: {
            fillStyle: "none"
          }
        }),
        Bodies.rectangle(cw / 2, (ch / 2) + 35, 500, 20, {
          isStatic: true,
          render: {
            fillStyle: "none"
          }
        }),
        // .title Bodies

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
      engine.current.world.gravity.x = Math.cos(inc / 70)
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
    <div>
      
      <div ref={scene} style={{ width: '100%', height: '100%' }}>
        
      </div>
        
    </div>
  )
}

export default Flyballs;