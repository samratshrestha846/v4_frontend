import { FC } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  fileLabel?: string;
  fileUrl?: string;
  fileName: string;
  fileTypeIcon?: string;
};

const FileDocumentLink: FC<Props> = ({
  fileLabel,
  fileUrl,
  fileName,
  fileTypeIcon,
}) => {
  return (
    <div className="d-flex flex-column mb-2">
      {fileLabel ? (
        <h6 className="font-14 text-black-50">{fileLabel}</h6>
      ) : null}

      {fileUrl ? (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="contract-file"> View File</Tooltip>}>
          <a href={fileUrl} target="_blank" rel="noreferrer">
            {fileTypeIcon ? (
              <i className={`${fileTypeIcon} me-1 font-18`} />
            ) : null}
            {fileName}
          </a>
        </OverlayTrigger>
      ) : (
        <p className="mt-3 mb-3">No file</p>
      )}
    </div>
  );
};

export default FileDocumentLink;
