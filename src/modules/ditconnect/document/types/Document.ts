import { QueryParam } from '@uhub/types/common';
import { GeneralResponse } from '@uhub/types/generalResponse';

/** ************************* */
/*    FOLDERS        */
/** ************************* */

export type FolderResponse = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type FolderFormProps = {
  name: string | null;
  // @TODO: Add form fields here
};

export interface FolderListResponse extends GeneralResponse<FolderResponse[]> {
  data: FolderResponse[];
}

export type FolderParams = QueryParam & {};

/** ************************* */
/*    FILES         */
/** ************************* */
export type FileResponse = {
  created_at: string;
  created_by: {
    id: number;
    first_name: string;
    last_name: string;
  };
  extension: string;
  file_path: string;
  folder: FolderResponse;
  folder_id: number;
  id: number;
  name: string;
  updated_at: string;
};

export type FileFormProps = {
  id?: number;
  folder_id?: number;
  name: string | null;
  file?: any | null;
  file_path?: string | null;
};

export interface FileListResponse extends GeneralResponse<FileResponse[]> {
  data: FileResponse[];
}

export type FileParams = QueryParam & {};
