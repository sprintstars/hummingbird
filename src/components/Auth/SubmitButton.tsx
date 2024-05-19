"use client";

import { useFormStatus } from "react-dom";

// types
import type { FunctionComponent, ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<"button"> & {
  pendingText?: string;
};

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  children,
  pendingText,
  ...props
}) => {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
};

export default SubmitButton;
