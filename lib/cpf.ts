export function onlyCpfDigits(cpf: string) {
  return cpf.replace(/\D/g, "");
}

export function isValidCpf(cpf: string) {
  const digits = onlyCpfDigits(cpf);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const digitAt = (i: number) => Number(digits[i]);
  const checkDigit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) sum += digitAt(i) * (length + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return checkDigit(9) === digitAt(9) && checkDigit(10) === digitAt(10);
}
