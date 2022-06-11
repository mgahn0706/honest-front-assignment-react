import {useState} from "react";

function IdentityAuthentication() {

  const [phoneNum, setPhoneNum ] = useState(["010","",""])
  const [civilCode, setCivilCode] = useState(["",""]);
  const [userName, setUserName] = useState("");


  return <div>
    <h1>비대면 대출을 위해 본인인증이 필요해요</h1>
    <div className="phone">
        <label>휴대폰번호</label>
      <div className="phoneInput">
        <input maxLength={3}/>
        <input maxLength={4}/>
        <input maxLength={4}/>
      </div>
    </div>

    <div className="civil">
        <label>주민등록번호</label>
      <div className="civilInput">
        <input placeholder="앞 6자리" maxLength={6}/>
        <input placeholder="뒤 7자리" type={"password"} maxLength={7}/>
      </div>
    </div>

    <div className="name">
      <label>주민등록번호</label>
      <div className="nameInput">
        <input placeholder="이름을 이벽해 주세요"/>
      </div>
    </div>


    <button className="nextButton">다음</button>

  </div>
}

export default IdentityAuthentication;
