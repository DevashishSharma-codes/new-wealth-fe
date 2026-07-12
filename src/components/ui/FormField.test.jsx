import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField - new-wealth-fe', () => {
  test('renders standard input field with label and placeholder', () => {
    render(
      <FormField
        label="Test Label"
        placeholder="Enter text"
        name="testInput"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
  });

  test('displays asterisk when required is true', () => {
    render(
      <FormField
        label="Required Label"
        name="testInput"
        value=""
        required={true}
        onChange={() => {}}
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('calls onChange when user types', () => {
    const handleChange = jest.fn();
    render(
      <FormField
        label="Input"
        name="testInput"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders error message when error prop is provided', () => {
    render(
      <FormField
        label="Input"
        name="testInput"
        value=""
        error="This field is required"
        onChange={() => {}}
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('renders right icon when provided', () => {
    render(
      <FormField
        label="Input"
        name="testInput"
        value=""
        rightIcon={<span data-testid="custom-icon">🔍</span>}
        onChange={() => {}}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('blurs input of type number on wheel event', () => {
    render(
      <FormField
        label="Number Input"
        name="testNum"
        value="42"
        type="number"
        onChange={() => {}}
      />
    );

    const input = screen.getByRole('spinbutton');
    const blurSpy = jest.spyOn(input, 'blur');
    
    fireEvent.wheel(input);
    expect(blurSpy).toHaveBeenCalled();
  });
});
