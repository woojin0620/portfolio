import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Flyballs from '../components/Flyballs';
import { Button } from 'react-bootstrap';




function About() {

    return (
        <div className='about'>
        <motion.div initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <Flyballs/>
        <Link to='/' className='lkhome'><Button variant='light'>뒤로</Button></Link>
        <div className='title'> 
            <h1 className='abh1'>반갑습니다!</h1>
            <p><span>Matter.js</span>를 이용하여 interaction을 적용한 react 페이지 입니다.</p>
            <p>Open Weather API를 활용한 프로젝트를 제작하던중 <span>Matter.js</span>라는 </p>
            <p>재미있어 보이는 라이브러리를 발견하여 시각적 즐거움을 위해 프로젝트에 적용해보았습니다.</p>
            
        </div>
        
        </motion.div>
        </div>
        )
    }

export default About;