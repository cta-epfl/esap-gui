export default function ParseIVOAForm(formData) {
  let queries = [];
  // queries is an array of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "esapquery": "querystring"}
  let query = "";
  let formInput = Object.entries(formData);

  // IVOA query consists of multiple steps
  // Step 1: get list of registry services

  for (let [key, value] of formInput) {
    if (value && value !== "all" && key !== "catalog") {
      query += `${`${query}` ? "&" : ""}` + key + "=" + value;
    }
  }
  // If catalog is set to "all", query for each catalog needs to be generated {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "null|fetching|fetched",
  //  "results": null}
  let catalog = formInput.find(([key]) => key === "catalog")[1];
  let service_type = formInput.find(([key]) => key === "service_type")[1];

  let esapquery =
    "get-services/?" +
    query +
    `${`${query}` ? "&" : ""}dataset_uri=` +
    catalog;

  queries.push({
    catalog: catalog,
    service_type: service_type,
    esapquery: esapquery,
  });

  return queries;
}
