import React from 'react';
import { Link } from 'react-router-dom';
import { NoteAttachment } from '../../../types/notes/maintenance';

type Props = {
  attachments?: NoteAttachment[];
};

const NoteAttachments: React.FC<Props> = ({ attachments }) => {
  return (
    <div className="note-attachments-wrapper">
      <h6 className="font-14">Attachments</h6>
      <ul className="note-attachments nav d-flex justify-content-start align-items-center gap-3 flex-wrap">
        {attachments?.map((item) => (
          <li key={item.file_url}>
            <Link to={item.file_url} target="_blank">
              <div className="note-attachments-item d-flex flex-column justify-content-center align-items-center gap-1">
                <i className="bx bx-image me-1 text-info" />
                <span>
                  {
                    item.file_path.split('/')?.[
                      item.file_path.split('/').length - 1
                    ]
                  }
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteAttachments;
