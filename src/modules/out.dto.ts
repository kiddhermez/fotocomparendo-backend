export class OutDto<T> {
  state: number;
  message: string;
  total?: number;
  data: T[];
}
