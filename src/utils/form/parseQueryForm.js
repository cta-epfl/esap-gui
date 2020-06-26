import parseADEXForm from "./parseADEXForm";

export default function parseQueryForm(gui, formData, catalogs) {
  switch (gui) {
    case "adex":
      return parseADEXForm(formData, catalogs);
    default:
      return null;
  }
}
