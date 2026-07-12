import { validateStep4Fields, validateStep4 } from './useFormValidation';

describe('useFormValidation - Step 4 Lifestyle Goals', () => {
  test('should return no errors when activeGoals is empty', () => {
    const activeGoals = [];
    const errors = validateStep4Fields(activeGoals);
    expect(errors).toEqual({});
    expect(validateStep4(activeGoals)).toBe(true);
  });

  test('should return no errors when activeGoals has goals that have nothing filled', () => {
    const activeGoals = [
      { id: '1', type: 'Home Purchase', targetYear: '', todaysCost: '' },
      { id: '2', type: 'Car Purchase', targetYear: '   ', todaysCost: '' }
    ];
    const errors = validateStep4Fields(activeGoals);
    expect(errors).toEqual({});
    expect(validateStep4(activeGoals)).toBe(true);
  });

  test('should validate goals when they are partially filled', () => {
    const activeGoals = [
      { id: '1', type: 'Home Purchase', targetYear: '2030', todaysCost: '' },
      { id: '2', type: 'Car Purchase', targetYear: '', todaysCost: '1500000' }
    ];
    const errors = validateStep4Fields(activeGoals);
    expect(errors['1']).toEqual({ todaysCost: 'Cost is required' });
    expect(errors['2']).toEqual({ targetYear: 'Target year is required' });
    expect(validateStep4(activeGoals)).toBe(false);
  });

  test('should validate invalid target year values', () => {
    const currentYear = new Date().getFullYear();
    const activeGoals = [
      { id: '1', type: 'Home Purchase', targetYear: String(currentYear - 5), todaysCost: '1000000' },
      { id: '2', type: 'Car Purchase', targetYear: String(currentYear + 70), todaysCost: '1000000' },
      { id: '3', type: 'Holiday Home', targetYear: 'abc', todaysCost: '1000000' }
    ];
    const errors = validateStep4Fields(activeGoals);
    expect(errors['1'].targetYear).toContain('Year must be between');
    expect(errors['2'].targetYear).toContain('Year must be between');
    expect(errors['3'].targetYear).toContain('Year must be between');
  });

  test('should validate invalid cost values', () => {
    const activeGoals = [
      { id: '1', type: 'Home Purchase', targetYear: '2035', todaysCost: '-100' },
      { id: '2', type: 'Car Purchase', targetYear: '2035', todaysCost: '0' },
      { id: '3', type: 'Holiday Home', targetYear: '2035', todaysCost: 'abc' }
    ];
    const errors = validateStep4Fields(activeGoals);
    expect(errors['1'].todaysCost).toBe('Cost must be a positive number');
    expect(errors['2'].todaysCost).toBe('Cost must be a positive number');
    expect(errors['3'].todaysCost).toBe('Cost must be a positive number');
  });

  test('should pass validation when goals are correctly filled', () => {
    const currentYear = new Date().getFullYear();
    const activeGoals = [
      { id: '1', type: 'Home Purchase', targetYear: String(currentYear + 5), todaysCost: '1000000' },
      { id: '2', type: 'Car Purchase', targetYear: String(currentYear + 10), todaysCost: '1500000' }
    ];
    const errors = validateStep4Fields(activeGoals);
    expect(errors).toEqual({});
    expect(validateStep4(activeGoals)).toBe(true);
  });
});
