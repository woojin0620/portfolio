import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import './Projects.css';
import Carousel  from './Carousel';

function projects() {
    return(
        <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
          }}>
            <Carousel/>
            <div className="drag-container">
                <Link to='/' className='lkhome'>뒤로</Link>
        <div className="spin-container">
          
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
          
          
          
          <a target="_blank" href="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg">
            <img src="" alt=""></img>
          </a>
      
          
          <video controls autoplay="autoplay" loop>
            <source src="" type="video/mp4"></source>
          </video>
      
          
          <p>작업물 넣을 예정</p>
        </div>
        <div id="ground"></div>
      </div>
      
        </motion.div>
    )
}

export default projects;