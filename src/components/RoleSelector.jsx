function RoleSelector({ selectedRole,  setSelectedRole }) { //Yahan { setSelectedRole } = props se received setter function.
  return (
    <div className="role-selector">
      <h2>Choose your role</h2>

<div className="role-buttons">
      <button className={`role-button ${
  selectedRole === 'customer' ? 'active' : ''
}`} /*`  `   → backticks & { }   → JavaScript expression inside a string = This is called a template literal.
So ${} basically means:"Hey JavaScript, calculate something here and put the result inside this string."
And backticks ` ` are what allow us to do that.*/

onClick={() => setSelectedRole('customer')}>
        Customer
      </button>

      <button className={`role-button ${
  selectedRole === 'vendor' ? 'active' : ''
}`} onClick={() => setSelectedRole('vendor')}>
        Vendor
      </button>
       </div>
    </div>
  )
}

export default RoleSelector