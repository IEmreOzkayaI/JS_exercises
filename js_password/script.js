const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementsList = document.querySelectorAll(".requirement-list li ");

const requirements = [
  { regex: /.{8,}/, index: 0 },
  { regex: /[0-9]/, index: 1 },
  { regex: /[a-z]/, index: 2 },
  { regex: /[^A-Za-z0-9]/, index: 3 },
  { regex: /[A-Z]/, index: 4 },
];

passwordInput.addEventListener("keyup", (e) => {
  requirements.forEach((requirement) => {
    const isValid = requirement.regex.test(e.target.value);
    const requirementItem = requirementsList[requirement.index];
    if(isValid){
        requirementItem.firstElementChild.className="fa-solid fa-check"
        requirementItem.classList.add("valid")
    }else{
        requirementItem.firstElementChild.className="fa-solid fa-circle"
        requirementItem.classList.remove("valid")
    }
  });
});

eyeIcon.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  eyeIcon.className = `fa-solid fa-eye${
    passwordInput.type === "password" ? "" : "-slash"
  }`;
});
