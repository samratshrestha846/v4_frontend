import { DIT_CONNECT } from '../../constants/path';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const FOLDER_LIST = `${DIT_CONNECT}/folders`;
export const FOLDER_ADD = `${DIT_CONNECT}/folders/add`;
export const FOLDER_EDIT = `${DIT_CONNECT}/folders/edit/:id`;
export const FOLDER_VIEW = `${DIT_CONNECT}/folders/view/:id`; // View list of files

export const FILE_EDIT = `${DIT_CONNECT}/file/:id/edit`;
export const FILE_ADD = `${DIT_CONNECT}/folder/:id/file/add`;

/** /////// End PATHS //////// */
export const FOLDERS = '/v2/folders';

export const FILES = '/v2/files';
export const FILE_LIST = '/v2/folders/:id/files';
export const DOWNLOAD_FILE = '/v2/files/:id/download';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_FOLDER: string = 'access_folder';
export const CREATE_FOLDER: string = 'create_folder';
export const UPDATE_FOLDER: string = 'update_folder';
export const DELETE_FOLDER: string = 'delete_folder';

export const ACCESS_FILE: string = 'access_file';
export const CREATE_FILE: string = 'create_file';
export const UPDATE_FILE: string = 'update_file';
export const DELETE_FILE: string = 'delete_file';
export const READ_FILE: string = 'read_file';
