export default function ParseLOFARForm(formData) {
  let catalogs = "lofar";
  let queries = [];
  // queries is an array of dictionaries, where each dictionary consists of
  // {"catalog": "catalogname",
  //  "esapquery": "querystring"}
  let query = "";
  let formInput = Object.entries(formData);
  console.log(formInput);

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
  if (catalog === "all") {
    console.log("Catalogs:", catalogs);
    catalogs.map((catalog) => {
      let esapquery = query + `${`${query}` ? "&" : ""}archive_uri=` + catalog;

      queries.push({
        catalog: catalog,
        esapquery: esapquery,
      });
      return null;
    });
  } else {
    let esapquery = query + `${`${query}` ? "&" : ""}archive_uri=` + catalog;

    queries.push({
      catalog: catalog,
      esapquery: esapquery,
    });
  }
  console.log("Queries:", queries);
  return queries;
}
