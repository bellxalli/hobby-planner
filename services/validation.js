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
    // if(plan.tagColor.trim() === "")
    // {
    //     errors.push("Pick a Tag Color");
    // }
    // if(plan.availStartDateTime === "" || plan.availEndDateTime === "") //fix so it is actual value
    // {
    //     errors.push("Pick a Start Time, End Time, and Date");
    // }
    return {
        isValid: errors.length === 0,
        errors
    }
}