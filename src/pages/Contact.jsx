import React, { Suspense, useRef } from 'react'
import { useState } from 'react';
import emailjs from '@emailjs/browser'
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'
import Fox from '../models/Fox'
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
const Contact = () => {
  const formRef=useRef(null);
  const [form, setform] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setisLoading] = useState(false);
  const [currentAnimation, setcurrentAnimation] = useState('idle')
  const {alert,alertShow, hideAlert}=useAlert();
  const handleInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => setcurrentAnimation('walk');
  const handleBlur = () => setcurrentAnimation('idle');
  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    setcurrentAnimation('hit')
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name:form.name,
        to_name:'Sachin',
        from_email:form.email,
        to_email:'skprajapati3214@gmail.com',
        message:form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(()=>{
      setisLoading(false);
      alertShow({show:true,text:'Message sent successfully',type:'success'})
      setform({
        name:"",
        email:"",
        message:""
      })
      setTimeout(()=>{
        hideAlert()
        setcurrentAnimation('idle');
      },[3000])
    }).catch((error)=>{
      setisLoading(false);
      setcurrentAnimation('idle')
      showAlert({show:true,text:'i didn,t receive your mail',type:'danger'})
    })
  };
  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert}/>}
      

      <div className="flex-1 min-w-[50%] flex flex-col ">
        <h1 className="head-text">Get in Touch</h1>
        <form action="" className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
          <label htmlFor="" className="text-black-500 font-semibold">
            Name
            <input type="text"
            name="name"
            className="input"
            placeholder="Your name"
            required
            value={form.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
          </label>
          <label htmlFor="" className="text-black-500 font-semibold">
            Email
            <input type="email"
            name="email"
            className="input"
            placeholder="Your email"
            required
            value={form.email}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
          </label>
          <label htmlFor="" className="text-black-500 font-semibold">
            Message
            <textarea 
            name="message"
            className="input"
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />
          </label>
          <button
          type='submit'
          className="btn"
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isLoading}
          >
            {isLoading?'Sending...':'Send Message'}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] ">
          <Canvas
          camera={{
            position:[0,0,5],
            fov:75,
            near:0.1,
            far:1000
          }}
          >
            <ambientLight intensity={0.5}/>
            <directionalLight intensity={2.5} position={[0,0,1]} />
            <Suspense fallback={<Loader/>} >
              <Fox
              currentAnimation={currentAnimation}
              position={[0.5,0.35,0]}
              rotation={[12.6,-0.6,0]}
              scale={[0.5,0.5,0.5]}
              />
            </Suspense>
          </Canvas>
      </div>
    </section>
  )
}

export default Contact