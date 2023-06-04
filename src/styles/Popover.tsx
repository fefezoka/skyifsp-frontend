import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { styled, keyframes } from 'stitches.config';
import { violet } from '@radix-ui/colors';
import { Flex } from './Flex';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledPopoverContent = styled(PopoverPrimitive.Content, {
  br: 4,
  padding: '$4',
  width: 230,
  bc: '$bg1',
  border: '2px solid $bg2',
  zIndex: '$modal',
  bs: '0px 0px 8px black',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
});

type PopoverContentProps = PopoverPrimitive.PopoverContentProps &
  React.ComponentProps<typeof StyledPopoverContent>;

export const PopoverContent = ({ children, ...props }: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <StyledPopoverContent sideOffset={5} {...props}>
      {children}
      <Flex as={PopoverPrimitive.Arrow} css={{ fill: '$bg2' }} />
    </StyledPopoverContent>
  </PopoverPrimitive.Portal>
);

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
