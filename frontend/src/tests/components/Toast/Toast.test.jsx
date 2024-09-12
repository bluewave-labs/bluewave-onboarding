import { render, screen, act } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../../utils/toastEmitter';
import Toast from '../../../components/Toast/Toast';

describe('Toast Component', () => {
  it('should display a toast message', () => {
    render(<Toast />);

    act(() => {
      toastEmitter.emit(TOAST_EMITTER_KEY, 'Test Toast Message', { top: '20px' });
    });

    const toastElement = screen.getByText('Test Toast Message');
    expect(toastElement).not.toBeNull();
  });

  it('should automatically remove the toast after timeout', () => {
    vi.useFakeTimers();

    render(<Toast />);

    act(() => {
      toastEmitter.emit(TOAST_EMITTER_KEY, 'Auto Remove Toast', { top: '20px' });
    });

    const toastElement = screen.getByText('Auto Remove Toast');
    expect(toastElement).toBeInTheDocument();


    act(() => {
      vi.advanceTimersByTime(3500);
    });

    expect(toastElement).not.toBeInTheDocument();
  });

  it('should respect maximum toast count for max 8 count', () => {
    render(<Toast />);

    act(() => {
      for (let i = 1; i <= 9; i++) {
        toastEmitter.emit(TOAST_EMITTER_KEY, `Toast ${i}`, { top: '20px' });
      }
    });

    expect(screen.getByText('Toast 6')).toBeInTheDocument();
    expect(screen.getByText('Toast 7')).toBeInTheDocument();
    expect(screen.getByText('Toast 8')).toBeInTheDocument();
    
    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
  });
});
