import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MisinfoShield from './MisinfoShield';

// Mock the AI module
vi.mock('../../lib/gemini', () => ({
  analyzeClaim: vi.fn().mockResolvedValue({
    status: 'safe',
    title: 'Verified',
    description: 'This is a test description.',
    source: 'Test Source'
  })
}));

describe('MisinfoShield Component', () => {
  it('renders the input field correctly', () => {
    render(<MisinfoShield />);
    const input = screen.getByPlaceholderText(/Can I vote by text message/i);
    expect(input).toBeInTheDocument();
  });

  it('updates the input value on change', () => {
    render(<MisinfoShield />);
    const input = screen.getByPlaceholderText(/Can I vote by text message/i);
    fireEvent.change(input, { target: { value: 'Test Claim' } });
    expect(input.value).toBe('Test Claim');
  });

  it('shows scanning state when form is submitted', async () => {
    render(<MisinfoShield />);
    const input = screen.getByPlaceholderText(/Can I vote by text message/i);
    const button = screen.getByRole('button', { name: /Analyze Claim/i });
    fireEvent.change(input, { target: { value: 'Test Claim' } });
    fireEvent.click(button);
    
    expect(await screen.findByText(/Scanning/i)).toBeInTheDocument();
  });

  it('shows error message when API call fails', async () => {
    const { analyzeClaim } = await import('../../lib/gemini');
    analyzeClaim.mockRejectedValueOnce(new Error('API Error'));
    
    render(<MisinfoShield />);
    const input = screen.getByPlaceholderText(/Can I vote by text message/i);
    const button = screen.getByRole('button', { name: /Analyze Claim/i });
    
    fireEvent.change(input, { target: { value: 'Test Claim' } });
    fireEvent.click(button);
    
    expect(await screen.findByText(/Failed to connect to the intelligence network/i)).toBeInTheDocument();
  });
});
