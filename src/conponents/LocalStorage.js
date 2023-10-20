import React from 'react'

const LocalStorage = () => {

  localStorage.setItem('user', JSON.stringify({id: 1, name: "arri", age: 30}));
  const updateString = localStorage.getItem('user');
  const user = JSON.parse(updateString);

  console.log(user.name)
  return (
    <div>
      Local Storage
    </div>
  )
}

export default LocalStorage