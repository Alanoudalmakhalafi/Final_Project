import React, {useRef} from 'react'
import axios from "axios";


export default function AddParking() {

    const latitude = useRef(null)
      const longitude = useRef(null)
      const num = useRef(null)
      const img = useRef(null)
      const price = useRef(null)

  

    const handleClickEvent = (e) => {
      e.preventDefault();
      axios
      .post(" http://localhost:3001/admin/addParking", {
        
        latitude=latitude.current.value,
        longitude=longitude.current.value,
        num=num.current.value,
        img=img.current.value,
        price=price.current.value,
    }
        )
       
      }

      return (
        <div>
    
          <input ref={latitude} placeholder='latitude' required />
          <input ref={longitude} placeholder='longitude' required />
          <input ref={num} placeholder='number of parking' required />
          <input ref={img} placeholder='image' required />
          <input ref={price} placeholder='parking price' required />

          <button onClick={handleClickEvent(e)}>Get value</button>
        </div>
      )
}
