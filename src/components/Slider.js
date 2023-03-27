import React, {useState,useEffect} from 'react';
import { useDrag } from '@use-gesture/react';
import '../App.css';

export default function Slider({min,max,step}) {

    // props passed to slider are constrained by [min: 0, max: 99]
    min = (min<0) ? 0 : min;
    max = (max>99) ? 99 : max;
    // check if step is passed as a prop
    step = (step) ? step : 0.5; 

    const [handle,setHandle] = useState(max/2);
    const [position, setPosition] = useState({x:(window.innerWidth*0.25)}); 

    useEffect (() => {
        window.addEventListener("resize", () => setPosition({x:window.innerWidth*0.25}));    
    });

    const positionDrag = useDrag((el) => {
        const range_base_last = (window.innerWidth*0.5);
        
        el.offset[0] = (el.offset[0]==0) ? (el.initial[0]-20) : el.offset[0];
        
        if (el.offset[0]<0) {
            setPosition({x:0})
            el.offset[0]=0;
        }else if (el.offset[0]>range_base_last){
            setPosition({x:range_base_last}) 
            el.offset[0]=range_base_last;     
        }else {
            let value_handle = ((el.offset[0]) / (window.innerWidth*0.5))*max;
            value_handle = Math.round(value_handle / step) * step;
            setPosition({x:el.offset[0]})
            setHandle(value_handle)
        }        
    });
   
  return (
    <>
        <div className='range-base'>
            <div className='range'
                style={{
                    width: position.x
                }}>
            </div>
            <div className='dragger' tabIndex="0" {...positionDrag()}
                style={{
                    left: position.x
                }}>
                <div className='dragger-text'>{handle}</div>
            </div>
        </div>
        <div className='min-max-text'>
            <span className='text-left'>{min}</span>
            <span className='text-right'>{max}</span>
        </div>
    </>
  )
}
