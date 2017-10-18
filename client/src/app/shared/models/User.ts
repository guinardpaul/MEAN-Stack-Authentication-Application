export class User {
  _id?: number;
  username: string;
  password: string;
  email?: string;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
