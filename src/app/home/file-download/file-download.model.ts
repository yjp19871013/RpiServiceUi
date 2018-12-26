export class NewFileDownloadTask {
  url: string;
  saveFilename: string;
}

export class FileDownloadTask {
  id: number;
  url: string;
  saveFilename: string;
  progress: number;
}

export class GetAllDownloadTasksResponse {
  tasks: FileDownloadTask[];
}

export class DeleteFileDownloadTaskResponse {
  id: number;
}

export class DownloadProgress {
  id: number
  progress: number
}

export class GetDownloadProgressResponse {
  progresses: DownloadProgress[]
}
