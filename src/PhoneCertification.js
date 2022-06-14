import {useEffect, useState} from "react";
import {postPhoneCode, postUserInfo} from "./API/API";

function PhoneCertification() {

    const [code, setCode] = useState("");
    const [token, setToken] = useState("");

    useEffect(()=>{if(!token){
        setToken(localStorage.getItem("token"));
    }})

    const confirmCode = () => {

        const codeInfo = {
            code: code,
            token: token,
        }
        console.log(codeInfo)
        postPhoneCode(codeInfo).then((res)=>{
            window.alert("성공")
        })
            .catch(()=>{
                window.alert("실패");
            })

    }


  return (
      <div className="container">
        <h1>휴대폰 번호로 전송된 인증번호를 입력해 주세요</h1>
        <label>인증번호</label>
          <div className="inputWrapper">
              <input
                  placeholder="번호 6자리를 입력해주세요"
                  maxLength={6}
                  onChange={(e)=>{setCode(e.target.value)}}/>
          </div>
          {code.length===6 ? <button className="confirmButton" onClick={()=>{confirmCode()}}>본인인증하기</button> :
              <button className="confirmButtonDisable" disabled>본인인증하기</button>}

      </div>
  )
}

export default PhoneCertification;
