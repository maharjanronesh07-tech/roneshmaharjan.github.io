/*
 * Portfolio settings. Safe for public GitHub Pages: do not put passwords,
 * private API keys, or secrets in this file.
 */
window.PORTFOLIO_CONFIG = {
  name: "Ronesh Maharajan",
  email: "maharjanronesh7@gmail.com",
  location: "Nepal",
  socialLinks: {
    github: "https://github.com/maharjanronesh07-tech",
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    x: ""
  },

  // Contact form: create a form at https://formspree.io/ and paste its
  // public form endpoint below, e.g. https://formspree.io/f/abcdwxyz.
  // This is an endpoint, not a secret. Never put an API/private key here.
  formspreeEndpoint: "",

  // Privacy-safe age display: the date of birth is NOT included in this
  // public file. To show an automatically calculated age, deploy the optional
  // Cloudflare Worker in /worker and set ageEndpoint to its public URL.
  // Store BIRTH_DATE only as a Worker secret, not here.
  ageEndpoint: "",

  education: {
    course: "BCA",
    institution: "Prime College",
    currentSemester: "2nd semester",
    semesterStartDate: "", // Set to YYYY-MM-DD if you know the actual start date.
    semesterDurationMonths: 6
  }
};
