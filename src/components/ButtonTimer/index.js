import React, { useState, useEffect } from "react";
import Button from "components/CustomButtons/Button.js";
import $ from "jquery";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { resendSms } from "../../store/ducks/Message";

const ButtonTimer = () => {
  const dispatch = useDispatch();
  const {
    signer: { token: tokenSigner },
    signup: { token: tokenSignup },
    message: { status, type },
  } = useSelector((state) => state);
  const { enqueueSnackbar } = useSnackbar();
  const [buttonresend, setbuttonresend] = useState(true);
  const [durationTime, setduration] = useState(1);

  useEffect(() => {
    if (status === "completed" && type === "SMS") {
      enqueueSnackbar("SMS enviado com sucesso", { variant: "success" });
    } else if (status === "failed" && type === "SMS") {
      enqueueSnackbar("Token não validado", { variant: "error" });
    }
  }, [status]);

  const resendToken = () => {
    setduration(durationTime + 1);
    setbuttonresend(true);
    console.log(tokenSigner);
    if (!!tokenSignup) {
      dispatch(resendSms(tokenSignup));
    } else {
      dispatch(resendSms(tokenSigner));
    }
  };

  const StartTimer = (duration) => {
    if (buttonresend) {
      let timer = duration * 60;
      let interval = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $("#timersend").html(minutes + ":" + seconds);
        if (--timer < 0) {
          timer = duration;
          clearInterval(interval);
          $("#timersend").html("");
          setbuttonresend(false);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    StartTimer(durationTime);
  }, [durationTime]);

  return (
    <Button
      style={{ margin: 10 }}
      onClick={resendToken}
      variant="contained"
      size="sm"
      color="primary"
      disabled={buttonresend}
    >
      Reenviar SMS&nbsp;<div id="timersend"></div>
    </Button>
  );
};
export default ButtonTimer;
