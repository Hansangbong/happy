import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import * as commonjs from "../../components/common/commonfunction.js";

const LecPlanModal = (props) => {
    const [lecinfo, setLecinfo ] = useState();
    const [lecplanlist, setlecplanlist] = useState();

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
        inquiry();
    },[lecinfo]);


const close = () =>{
    props.setModalAction(false);
}

const inquiry = () => {
    let params = new URLSearchParams();
    params.append("lec_id", props.id);
    axios
        .post("/tut/fLecInfo.do", params)
        .then((res) => {
            console.log("res 입니다: "+ res)
            setlecplanlist(res.data.lecplanlist);
        })
        .catch((err) => {
            alert(err.message);
        });
};

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
                                    과목 <sapn className="font_red">*</sapn>
                                </th>
                                <td>
                                    <select>
                                        <option>
                                            {//res.lec_name} rec로 직접 접근 불가
                                                lecplanlist.lec_name
                                            } 
                                        </option>
                                        <option>
                                            옵션2       
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {" "}
                                    강의분류<sapn className="font_red">*</sapn>
                                </th>
                                <td>
                                <select>
                                        <option>
                                            옵션1      
                                        </option>
                                        <option>
                                            옵션2       
                                        </option>
                                    </select>
                                </td>
                                <th>
                                    {" "}
                                    대상자<sapn className="font_red">*</sapn>
                                </th>
                                <td>
                                    <select>
                                        <option>
                                            옵션1      
                                        </option>
                                        <option>
                                            옵션2       
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
                                    />
                                </td>
                                <th>
                                    {" "}
                                    강의실<sapn className="font_red">*</sapn>
                                </th>
                                <td>
                                    <select>
                                        <option>
                                            옵션1      
                                        </option>
                                        <option>
                                            옵션2       
                                        </option>
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