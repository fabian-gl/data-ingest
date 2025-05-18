export interface FileInfo {
  filePath: string;
  fileName: string;
}

const s3BaseUrl =
  'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/';

export const filesInfo: FileInfo[] = [
  { filePath: s3BaseUrl, fileName: 'structured_generated_data.json' },
  //   { filePath: s3BaseUrl, fileName: 'large_generated_data.json' },
];
