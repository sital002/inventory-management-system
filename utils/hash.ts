export function generateCustomSalt(
  length: number = 16,
  seed: string = Date.now().toString()
): string {
  let salt = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=<>?";
  for (let i = 0; i < length; i++) {
    const charCode = seed.charCodeAt(i % seed.length);
    const mixed = (charCode * (i + 3) + i * 7) % chars.length;
    salt += chars.charAt(mixed);
  }
  return salt;
}

export function customHash(
  password: string,
  salt: string,
  iterations: number = 1000
): string {
  let hash = salt + password + salt;
  for (let i = 0; i < iterations; i++) {
    let newHash = "";
    for (let j = 0; j < hash.length; j++) {
      const charCode = hash.charCodeAt(j);
      const shifted = (charCode ^ (j + 3)) + (i % 7);
      newHash += String.fromCharCode((shifted % 126) + 32);
    }
    hash = newHash;
  }
  return hash;
}

export function hashPassword(password: string): string {
  const salt = generateCustomSalt();
  const hashedPassword = customHash(password, salt);
  return salt + "$" + hashedPassword;
}

export function comparePassword(
  rawPassword: string,
  storedHash: string
): boolean {
  const [salt, hashed] = storedHash.split("$");
  if (!salt || !hashed) return false;
  const hashToCompare = customHash(rawPassword, salt);
  return hashToCompare === hashed;
}
