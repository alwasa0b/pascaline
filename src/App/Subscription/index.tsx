import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import useStore from "../store";
import { SubscriptionType } from "../store/types";

function Subscription() {
  const subscription = useStore((state) => state.subscription);
  const setSubscription = useStore((state) => state.setSubscription);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Subscription</FormLabel>
        <RadioGroup
          name="spacing"
          aria-label="spacing"
          value={subscription}
          row
          onChange={({ target }) => setSubscription(Number(target.value))}
        >
          {Object.keys(SubscriptionType)
            .filter((f) => isNaN(Number(f)))
            .map((t) => (
              <FormControlLabel
                key={t}
                value={SubscriptionType[t as any]}
                control={<Radio key={t} size="small" />}
                label={t.toString()}
                labelPlacement="bottom"
              />
            ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default Subscription;
