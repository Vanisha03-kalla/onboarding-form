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
  businessName: "",
  phone: "",
  gstNumber: "",
  address: "",
  city: "",
  state: "",
  gstCertificate: null,
  panCard: null,
  email: "",
  referralCode: "",
};

function Vendor() {
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

  const handleGSTChange = (event) => {
    const value = event.target.value
      .toUpperCase()
      .replace(/[^0-9A-Z]/g, "")
      .slice(0, 15);

    updateField("gstNumber", value);
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
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Business name is required.";
      }

      if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid 10-digit phone number.";
      }

      const gstPattern =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

      if (!formData.gstNumber.trim()) {
        newErrors.gstNumber = "GST number is required.";
      } else if (!gstPattern.test(formData.gstNumber)) {
        newErrors.gstNumber =
          "Enter a valid 15-character GST number.";
      }

      if (!formData.address.trim()) {
        newErrors.address = "Business address is required.";
      }

      if (!formData.city) {
        newErrors.city = "Please select a city.";
      }

      if (!formData.state) {
        newErrors.state = "Please select a state.";
      }
    }

    if (step === 2) {
      if (!formData.gstCertificate) {
        newErrors.gstCertificate =
          "Please upload your GST Certificate.";
      }

      if (!formData.panCard) {
        newErrors.panCard = "Please upload your PAN Card.";
      }
    }

    if (step === 3) {
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Enter a valid email address.";
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

      <small>
        Accepted formats: PDF, JPG, JPEG, PNG. Maximum 5 MB.
      </small>

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
          <h2>🎉 Vendor Form Completed!</h2>

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
      <h2>Vendor Onboarding</h2>

      <p className="review-note">
        Please complete all required business details to continue.
      </p>

      <div className="wizard-progress">
        {[
          "Business Details",
          "Documents",
          "Contact & Referral",
          "Review",
        ].map((label, index) => {
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
        })}
      </div>

      <form
        className="onboarding-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {step === 1 && (
          <div className="wizard-page">
            <h3>Business Details</h3>

            <div className="form-group">
              <label htmlFor="businessName">Business Name *</label>
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(event) =>
                  updateField("businessName", event.target.value)
                }
                placeholder="Enter your business name"
              />
              {errors.businessName && (
                <p className="field-error">{errors.businessName}</p>
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
              <label htmlFor="gstNumber">GST Number *</label>
              <input
                id="gstNumber"
                type="text"
                maxLength={15}
                value={formData.gstNumber}
                onChange={handleGSTChange}
                placeholder="15-character GST number"
              />
              {errors.gstNumber && (
                <p className="field-error">{errors.gstNumber}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Business Address *</label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(event) =>
                  updateField("address", event.target.value)
                }
                placeholder="Enter your complete business address"
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

            {renderFileUpload("gstCertificate", "GST Certificate")}
            {renderFileUpload("panCard", "PAN Card")}
          </div>
        )}

        {step === 3 && (
          <div className="wizard-page">
            <h3>Contact & Referral</h3>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="business@example.com"
              />
              {errors.email && (
                <p className="field-error">{errors.email}</p>
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
            <h3>Review Your Business Details</h3>

            <p className="review-note">
              Please check your information before submitting.
            </p>

            <h4>Business Details</h4>
            <p>
              <strong>Business Name:</strong> {formData.businessName}
            </p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>GST Number:</strong> {formData.gstNumber}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>State:</strong> {formData.state}</p>

            <h4>Documents</h4>
            <p>
              <strong>GST Certificate:</strong>{" "}
              {formData.gstCertificate?.name || "Not uploaded"}
            </p>
            <p>
              <strong>PAN Card:</strong>{" "}
              {formData.panCard?.name || "Not uploaded"}
            </p>

            <h4>Contact & Referral</h4>
            <p><strong>Email:</strong> {formData.email}</p>
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

export default Vendor;