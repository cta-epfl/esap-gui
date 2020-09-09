export default function ParseASTRONVOForm(formData, page) {
  let queries = [];
  // queries is an array of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "esapquery": "querystring"}
  let query = "";
  let formInput = Object.entries(formData);
  console.log("formInput:", formInput);

  for (let [key, value] of formInput) {
    console.log(`${key}: ${value}`);
    if (value && value !== "all" && key !== "catalog") {
      query += `${`${query}` ? "&" : ""}` + key + "=" + value;
    }
  }
  console.log("Query:", query);
  // If catalog is set to "all", query for each catalog needs to be generated {"catalog": "catalogname",
  //  "catalogquery": "querystring",
  //  "status": "null|fetching|fetched",
  //  "results": null}
  let catalog = formInput.find(([key]) => key === "catalog")[1];
  let esapquery =
    query + `${`${query}` ? "&" : ""}archive_uri=` + catalog + `&page=${page}`;
  queries.push({
    catalog: catalog,
    esapquery: esapquery,
  });
  console.log("Queries:", queries);
  return queries;
}
