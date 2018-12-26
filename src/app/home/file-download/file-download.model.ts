export class NewFileDownloadTask {
  url: string;
  saveFilename: string;
}

export class FileDownloadTask {
  id: number;
  url: string;
  saveFilename: string;
  checked: boolean;
}

export class GetAllDownloadTasksResponse {
  tasks: FileDownloadTask[];
}

export class DeleteFileDownloadTaskResponse {
  id: number;
}
