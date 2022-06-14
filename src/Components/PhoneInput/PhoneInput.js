const PhoneInput = ({mobile, setMobile}) => {

    const updatePhoneNum = (pos, e) => { //인덱스 별로 휴대폰 state를 바꾸는 함수
        const newMobile = [...mobile];
        newMobile[pos]= e.target.value.replace(/[^0-9]/g,"");
        setMobile(newMobile);
    }

    return (
        <div className="phone">
            <label>휴대폰번호</label>
            <div className="inputWrapper">
                <input maxLength={3} value={mobile[0]} onChange={(e)=>{updatePhoneNum(0,e)}}/>
                <div className="dash"/>
                <input maxLength={4} value={mobile[1]} onChange={(e)=>{updatePhoneNum(1,e)}}/>
                <div className="dash"/>
                <input maxLength={4} value={mobile[2]} onChange={(e)=>{updatePhoneNum(2,e)}}/>
            </div>
        </div>
    )
}

export default PhoneInput;