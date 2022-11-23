
export interface IBoard {
  readonly _id: string;
  title: string;
  owner: string; // owner id
  users: string[]; // list of ids of invited users
}
