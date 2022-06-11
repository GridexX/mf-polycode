/* eslint-disable react/no-children-prop */
/* eslint-disable implicit-arrow-linebreak */
import React, { ReactElement } from 'react';
import { toast, ToastOptions } from 'react-toastify';

type Props = {
  children: ReactElement;
};

export default function Toast({ children }: Props) {
  return <div>{children}</div>;
}

export const toastError = (content: ReactElement, options?: ToastOptions) =>
  toast.error(<Toast children={content} />, options);

export const toastSuccess = (content: ReactElement, options?: ToastOptions) =>
  toast.success(<Toast children={content} />, options);

export const toastInfo = (content: ReactElement, options?: ToastOptions) =>
  toast.info(<Toast children={content} />, options);

export const toastWarning = (content: ReactElement, options?: ToastOptions) =>
  toast.warning(<Toast children={content} />, options);
