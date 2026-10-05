import FormField from './FormField'
function OnboardingForm({ role }) {
  return (
    <div>
      <h2>{role} Onboarding Form</h2>
      <FormField
         label="Full Name"
        type="text"
        placeholder="Enter your full name"
      />

      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <FormField
        label="Phone"
        type="tel"
        placeholder="Enter your phone number"
      />
    </div>
  )
}

export default OnboardingForm