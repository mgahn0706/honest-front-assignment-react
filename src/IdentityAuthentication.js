import {useEffect, useState} from "react";

function IdentityAuthentication() {

  const [phoneNum, setPhoneNum ] = useState(["010","",""])
  const [civilCode, setCivilCode] = useState(["",""]);
  const [userName, setUserName] = useState("");


  const updatePhoneNum = (pos, e) => { //인덱스 별로 휴대폰 state를 바꾸는 함수
    const newPhoneNum = [...phoneNum];
    newPhoneNum[pos]=e.target.value;
    setPhoneNum(newPhoneNum);
  }

  const updateCivilCode = (pos, e) => { //앞,뒷자리 별로 주민번호 state를 변경
    const newCivilCode = [...civilCode];
    newCivilCode[pos]=e.target.value;
    setCivilCode(newCivilCode);
  }
  
  const confirmInput = () => {
    console.log(phoneNum);
    console.log(civilCode);
    console.log(userName);
  }
  
  return <div>
    <h1>비대면 대출을 위해 본인인증이 필요해요</h1>
    <div className="phone">
        <label>휴대폰번호</label>
      <div className="phoneInput">
        <input maxLength={3}
               value={phoneNum[0]}
               onChange={(e)=>{
          updatePhoneNum(0, e);
        }
        }/>
        <input maxLength={4}
               value={phoneNum[1]}
               onChange={(e)=>{
          updatePhoneNum(1, e);}
        }/>
        <input maxLength={4}
               value={phoneNum[2]}
               onChange={(e)=>{
          updatePhoneNum(2, e);}
        }/>
      </div>
    </div>

    <div className="civil">
        <label>주민등록번호</label>
      <div className="civilInput">
        <input placeholder="앞 6자리"
               maxLength={6}
               onChange={(e)=>{updateCivilCode(0,e)}}
        />
        <input placeholder="뒤 7자리"
               type={"password"}
               maxLength={7}
               onChange={(e)=>{updateCivilCode(1,e)}}
        />
      </div>
    </div>

    <div className="name">
      <label>이름</label>
      <div className="nameInput">
        <input placeholder="이름을 이벽해 주세요"
               onChange={(e)=>{setUserName(e.target.value)}}
        />
      </div>
    </div>


    <button className="confirmButton" onClick={()=>{confirmInput()}}>다음</button>

  </div>
}

export default IdentityAuthentication;
