export default function parseMultipleArchivesForm(formData) {

    // now hardcoded, later read this from the configuration on the backend
    //let archives = ["apertif", "astron_vo"];
    let archives = ["apertif","astron_vo"];

    let queries = [];
    let base_query = "";
    let formInput = Object.entries(formData);


    // construct the base esap_query by iterating over all the fields in the form
    for (let [key, value] of formInput) {
        base_query += `${`${base_query}` ? "&" : ""}` + key + "=" + value;
    }

    console.log("base_query:", base_query);
    console.log("archives:", archives);

    archives.map((archive) => {
        let esap_query = base_query + "&archive_uri=" + archive

        queries.push({
            archive: archive,
            esap_query: esap_query,
        });
        return null;
    });

  console.log("queries:", queries);
  return queries;
}
