import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/common/Pagination";

const LecturePlan = () => {
  const navigate = useNavigate();
  const searchRoomName = useRef();
  const [currentPage, setCurrentPage] = useState(1); //[변수명, set함수명] =(초기값)
  const [totalcnt, setTotalcnt] = useState(0);
  const [leclist, setLeclist] = useState([]);
  

  console.log("커렌트내용: "+searchRoomName.current)

  const searchstyle = {
    fontsize: "15px",
    fontweight: "bold",
  };

  const searchstylewidth = {
    height: "28px",
    width: "200px",
  };

  useEffect(() => {    //useEffect(effect함수, 의존성 배열)
    searchroom(currentPage);
    console.log("useEffect발동")
  }, [currentPage]); //마운트,언마운트 시 호출됨, 강의실 검색에서 사용하는 듯

  const searchequlist = (lecId) => {
    const query = [`id=${lecId ?? 0}`];
    navigate(`/dashboard/tut/LecturePlan?${query}`)
  }


  const searchroom = (cpage) => {
    if (typeof cpage === 'number') {
      cpage = cpage || 1;
    } else {
      cpage = 1;
    }
      
    let params = new URLSearchParams();
    params.append("cpage", cpage);
    params.append("pagesize", 5);
    params.append("searchRoomName", searchRoomName.current.value);
    
    axios
      .post("/adm/lectureRoomListjson.do", params)
      //.post("/tut/lecturePlan.do", params)
      .then((res) => {
        console.log("셋 리스트데이터: " + res.data.listdata);
        setTotalcnt(res.data.listcnt);
        setLeclist(res.data.listdata);
        setCurrentPage(cpage);
        //console.log("result console : " + JSON.stringify(res));
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };
  

    return(
        <><div id="notice">
            <p className="Location">
                <a href="/dashboard" className="btn_set home">home</a>
                <span className="btn_nav bold">기준정보</span>
                <span className="btn_nav bold">공지사항 관리</span>
                <a href="../system/notice" className="btn_set refresh">새로고침</a>
            </p>
            <p className="conTitle">
                <span>강의계획서 관리</span>
                
                <span className="fr">
                    <span> 강의명 </span>
                <input 
                  type="text" 
                  id="searchRoomName"
                  name="searchRoomName"
                  className="form-control"
                  placeholder=""
                  ref={{searchRoomName}}
                  style={searchstylewidth}
                />
                <button
                  className='btn btn-primary'
                  onClick={searchroom}
                  id='searchbtn'
                  name='searchbtn'
                >
                <span> 검 색 </span>
                </button>
                </span>
            </p>
          <div style={{ marginTop: '50px' }}>
            <table className='col'>
              <colgroup>
                <col width="20%" />
                <col width="15%" />
                <col width="15%" />
                <col width="40%" />
                <col width="15%" />
              </colgroup>
            <thead>
              <tr>
                <th> 분류 </th>
                <th> 강의명 </th>
                <th> 기간 </th>
                <th> 수강인원 </th> 
              </tr>
            </thead>
            <tbody>
                { leclist.map((item) => {
                    return (
                        <tr key={item.lecrm_id}>
                            <td>{item.lecrm_name}</td>
                            <td>{item.lecrm_size}</td>
                            <td>{item.lecrm_snum}</td>
                            <td>{item.lecrm_note}</td> {/* 누르면 모달창 나와야함 */}
                            
                            
                        </tr>
                    );                   
                })}
            </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPage={totalcnt}
        pageSize={5}
        blockSize={5}
        onClick={searchroom}
      />
    </div> </div></>
    )
}





export default LecturePlan;


