import {
  Box,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ButtonSection from "./ButtonSection";
import CalculatorSelector from "./CalculatorSelector";

import MainScreen from "./MainScreen";
import PackageSelection from "./Subscription";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 18,
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box p={2} maxWidth={"600px"}>
        <Box
          alignItems={"center"}
          justifyItems={"center"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          p={2}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PackageSelection />
            </Grid>
            <Grid item xs={12}>
              <MainScreen />
            </Grid>
            <Grid item xs={12}>
              <CalculatorSelector />
            </Grid>
            <Grid item xs={12}>
              <ButtonSection />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
