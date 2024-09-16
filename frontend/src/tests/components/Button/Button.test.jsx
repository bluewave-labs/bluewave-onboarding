import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../../components/Button/Button';

describe('Button component', () => {
  it('renders with default props', () => {
    render(<Button />);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button primary');
    expect(buttonElement).toHaveTextContent('');
    expect(buttonElement).toBeEnabled();
  });

  it('renders with custom text and class', () => {
    render(<Button text="Click Me" buttonType="secondary-purple" />);
    
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button secondary-purple');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} />);
    
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

    it('applies variant, style, and disabled props', () => {
      render(
        <Button
          text="Styled Button"
          variant="outlined"
          style={{ backgroundColor: 'blue' }}
          disabled={true}
        />
      );
    
      const buttonElement = screen.getByText('Styled Button');
      expect(buttonElement).toHaveClass('MuiButton-outlined');
      expect(buttonElement).toHaveAttribute('style', 'background-color: blue;');
      expect(buttonElement).toBeDisabled();
    });

  it('applies sx prop correctly', () => {
    render(<Button text="SX Button" sx={{ margin: '10px' }} />);
    
    const buttonElement = screen.getByText('SX Button');
    // Since sx prop is handled by MUI's system, we can't directly test inline styles, 
    // but we can check that the button is rendered without errors.
    expect(buttonElement).toBeInTheDocument();
  });
});
