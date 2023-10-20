import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Userdata from './Userdata';


const User = () => {

  const [userData, setUserData] = useState()
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [userID, setUserID] = useState('');

  const [submitName, setSubmitName] = useState('Submit');

  const fetchData = async () => {
    try {

      let response = await axios.get('http://localhost:3080/user/getAllData')
      setUserData(response)
      
    } catch (error) {
      console.error(error)
    }
  }

  const createData = async () => {
    try {
      let obj = {
        firstname,
        lastname,
        email,
        password
      };
  
      if (submitName === 'Submit') {
        await axios.post('http://localhost:3080/user/createuser', obj);
      } else {
        await axios.patch(`http://localhost:3080/user/updateUser/${userID}`, { ...obj });
        setSubmitName('Submit');
      }
  
      // Fetch updated data
      await fetchData();
      
      setFirstName('');
      setLastName('');
      setemail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };
  
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3080/user/deleteUser/${userId}`);
      fetchData(); 
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleuser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3080/user/getuser/${userId}`); 
      fetchData(); 
      setUserID(response.data._id)
      setFirstName(response.data.firstname)
      setLastName(response.data.lastname)
      setemail(response.data.email)
      setPassword(response.data.password)
      setSubmitName('Update')
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[]);

  console.log(userData);
  console.log('This is consoles data',firstname, lastname, email, password)
  return (

    <>
<div className='flex justify-center w-full h-full bg-teal-100'>
  <div className='mx-auto my-auto'>
    <div >
       <input value={firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder='Enter your First Name' type="text" id="small-input" class="w-96 mt-2 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
    </div>
    <div >
       <input value={lastname} onChange={(e)=>setLastName(e.target.value)} placeholder='Enter your Last Name' type="text" id="small-input" class="w-96 mt-2 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
    </div>
    <div>
       <input placeholder='Enter your Email' value={email} onChange={(e)=>setemail(e.target.value)} type="text" id="small-input" class="w-96 mt-2 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    </div>
    <div>
       <input placeholder='Enter your Password' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="small-input" class="w-96 mt-2 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    </div>
    <div>
    <button onClick={createData} type="submit" class="w-96 mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-black-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{submitName}</button>

    </div>
    
  </div>
        
  

  <div>
    
        <br />
  </div>
   
    </div>
    <Userdata userdata={userData} deleteUser={deleteUser} getSingleUser={getSingleuser}/>

    </>
  )
}

export default User