import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiLogs from '../../../../../../helpers/api/logs';

export default function useAddNotes(
  id: number | undefined,
  modelType: any,
  refetch: () => void
) {
  const [text, setText] = useState('');

  const createNotes = (params: any) => {
    return apiLogs.createLog(params);
  };

  const onSuccess = () => {
    toast.success('User Note created successfully');
    setText('');
    refetch();
  };

  const onError = (error: any) => {
    toast.error(error.response.data.status.message);
  };

  const notesMutate = useMutation({
    mutationKey: ['create-notes'],
    mutationFn: createNotes,
    onSuccess,
    onError,
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (text === '') {
      toast.error('Please write a note and try again');
      return;
    }
    const params = {
      model_type: modelType,
      model_id: id,
      type: 'note',
      description: text,
    };

    notesMutate.mutate(params);
  };

  return {
    onSubmit,
    text,
    setText,
  };
}
