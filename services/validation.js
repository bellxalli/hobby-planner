//put validation in here then call function

export default function validateAddHobby(plan)
{
    const errors = [ ];

    
    if(plan.title.trim() === "")
    {
        errors.push("Must Include a Title");
    }
    if(plan.description.trim() === "")
    {
        errors.push("Must Include a Description");
    }
    
    //decided to make these optional
    // if(plan.tagName.trim() === "")
    // {
    //     errors.push("Select a Tag Icon");
    // }
  
    if(plan.availStartDateTime.trim() === "" || plan.availEndDateTime.trim() === "") 
    {
        errors.push("Pick a Start Time, End Time, and Date");
    }
    return {
        isValid: errors.length === 0,
        errors
    }
}