const UsernameInput = ({userName, setUserName}) => {

    return(
        <div className="name">
            <label>이름</label>
            <div className="inputWrapper">
                <input placeholder="이름을 입력해 주세요"
                       value={userName}
                       onChange={(e)=>{setUserName(e.target.value.replace(/[^ㄱ-힣]+$/g,""))}}
                />
            </div>
        </div>
    )
}

export default UsernameInput;