import { Access } from "../models/access";

export class AccessService {
  private static _accesses: Access[] = [];

  public static get accesses(): Access[] {
    return this._accesses;
  }

  //name
  public static sortAccessesByName(): void {
    this._accesses.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  public static sortAccessesByIp(): void {
    this._accesses.sort((a, b) => {
      const ipA = a.ip.split(".").map((octet) => parseInt(octet));
      const ipB = b.ip.split(".").map((octet) => parseInt(octet));
      for (let i = 0; i < 4; i++) {
        if (ipA[i] < ipB[i]) {
          return -1;
        }
        if (ipA[i] > ipB[i]) {
          return 1;
        }
      }
      return 0;
    });
  }

  //access_time
  public static sortAccessesByAccessTime(): void {
    this._accesses.sort((a, b) => {
      if (a.access_time < b.access_time) {
        return -1;
      }
      if (a.access_time > b.access_time) {
        return 1;
      }
      return 0;
    });
  }

  private static fetchAccesses(): Promise<Access[]> {
    return fetch("https://retoolapi.dev/IVuR6b/data")
      .then((response) => response.json())
      .then((json) => json.map((access: any) => Access.fromJson(access)));
  }

  public static async saveAccesses(): Promise<void> {
    this._accesses = await this.fetchAccesses();
    this.sortAccessesByName();
  }
}
