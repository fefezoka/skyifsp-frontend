import React from "react";
import { styled } from "stitches.config";
import { Box } from "./Box";

const StyledInput = styled("input", {
  width: "100%",
  px: "$5",
  border: "none",
  br: "$7",
  fontSize: "$3",
  bc: "$bg2",
  color: "$text-primary",
  minHeight: 40,
  boxShadow: "inset 0 0 0 1px $colors$bg3",

  "&::placeholder": {
    color: "$text-secondary",
    fontWeight: 500,
    fontSize: "$2",
  },

  variants: {
    radius: {
      "1": {
        br: "$2",
        px: "$3",
      },
      "2": {
        br: "$7",
        px: "$5",
      },
    },
  },

  defaultVariants: {
    radius: "1",
  },
});

export const Input = React.forwardRef<
  React.ElementRef<typeof StyledInput>,
  React.ComponentProps<typeof StyledInput>
>(({ ...props }, forwardedRef) => {
  return (
    <Box css={{ size: "100%", position: "relative" }}>
      <StyledInput {...props} ref={forwardedRef} />
    </Box>
  );
});

Input.displayName = "Input";
