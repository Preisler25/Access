export class Access {
  private _name: string;
  private _ip: string;
  private _access_time: Date;

  constructor(name: string, ip: string, access_time: string) {
    this._name = name;
    this._ip = ip;
    this._access_time = new Date(access_time);
  }

  get name(): string {
    return this._name;
  }

  get ip(): string {
    return this._ip;
  }

  get access_time(): Date {
    return this._access_time;
  }

  set name(value: string) {
    this._name = value;
  }

  set ip(value: string) {
    this._ip = value;
  }

  set access_time(value: Date) {
    this._access_time = value;
  }

  public toString(): string {
    return `Access: ${this._name} ${this._ip} ${this._access_time}`;
  }

  public static fromJson(json: any): Access {
    return new Access(json.name, json.ip, json.access_time);
  }
}
