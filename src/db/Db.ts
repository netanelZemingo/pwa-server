import storage from "node-persist";
import { getRandId } from "../utills";
import { ChatRepo as MessagesRepo } from "./Messages";
import { UserRepo } from "./Users";

export class Db {
  static userRepo = new UserRepo();
  static messagesRepo = new MessagesRepo();

  static async init() {
    await storage.init({ dir: "data" });
    await this.userRepo.init();
    await this.messagesRepo.init();
  }
}

export interface RelationsParams {
  getRelations: boolean;
}

export interface Repository<Many, Single, Manager> {
  init(): Promise<void>;
  getAll(params?: RelationsParams): Promise<Record<string, Manager>>;
  getOne(_id: string, params?: RelationsParams): Promise<Single>;
  write(data: Single): Promise<Single>;
  edit(_id: string, data: Manager): Promise<boolean>;
  insertDummyData?(): Promise<void>;
}

export type Repos = "userRepo" | "messagesRepo";
export interface Model {
  _id: string;
}
export class OneToOne<T> {
  constructor(public relation?: Repos) {}
  _id: string;
  data?: T;
  async getRelation(): Promise<T | any> {
    this.data = (await Db[this.relation].getOne(this._id)) as any;
    return this.data;
  }
}

export type OneToOneDTO<T> = Omit<OneToOne<T>, "getRelation" | "relation">;
