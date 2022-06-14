import {useEffect, useState} from "react";
import {postPhoneCode, postUserInfo} from "./API/API";
import Timer from "./Components/Timer";
import {useNavigate} from "react-router";
import {useAuthContext} from "./Context/AuthContext";

function PhoneCertification() {
    const {userInfo, token, setToken} = useAuthContext();
    const [code, setCode] = useState("");
    const [isTimerRunning, setTimerRunning] = useState(true);
    const [resend, setResend] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();


    const confirmCode = () => {
        const codeInfo = {
            code: code,
            token: token,
        }
        if(!token){
            window.alert("정상적인 요청이 아닙니다.");
            navigate("/identity-authentication");
        }
        else {
            setLoading(true);
            postPhoneCode(codeInfo).then((res) => {
                if (res.status === 200) {
                    window.alert("휴대폰 인증에 성공했습니다");
                } else {
                    window.alert("인증번호가 다릅니다")
                }
            })
                .catch(() => {
                    window.alert("인증번호 전송에 실패했습니다.");
                })
                .finally(()=>{
                 setLoading(false);
                }
                )
        }
    }

    const resendInfo = () => {
        setResend(!resend);
        setTimerRunning(true);
        setLoading(true)
;        postUserInfo(userInfo).then((res)=>{
            setToken(res.response.token);
        })
            .catch((e)=>{
                window.alert("서버 통신에 실패했습니다.")
            })
            .finally(()=>{
                setLoading(false);
            })
    }




  return (
      <div className="container">
        <h1>휴대폰 번호로 전송된 인증번호를 입력해 주세요</h1>
          <div className="labelWrapper">
              <label>인증번호 </label>
              <Timer setTimerRunning={setTimerRunning} resend={resend}/>
          </div>
                 <div className="inputWrapper">
              <input
                  placeholder="번호 6자리를 입력해주세요"
                  maxLength={6}
                  value={code}
                  onChange={(e)=>{setCode(e.target.value.replace(/[^0-9]/g,""))}}/>
                     <button className="resendButton" onClick={()=>{resendInfo()}}>재전송</button>
          </div>
          {isLoading ? <button className="confirmButtonDisable" disabled>통신 중...</button> :
              code.length===6 && isTimerRunning ? <button className="confirmButton" onClick={()=>{confirmCode()}}>본인인증하기</button> :
                  <button className="confirmButtonDisable" disabled>본인인증하기</button>}



      </div>
  )
}

export default PhoneCertification;
