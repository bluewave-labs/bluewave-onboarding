// ToastItem.test.tsx
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import ToastItem from '../../../components/Toast/ToastItem';


vi.mock('@mui/icons-material/Close', () => ({
  default: vi.fn(() => <div>CloseIcon</div>)
}));

vi.mock('../../../components/Toast/Toast.module.scss', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    toast: 'toast',
    slideIn: 'slideIn',
    slideOut: 'slideOut',
    text: 'text',
    icon: 'icon',
    ...actual
  }
});

describe('ToastItem Component', () => {
  const mockCloseToast = vi.fn()
  const mockOptions = { duration: 3000 };

  it('should render toast message', () => {
    render(<ToastItem message="Test Toast" id={1} closeToast={mockCloseToast} options={mockOptions} />);
    
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('CloseIcon')).toBeInTheDocument(); // Close icon should be visible
  });

  it('should apply slide-in animation when toast is visible', () => {
    vi.useFakeTimers();
    
    render(<ToastItem message="Test Toast" id={1} closeToast={mockCloseToast} options={mockOptions} />);

    expect(screen.getByText('Test Toast').parentElement).toHaveClass('toast');
    
    act(() => {
      vi.advanceTimersByTime(0);
    });
    
    expect(screen.getByText('Test Toast').parentElement).toHaveClass('slideIn');
  });

  it('should remove toast after duration and apply slide-out animation', () => {
    vi.useFakeTimers();

    render(<ToastItem message="Test Toast" id={1} closeToast={mockCloseToast} options={mockOptions} />);

    act(() => {
      vi.advanceTimersByTime(mockOptions.duration);
    });

    expect(screen.getByText('Test Toast').parentElement).toHaveClass('slideOut');
    
  });

  it('should close toast when close icon is clicked', async () => {
    const closeToast = vi.fn(); // Mock closeToast function

    render(<ToastItem message="Test Toast" id={1} closeToast={closeToast} options={mockOptions} />);

    fireEvent.click(screen.getByText('CloseIcon'));

    expect(screen.getByText('Test Toast').parentElement).toHaveClass('slideOut');
      
  });
});
