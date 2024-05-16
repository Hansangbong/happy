import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

const LecPlanModal = ({ id, idlist, modalAction, roomlist, setModalAction }) => {
    const [lecInfo, setLecInfo] = useState(id); // 강의 계획서 관리
    const [weeklyPlan, setWeeklyPlan] = useState([]); // 주간 계획 리스트
    const [subject, setSubject] = useState(id); // 과목
    const [room, setRoom] = useState(0); // 강의실
    const goal = useRef(''); //수업 목표
    const [lecture, setLecture] = useState(0); // 강의 분류
    const [sort, setSort] = useState(''); //대상자
    const [tutor, setTutor] = useState('');



    useEffect(() => {
        getLecPlanDetail(subject);

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

    const getLecPlanDetail = (lec_id) => {
        let params = new URLSearchParams();
        params.append('lec_id', lec_id);

        axios.post('/tut/fLecInfo.do', params).then((res) => {
            setLecInfo(res.data.lec_info);
            console.log(res.data.lec_info)
            setWeeklyPlan(res.data.week_plan);
            setTutor(lecInfo.tutor_id);
            setRoom(lecInfo.lecrm_id);
            setSort(lecInfo.lec_sort);
            setLecture(lecInfo.lec_type_id);

        }).catch((e) => {
            alert(e);
        })
    }

    const saveLecPlan = () => {
        console.log("검사를 시작하지 :  tutor: " + tutor + " goal: " + goal + " room: " + room
            + " lecutre : " + lecture + "   sort: " + sort + "    subject: " + subject
        );

        /*let params = new URLSearchParams(
            {
                tutor_id: tutor, lec_goal: goal.current,
                lec_type_id: lecInfo.lec_type_id, lec_sort: lecInfo.lec_sort, lec_id: lecInfo.lec_id
            }
        );*/
        let params = new URLSearchParams();
        params.append('tutor_id', lecInfo.tutor_id);
        params.append('lecrm_id', lecInfo._lecrm_id);
        params.append('lec_goal', goal.current);
        params.append('lec_type_id', lecInfo.lec_type_id);
        params.append('lec_sort', lecInfo.lec_sort);
        params.append('lec_id', lecInfo.lec_id);

        console.log("파람입니다: " + params);

        axios
            .post("/tut/savePlan.do", params)
            .then((res) => {
                alert("save의 알러트입니다:  " + res.data.resultMsg);
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
                    <span>강의 계획서</span>

                    <table style={{ width: "550px", height: "350px" }}>
                        <tbody>
                            <tr >
                                <th>
                                    {" "}
                                    과목 <span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onChange={(e) => setSubject(e.target.value)} >
                                        <option value={null}>
                                            과목 선택
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
                                    강의분류<span className="font_red" >*</span>
                                </th>
                                <td>
                                    <select onChange={(e) => (lecInfo.lec_type_id = e.target.value)}>
                                        <option>
                                            강의 분류 선택
                                        </option>
                                        <option value="4" key="C" selected={'4' === lecInfo.lec_type_id ? true : false}>
                                            C
                                        </option>
                                        <option value="5" key="C++" selected={'5' === lecInfo.lec_type_id ? true : false}>
                                            C++
                                        </option>
                                        <option value="1" key="Java" selected={'1' === lecInfo.lec_type_id ? true : false}>
                                            Java
                                        </option>
                                        <option value="3" key="JavaScript" selected={'3' === lecInfo.lec_type_id ? true : false}>
                                            JavaScript
                                        </option>
                                        <option value="2" key="Python" selected={'2' === lecInfo.lec_type_id ? true : false}>
                                            Python
                                        </option>
                                    </select>
                                </td>
                                <th>
                                    {" "}
                                    대상자<span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onChange={(e) => (lecInfo.lec_sort = e.target.value)}>
                                        <option>
                                            대상자 선택
                                        </option>
                                        <option value="직장인" key="직장인" selected={"직장인" === lecInfo.lec_sort ? true : false}>
                                            직장인
                                        </option>
                                        <option value="실업자" key="실업자" selected={"실업자" === lecInfo.lec_sort ? true : false}>
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
                                        readOnly
                                        type="text"
                                        className="form-control input-sm"
                                        value={lecInfo.name || ''}
                                    />
                                </td>
                                <th>
                                    {" "}
                                    강의실<span className="font_red">*</span>
                                </th>
                                <td>
                                    <select onChange={(e) => (lecInfo.lecrm_id = e.target.value)}>
                                        <option>
                                            강의실 선택
                                        </option>
                                        {roomlist.map((item, i) => {

                                            return (
                                                <option key={i} value={item.lecrm_id} selected={item.lecrm_id === lecInfo.lecrm_id ? true : false} >
                                                    {item.lecrm_name}

                                                </option >

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
                                        readOnly
                                        type="text"
                                        className="form-control input-sm"
                                        value={lecInfo.mail || ''}
                                    />
                                </td>
                                <th>
                                    {" "}
                                    연락처
                                </th>
                                <td>
                                    <input
                                        readOnly
                                        type="text"
                                        className="form-control input-sm"
                                        value={lecInfo.tel || ''}
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
                                        defaultValue={lecInfo.lec_goal || ''}
                                        ref={goal}
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
                                <th >주차수</th>
                                <th >학습 목표</th>
                                <th >학습 내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyPlan.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td >{item.week}</td>
                                        <td >{item.learn_goal}</td>
                                        <td >{item.learn_con}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <p></p>
                <button className="btn btn-primary" onClick={() => saveLecPlan()}>
                    {" "}
                    저장{" "}
                </button>{" "}

                <button onClick={() => close()} className="btn btn-primary">
                    {" "}
                    닫기{" "}
                </button>

            </Modal>
        </div>
    )
}

export default LecPlanModal;