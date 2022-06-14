const CivilcodeInput = ({civilCode, setCivilCode}) => {

    const updateCivilCode = (pos, e) => { //앞,뒷자리 별로 주민번호 state를 변경
        const newCivilCode = [...civilCode];
        newCivilCode[pos]= e.target.value.replace(/[^0-9]/g,"");
        setCivilCode(newCivilCode);
    }

    return(
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
    )
}

export default CivilcodeInput;