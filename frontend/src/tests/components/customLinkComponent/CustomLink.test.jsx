import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomLink from '../../../components/CustomLink/CustomLink';

test('renders CustomLink with text and url', () => {
  render(<CustomLink text="Link Text" url="https://example.com" />);
  const linkElement = screen.getByText(/Link Text/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', 'https://example.com');
});

test('applies default text and url correctly', () => {
  render(<CustomLink />);
  const linkElement = screen.getByText(/Default Text/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '#');
});

test('applies custom class names correctly', () => {
  render(
    <CustomLink
      text="Link Text"
      url="https://example.com"
      className="tertiary"
    />
  );
  const linkElement = screen.getByText(/Link Text/i);
  expect(linkElement).toHaveClass('custom-link');
  expect(linkElement).toHaveClass('tertiary');
});

test('applies underline prop correctly', () => {
  render(<CustomLink text="Link Text" url="https://example.com" underline="hover" />);
  const linkElement = screen.getByText(/Link Text/i);
  expect(linkElement).toHaveClass('MuiLink-underlineHover');
});
