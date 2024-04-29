import React , {useState, useEffect, useRef } from 'react';
//import '../../pages/sampletest/SamplePage1.css'
import axios from 'axios';
import modal from 'react-modal';
import Pagination from '../../components/common/Pagination';
import { useSelector } from 'react-redux';

const LecturePlan = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [equcurrentPage, setEqucurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalcnt, setTotalcnt] = useState(0);
  const [searchRoomName, setSearchRoomName] = useState("");
  const [roomlist, setRoomlist] = useState([]);
  const [blocksize] = useState(10);
  const [equdis, setEqudis] = useState(false);
  const [searchroomid, setSearchroomid] = useState(0);
  const [equitemlist, setEquitemlist] = useState([]);
  const [equtotalcnt, setEqutotalcnt] = useState(0);
  const [roomdis, setRoomdis] = useState(false);
  const [isroomRegBtn, setIsroomRegBtn] = useState(false);

  const [roomname, setRoomname] = useState("");
  const [roomsize, setRoomsize] = useState(0);
  const [roomsite, setRoomsite] = useState(0);
  const [roometc, setRoometc] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    console.log("useEffect");
    searchroom();
  }, []);

  useEffect(() => {
    console.log("searchroomid useEffect");
    equlist();
  }, [searchroomid]);

  const changesearchroom = (e) => {
    setSearchRoomName(e.target.value);
  };

  const searchroom = (cpage) => {
    cpage = cpage || 1;
    setCurrentPage(cpage);

    //alert(searchRoomName);

    let params = new URLSearchParams();
    params.append("cpage", currentPage);
    params.append("pagesize", pageSize);
    params.append("searchRoomName", searchRoomName);

    axios
      .post("/adm/lectureRoomListjson.do", params)
      .then((res) => {
        setTotalcnt(res.data.listcnt);
        setRoomlist(res.data.listdata);
        console.log("result console : " + res);
        console.log("result console : " + JSON.stringify(res));
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const searchequlist = (id) => {
    //alert(id);
    setSearchroomid(id);
    //equlist();
  };

  const equlist = async (cpage) => {
    cpage = cpage || 1;
    setEqucurrentPage(cpage);
    setEqudis(true);

    //alert(searchroomid);

    let params = new URLSearchParams();
    params.append("cpage", cpage);
    params.append("pagesize", pageSize);
    params.append("lecrm_id", searchroomid);

    await axios
      .post("/adm/equListjson.do", params)
      .then((res) => {
        setEqutotalcnt(res.data.listcnt);
        setEquitemlist(res.data.listdata);
        console.log("result console : " + res);
        console.log("result console : " + JSON.stringify(res));
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const closeroomModal = () => {
    setRoomdis(false);
  };

  const newroom = () => {
    setRoomdis(true);
    setIsroomRegBtn(true);

    setRoomname("");
    setRoomsize(0);
    setRoomsite(0);
    setRoometc("");
    setAction("I");
  };

  const roommod = (id) => {
    //alert(id);

    let params = new URLSearchParams();

    params.append("lecrm_id", id);

    axios
      .post("/adm/lectureRoomDtl.do", params)
      .then((res) => {
        console.log("result detial : " + JSON.stringify(res));
        setRoomname(res.data.selinfo.lecrm_name);
        setRoomsize(res.data.selinfo.lecrm_size);
        setRoomsite(res.data.selinfo.lecrm_snum);
        setRoometc(res.data.selinfo.lecrm_note);

        setSearchroomid(id);
        setAction("U");
        setIsroomRegBtn(false);
        setRoomdis(true);
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const roomdel = () => {
    roomreg("D");
  };

  const roomreg = (type) => {
    if (typeof type == "object") {
      type = action;
    }

    //alert(typeof type + " : " + type + " : " + action);

    let params = new URLSearchParams();

    params.append("lecrm_name", roomname);
    params.append("lecrm_size", roomsize);
    params.append("lecrm_snum", roomsite);
    params.append("lecrm_note", roometc);
    params.append("lecrm_id", searchroomid);
    params.append("action", type);

    axios
      .post("/adm/lectureRoomSave.do", params)
      .then((res) => {
        console.log("result save : " + JSON.stringify(res));

        if (res.data.result == "S") {
          alert(res.data.resultmsg);
          closeroomModal();

          if (action === "I") {
            searchroom();
          } else {
            searchroom(currentPage);
          }
        } else {
          alert(res.data.resultmsg);
        }
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const searchstyle = {
    fontsize: "15px",
    fontweight: "bold",
  };

  const searchstylewidth = {
    height: "28px",
    width: "200px",
  };

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
                <input type="text" className="form-control"
                style={{width: '200px', marginRight: '5px'}}
                onChange={(e) => {
                    console.log("input text")//setKeyword(e.target.value)
                }}/>
                    <button
                    onClick={(e) => {console.log("id=fr onClick")}}
                    className='btn btn-primary'
                    id='btnSearchGrpcod'
                    name='btn'
                >
                <span> 검 색 </span>
                </button>
                
                </span>
            </p>
            
            


          <div style={{ marginTop: '50px' }}>
            <table className='col'>
            <thead>
              <tr>
              <th scope='col'> 분류 </th>
              <th scope='col'> 강의명 </th>
              <th scope='col'> 기간 </th>
              <th scope='col'> 수강인원 </th> 
            </tr>
            </thead>
            <tbody>
                {roomlist.map((item) => {
                    return (
                        <tr key={item.lecrm_id}>
                            <td
                              className="pointer-cursor"
                              onClick={() => searchequlist(item.lecrm_id)}
                            >
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
      
    </div> </div></>
        
        

         
    )
}





export default LecturePlan;


