export default function parseCONCORDIAForm(formData) {
  let formInput = Object.entries(formData);

  let query = "";

  for (let [key, value] of formInput) {
    query += `${`${query}` ? "&" : ""}` + key + "=" + value;
  }

  let esapquery = [
    query,
    "archive_uri=esap_concordia",
    `catalog=concordia`,
  ].join("&");

  console.log("CONCORDIA Job Submission (helloworld):", query);
  return [{
    catalog: "concordia",
    esapquery: esapquery
  }];
}
