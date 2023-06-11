import Image from 'next/image';
import React, { forwardRef } from 'react';
import { IconType } from 'react-icons/lib';
import { styled } from 'stitches.config';
import { whiteSpinner } from '../assets';

const StyledButton = styled('button', {
  all: 'unset',
  ai: 'center',
  boxSizing: 'border-box',
  us: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  display: 'inline-flex',
  jc: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  fontWeight: 600,
  transition: 'background-color 200ms, border-bottom-color 300ms ease-out',
  letterSpacing: '-.022em',

  variants: {
    size: {
      1: {
        br: '$2',
        minWidth: 52,
        px: '$3',
        fontSize: '$1',
        height: '$7',
      },
      2: {
        br: '$3',
        minWidth: 80,
        fontSize: '$3',
        px: '$4',
        height: 44,
      },
    },
    variant: {
      gray: {
        bc: '$bg2',
        boxShadow: 'inset 0 0 0 1px $colors$bg3',

        '&:hover': {
          bc: '$bg3',
        },
      },
      red: {
        bc: '$red9',
        boxShadow: 'inset 0 0 0 1px $colors$red8',

        '&:hover': {
          bc: '$red10',
        },
      },
      blue: {
        bc: '$blue9',
        boxShadow: 'inset 0 0 0 1px $colors$blue8',

        '&:hover': {
          bc: '$blue10',
        },
      },
    },
    ghost: {
      true: {
        fontWeight: 400,
        br: 0,
        bc: 'transparent',
        borderBottom: '2px solid $bg3',
        px: '$4',
        boxShadow: 'none',

        '&:hover': {
          bc: 'transparent',
        },
      },
    },
    active: {
      true: {
        fontWeight: 600,
      },
    },
  },

  compoundVariants: [
    {
      variant: 'blue',
      ghost: true,
      active: true,
      css: {
        color: '$blue10',
        borderBottomColor: '$blue10',

        '&:hover': {
          borderBottomColor: '$blue10 !important',
        },
      },
    },
    {
      variant: 'red',
      ghost: true,
      active: true,
      css: {
        color: '$red10',
        borderBottomColor: '$red10',

        '&:hover': {
          borderBottomColor: '$red10 !important',
        },
      },
    },
  ],

  defaultVariants: {
    size: 2,
    variant: 'blue',
    active: false,
    ghost: false,
  },
});

interface IButton extends React.ComponentProps<typeof StyledButton> {
  loading?: boolean;
  Icon?: IconType;
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ Icon, loading, ...props }, forwardedRef) => {
    return (
      <StyledButton type="button" {...props} ref={forwardedRef}>
        {loading && <Image src={whiteSpinner} height={24} width={24} alt="" />}
        {Icon && <Icon size={18} />}
        {!loading && !Icon && props.children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
