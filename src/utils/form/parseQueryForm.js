import parseADEXForm from "./parseADEXForm";
import parseZooniverseForm from "./parseZooniverseForm";

export default function parseQueryForm(gui, formData, catalogs) {
  switch (gui) {
    case "adex":
      return parseADEXForm(formData, catalogs);
    case "zooniverse":
      return parseZooniverseForm(formData, catalogs);
    default:
      return null;
  }
}
