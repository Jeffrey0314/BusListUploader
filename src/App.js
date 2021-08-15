import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [buslists, setBuslists] = useState([
    {
      index: 0,
      status: "",
      name: "",
      location: "",
      landmark: "",
      businessType: "",
      openingDays: "",
      openingHours: "",
      landline: "",
      mobile: "",
      geolocationId: "",
      image: ""
    }
  ]);

  const [buslist, setBuslist] = useState(
    {
      index: 0,
      status: "",
      name: "",
      location: "",
      landmark: "",
      businessType: "",
      openingDays: "",
      openingHours: "",
      landline: "",
      mobile: "",
      geolocationId: "",
      image: ""
    }
  )

  useEffect(()=> {
    fetch('/buslist').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setBuslists(jsonRes))
    .catch((err)=> {
      console.log(err);
    })
  });


  function handleChange(e) {
    const {name, value} = e.target;
    setBuslist(prevInput => {
      return(
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  function addBuslist(e) {
    e.preventDefault();
    alert("Buslist added");
    const newBuslist = {
      index: buslist.index,
      status: buslist.status,
      name: buslist.name,
      location: buslist.location,
      landmark: buslist.landmark,
      businessType: buslist.businessType,
      openingDays: buslist.openingDays,
      openingHours: buslist.openingHours,
      landline: buslist.landline,
      mobile: buslist.mobile,
      geolocationId: buslist.geolocationId,
      image: buslist.image
    }
    axios.post('/newbuslist', newBuslist);
  }

  function deleteBuslist(id) {
    axios.delete('/delete/' + id);
    alert("buslist deleted");
  }

  return (
    <div className="App">
      <h1>Add Buslist Item</h1>
      <form>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Index: <input style={{width:"500px", textAlign: "left", paddingLeft: "50px"}} onChange={handleChange} name="index" value={buslist.index}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Status: <input style={{width:"500px"}} onChange={handleChange} name="status" value={buslist.status}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Store Name: <input style={{width:"500px"}} onChange={handleChange} name="name" value={buslist.name}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Location: <input style={{width:"500px"}} onChange={handleChange} name="location" value={buslist.location}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Landmark: <input style={{width:"500px"}} onChange={handleChange} name="location" value={buslist.landmark}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Business Type: <input style={{width:"500px"}} onChange={handleChange} name="businessType" value={buslist.businessType}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Opening Days: <input style={{width:"500px"}} onChange={handleChange} name="openingDays" value={buslist.openingDays}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Opening Hours: <input style={{width:"500px"}} onChange={handleChange} name="openingHours" value={buslist.openingHours}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Landline: <input style={{width:"500px"}} onChange={handleChange} name="landline" value={buslist.landline}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Mobile: <input style={{width:"500px"}} onChange={handleChange} name="mobile" value={buslist.mobile}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Google Map Location: <input style={{width:"700px"}} onChange={handleChange} name="geolocationId" value={buslist.geolocationId}></input></h3>
        </div>
        <div>
          <h3 style={{textAlign: "left", paddingLeft: "100px"}}>Image: <input style={{width:"700px"}} onChange={handleChange} name="image" value={buslist.image}></input></h3>
        </div>
        
        <button onClick={addBuslist}>ADD Now!</button>
      </form>
      {buslists ? buslists.map(buslist => {
        return (
          <div>
            <hr />
            <h2>searchbox / buslists database contains:</h2>
            <h4>Name:  {buslist.name}</h4>
            <p>Status:  {buslist.status}</p>
            <p>Location:  {buslist.location}</p>
            <p>Landmark:  {buslist.landmark}</p>
            <p>Business Type:  {buslist.businessType}</p>
            <p>Image:  {buslist.image}</p>
            <button onClick={() => deleteBuslist(buslist._id)}>DELETE</button>
          </div>
          ) 
      })
    : "If you see this message, you need to run the server first by nodemon server.js"}
    </div>
  );
}

export default App;

