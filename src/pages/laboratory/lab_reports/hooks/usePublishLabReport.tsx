import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { LabReportPublishFormValues } from '../../../../types/lab/labReport';
import labReport from '../../../../helpers/api/labReport';
import {
  LAB_REPORT_CREATED,
  LAB_REPORT_PUBLISHED,
} from '../../../../constants/labConstants';
import { useNotificationContext } from '../../../../context/useNotificationContext';

export default function usePublishLabReport(
  refetch: any,
  labReportId?: number,
  reportStatus?: string
) {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<string | undefined>(reportStatus);
  const [oldStatus, setOldStatus] = useState<string | undefined>();
  const { fetchNotificationCount } = useNotificationContext();

  useEffect(() => {
    setOldStatus(reportStatus);
  });

  const handleChange = async (e: any) => {
    setStatus(
      e.target.value === LAB_REPORT_PUBLISHED
        ? LAB_REPORT_CREATED
        : LAB_REPORT_PUBLISHED
    );
    setShowModal(!showModal);
  };

  const handleSubmit = async () => {
    onSubmit({ status });
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
    setStatus(
      status === LAB_REPORT_PUBLISHED
        ? LAB_REPORT_CREATED
        : LAB_REPORT_PUBLISHED
    );
  };

  const publishLabReport = (fromData: LabReportPublishFormValues) => {
    return labReport.publishLabReport(fromData, String(labReportId));
  };

  const onSuccess = (): void => {
    toast.success(
      `Report ${status === LAB_REPORT_PUBLISHED ? 'Published' : 'Unpublished'} Successfully.`
    );
    fetchNotificationCount();
    refetch();
  };

  const onError = (error: any) => {
    toast.error(error.response.data.status.message);
  };

  const publishLabReportMutation = useMutation({
    mutationKey: ['publish-lab-report'],
    mutationFn: publishLabReport,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: LabReportPublishFormValues) => {
    publishLabReportMutation.mutate(formData);
  };

  return {
    onSubmit,
    showModal,
    setShowModal,
    handleChange,
    handleCancel,
    handleSubmit,
    status,
    oldStatus,
    fetchNotificationCount,
  };
}
