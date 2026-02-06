import axios from "axios"
import './App.css';
import { useEffect, useState , useRef } from "react";

function App() {
// This useState hooks are used to display in UI and when the state variable value change total UI is changed.
 let [data,setData]  = useState([]);
 let [country,setCountry]   = useState([]);
 let [department,setDepartment]  = useState([]);
 let [gender,setGender]    = useState([])
// we create Ref's for controlling selections
 let countrySelectRef = useRef();
 let departmentSelectRef = useRef();
 let genderSelectRef = useRef();
// this useEffect hook used to oncomponent load it will excecute countrylist,departmentlist,genderlist
 useEffect(()=>{
  gettingCountyListFromServer();
  gettingDepartmentListFromServer();
  gettingGenderListFromServer();
 },[])
  // these are separate API's
 let gettingCountyListFromServer = async ()=>{
    let JSOData = await axios.get("http://localhost:1616/countries")
    setCountry(JSOData.data);
    console.log(JSOData.data);
  }
   let gettingDepartmentListFromServer = async ()=>{
    let JSOData = await axios.get("http://localhost:1616/departments")
    setDepartment(JSOData.data);
    console.log(JSOData.data);
  }
   let gettingGenderListFromServer = async ()=>{
    let JSOData = await axios.get("http://localhost:1616/genders")
    setGender(JSOData.data);
    console.log(JSOData.data);
  }
    
  // Query string is sent after ? in the URL
//  Used for filters, search, pagination, optional data
  let gettingDataFromServer = async ()=>{
    let urlQS = `http://localhost:1616/employee?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`
    let JSOData = await axios.get(urlQS)
    setData(JSOData.data)
    console.log(JSOData.data);
    console.log(urlQS);
  }
  // param aslo same variables used in ULR but difference is QS we use after '?' symbol, parmas we use '/'symbol we are not pass any variables in client,
  // here in client we pass only values variables we declare in server path
  //  let gettingDataFromServer = async ()=>{
  //   let urlP = `http://localhost:1616/employee/${countrySelectRef.current.value}/${departmentSelectRef.current.value}/${genderSelectRef.current.value}`
  //   let JSOData = await axios.get(urlP)
  //   setData(JSOData.data)
  //   console.log(JSOData.data);
  //   console.log(urlP)
  // }
  return (
    <div className="App">
      <form>
        <div>
          <label>Country:</label>
          <select ref={countrySelectRef}>
            {country.map((ele,i)=>{
              return <option key={i}>{ele}</option>
            })}
          </select>
        </div>

        <div>
          <label>Department:</label>
          <select ref={departmentSelectRef}>
            {department.map((ele,i)=>{
              return <option key={i}>{ele}</option>
            })}
            
          </select>
        </div>

        <div>
          <label>Gender:</label>
          <select ref={genderSelectRef}>
            {gender.map((ele,i)=>{
              return <option key={i}>{ele}</option>
            })}
          </select>
        </div>
        <button type='button' onClick={()=>{
      gettingDataFromServer();
     }}>Get Data</button>
      </form>
     
     <br></br>
     <br></br>
     <table>
      <thead>
        <tr>
          <th>S.NO</th>
          <th>ID</th>
          <th>Profile Pic</th>
          <th>First Name</th>
          <th> Last Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Country</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {data.map((ele,i)=>{
          return <tr key={i}>
          <td>{i +1}</td>
          <td>{ele.id}</td>
          <td><img src={ele.profilepic } alt=''></img></td>
          <td>{ele.firstName}</td>
          <td> {ele.lastName}</td>
          <td>{ele.email}</td>
          <td>{ele.age}</td>
          <td>{ele.gender}</td>
          <td>{ele.country}</td>
          <td>{ele.department}</td>
        </tr>
        })}
        
      </tbody>
     </table>
    </div>

  );
}

export default App;
