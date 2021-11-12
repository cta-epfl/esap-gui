export default function parseMultipleArchivesForm(formData) {
    console.log('parseMultipleArchivesForm')
    let base_query = "";
    let formInput = Object.entries(formData);

    // construct the esap base query by iterating over all the fields in the form
    for (let [key, value] of formInput) {
        base_query += `${`${base_query}` ? "&" : ""}` + key + "=" + value;
    }

    console.log("base_query : ", base_query);

    return base_query
}
