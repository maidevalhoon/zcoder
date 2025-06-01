'use client'
import React from 'react'
import { Suspense } from 'react'
import Roomcomponent from '../components/Room'
const Room = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Roomcomponent/>
    </Suspense>
    
  )
}

export default Room