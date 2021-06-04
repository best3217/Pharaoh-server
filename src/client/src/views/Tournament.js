import gsap from "gsap"
import { useEffect } from "react"

const Tournament = () => {
  useEffect(() => {
  /*eslint-disable */
    var tween = gsap.to(".green", {
      duration: 1, 
      x: 750, 
      rotation: 360, 
      ease: "none", 
      paused: true
    });
    
    // click handlers for controlling the tween instance...
    document.querySelector("#play").onclick = () => tween.play();
    document.querySelector("#pause").onclick = () => tween.pause();
    document.querySelector("#resume").onclick = () => tween.resume();
    document.querySelector("#reverse").onclick = () => tween.reverse();
    document.querySelector("#restart").onclick = () => tween.restart();
  /*eslint-disable */
  }, [])
  return (
    <div className='mt5'>
        <div className="box green" style={{width:'100px', height:'100px', display:'block', background:'red'}}></div>
   
        <div className="nav mt-2">
          <button id="play">play()</button>
          <button id="pause">pause()</button>
          <button id="resume">resume()</button>
          <button id="reverse">reverse()</button>
          <button id="restart">restart()</button>
        </div>
    </div>
  )
}

export default Tournament
