export default function ParseVOServiceForm(formData, access_url, page) {
  let queries = [];
  // queries is an array of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "esapquery": "querystring"}
  let query = "";
  let formInput = Object.entries(formData);
  console.log(formInput);

  // IVOA query consists of multiple steps
  // Step 1: get list of registry services

  for (let [key, value] of formInput) {
    console.log(`${key}: ${value}`);
    // Ignore value of keyword from get-services query, in this step keyword will not be used.
    if (value && value !== "all" && key !== "catalog" && key !== "keyword") {
      query += `${`${query}` ? "&" : ""}` + key + "=" + value;
    }
  }
  query += `${`${query}` ? "&" : ""}` + "access_url=" + access_url;

  console.log("Query:", query);
  // If catalog is set to "all", query for each catalog needs to be generated
  // {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "null|fetching|fetched",
  //  "results": null}
  let catalog = formInput.find(([key]) => key === "catalog")[1];
  let service_type = formInput.find(([key]) => key === "service_type")[1];

  let esapquery =
    "query/?" +
    query +
    `${`${query}` ? "&" : ""}dataset_uri=` +
    catalog +
    `&page=${page}`;

  queries.push({
    catalog: access_url,
    service_type: service_type,
    esapquery: esapquery,
  });

  console.log("Queries:", queries);
  return queries;
}
