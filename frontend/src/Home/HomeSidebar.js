import React,  {useState,useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import axios from "axios";


export default function HomeSidebar() {

  const [parkings, setParkings] = useState()
  const [Loding, setLoding] = useState(true)


  useEffect(() => {
    axios.get(" http://localhost:3001/user/allParking").then((res) => {
      console.log(res.data)
      setParkings(res.data)
      setLoding(false)

    })
  }, [])

  //loding
  if (Loding) {return <p>Loding</p>}

  return (
    <div className="homeSidebar">
      <ProSidebar>
        <Menu iconShape="square">

          <MenuItem><input className="searchBar" placeholder="Search"/></MenuItem>
          {parkings.map((p)=>{
            return(
              <SubMenu title={p.StreetName}>
              <div className="">
              <img src={p.image} height="200px" width="200px" />
              <p>{p.StreetName}</p>
              <p>number Of Parking : {p.numberOfParking}</p>
              <p>price : {p.price}</p>
            </div>
              </SubMenu>
            )
          })}
          
        </Menu>
      </ProSidebar>
    </div>
  );
}
