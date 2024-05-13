import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import * as commonjs from "../../components/common/commonfunction.js";

const LecPlanModal = (props) => {
    //const [lecinfo, setLecinfo ] = useState();
    const [lecId, setLecId] = useState(props.id);
    const [lecplanlist, setlecplanlist] = useState([]);
    const [lecWeeklist, setLecWeeklist] = useState([]);
    const idlist = props.idlist;

    

    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            transform: "translate(-50%, -50%)",
        },
    };

    useEffect(() => {
        //console.log("유즈이펙트 함수내의 인쿼리 함수를 실행합니다.")
        
        inquiry(lecId);
    },[lecId]);


const close = () =>{
    props.setModalAction(false);
}

const save = (updateinfo) =>{
    console.log("저장 버튼 이벤트 발생!! 받아온 매개변수 값: "+ updateinfo.tutor_id)
    console.log(""+ updateinfo.lec_goal)
    console.log(""+ updateinfo.lecrm_id)
    console.log(""+ updateinfo.lec_type_id)
    console.log(""+ updateinfo.lec_sort)
    console.log(""+ updateinfo.lec_id)
    let params = new URLSearchParams();
     params.append("tutor_id", updateinfo.tutor_id);
     params.append("lec_goal", updateinfo.lec_goal);
     params.append("lecrm_id", updateinfo.lecrm_id);
     params.append("lec_type_id", updateinfo.lec_type_id);
     params.append("lec_sort", updateinfo.lec_sort);
     params.append("lec_id", updateinfo.lec_id);
    axios
        .post("/tut/savePlan.do", params)
        .then((res) => {
        alert("save의 알러트입니다:  "+res.data.resultMsg);
        })
        .catch((err) => {
            alert(err.message);
        })

    close();
}

const inquiry = (lec_id) => {
    //console.log("inquiry 실행! 받은 매게변수: " + lec_id)
    let params = new URLSearchParams();
    params.append("lec_id", lec_id);
    axios
        .post("/tut/fLecInfo.do", params)
        .then((res) => {
            //console.log("데이터입니다 : "+JSON.stringify(res.data));
            setlecplanlist(res.data.lec_info);
            setLecWeeklist(res.data.week_plan);            
        })
        .catch((err) => {
            alert(err.message);
        });
};


const selectChange = (id) => {
    //console.log("selectChange함수 실행! setLecId 셋함수를 실행합니다")
    setLecId(id);
}

    return (
        <div>
            <Modal
                style={modalStyle}
                isOpen={props.modalAction}
                appElement={document.getElementById('app')}
            >
                <div>
                    <span>강의 계획서</span>

                    <table style={{ width: "550px", height: "350px" }}>
                        <tbody>
                            <tr>
                                <th>
                                    {" "}
                                    과목 <span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onChange={(v) => {
                                        //console.log("이벤트 발생!! 보내는 인자 값: "+ lecplanlist.lec_id);
                                        selectChange(v.target.value);
                                    }}>
                                        
                                        {idlist.map((item) => {
                                                return(
                                                    <option value={item.lec_id}>
                                                        {item.lec_name}    
                                                    </option>
                                                )
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {" "}
                                    강의분류<span className="font_red">*</span>
                                </th>
                                <td>
                                <select defaultValue={idlist.lec_type_name}>
                                    <option >
                                        C
                                    </option>
                                    <option>
                                        C++
                                    </option>
                                    <option>
                                        Java
                                    </option>
                                    <option>
                                        JavaScript
                                    </option>
                                    <option>
                                        Python
                                    </option>
                                    
                                </select>
                                </td>
                                <th>
                                    {" "}
                                    대상자<span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onClick={(v) => lecplanlist.lec_sort = v.target.value}>                                   
                                        <option >
                                            {/*item.lec_sort*/}
                                            직장인
                                        </option>
                                        <option>
                                            실업자
                                        </option>
                                           
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {" "}
                                    강사명
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        value={lecplanlist.name}
                                        
                                    />
                                </td>
                                <th>
                                    {" "}
                                    강의실<span className="font_red">*</span>
                                </th>
                                <td>
                                    <select >
                                        {idlist.map((item) => {
                                            return(
                                                <option >
                                                    {lecplanlist.lecrm_name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {" "}
                                    이메일
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        value={lecplanlist.mail}
                                    />
                                </td>
                                <th>
                                    {" "}
                                    연락처
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        value={lecplanlist.tel}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {" "}
                                    수업 목표
                                </th>
                                <td>
                                    <input
                                        style={{ width: "250px" }}
                                        type="text"
                                        className="form-control input-sm"
                                        defaultValue={lecplanlist.lec_goal}
                                    />
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>

                    <table className="col">
                        <colgroup>
                           <col width="20%" />
                           <col width="40%" />
                           <col width="40%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>주차수</th>
                                <th>학습 목표</th>
                                <th>학습 내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lecWeeklist.map((item) => {
                                return(
                                    <tr>
                                        <td>{item.week}</td>
                                        <td>{item.learn_goal}</td>
                                        <td>{item.learn_con}</td>
                                    </tr>
                                )
                            })}
                            

                        </tbody>

                    </table>

                </div>

                <p></p>
                <button className="btn btn-primary" onClick={(event) => save(lecplanlist)}
                     >
                    {" "}
                    저장{" "}
                </button>{" "}
                
                <button className="btn btn-primary" onClick={close}>
                    {" "}
                    닫기{" "}
                </button>
                
            </Modal>
        </div>
    )
}

export default LecPlanModal;