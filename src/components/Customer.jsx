
import { useState } from "react";

function Customer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    console.log("Customer submitted:", {
      name,
      phone,
      email,
      address,
    });

    setSubmitted(true);

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };

  return (
    <div className="form-section">
      <h2>Customer Onboarding</h2>

      <form className="onboarding-form"  onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Phone</label>

        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d*$/.test(value) && value.length <= 10) {
              setPhone(value);

              if (value.length === 10) {
                setPhoneError("");
              } else {
                setPhoneError("Phone number must be 10 digits.");
              }
            }
          }}
          required
        />

        {phoneError && <p className="field-error">{phoneError}</p>}

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Address</label>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>Customer onboarding submitted successfully! 🎉</p>
      )}
    </div>
  );
}

export default Customer;

