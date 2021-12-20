import React from "react";
import Sidebar from "./Sidebar";
import axios from "axios" 

export default function Profile() {

  const [isClicked , setIsClicked ] = useState(true)
  const [Profile, setProfile] = useState([])

  const Email = useRef(null);
  const Phone = useRef(null);
  const Password = useRef(null);

  const showUpdateInput = () => {
    if(isClicked){
      setIsClicked(false)
    }else {
      setIsClicked(true)
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3001/admin/admin")
    .then((res) => {
      console.log(res.data)
      setProfile(res.data)
    })
  }, [])

  const updatingProfile = (id) => {
    axios.put(`http://localhost:3001/admin/updateAdmin/${id}`, {
      email: Email.current.value,
      phone: Phone.current.value,
      password: Password.current.value
    }).then((res) => {
      console.log(res.data)
      setProfile(res.data)
    },
    (err) => {
      console.log(err)
    }
    )}

  return (
    <>
      <Sidebar/>

      {isClicked ? (<>

      {Profile.map((element) => {
        return(
          <>
      <button onClick={showUpdateInput()}>isClicked your profile</button>
          <h5>{element.email}</h5>
          <h5>{element.phone}</h5>
          <h5 type={Password}>{element.password}</h5>
          </>
        )
      })}
      </>) : (<>

      <input ref={Email} placeholder="Email" required/>
      <input ref={Phone} placeholder="Phone number" />
      <input ref={Password} placeholder="Password" required/>

      <button onClick={() => {
        updatingProfile(_id)
        showUpdateInput()
        }}>save change</button>
      </>)}

     
    </>
  );
}
