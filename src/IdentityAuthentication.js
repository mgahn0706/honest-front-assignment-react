import {useEffect, useState} from "react";
import {postUserInfo} from "./API/API";
import {useNavigate} from "react-router";
import {useAuthContext} from "./Context/AuthContext";
import ConfirmButton from "./Components/ConfirmButton/ConfirmButton";
import PhoneInput from "./Components/PhoneInput/PhoneInput";
import CivilcodeInput from "./Components/CivilcodeInput/CivilcodeInput";
import UsernameInput from "./Components/UsernameInput/UsernameInput";

function IdentityAuthentication() {

  const {setToken, setUserInfo} = useAuthContext();
  const [mobile, setMobile] = useState(["010","",""])
  const [civilCode, setCivilCode] = useState(["",""]);
  const [userName, setUserName] = useState("");
  const [isFilled, setFilled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{checkInfoFilled()},[userName,mobile,civilCode]);


  
  const confirmInput = () => {
    const identity = {
      name: userName,
      civilcodeFirst: civilCode[0],
      civilcodeLast: civilCode[1],
      mobile: mobile.join(""),
    }

    setLoading(true);
    setUserInfo(identity);
    postUserInfo(identity).then((res)=>{
      setToken(res.response.token);
      navigate("/phone-certification");
    })
        .catch((e)=>{
          window.alert("서버 통신에 실패했습니다.")
        })
        .finally(()=>{
          setLoading(false);
        })

  }

  const checkInfoFilled = () => {
    const isMobileFilled =
        mobile[0].length===3 && mobile[1].length===4 && mobile[2].length===4;
    const isCivilCodeFilled =
        civilCode[0].length===6 && civilCode[1].length===7;
    const isNameFilled = userName.length!==0;
    setFilled(isMobileFilled && isCivilCodeFilled && isNameFilled);

  }



  return <div className="container">
    <h1>비대면 대출을 위해 본인인증이 필요해요</h1>

    <PhoneInput mobile={mobile} setMobile={setMobile}/>

    <CivilcodeInput civilCode={civilCode} setCivilCode={setCivilCode}/>

    <UsernameInput userName={userName} setUserName={setUserName}/>

    { isLoading ? <ConfirmButton text={"인증문자 전송 중..."} disabled={true}/> :
      <ConfirmButton text={"다음"} disabled={!isFilled} onClick={()=>{confirmInput()}}/> }
  </div>
}

export default IdentityAuthentication;
