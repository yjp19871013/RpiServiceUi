export class FileInfo {
    fileName: string;
    completeDate: string;
    sizeKb: number;
}

export class GetFileInfoResponse {
    fileInfos: FileInfo[];
}
