//Create Account page 

document.getElementById('create-account').onsubmit = () =>
    {
        clearErrors();
        let isValid = true;
    
        //validate username and password
    
        let user = document.getElementById('username').value.trim();
        let pass = document.getElementById('password').value.trim();
    
        if(user === "")
        {
            document.getElementById("err-user").style.display = "block";
            isValid = false;
        }
    
        if(pass === "")
        {
            document.getElementById("err-pass").style.display = "block";
            isValid = true;
        }
    
        return isValid;
    }
    
    function clearErrors()
    {
        let errors = document.getElementsByClassName("err");
        for(let i = 0;  i < errors.length; i++)
        {
            errors[i].style.display = "none";
        }
    }
    