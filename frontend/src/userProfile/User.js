import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker';


export default function User() {
    
   

    return (
        <>
        <DateTimePicker onChange={onChange} value={value} />
            
        </>
    )
}
