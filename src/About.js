import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Flyballs from './Flyballs';
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
            <p>interactive한 웹을 만드는것을 좋아합니다</p>
            <p>다양한 인터랙션을 사용하여 유저의 흥미를 끌어내는것이 목표입니다.</p>
        </div>
        
        </motion.div>
        </div>
        )
    }

export default About;