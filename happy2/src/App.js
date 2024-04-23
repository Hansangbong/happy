//import logo from './logo.svg';
//  <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import React, {useState} from "react";
import Happy from './happy';

function App() {

 let [samplevar, setSamplevar ] = useState(10000);
 let [samplevar2, setSamplevar2 ] = useState(10000);
 let [arr, setArr ] = useState(['10','20','30','40','50']);
 let [newarr, setNewarr ] = useState([]);
 let [flag, setFlag] =  useState(true);

 const pushfunc = () => {
  setSamplevar(20000);

  setNewarr(...arr);

  setFlag(true);
 }

 const pushfunc2 = () => {
  setSamplevar2(20000);

  arr[0] = "99";
  alert(arr[0] + " : " + newarr[0]);

  setFlag(false);
 }
 
  return (
    <div className="App">
      <header className="App-header">
        <div>{samplevar} + {samplevar2} = {samplevar + samplevar2} <button onClick={pushfunc}>눌러</button>
        <button onClick={pushfunc2}>눌러2</button>
        </div>{ " "}
        
        {flag ? <Happy /> : "false 입니다."}
        
        
        <p>
          <select id="arrsel" name="arrsel" >
          
          <option value=""> 전체 </option>
          {
            arr.map( (item) => {
              return <option value= { item }> { item } </option>
            }
            )
          }</select>
          <select id="newarrsel" name="newarrsel" >
          <option value=""> 전체 </option>
            {arr.map((item) => {
              return <option value={item}> {item} </option>;
            })}
          </select>
          <select id="newappsel" name="newappsel">
            
            <option value=""> 전체 </option>
            {newarr.map((item) => {
              return <option value={item}> {item} </option>;
            })}
          </select>
          {arr.map((item, index) => {
            return <input key={index} type="checkbox" value={item} />;
          })}
          {arr.map((item, index) => {
            return (
              <input key={index} type="radio" name="samradio" value={item} />
            );
          })}
        </p>
      </header>
    </div>
  );
}

export default App;