import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Comp from './Comp'



function Home (){
  const [xy,setXY]=useState({x:0,y:0})
      const handleMouseMove=(e)=>{
            setXY({x:e.clientX,y:e.clientY});
        }
        document.onmousemove=(e)=>handleMouseMove(e);
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
      <Comp/>
      <div className='pointer' style={{position:"absolute",left:xy.x,top:xy.y}}>
        add<br/>balls!
      </div>
    <div className='title'>
      <h1 className='hmh1'>
        기깔나는 제목 생각중
      </h1>
    <div className='buttons'>
      <Link to='/about' className='lkabout'>about</Link>
      <Link to='/projects' className='lkproject'>project</Link>
    </div>
    </div>
    </motion.div>
    </div>

    
  )
  }


export default Home;
