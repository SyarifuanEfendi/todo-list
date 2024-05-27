import bcrypt from "bcrypt";

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isPasswordMatch;
  } catch (error) {
    return false
  }
};
