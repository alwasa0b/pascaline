import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { Box } from "@mui/system";
import useStore from "../store";

function ThemeSelector() {
  const subscription = useStore((state) => state.subscription);
  const setSubscription = useStore((state) => state.setSubscription);

  return (
    <Box sx={{ position: "relative" }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Theme</FormLabel>
        <RadioGroup
          name="spacing"
          aria-label="spacing"
          value={subscription}
          row
          onChange={({ target }) => setSubscription(Number(target.value))}
        >
          <FormControlLabel
            value={"dark"}
            control={<Radio size="small" />}
            label={"Dark"}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value={"light"}
            control={<Radio size="small" />}
            label={"Light"}
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default ThemeSelector;
