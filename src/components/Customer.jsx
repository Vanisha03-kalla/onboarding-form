import { useState } from "react";

const cities = [
  "Jaipur",
  "Jodhpur",
  "Bikaner",
  "Udaipur",
  "Kota",
  "Ajmer",
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Other",
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
];

const initialFormData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  panCard: null,
  aadhaarCard: null,
  upiId: "",
  referralCode: "",
};

function Customer() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 10);
    updateField("phone", value);
  };

  const handleFileChange = (event, field) => {
    const file = event.target.files?.[0];

    if (!file) {
      updateField(field, null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      updateField(field, null);
      setErrors((previous) => ({
        ...previous,
        [field]: "Please upload a PDF, JPG, JPEG, or PNG file.",
      }));
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      updateField(field, null);
      setErrors((previous) => ({
        ...previous,
        [field]: "File size must not exceed 5 MB.",
      }));
      event.target.value = "";
      return;
    }

    updateField(field, file);
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required.";
      }

      if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid 10-digit phone number.";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Enter a valid email address.";
      }

      if (!formData.address.trim()) {
        newErrors.address = "Address is required.";
      }

      if (!formData.city) {
        newErrors.city = "Please select a city.";
      }

      if (!formData.state) {
        newErrors.state = "Please select a state.";
      }
    }

    if (step === 2) {
      if (!formData.panCard) {
        newErrors.panCard = "Please upload your PAN Card.";
      }

      if (!formData.aadhaarCard) {
        newErrors.aadhaarCard = "Please upload your Aadhaar Card.";
      }
    }

    if (step === 3) {
      if (!formData.upiId.trim()) {
        newErrors.upiId = "UPI ID is required.";
      } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId.trim())) {
        newErrors.upiId = "Enter a valid UPI ID, e.g. name@bank.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    setStep((previous) => Math.min(previous + 1, 4));
  };

  const handleBack = () => {
    setErrors({});
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (step !== 4) return;

    setSubmitted(true);
  };

  const handleStartAgain = () => {
    setFormData({ ...initialFormData });
    setErrors({});
    setStep(1);
    setSubmitted(false);
  };

  const renderFileUpload = (field, label) => (
    <div className="form-group" key={field}>
      <label htmlFor={field}>{label} *</label>

      <input
        id={field}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(event) => handleFileChange(event, field)}
      />

      <small>Accepted formats: PDF, JPG, JPEG, PNG. Maximum 5 MB.</small>

      {errors[field] && (
        <p className="field-error">{errors[field]}</p>
      )}

      {formData[field] && (
        <p className="uploaded-file">
          Selected: {formData[field].name}
        </p>
      )}
    </div>
  );

  if (submitted) {
    return (
      <section className="form-section">
        <div className="onboarding-form">
          <h2>🎉 Customer Form Completed!</h2>

          <p>
            Your details have passed the form validation.
            This demo does not save or send your information to a server.
          </p>

          <button type="button" onClick={handleStartAgain}>
            Start Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="form-section">
      <h2>Customer Onboarding</h2>

      <p className="review-note">
        Please complete all required details to continue.
      </p>

      <div className="wizard-progress">
        {["Personal Details", "Documents", "UPI & Referral", "Review"].map(
          (label, index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={label}
                className={`wizard-step ${
                  step === stepNumber ? "active" : ""
                } ${step > stepNumber ? "completed" : ""}`}
              >
                <span>{stepNumber}</span>
                <small>{label}</small>
              </div>
            );
          }
        )}
      </div>

      <form
        className="onboarding-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {step === 1 && (
          <div className="wizard-page">
            <h3>Personal Details</h3>

            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="field-error">{errors.fullName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="10-digit phone number"
              />
              {errors.phone && (
                <p className="field-error">{errors.phone}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="field-error">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(event) =>
                  updateField("address", event.target.value)
                }
                placeholder="Enter your complete address"
                rows={3}
              />
              {errors.address && (
                <p className="field-error">{errors.address}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <select
                id="city"
                value={formData.city}
                onChange={(event) =>
                  updateField("city", event.target.value)
                }
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="field-error">{errors.city}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                value={formData.state}
                onChange={(event) =>
                  updateField("state", event.target.value)
                }
              >
                <option value="">Select your state</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="field-error">{errors.state}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-page">
            <h3>Documents</h3>
            <p>Upload clear copies of both required documents.</p>

            {renderFileUpload("panCard", "PAN Card")}
            {renderFileUpload("aadhaarCard", "Aadhaar Card")}
          </div>
        )}

        {step === 3 && (
          <div className="wizard-page">
            <h3>UPI & Referral</h3>

            <div className="form-group">
              <label htmlFor="upiId">UPI ID *</label>
              <input
                id="upiId"
                type="text"
                value={formData.upiId}
                onChange={(event) =>
                  updateField("upiId", event.target.value)
                }
                placeholder="yourname@bank"
              />
              {errors.upiId && (
                <p className="field-error">{errors.upiId}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="referralCode">
                Referral Code (Optional)
              </label>
              <input
                id="referralCode"
                type="text"
                value={formData.referralCode}
                onChange={(event) =>
                  updateField("referralCode", event.target.value)
                }
                placeholder="Enter referral code if you have one"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-page review-page">
            <h3>Review Your Details</h3>

            <p className="review-note">
              Please check your information before submitting the form.
            </p>

            <h4>Personal Details</h4>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>State:</strong> {formData.state}</p>

            <h4>Documents</h4>
            <p>
              <strong>PAN Card:</strong>{" "}
              {formData.panCard?.name || "Not uploaded"}
            </p>
            <p>
              <strong>Aadhaar Card:</strong>{" "}
              {formData.aadhaarCard?.name || "Not uploaded"}
            </p>

            <h4>UPI & Referral</h4>
            <p><strong>UPI ID:</strong> {formData.upiId}</p>
            <p>
              <strong>Referral Code:</strong>{" "}
              {formData.referralCode || "Not provided"}
            </p>

            <p className="review-note">
              Your details will not be sent to a server in this demo.
            </p>
          </div>
        )}

        <div className="wizard-navigation">
          {step > 1 && (
            <button
              type="button"
              className="back-button"
              onClick={handleBack}
            >
              Back
            </button>
          )}

          {step < 4 && (
            <button
              type="button"
              className="next-button"
              onClick={handleNext}
            >
              {step === 3 ? "Review Details" : "Next"}
            </button>
          )}

          {step === 4 && (
            <button type="submit" className="submit-button">
              Submit Details
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Customer;