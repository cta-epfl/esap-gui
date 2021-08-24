export default function parseZenodoForm(formData) {
  let formInput = Object.entries(formData);

  let query = "";

  for (let [key, value] of formInput) {
    query += `${`${query}` ? "&" : ""}` + key + "=" + value;
  }

  let esapquery = [
    query,
    "archive_uri=esap_zenodo",
    `catalog=zenodo`,
  ].join("&");

  console.log("Zenodo Query", query);
  return [{
    catalog: "zenodo",
    esapquery: esapquery
  }];
}
