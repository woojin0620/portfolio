import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Flyballs from './Flyballs';




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
        <Link to='/' className='lkhome'>뒤로</Link>
        <div className='title'> 
            <h1 className='abh1'>about 페이지</h1>
            <p></p>
        <p>내용 구상중</p>
        </div>
        
        </motion.div>
        </div>
        )
    }

export default About;