const togglePass = document.getElementById("togglePass");
const togglePass2 = document.getElementById("togglePass2");

function togglePassword(input_id, button_id){
    const Input = document.getElementById(input_id);
    const Button = document.getElementById(button_id);

    Input.setAttribute("type", Input.getAttribute("type") == "text" ? "password" : "text");
    Button.classList.toggle("fa-eye-slash");
};

if (togglePass) togglePass.addEventListener("click", () => togglePassword("password", "togglePass"));
if (togglePass2) togglePass2.addEventListener("click", () => togglePassword("password2", "togglePass2"));