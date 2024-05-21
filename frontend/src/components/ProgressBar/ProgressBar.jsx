import React, { useEffect, useState } from 'react'
import '../ProgressBar/styles.css'

const ProgressBar = ({value = 50}) => {

//  const [value, setValue] = useState(0)
//  useEffect(()=>{
//     setInterval(()=>{
//         setValue((val)=> val + 1)
//     },100)
//  },[])

const [percent, setPercent] = useState(value)
useEffect(()=>{
    setPercent(Math.min(100, Math.max(value, 0)))
}, value)

  return (
    <div className='app'>
        <div className='progress'>
            <div style={{width: `${percent}%`}}></div>
        </div>
        <span>{value.toFixed()}%</span>
    </div>
  )
}

export default ProgressBar;