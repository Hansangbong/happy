import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import * as commonjs from "../../components/common/commonfunction.js";

const LecPlanModal = (props) => {
    //const [lecinfo, setLecinfo ] = useState();
    const [lecId, setLecId] = useState(props.id);
    const [lecplanlist, setlecplanlist] = useState([]);
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
        console.log("유즈이펙트 함수내의 인쿼리 함수를 실행합니다.")
        inquiry(lecId);
    },[lecId]);


const close = () =>{
    props.setModalAction(false);
}

const inquiry = (lec_id) => {
    console.log("inquiry 실행! 받은 매게변수: " + lec_id)
    let params = new URLSearchParams();
    params.append("lec_id", lec_id);
    axios
        .post("/tut/fLecInfo.do", params)
        .then((res) => {
            console.log("res 입니다: "+res);
            console.log("res.data 임니다: "+res.data);
            console.log("데이터입니다 : "+JSON.stringify(res.data))
            setlecplanlist(res.data.lec_info);
            
        })
        .catch((err) => {
            alert(err.message);
        });
};


const selectChange = (id) => {
    console.log("selectChange함수 실행! setLecId 셋함수를 실행합니다")
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
                                    <select onChange={() => {
                                        console.log("이벤트 발생!! 보내는 인자 값: "+ lecplanlist.lec_id);
                                        selectChange(lecplanlist.lec_id);
                                        //setLecId(v.target.value);

                                    }}>
                                        
                                        {idlist.map((item) => {
                                                return(
                                                    <option>
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
                                <select >
                                    {idlist.map((item) => {
                                        return(
                                            <option >
                                                {item.lec_type_name}
                                            </option>
                                        )
                                        })}
                                    </select>
                                </td>
                                <th>
                                    {" "}
                                    대상자<span className="font_red">*</span>
                                </th>
                                <td>
                                    <select >
                                    {idlist.map((item) => {
                                                return(
                                                    <option >
                                                        {item.lec_sort}
                                                    </option>
                                                )
                                        })}
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
                                        value={lecplanlist.lec_goal}
                                    />
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>

                </div>
                
                <button className="btn btn-primary" onClick={close}>
                    {" "}
                    닫기{" "}
                </button>
            </Modal>
        </div>
    )
}

export default LecPlanModal;