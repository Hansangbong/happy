import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

const LecPlanModal = ({ id, idlist, modalAction, roomlist, setModalAction }) => {
    const [lecInfo, setLecInfo] = useState({}); // 강의 계획서 관리
    const [weeklyPlan, setWeeklyPlan] = useState([]); // 주간 계획 리스트
    const [subject, setSubject] = useState(lecInfo.lec_id); // 과목
    const [room, setRoom] = useState(0); // 강의실
    const goal = useRef(''); //수업 목표
    const [lecture, setLecture] = useState(0); // 강의 분류
    const [sort, setSort] = useState(''); //대상자
    

    useEffect(() => {
        getLecPlanDetail();
        
    }, [subject]);

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

    const getLecPlanDetail = () => {
        let params = new URLSearchParams();
        params.append('lec_id', id);

        axios.post('/tut/fLecInfo.do', params).then((res) => {
            setLecInfo(res.data.lec_info);
            console.log(res.data.lec_info)
            setWeeklyPlan(res.data.week_plan);
        }).catch((e) => {
            alert(e);
        })
    }

    const saveLecPlan = () => {
        let params = new URLSearchParams(
            { tutor_id: id, lec_goal: goal.current, lecrm_id: room,
              lec_type_id: lecture, lec_sort: sort, lec_id: lecInfo.lec_id }
        );
        axios.post("/tut/savePlan.do", params)
        .then((res) => {
            alert("save의 알러트입니다. : " + res.data.resultMsg);
        })
        .catch((err) => {
            alert(err.message);
        })

        close();
    }

    const close = () => {
        setModalAction(false);
    }

    return (
        <div>
            <Modal
                style={modalStyle}
                isOpen={modalAction}
                appElement={document.getElementById('app')}
            >
                <div>
                    <span>강의 계획서</span>{/*alert("초기화된 밸류의 값 : "+value1)*/}

                    <table style={{ width: "550px", height: "350px" }}>
                        <tbody>
                            <tr >
                                <th>
                                    {" "}
                                    과목 <span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onChange={(e) => setSubject(e.target.value)}>
                                        <option>
                                            과목명 선택
                                        </option>
                                        {idlist.map((item, i) => {
                                            return (
                                                <option key={i} value={item.lec_id} selected={id === item.lec_id ? true : false}>
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
                                    <select onChange={(e) => setLecture(e.target.value)}>
                                        <option>
                                            강의 분류 선택
                                        </option>
                                        <option value="4" key="4" selected={id === value ? true : false}>
                                            C
                                        </option>
                                        <option value="5" key="5" selected={id === value ? true : false}>
                                            C++
                                        </option>
                                        <option value="1" key="1" selected={id === value ? true : false}>
                                            Java
                                        </option>
                                        <option value="3" key="3" selected={id === value ? true : false}>
                                            JavaScript
                                        </option>
                                        <option value="2" key="2" selected={id === value ? true : false}>
                                            Python
                                        </option>
                                    </select>
                                </td>
                                <th>
                                    {" "}
                                    대상자<span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onChange={(e) => setSort(e.target.value)}>
                                        <option>
                                            대상자 선택
                                        </option>
                                        <option value="직장인" key="직장인" selected={idlist.lec_sort === value ? true : false}>
                                            {/*item.lec_sort*/}
                                            직장인
                                        </option>
                                        <option value="실업자" key="실업자" selected={idlist.lec_sort === value ? true : false}>
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
                                        value={lecInfo.name}
                                    />
                                </td>
                                <th>
                                    {" "}
                                    강의실<span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onChange={(e) => setRoom(e.target.value)}>
                                        {roomlist.map((item, i) => {
                                            return (
                                                <option value={item.lecrm_id} selected={item.lecrm_id === lecInfo.lecrm_id ? true : false}>
                                                    {item.lecrm_name}
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
                                        value={lecInfo.mail}
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
                                        value={lecInfo.tel}
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
                                        defaultValue={lecInfo.lec_goal}
                                        ref={goal} //이게 모지?
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
                            {weeklyPlan.map((item) => {
                                return (
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
                <button className="btn btn-primary" onClick={saveLecPlan}>
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