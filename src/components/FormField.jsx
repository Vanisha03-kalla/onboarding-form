import { useState } from 'react'
/*Form input ko React state ke saath connect karna — controlled inputs 
User types "Vanisha"
        ↓
onChange fires
        ↓
event.target.value
        ↓
"Vanisha"
        ↓
setValue("Vanisha")
        ↓
value becomes "Vanisha"*/

function FormField({ label, type, placeholder }) {
    const [value, setValue] = useState('')
  return (
    <div>
      <label>{label}</label>
      <input
  type={type}
  placeholder={placeholder}
  value={value} /*value={value} → React tells the input what value to display
onChange → input tells React "hey, my value changed!" */
  onChange={(event) => setValue(event.target.value)}
/>
    </div>
  )
}

export default FormField