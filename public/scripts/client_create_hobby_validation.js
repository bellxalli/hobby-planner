document.getElementById('create-hobby').onsubmit = () =>
{
    clearErrors();
    let isValid = true;

    //Validate title, description, time and date

    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();
    let startTime = document.getElementById('sTime').value.trim();
    let endTime = document.getElementById('eTime').value.trim();
    let date = document.getElementById('date').value.trim();

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

    if(startTime === "")
    {
        document.getElementById('err-sTime').style.display = "block";
        isValid = false;
    }

    if(endTime === "")
    {
        document.getElementById('err-eTime').style.display = "block";
        isValid = false;
    }

    if(date === "")
    {
        document.getElementById('err-date').style.display = "block";
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
