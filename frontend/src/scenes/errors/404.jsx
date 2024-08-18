import React from 'react'
import { ErrorComponent } from './Error';
import { NAVIGATE_404_URL, TEXT_404 } from './constant';

export const Error404 = () => {
  return (
    <ErrorComponent text={TEXT_404} navigateUrl={NAVIGATE_404_URL} />
  )
}
