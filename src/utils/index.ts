import { v4 as uuidv4 } from 'uuid';
export type UUID = string;
export function genUUID() : UUID { return uuidv4(); }