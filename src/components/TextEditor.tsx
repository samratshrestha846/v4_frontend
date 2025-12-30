import React, { Dispatch, SetStateAction, useMemo } from 'react';
import JoditEditor from 'jodit-react';

type Props = {
  placeholder?: string;
  content?: string;
  setContent: Dispatch<SetStateAction<string>>;
  editorRef: any;
};

const TextEditor: React.FC<Props> = ({
  placeholder,
  content = '',
  setContent,
  editorRef,
}) => {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typings...',
      buttons: [
        'bold',
        'italic',
        'underline',
        '|',
        'paragraph',
        '|',
        'ul',
        'ol',
        '|',
        'link',
        'unlink',
        '|',
        'subscript',
        'superscript',
        '|',
        'file',
        'image',
        '|',
        'undo',
        'redo',
      ],
      buttonsMD: [
        'bold',
        'italic',
        'underline',
        '|',
        'paragraph',
        '|',
        'ul',
        'ol',
        '|',
        'link',
        'unlink',
        '|',
        'subscript',
        'superscript',
        '|',
        'file',
        'image',
        '|',
        'undo',
        'redo',
      ],
      buttonsSM: [
        'bold',
        'italic',
        'underline',
        '|',
        'paragraph',
        '|',
        'ul',
        'ol',
        '|',
        'link',
        'unlink',
        '|',
        'subscript',
        'superscript',
        '|',
        'file',
        'image',
        '|',
        'undo',
        'redo',
      ],
      buttonsXS: [
        'bold',
        'italic',
        'underline',
        '|',
        'paragraph',
        '|',
        'ul',
        'ol',
        '|',
        'link',
        'unlink',
        '|',
        'subscript',
        'superscript',
        '|',
        'file',
        'image',
        '|',
        'undo',
        'redo',
      ],
      events: {
        // eslint-disable-next-line no-shadow
        afterInit: (editor: any) => {
          const footer = editor.container.querySelector('.jodit-status-bar');
          if (footer) {
            footer.style.display = 'none'; // Hide the footer after initialization
          }
        },
      },
    }),
    []
  );

  return (
    <JoditEditor
      ref={editorRef}
      value={content}
      config={config}
      onBlur={(newContent) => setContent(newContent)}
    />
  );
};

export default TextEditor;
