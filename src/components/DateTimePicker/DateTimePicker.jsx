import React, { useEffect, useState } from 'react';
import "./DateTimePicker.css"

const DateTimePicker = () => {
      
    const [start,setStart] = useState(false)  //state to toggle the button
    const [goalTimer,setGoalTimer] = useState('')  // state to capture the input timer
    const [remainingTime,setRemainingTime] = useState('') // state to hold the remaining time
    const [finish,setFinish] = useState(false) //state to mark the finish of timer
    const [error,setError] = useState('') // state to display errors
   

    //function to capture input date
    const changeHandler = (e)=>{
      setGoalTimer(e.target.value)
    }

    //onclick function of button
    const countdownStarter = ()=>{
      setStart((prev)=>!prev)
      setFinish(false)
    }
   
    //useeffect hook that gets called everytime "start" state changes
    useEffect(()=>{
       
      let interval = null
         if(start){

          //creating interval
            interval = setInterval(function(){
                
              //present date
               let now = new Date().getTime()
               //input date
               let target = new Date(goalTimer).getTime()
               //difference between dates
               let difference = target - now
                 
               //conditioning based on difference value
               if(difference >(99*24*60*60*1000)){
                  //if difference is greter than 100 days
                setError('count down can not exceed more than 100 days')
                setStart(false)
                       
               }else if (difference <0){
                //when difference ==0
                       
                      setStart(false)   //reseting button state
                      setGoalTimer('')   // reseting input timer
                      setRemainingTime('')  //reseting remaining timer
                      setFinish(true)   //marking count as finished
                      setError('')       //setting error to none
               }else if( isNaN(difference)){
                  // difference is NAN
                        setStart(false)  // reseting button state
                        setError('timer is not set..')  // setting error
               } else{
                  //when there is no error
                setRemainingTime(difference)  // we will set the difference to the "remainingtime" state
                setError('')                  //setting error to none
               }
    
            },1000)
         }else{
             //when start is false , we will clear the interval
             clearInterval(interval)  //clearing the interval
             setGoalTimer('')         //setting input date to none
             setRemainingTime('')    // setting the remaining to none
         }

         return ()=>{
          clearInterval(interval)
         }

    },[start])



  return (
    <div className='date-time-picker'>
       <p className='header'>COUNTDOWN -TIMER</p>
      <input onChange={(e)=>{changeHandler(e)}} value={goalTimer}  type="datetime-local" />
      <button className='countdown-btn' onClick={countdownStarter}>{start ? ("STOP TIMER"):("START TIMER")}</button>
        

        {(finish && error.length===0) ?(<div className='count-success'>the countdown is completed...Hureeeh ! </div>):
        ( "")}

        {(finish===false && error.length===0)?(
              <div className='countdown-timer'>
              <p> {Math.floor(remainingTime / (1000 * 60 * 60 * 24))} Days</p>
              <p> {Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} Hours</p>
              <p> {Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))} Minutes</p>
              <p> {Math.floor((remainingTime % (1000 * 60)) / 1000)} Seconds</p>
            </div>
        ):("")}

        {error.length >0 ? (<div className='count-error'>{error}</div>):(<div></div>)}
     
    </div>
  );
}

export default DateTimePicker;
