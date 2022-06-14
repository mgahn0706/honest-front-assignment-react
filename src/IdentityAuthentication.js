import {useEffect, useState} from "react";
import {postUserInfo} from "./API/API";
import {useNavigate} from "react-router";
import {useAuthContext} from "./Context/AuthContext";
import ConfirmButton from "./Components/ConfirmButton/ConfirmButton";

function IdentityAuthentication() {

  const {setToken, setUserInfo} = useAuthContext();
  const [mobile, setMobile] = useState(["010","",""])
  const [civilCode, setCivilCode] = useState(["",""]);
  const [userName, setUserName] = useState("");
  const [isFilled, setFilled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{checkInfoFilled()},[userName,mobile,civilCode]);

  const updatePhoneNum = (pos, e) => { //인덱스 별로 휴대폰 state를 바꾸는 함수
    const newMobile = [...mobile];
    newMobile[pos]= e.target.value.replace(/[^0-9]/g,"");
    setMobile(newMobile);
  }

  const updateCivilCode = (pos, e) => { //앞,뒷자리 별로 주민번호 state를 변경
    const newCivilCode = [...civilCode];
    newCivilCode[pos]= e.target.value.replace(/[^0-9]/g,"");
    setCivilCode(newCivilCode);
  }
  
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

    <div className="phone">
        <label>휴대폰번호</label>
      <div className="inputWrapper">
        <input maxLength={3}
               value={mobile[0]}
               onChange={(e)=>{
          updatePhoneNum(0, e);
        }
        }/>
        <div className="dash"/>
        <input maxLength={4}
               value={mobile[1]}
               onChange={(e)=>{
          updatePhoneNum(1, e);}
        }/>
        <div className="dash"/>
        <input maxLength={4}
               value={mobile[2]}
               onChange={(e)=>{
          updatePhoneNum(2, e);}
        }/>
      </div>
    </div>

    <div className="civil">
        <label>주민등록번호</label>
      <div className="inputWrapper">
        <input placeholder="앞 6자리"
               maxLength={6}
               value={civilCode[0]}
               onChange={(e)=>{updateCivilCode(0,e)}}
        />
        <div className="dash"/>
        <input placeholder="뒤 7자리"
               type={"password"}
               value={civilCode[1]}
               maxLength={7}
               onChange={(e)=>{updateCivilCode(1,e)}}
        />
      </div>
    </div>

    <div className="name">
      <label>이름</label>
      <div className="inputWrapper">
        <input placeholder="이름을 입력해 주세요"
               value={userName}
               onChange={(e)=>{setUserName(e.target.value.replace(/[^ㄱ-힣]+$/g,""))}}
        />
      </div>
    </div>
    { isLoading ? <ConfirmButton text={"인증문자 전송 중..."} disabled={true}/> :
    isFilled ? <ConfirmButton text={"다음"} disabled={false} onClick={()=>{confirmInput()}}/> :
    <ConfirmButton text={"다음"} disabled={true}/> }
  </div>
}

export default IdentityAuthentication;
