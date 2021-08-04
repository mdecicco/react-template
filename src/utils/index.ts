import { v4 as uuidv4 } from 'uuid';
export { default as Request } from './request';

export type UUID = string;
export function genUUID() : UUID { return uuidv4(); }