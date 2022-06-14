import {useEffect, useState} from "react";
import {postPhoneCode, postUserInfo} from "./API/API";
import Timer from "./Components/Timer";

function PhoneCertification() {

    const [code, setCode] = useState("");
    const [token, setToken] = useState("");
    const [isTimerRunning, setTimerRunning] = useState(true);
    useEffect(()=>{
        setToken(localStorage.getItem("token"));
    },[]);

    const confirmCode = () => {

        const codeInfo = {
            code: code,
            token: token,
        }
        postPhoneCode(codeInfo).then((res)=>{
            if(res.status===200){
                window.alert("휴대폰 인증에 성공했습니다")
                setTimerRunning(false);
            }
            else{
                window.alert("인증번호가 다릅니다")
            }
        })
            .catch(()=>{
                window.alert("인증번호 전송에 실패했습니다.");
            })

    }


  return (
      <div className="container">
        <h1>휴대폰 번호로 전송된 인증번호를 입력해 주세요</h1>
          <div className="labelWrapper">
              <label>인증번호 </label>
              <Timer setTimerRunning={setTimerRunning}/>
          </div>
                 <div className="inputWrapper">
              <input
                  placeholder="번호 6자리를 입력해주세요"
                  maxLength={6}
                  onChange={(e)=>{setCode(e.target.value)}}/>
                     <button className="resendButton">재전송</button>
          </div>
          {code.length===6 && isTimerRunning ? <button className="confirmButton" onClick={()=>{confirmCode()}}>본인인증하기</button> :
              <button className="confirmButtonDisable" disabled>본인인증하기</button>}

      </div>
  )
}

export default PhoneCertification;
