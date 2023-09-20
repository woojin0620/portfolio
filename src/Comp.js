import React from 'react'
import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'


function Comp () {
  const scene = useRef()
  const engine = useRef(Engine.create())

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

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, ch / 2, 420, 70, { isStatic: true, render:{fillStyle: "none"} }),
      // Bodies.rectangle(10, ch / 2, 20, ch, { isStatic: true }),
      // Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      // Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])

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

  

  const handleAddCircle = e => {
    
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            
          }
        })
      World.add(engine.current.world, [ball])
    
  }

  window.onresize = function(){
    document.location.reload();
  }

  return (
    <div onMouseMove={handleAddCircle}>
      
      <div ref={scene} style={{ width: '100%', height: '100%' }}>
        
      </div>
        
        
    </div>
  )
}


export default Comp