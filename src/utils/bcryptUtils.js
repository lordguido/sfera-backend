import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

export const verifyPassword = async (password, hash) => bcrypt.compare(password, hash);
