document.getElementById('create-hobby').onsubmit = () =>
{
    clearErrors();
    let isValid = true;

    //Validate title, description

    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();

    if(title === "")
    {
        document.getElementById('err-title').style.display = "block";
        isValid = false;
    }

    if(description === "")
    {
        document.getElementById('err-description').style.display = "block";
        isValid = false;
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
