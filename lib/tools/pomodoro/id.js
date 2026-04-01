export function createPomodoroId(
  cryptoProvider = globalThis.crypto,
  randomSource = Math.random
) {
  if (typeof cryptoProvider?.randomUUID === 'function') {
    return cryptoProvider.randomUUID();
  }

  const timePart = Date.now().toString(36);
  const randomPart = randomSource().toString(36).slice(2, 10);

  return `pom-${timePart}-${randomPart}`;
}
