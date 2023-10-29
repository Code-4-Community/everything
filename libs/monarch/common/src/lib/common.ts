export function common(): string {
  return 'common';
}

export const isValidZipcode = (zipcode: string): boolean => {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
};