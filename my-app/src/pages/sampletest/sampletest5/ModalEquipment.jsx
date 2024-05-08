import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import * as commonjs from "../../../components/common/commonfunction.js";
import { useNavigate } from "react-router-dom";

const ModalEquipment = (props) => {
    const [selinfo, setSelinfo] = useState({});

    //네비게이션
    const navigate = useNavigate();

    useEffect(() => {
        //roommod(props.id);
        roommod(props.searchroomid);
        console.log("넘겨온 서치룸 아이디: "+props.searchroomid)
        return () => {
            setSelinfo({});
        }
    }, [props.id]);

    console.log("프롭스.아이디: "+props.id)

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

    const roommod = (id) => {
        let params = new URLSearchParams();
        
        params.append("equ_id", id);
        params.append("lecrm_id", id);
        console.log("어팬드 후, 룸모드의 params: "+params);
        

        axios
            //.post("/adm/lectureRoomDtl.do", params)
            .post("/adm/equDtl.do",params)
            .then((res)   => {
                setSelinfo(res.data.selinfo);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const postHandler = (action) => {
        if (action !== "D") {
            let checkresult = commonjs.nullcheck([
                // { inval: selinfo.lecrm_name, msg: "강의실 명을 입력해주세요"},
                //{ inval: selinfo.lecrm_id, msg: "강의실 명을 입력해주세요"},
                { inval: selinfo.equ_name, msg: "장비 명을 입력해주세요"},
                //{ inval: selinfo.lecrm_num, msg: "장비 개수를 입력해주세요"},
                { inval: selinfo.equ_num, msg: "장비 개수를 입력해주세요"},
            ]);
            console.log("받아온 강의실 아이디 : "+selinfo.lecrm_id);
            console.log(selinfo.equ_name);
            console.log(selinfo.equ_num);
            
            if(!checkresult) return;
        }

        let params = new URLSearchParams(selinfo);
        params.append("equ_id", props.id);
        console.log("유알엘서치의 프롭스.아이디: "+props.id);
        params.append("lecrm_id", props.lecrm_id);
        params.append("action", action);
        console.log("유알엘서치파람"+params);
        axios
            //.post("/adm/lectureRoomSave.do", params)
            .post("/adm/equSave.do", params)
            .then((res) => {
                if(res.data.result === "S") {
                    alert(res.data.resultmsg);
                    props.setModalAction(false);

                    if(action === "I") {
                        props.setCurrentPage(1);
                        props.setModalAction(false);
                    } else {
                        props.setModalAction(false);
                    }
                } else {
                    alert(res.data.resultmsg);
                }
            })
            .catch((err) => {
                alert(err.message);
            });

    };

    const close = () => {
        props.setModalAction(false);
    }

    return (
        <div>
            <Modal
                style={modalStyle}
                isOpen={props.modalAction}
                appElement={document.getElementById('app')}
            >
                <div id="noticeform">
                    <p classNmae="conTitle"> 
                        <span>{props.id === "" ? "장비 등록" : "장비 수정"}</span>
                        
                    </p>
                    <table style={{ width: "550px", height: "350px" }}>
                        <tbody>
                            {/* <tr>
                                {/* <th>
                                    {" "}
                                    강의실명 <span className="font_red">*</span>
                                </th> */}
                                {/* <td colSpan="3">
                                    <input
                                        type="text"
                                        classNme="form-control input-sm"
                                        style={{ width: "150px" }}
                                        defaultValue={selinfo?.lecrm_id}
                                        onBlur={(e) => {
                                            setSelinfo((prev) => {
                                                //return { ...prev, lecrm_name: e.target.value}
                                                return { ...prev, lecrm_id: e.target.value}
                                            });
                                            console.log(selinfo)
                                        }}
                                        />
                                </td>
                            </tr> */}
                            <tr>
                                <th>
                                    {" "}
                                    장비 명<span className="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        style={{ width: "150px" }}
                                        //defaultValue={selinfo?.lecrm_size}
                                        defaultValue={selinfo?.equ_name}
                                        onBlur={(e) => {
                                            setSelinfo((prev) => {
                                                return { ...prev, equ_name: e.target.value}
                                            })
                                        }}
                                    />
                                </td>
                                <th>
                                    {" "}
                                    장비 수<span className="font_red">*</span>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        style={{ width: "150px" }}
                                        defaultValue={selinfo?.equ_num}
                                        onBlur={(e) => {
                                            setSelinfo((prev) => {
                                                //return { ...prev, lecrm_snum: e.target.value}
                                                return { ...prev, equ_num: e.target.value}
                                            })
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th> 비고 </th>
                                <td colSpan="3">
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        style={{ width: "350px" }}
                                        defaultValue={selinfo?.equ_note}
                                        onBlur={(e) => {
                                            setSelinfo((prev) => {
                                                return { ...prev, equ_note: e.target.value}
                                            })
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="modal-button">
                        {
                            props.id === "" ?
                                <button className="btn btn-primary mx-2" onClick={() => postHandler("I")}>
                                    {" "}
                                    등록{" "}
                                </button> : null
                        }
                        {
                            props.id !== "" ?
                                <button className="btn btn-primary mx-2" onClick={() => postHandler("U")}>
                                    {" "}
                                    수정{" "}
                                </button> : null
                        }
                        {
                            props.id !== "" ?
                                <button className="btn btn-primary mx-2" onClick={() => postHandler("D")}>
                                    {" "}
                                    삭제{" "}
                                </button> : null
                        }

                        <button className="btn btn-primary" onClick={close}>
                            {" "}
                            닫기{" "}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>      
    )
}

export default ModalEquipment;