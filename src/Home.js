import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Comp from './Comp'
import { Button } from 'react-bootstrap';

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
          <span>E</span>
          <span>X</span>
          <span>P</span>
          <span>E</span>
          <span>R</span>
          <span>I</span>
          <span>E</span>
          <span>N</span>
          <span>C</span>
          <span>E</span>
          <br/>
          <span>I</span>
          <span>N</span>
          <span>T</span>
          <span>E</span>
          <span>R</span>
          <span>A</span>
          <span>C</span>
          <span>T</span>
          <span>I</span>
          <span>O</span>
          <span>N</span>
      </h1>
      
    <div className='buttons'>
      <Link to='/about' className='lkabout'><Button variant='light'>about</Button></Link>
      
      <Link to='/weather' className='lkweather'><Button variant='light'>weather</Button></Link>

      <Link to='https://woojin0620.github.io/wordle/' className='lkwordle'><Button variant='light'>wordle</Button></Link>

      <Link to='https://woojin0620.github.io/boogle/' className='lkboogle'><Button variant='light'>boogle</Button></Link>
    </div>
    </div>
    </motion.div>
    </div>

    
  )
  }


export default Home;
