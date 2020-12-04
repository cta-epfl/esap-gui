export default function parseRucioForm(formData) {
  let formInput = Object.entries(formData);

  let query = "";

  for (let [key, value] of formInput) {
    query += `${`${query}` ? "&" : ""}` + key + "=" + value;
  }

  let esapquery = [
    query,
    "archive_uri=esap_rucio",
    `catalog=rucio`,
  ].join("&");

  console.log("Rucio Query", query);
  return [{
    catalog: "rucio",
    esapquery: esapquery
  }];
}
