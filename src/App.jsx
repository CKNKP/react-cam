import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Button, Box } from "@mui/material";
import { Camera } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";

const App = () => {
  const [iframeKey, setIframeKey] = useState(0);
  const [screenshot, setScreenshot] = useState(null);
  const iframeRef = useRef(null);
  const ipCameraUrl = "http://80.32.125.254:8080/cgi-bin/guestimage.html";

  const resetCamera = () => {
    setIframeKey((prevKey) => prevKey + 1);
    setScreenshot(null);
  };

  const captureScreenshot = async () => {
    const canvas = await html2canvas(iframeRef.current);
    const screenshot = canvas.toDataURL("image/png");
    setScreenshot(screenshot);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "calc(100vh - 64px)", // Adjust height to account for button row
        }}
      >
        <iframe
          key={iframeKey}
          src={ipCameraUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="IP Camera"
          ref={iframeRef}
        />
        {screenshot && (
          <img
            src={screenshot}
            alt="Screenshot"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}
      </div>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={captureScreenshot}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Camera />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={resetCamera}
          sx={{
            ml: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RefreshIcon />
        </Button>
      </Box>
    </div>
  );
};

export default App;
