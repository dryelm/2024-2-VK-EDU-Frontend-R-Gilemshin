/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman.js';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false);
  expect(convertBytesToHuman('string')).toBe(false);
  expect(convertBytesToHuman(null)).toBe(false);
  expect(convertBytesToHuman(undefined)).toBe(false);
  expect(convertBytesToHuman({})).toBe(false);
  expect(convertBytesToHuman([])).toBe(false);
  expect(convertBytesToHuman(NaN)).toBe(false);
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0.00 B');
  expect(convertBytesToHuman(5)).toBe('5.00 B');
  expect(convertBytesToHuman(1024)).toBe('1.00 KB');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(1073741824)).toBe('1.00 GB');
});

test('Возвращает корректное значение для граничных значений', () => {
  expect(convertBytesToHuman(1023)).toBe('1023.00 B');
  expect(convertBytesToHuman(1024 * 1024 - 1)).toBe('1024.00 KB');
  expect(convertBytesToHuman(1024 * 1024)).toBe('1.00 MB');
});

test('Корректно обрабатывает большие значения', () => {
  expect(convertBytesToHuman(1024 ** 4)).toBe('1.00 TB');
  expect(convertBytesToHuman(1024 ** 5)).toBe('1.00 PB');
  expect(convertBytesToHuman(1024 ** 6)).toBe('1024.00 PB');
});

test('Обрабатывает некорректные числовые значения', () => {
  expect(convertBytesToHuman(Infinity)).toBe(false); 
  expect(convertBytesToHuman(-Infinity)).toBe(false);  
});

test('Корректно обрабатывает случаи с плавающей запятой', () => {
  expect(convertBytesToHuman(1024.5)).toBe('1.00 KB');
  expect(convertBytesToHuman(123456789)).toBe('117.74 MB');
});

test('Корректно работает с очень маленькими числами', () => {
  expect(convertBytesToHuman(1)).toBe('1.00 B');
  expect(convertBytesToHuman(999)).toBe('999.00 B'); 
});

