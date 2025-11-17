import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('@/components/icons', () => ({
  SparkleIcon: () => <span data-testid="sparkle-icon" />,
}));

jest.mock('@/hooks/useSubmitIntention', () => ({
  useSubmitIntention: jest.fn(),
}));

import HomePage from '@/app/page';
import { useSubmitIntention } from '@/hooks/useSubmitIntention';

const mockedUseSubmitIntention = useSubmitIntention as jest.Mock;

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields when submission has not succeeded', () => {
    mockedUseSubmitIntention.mockReturnValue({
      submitIntention: jest.fn(),
      isLoading: false,
      isSuccess: false,
      error: null,
    });

    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /formulário de intenção/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar intenção/i })).toBeInTheDocument();
  });

  it('shows success message after a successful submission', () => {
    mockedUseSubmitIntention.mockReturnValue({
      submitIntention: jest.fn(),
      isLoading: false,
      isSuccess: true,
      error: null,
    });

    render(<HomePage />);

    expect(screen.getByText(/obrigado! intenção enviada/i)).toBeInTheDocument();
  });

  it('disables the submit button and shows loading state while submitting', () => {
    mockedUseSubmitIntention.mockReturnValue({
      submitIntention: jest.fn(),
      isLoading: true,
      isSuccess: false,
      error: null,
    });

    render(<HomePage />);

    const button = screen.getByRole('button', { name: /enviando/i });
    expect(button).toBeDisabled();
  });

  it('submits form data through the hook', async () => {
    const submitIntention = jest.fn().mockResolvedValue(undefined);

    mockedUseSubmitIntention.mockReturnValue({
      submitIntention,
      isLoading: false,
      isSuccess: false,
      error: null,
    });

    render(<HomePage />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/empresa/i), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText(/por que você quer participar/i), { target: { value: 'Networking' } });

    const submitButton = screen.getByRole('button', { name: /enviar intenção/i });
    const form = submitButton.closest('form');

    expect(form).not.toBeNull();

    fireEvent.submit(form!);

    await waitFor(() =>
      expect(submitIntention).toHaveBeenCalledWith({
        name: 'Alice',
        email: 'alice@example.com',
        company: 'Acme Corp',
        reason: 'Networking',
      })
    );
  });
});

