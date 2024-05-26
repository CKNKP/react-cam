import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const App = () => {
  const [screenshot, setScreenshot] = useState(null);
  const webcamRef = useRef(null);

  const captureScreenshot = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setScreenshot(screenshot);
  };

  const handleClick = () => {
    if (screenshot) {
      window.open(screenshot);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="position-relative">
        {screenshot ? (
          <img
            src={screenshot}
            alt="Screenshot"
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            onClick={handleClick}
          />
        ) : (
          <Webcam
            audio={false}
            height={480}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={480}
          />
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CameraAltIcon />}
        className="mt-2"
        onClick={captureScreenshot}
      >
        Capture Screenshot
      </Button>
    </div>
  );
};

export default App;
