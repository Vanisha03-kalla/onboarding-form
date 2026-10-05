
import { useState } from "react";

function Vendor() {
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [gstError, setGstError] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF, JPG, JPEG, or PNG file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
  alert("Phone number must be exactly 10 digits.");
  return;
}

const gstPattern =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

if (!gstPattern.test(gstNumber)) {
  alert("Please enter a valid GST number.");
  return;
}

if (!file) {
  alert("Please upload the required GST / tax document.");
  return;
}

    console.log("Vendor submitted:", {
      businessName,
      phone,
      email,
      gstNumber,
      address,
      file,
    });

    setSubmitted(true);
    
    setBusinessName("");
setPhone("");
setEmail("");
setGstNumber("");
setAddress("");
setFile(null);
  };

  return (
    <div className="form-section vendor-section">
      <h2>Vendor Onboarding</h2>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <label>Business Name</label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
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

        <label>GST / Tax ID</label>
        <input
          type="text"
          value={gstNumber}
          onChange={(e) => {
  const value = e.target.value.toUpperCase();

  setGstNumber(value);

  const gstPattern =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

  if (value.length === 15 && gstPattern.test(value)) {
    setGstError("");
  } else {
    setGstError("Please enter a valid 15-character GST number.");
  }
}}
required
        />
        {gstError && <p className="field-error">{gstError}</p>}

        <label>Business Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

       <div
  className="upload-zone"
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    validateFile(e.dataTransfer.files[0]);
  }}
>
          <div className="upload-heading">
  Upload GST / Tax Document
</div>

<p className="upload-description">
  GST Registration Certificate or relevant tax ID document
</p>

<p className="upload-format">
  PDF, JPG, JPEG or PNG · Maximum 5 MB
</p>

          <label className="file-select-button">
  Choose Document
  <input
    type="file"
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={(e) => {
      validateFile(e.target.files[0]);
    }}
  />
</label>

{file && (
  <div className="file-card">
    <div className="file-info">
      <p className="file-name">{file.name}</p>

      <p className="file-meta">
        {file.type === "application/pdf" ? "PDF" : "Image"} ·{" "}
        {(file.size / (1024 * 1024)).toFixed(2)} MB
      </p>
    </div>

    <button
      type="button"
      className="remove-file-button"
      onClick={() => setFile(null)}
    >
      Remove
    </button>
  </div>
)}
          



       {file && file.type.startsWith("image/") && (
  <div className="image-preview">
    <img
      src={URL.createObjectURL(file)}
      alt="Uploaded document preview"
    />
  </div>
)} 
        </div>

        <button type="submit">Submit</button>
      </form>
      {submitted && (
  <p>Vendor onboarding submitted successfully! 🎉</p>
)}
    </div>
  );
}

export default Vendor;

