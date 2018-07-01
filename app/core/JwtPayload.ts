export default class JwtPayload {
  _id: string;
  username: string;
  type: string;
  iat?: number;
  exp?: number;
  constructor() {
      this._id = '';
      this.username = '';
      this.type = '';
  }
}
