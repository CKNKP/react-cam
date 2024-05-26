import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SwitchCameraIcon from "@mui/icons-material/SwitchCamera";

const App = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); // 'user' for front, 'environment' for back
  const webcamRef = useRef(null);

  useEffect(() => {
    // Fetch the list of media devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      // Automatically set the first video device if available
      if (videoDevices.length > 0) {
        setDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  const captureScreenshot = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setScreenshot(screenshot);
  };

  const handleClick = () => {
    if (screenshot) {
      window.open(screenshot);
    }
  };

  const handleSwitchCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
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
            videoConstraints={{
              facingMode: facingMode,
            }}
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
      <Button
        variant="contained"
        color="secondary"
        startIcon={<SwitchCameraIcon />}
        className="mt-2"
        onClick={handleSwitchCamera}
      >
        Switch Camera
      </Button>
    </div>
  );
};

export default App;
