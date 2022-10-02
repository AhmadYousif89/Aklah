import { API_URL, TIMEOUT_IN_SECONDS } from '../config';
import { API_Recipe, HttpOptions } from '../types';
import { timeout } from '.';

export const httpRequest = async (
  query: string,
  options?: HttpOptions
): Promise<API_Recipe | API_Recipe[]> => {
  try {
    const response = options
      ? await Promise.race([
          fetch(`${API_URL}${query}`, options),
          timeout(TIMEOUT_IN_SECONDS),
        ])
      : await Promise.race([
          fetch(`${API_URL}${query}`),
          timeout(TIMEOUT_IN_SECONDS),
        ]);

    const data = await response.json();

    if (!response.ok || response.status > 399) {
      const errMsg = `(${response.status}) : ${response.statusText}`;
      throw new Error(errMsg);
    }

    const result = data
      ? data?.data?.recipe || data?.data?.recipes
      : data?.data || data;

    return result;
  } catch (err) {
    throw err;
  }
};
