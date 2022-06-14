import "./CertificationInput.css";

const CertificationInput = ({code, setCode, resendInfo}) => {

    return(
        <div className="inputWrapper">
            <input
                placeholder="번호 6자리를 입력해주세요"
                maxLength={6}
                value={code}
                onChange={(e)=>{setCode(e.target.value.replace(/[^0-9]/g,""))}}/>
            <button className="resendButton" onClick={()=>{resendInfo()}}>재전송</button>
        </div>
    )
}

export default CertificationInput;