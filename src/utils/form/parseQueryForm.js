import parseADEXForm from "./parseADEXForm";
import parseZooniverseForm from "./parseZooniverseForm";
import parseLOFARForm from "./parseLOFARForm";
import parseIVOAForm from "./parseIVOAForm";
import parseApertifForm from "./parseApertifForm";
import parseASTRONVOForm from "./parseASTRONVOForm";
import parseRucioForm from "./parseRucioForm";

export default function parseQueryForm(gui, formData) {
  switch (gui) {
    case "adex":
      return parseADEXForm(formData);
    case "zooniverse":
      return parseZooniverseForm(formData);
    case "lofar":
      return parseLOFARForm(formData);
    case "apertif":
      return parseApertifForm(formData);
    case "astron_vo":
      return parseASTRONVOForm(formData);
    case "ivoa":
      return parseIVOAForm(formData);
    case "rucio":
        return parseRucioForm(formData);
    default:
      return null;
  }
}
