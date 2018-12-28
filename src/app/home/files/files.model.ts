export class FileInfo {
    id: number;
    fileName: string;
    completeDate: string;
    sizeKb: number;
}

export class GetFileInfoResponse {
    fileInfos: FileInfo[];
}

export class DownloadFileResponse {
    staticUrl: string;
}
