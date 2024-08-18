import React from 'react'
import { ErrorComponent } from './Error'
import { NAVIGATE_403_URL, TEXT_403 } from './constant'

export const Error403 = () => {
  return (
    <ErrorComponent text={TEXT_403} navigateUrl={NAVIGATE_403_URL} />
  )
}
