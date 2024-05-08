import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/common/Pagination";



const TestLecturePlan = () => {
  const navigate = useNavigate();
  const searchRoomName = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [leclist, setLeclist] = useState([]);
  const [totalcnt, setTotalcnt] = useState(0);
  


  const searchstyle = {
    fontsize: "15px",
    fontweight: "bold",
  };


  const searchstylewidth = {
    height: "28px",
    width: "200px",
  };

  useEffect(() => {
    searchroom(currentPage);
  }, [currentPage]);

  const searchequlist = (lecrmId) => {
    const query = [`id=${lecrmId ?? 0}`];
    navigate(`/dashboard/tut/TestLecturePlan?${query}`)
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
      .then((res) => {
        setTotalcnt(res.data.listcnt);
        setLeclist(res.data.listdata);
        console.log("res listdat 입니다:  "+res.data.listdata);
        setCurrentPage(cpage);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  

  return (
    <div>
      <div>
        <p className="Location">
          <span className="btn_nav bold">기준정보</span>
          <span className="btn_nav bold"> 공지사항 관리</span>
        </p>
        <p className="conTitle">
          <span>강의계획서 관리</span>
          <span className="fr">
            <span style={searchstyle}>강의 명 </span>
            <input
              type="text"
              id="searchRoomName"
              name="searchRoomName"
              className="form-control"
              placeholder=""
              style={searchstylewidth}
              ref={searchRoomName}
            />
            <button
              className="btn btn-primary"
              onClick={searchroom}
              name="searchbtn"
              id="searchbtn"
            >
              <span>검색</span>
            </button>

            
          </span>
        </p>

        <div>
          <b>진행중 강의 </b><b> 종료된 강의</b>
          <table className="col">
            <colgroup>
              <col width="20%" />
              <col width="15%" />
              <col width="15%" />
              <col width="40%" />
              
            </colgroup>
            <thead>
              <tr>
                <th>분류</th>
                <th>강의명</th>
                <th>기간</th>
                <th>수강인원</th>
                
              </tr>
            </thead>
            <tbody>
              {leclist.map((item) => {
                return (
                  <tr key={item.lecrm_id}>
                    <td>
                      {item.lecrm_name}
                    </td>
                    <td>{item.lecrm_size}</td>
                    <td>{item.lecrm_snum}</td>
                    <td>{item.lecrm_note}</td>
                    
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
        </div>
        

      </div>
    </div>
  )
}

export default TestLecturePlan; 