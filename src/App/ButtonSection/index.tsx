import { Button, Grid } from "@mui/material";
import useStore from "../store";

const numbers: Array<Number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators: Array<string> = ["+", "-", "*", "/", "="];

function ButtonSection() {
  const processing = useStore((state) => state.processing);

  const updateValue = useStore((state) => state.updateValue);
  const appendValue = useStore((state) => state.appendValue);
  const backspace = useStore((state) => state.backspace);
  const infixOperatorClicked = useStore((state) => state.infixOperatorClicked);

  return (
    <Grid container spacing={2} sx={{ p: 0, m: 0 }}>
      <Grid container item xs={8} spacing={2}>
        <Grid item xs={12}>
          <Button
            disabled={processing}
            variant="contained"
            size="large"
            sx={{ borderRadius: 3 }}
            fullWidth
            onClick={() => updateValue("")}
          >
            AC
          </Button>
        </Grid>
        {numbers.map((b) => (
          <Grid key={`${b}`} item xs={4}>
            <Button
              disabled={processing}
              fullWidth
              variant="outlined"
              size="large"
              sx={{ borderRadius: 3 }}
              onClick={() => appendValue(`${b}`)}
            >
              {b}
            </Button>
          </Grid>
        ))}
        <Grid item xs={8}>
          <Button
            disabled={processing}
            variant="outlined"
            size="large"
            sx={{ borderRadius: 3 }}
            fullWidth
            onClick={() => backspace()}
          >
            {`⌫`}
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={4} spacing={2}>
        {operators.map((b) => (
          <Grid key={`${b}`} item xs={12}>
            <Button
              disabled={processing}
              fullWidth
              variant="contained"
              size="large"
              sx={{ borderRadius: 3 }}
              onClick={() => infixOperatorClicked(b)}
            >
              {b}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default ButtonSection;
