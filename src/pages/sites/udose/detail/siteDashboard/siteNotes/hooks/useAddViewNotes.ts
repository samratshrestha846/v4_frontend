import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import logs from '../../../../../../../helpers/api/logs';
import useFetchLogs from '../../../../../../../hooks/common/useFetchLogs';
import { formattedDatetime } from '../../../../../../../helpers';
import { Log } from '../../../../../../../types/log/logList';

export default function useAddViewNotes() {
  const { id } = useParams();
  const [text, setText] = useState<string>('');
  const notesTextArea = useRef<HTMLTextAreaElement | null>(null);

  const { data, isFetching, isError, refetch } = useFetchLogs({
    model_type: 'site',
    model_id: id,
    type: 'note',
    page_size: 5,
  });

  const createNewNote = (formData: any) => {
    return logs.createLog(formData);
  };

  const onSuccess = () => {
    toast.success('Site Note Created Successfully.');
    refetch();
  };

  const onError = () => {
    toast.error('Oops something went wrong. Please try again later.');
  };

  const createNewNoteMutation = useMutation({
    mutationKey: ['add-new-note'],
    mutationFn: createNewNote,
    onSuccess,
    onError,
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (text === '') {
      return toast.error('Please write a note and try again');
    }
    const formData = {
      model_type: 'site',
      model_id: id,
      type: 'note',
      description: text,
    };
    await createNewNoteMutation.mutate(formData);
    setText('');
    return null;
  };

  useEffect(() => {
    notesTextArea.current?.focus();
  }, []);

  const handleTextAreaChange = (e: any) => {
    setText(e.target.value.slice(0, 250));
  };
  const columns = [
    {
      dataField: 'created_at',
      text: 'Created At',
      sort: true,
      formatter: (row: Log) =>
        row.created_at && formattedDatetime(row.created_at),
      format: true,
    },
    {
      dataField: 'user.first_name',
      text: 'By',
      formatter: (row: Log) => row.user?.first_name ?? '-',
      format: true,
    },
    {
      dataField: 'description',
      text: 'Log Message',
      sort: true,
    },
  ];

  return {
    id,
    data,
    isFetching,
    isError,
    text,
    notesTextArea,
    handleTextAreaChange,
    onSubmit,
    columns,
  };
}
