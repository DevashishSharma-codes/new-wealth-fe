import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomGoalModal } from './CustomGoalModal';

describe('CustomGoalModal - new-wealth-fe', () => {
  test('does not render when isOpen is false', () => {
    render(<CustomGoalModal isOpen={false} onClose={() => {}} onAddGoal={() => {}} />);
    expect(screen.queryByText('Add Custom Goal')).not.toBeInTheDocument();
  });

  test('renders modal elements when isOpen is true', () => {
    render(<CustomGoalModal isOpen={true} onClose={() => {}} onAddGoal={() => {}} />);
    expect(screen.getByText('Add Custom Goal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. World Cup Trip, Luxury Watch')).toBeInTheDocument();
    expect(screen.getByText('Quick Suggestions')).toBeInTheDocument();
  });

  test('pre-fills goal name when quick preset chip is clicked', () => {
    render(<CustomGoalModal isOpen={true} onClose={() => {}} onAddGoal={() => {}} />);
    const chip = screen.getByText('World Cup Trip');
    fireEvent.click(chip);
    const input = screen.getByPlaceholderText('e.g. World Cup Trip, Luxury Watch');
    expect(input.value).toBe('World Cup Trip');
  });

  test('calls onAddGoal with filled values when submitted', () => {
    const handleAdd = jest.fn();
    const handleClose = jest.fn();
    render(<CustomGoalModal isOpen={true} onClose={handleClose} onAddGoal={handleAdd} />);

    // Select preset
    fireEvent.click(screen.getByText('World Cup Trip'));

    // Enter year and cost
    const yearInput = screen.getByPlaceholderText(`e.g. ${new Date().getFullYear() + 5}`);
    const costInput = screen.getByPlaceholderText('e.g. 500000');

    fireEvent.change(yearInput, { target: { value: '2030' } });
    fireEvent.change(costInput, { target: { value: '500000' } });

    // Submit form
    fireEvent.click(screen.getByText('+ Add Goal'));

    expect(handleAdd).toHaveBeenCalledWith({
      goalName: 'World Cup Trip',
      targetYear: '2030',
      todaysCost: '500000',
    });
    expect(handleClose).toHaveBeenCalled();
  });
});
