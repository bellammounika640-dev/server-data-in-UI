import axios from "axios"
import './App.css';
import { useEffect, useState , useRef } from "react";

function App() {

 let [data,setData]  = useState([]);
 let [country,setCountry]   = useState([]);
 let [department,setDepartment]  = useState([]);
 let [gender,setGender]    = useState([])

 let countrySelectRef = useRef();
 let departmentSelectRef = useRef();
 let genderSelectRef = useRef();

 useEffect(()=>{
  gettingCountyListFromServer();
  gettingDepartmentListFromServer();
  gettingGenderListFromServer();
 },[])

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

  let gettingDataFromServer = async ()=>{
    let urlQS = `http://localhost:1616/employee?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`
    let JSOData = await axios.get(urlQS)
    setData(JSOData.data)
    console.log(JSOData.data);
    console.log(urlQS);
  }
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
