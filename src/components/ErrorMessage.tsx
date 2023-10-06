import React from 'react';
interface ErrorMessageProp {
  message: string;
}
export default function ErrorMessage({ message }: ErrorMessageProp) {
  return <p className="text-red-600 font-medium text-sm relative">{message}</p>;
}
