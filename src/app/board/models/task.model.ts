export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: [{
    filename: string;
    filesize: number;
  }]
}
