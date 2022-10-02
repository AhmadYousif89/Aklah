export const timeout = (duration = 1) => {
  return new Promise<any>((_resolve, reject) =>
    setTimeout(() => {
      return reject(new Error('Response took too long, Timeout!'));
    }, duration * 1000)
  );
};
