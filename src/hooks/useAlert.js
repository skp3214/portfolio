import React, { useState } from 'react'

const useAlert = () => {
    const [alert, setalert] = useState({
        show: false,
        text: "",
        type: "danger"
    })
    const alertShow = ({text,type='danger'}) => setalert({
        show:true,
        text:text,
        type:type
    })

    const hideAlert=()=>setalert({
        show:false,
        text:"",
        type:"danger"
    })
    return {alert,alertShow,hideAlert}
}

export default useAlert