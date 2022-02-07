import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import useStore from "../store";

function CalculatorSelector() {
  const calculatorType = useStore((state) => state.calculatorType);
  const setCalculatorType = useStore((state) => state.setCalculatorType);

  return (
    <RadioGroup
      name="spacing"
      aria-label="spacing"
      value={calculatorType}
      sx={{ borderRadius: 3, boxShadow: 3 }}
      row
      onChange={({ target }) => setCalculatorType(target.value)}
    >
      <FormControlLabel
        value={"infix"}
        control={<Radio size="small" />}
        label={"infix"}
        labelPlacement="start"
      />
      <FormControlLabel
        value={"postfix"}
        control={<Radio size="small" />}
        label={"postfix"}
        labelPlacement="start"
      />
    </RadioGroup>
  );
}

export default CalculatorSelector;
