import React, { useState, useEffect } from "react";
import Button from "components/CustomButtons/Button.js";
import $ from "jquery";

const ButtonTimer = () =>{
  
  const [buttonresend, setbuttonresend] = useState(true);
  const [durationtime, setduration] = useState(1);  

  const resendtoken = () =>{
    setduration(durationtime + 1)
    setbuttonresend(true);
  }

  const StartTimer =(duration)=> {
      if(buttonresend){
      let timer = duration * 60
      let interval = setInterval(function () {
          let minutes = parseInt(timer / 60, 10);
          let seconds = parseInt(timer % 60, 10);          
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          $('#timersend').html( minutes + ":" + seconds);         
          if (--timer < 0) {
              timer = duration;
              clearInterval(interval);
              $('#timersend').html('')
              setbuttonresend(false)
            }
    }, 1000);
    }
}

 useEffect(() => {
    StartTimer(durationtime)   
 });

return(
    <Button style={{margin:10}} onClick={resendtoken} variant="contained" size="sm" color="primary" disabled={buttonresend} >
    Reenviar SMS&nbsp;<div id="timersend"></div>
    </Button>
);

}
export default ButtonTimer;