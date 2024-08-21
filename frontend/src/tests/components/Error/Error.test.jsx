import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ErrorComponent } from '../../../scenes/errors/Error';

describe('ErrorComponent', () => {
  const mockErrorAction = vi.fn();

  it('renders the error message and text', () => {
    const errorMessage = 'Page not found';
    
    render(<ErrorComponent text={errorMessage} errorAction={mockErrorAction} />);
    
    expect(screen.getByText('We cannot find this page')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls errorAction when button is clicked', () => {
    render(<ErrorComponent text="Error occurred" errorAction={mockErrorAction} />);
    
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(mockErrorAction).toHaveBeenCalled();
  });

  it('applies custom styles to the button', () => {
    render(<ErrorComponent text="Error occurred" errorAction={mockErrorAction} />);
    
    const button = screen.getByRole('button');
    
    expect(button).toHaveStyle('border-radius: 8px');
    expect(button).toHaveStyle('margin-top: 58px');
    expect(button).toHaveStyle('font-size: 13px');
    expect(button).toHaveStyle('line-height: 24px');
    expect(button).toHaveStyle('padding: 5px 27px');
  });
});
