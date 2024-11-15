import React from 'react';
import { Stepper, Step, StepLabel, StepConnector, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const steps = ["Project Details", "Questions & Answers", "User Stories"]

function NavigationStepper({ activeStep, onChangeStep }) {
  const handleBack = () => {
    if (activeStep > 0) onChangeStep(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) onChangeStep(activeStep + 1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <IconButton onClick={handleBack} disabled={activeStep === 0}>
        <ArrowBackIosIcon />
      </IconButton>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <IconButton onClick={handleNext} disabled={activeStep === steps.length - 1}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}

export default NavigationStepper;
