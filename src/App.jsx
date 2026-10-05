import { useState } from 'react'
import './App.css'

import RoleSelector from './components/RoleSelector'
import Customer from "./components/Customer";
import Vendor from "./components/Vendor";

function App() {
  const [selectedRole, setSelectedRole] = useState('')

  return (
    <div className="app">

      <div className="hero">
  <p className="eyebrow">WELCOME TO OUR PLATFORM</p>

  <h1 className="app-title">
    Customer <span>/</span> Vendor
    <br />
    Onboarding
  </h1>

  <p className="app-subtitle">
    A simple, secure way to get started.
  </p>
</div>
      
     


      <RoleSelector 
  selectedRole={selectedRole}
  setSelectedRole={setSelectedRole}
/> 

      {selectedRole === "customer" && <Customer />}
{selectedRole === "vendor" && <Vendor />}
      
     {/* Comment:-
    setSelectedRole = {setSelectedRole}
       ↑                  ↑
    prop name       App ka setter*/}

  

 
      {/*Conditional rendering=Condition ke basis par UI ka kuch part dikhana ya hide karna.*/}



    </div>
  )
}

export default App