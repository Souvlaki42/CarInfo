function togglePassword1(){
    togglePassword("password", "togglePass");
};

function togglePassword2(){
    togglePassword("password2", "togglePass2");
};

function togglePassword(input, button){
    const Input = document.getElementById(input);
    const Button = document.getElementById(button);

    if (Input.type === "password"){
        Input.type = "text";
    } else {
        Input.type = "password";
    }

    if (Button.className == "fas fa-eye pass-change"){
        Button.className = "fas fa-eye-slash pass-change";
    } else {
        Button.className = "fas fa-eye pass-change";
    }
};