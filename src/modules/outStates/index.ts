import { OutDto } from '../out.dto';

interface props {
  data: any[];
  length: number;
  name: string;
}

export function isFound<T>({ data, length, name }: props) {
  let result: OutDto<T> = {
    state: 200,
    message: `${name} found`,
    total: length,
    data: data,
  };

  return result;
}

export function notFound<T>(name: string) {
  let result: OutDto<T> = {
    state: 404,
    message: `${name} not found`,
  };

  return result;
}

export function isCreated<T>(name: string) {
  let result: OutDto<T> = {
    state: 201,
    message: `${name} created`,
  };

  return result;
}

export function isUpdated<T>(name: string) {
  let result: OutDto<T> = {
    state: 200,
    message: `${name} updated`,
  };
  return result;
}

export function isDeleted<T>(name: string) {
  let result: OutDto<T> = {
    state: 200,
    message: `${name} deleted`,
  };
  return result;
}

export function isConflict<T>(name: string) {
  let result: OutDto<T> = {
    state: 409,
    message: `${name} already exists`,
  };
  return result;
}
