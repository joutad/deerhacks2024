import React from 'react'
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import IslandModel from '../models/IslandModel';
import '../styles/island.css'

const Island = () => {
  return (
    <div className='canvas-container'>
        <h1 id='islandHeader'>Your model</h1>
        <Canvas className='canvas' camera={{position: [0, 90, -325]}}>
            <Suspense fallback={null}>
                <IslandModel position={[0, 0, 0]}/>
                <OrbitControls/>
            </Suspense>
        </Canvas>
    </div>
  )
}

export default Island