import parseADEXForm from "./parseADEXForm";
import parseZooniverseForm from "./parseZooniverseForm";
import parseLOFARForm from "./parseLOFARForm";
import parseIVOAForm from "./parseIVOAForm";
import parseApertifForm from "./parseApertifForm";
import parseASTRONVOForm from "./parseASTRONVOForm";
import parseRucioForm from "./parseRucioForm";

export default function parseQueryForm(gui, formData, page) {
  switch (gui) {
    case "adex":
      return parseADEXForm(formData, page);
    case "zooniverse":
      return parseZooniverseForm(formData, page);
    case "lofar":
      return parseLOFARForm(formData, page);
    case "apertif":
      return parseApertifForm(formData, page);
    case "astron_vo":
      return parseASTRONVOForm(formData, page);
    case "ivoa":
      return parseIVOAForm(formData, page);
    case "rucio":
        return parseRucioForm(formData, page);
    default:
      return null;
  }
}
