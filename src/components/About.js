import React, { useEffect } from 'react'
import { useContext } from 'react';
import noteContext from '../context/Notes/noteContext';
const About = () => {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  },[]);
  //we use is as a componentDidMount 
  return (
    <>
    <div>
      This is about...
    </div>
    <div>
     the content for the Context imported to about is - {a.state.name} & class {a.state.class}
    </div>
   </>
  )
}

export default About;
