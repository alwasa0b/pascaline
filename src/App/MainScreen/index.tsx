import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useStore from "../store";

const validOperation: { [key: string]: boolean } = {
  "+": true,
  "-": true,
  "*": true,
  "/": true,
};

function MainScreen() {
  const value = useStore((state) => state.value);
  const processing = useStore((state) => state.processing);
  const error = useStore((state) => state.error);

  const calculate = useStore((state) => state.calculate);
  const calculatorType = useStore((state) => state.calculatorType);


  const [processingMessage, setProcessingMessage] = useState("");

  useEffect(() => {
    const handles: Array<NodeJS.Timeout> = [];

    if (!processing || error) return;

    const loadingMessageTimer = (message: string, timer: number) =>
      setTimeout(() => setProcessingMessage(message), timer);

    handles.push(loadingMessageTimer("Processing. Please wait...", 500));

    handles.push(
      loadingMessageTimer("Processing taking longer than expected...", 1000)
    );

    handles.push(
      loadingMessageTimer(
        "Still processing... Consider upgrading to our platinum package",
        2000
      )
    );

    return () => {
      if (!error) setProcessingMessage("");

      for (const handle of handles) {
        clearTimeout(handle);
      }
    };
  }, [processing, error]);

  useEffect(() => {
    if (error) {
      setProcessingMessage(`not a valid ${calculatorType}`);
    } else {
      setProcessingMessage("");
    }
  }, [error, calculatorType]);

  const updateValue = useStore((state) => state.updateValue);
  const updatePointer = useStore((state) => state.updatePointer);

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        disabled={processing}
        variant="outlined"
        value={value}
        multiline
        rows={3}
        onMouseUp={(e: React.SyntheticEvent<HTMLDivElement, Event>) => {
          const target = e.target as HTMLInputElement;
          updatePointer(target.selectionStart || 0);
        }}
        onMouseDown={(e: React.SyntheticEvent<HTMLDivElement, Event>) => {
          const target = e.target as HTMLInputElement;
          target.focus();
        }}
        InputProps={{ style: { fontSize: 30 } }}
        onKeyPress={(e) => {
          if (validOperation[e.key] || isFinite(Number(e.key)) || e.key === ".")
            return;

          e.preventDefault();

          if (e.key === "Enter") {
            calculate();
          }
        }}
        onChange={(e) => {
          updateValue(e.target.value);
        }}
      />
      <Typography
        component={"p"}
        sx={{
          width: 300,
          fontSize: 15,
          position: "absolute",
          bottom: 5,
          alignContent: "center",
          p: 2,
        }}
      >
        {processingMessage}
      </Typography>
    </Box>
  );
}

export default MainScreen;
