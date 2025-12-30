import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import useToggle from '@uhub/hooks/common/useToggle';

import { toast } from 'react-toastify';
import moment from 'moment';
import HttpApi from '../../../Http/http';
import { RnDFormProps, WorkDiaryFormProps } from '../types/WorkDiary';
import { WORK_DIARY_LIST, WORK_DIARY } from '../constants/constant';
import useValidation from './useValidation';

export default function useWorkDiaryForm(defaultValues: WorkDiaryFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { status: isVehicleUsed, toggle } = useToggle(
    !!defaultValues.used_company_vehicle
  );

  const { schemaResolver } = useValidation({ isVehicleUsed });

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WorkDiaryFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const {
    fields: rndFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'rnds',
  });

  // Work diary hour calculation
  // Watching the specific field in the array
  const watchedRnds = useWatch({
    control,
    name: 'rnds',
  });

  const totalHours = watch('total_hours') || 0;

  useEffect(() => {
    const totalRndHours = watchedRnds?.reduce(
      (acc, rnd) => acc + Number(rnd.rnd_hours || 0),
      0
    );
    const nonRndHours = totalHours - totalRndHours;
    // Set values in form state
    setValue('non_rnd_hours', nonRndHours);
  }, [watchedRnds, totalHours, setValue]);

  // Travel diary data calculation : distance
  const startOdometerReading =
    watch('travel_diaries.start_odometer_reading') || 0;
  const endOdometerReading = watch('travel_diaries.end_odometer_reading') || 0;
  const personalKms = watch('travel_diaries.personal_kms') || 0;
  const rndDistance = watch('travel_diaries.rnd_distance') || 0;
  const publicRoadDistance = watch('travel_diaries.public_road_distance') || 0;

  useEffect(() => {
    const totalKms = endOdometerReading - startOdometerReading;
    const workKms = totalKms - personalKms;
    const nonRndDistance = workKms - rndDistance;
    const privateRoadDistance = workKms - publicRoadDistance;

    // Set values in form state
    setValue('travel_diaries.total_kms', totalKms);
    setValue('travel_diaries.work_kms', workKms);
    setValue('travel_diaries.non_rnd_distance', nonRndDistance);
    setValue('travel_diaries.private_road_distance', privateRoadDistance);
  }, [
    startOdometerReading,
    endOdometerReading,
    personalKms,
    rndDistance,
    publicRoadDistance,
    setValue,
  ]);

  // Travel diary data calculation : flying hours
  const totalFlyingHours = watch('travel_diaries.total_flying_hours') || 0;
  const rndFlyingHours = watch('travel_diaries.rnd_flying_hours') || 0;

  useEffect(() => {
    // non rnd flying hours
    const nonRndflyingHours = totalFlyingHours - rndFlyingHours;

    // set non rnd flying hourse
    setValue('travel_diaries.non_rnd_flying_hours', nonRndflyingHours);
  }, [totalFlyingHours, rndFlyingHours, setValue, watch]);

  const createWorkDiary = async (fromData: WorkDiaryFormProps) => {
    if (id) {
      return apiCore.update(`${WORK_DIARY}/${id}`, fromData);
    }
    return apiCore.create(WORK_DIARY, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || WORK_DIARY_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      id
        ? 'Daily Diary Updated Successfully.'
        : 'Daily Diary Created Successfully.'
    );
    navigateToList();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(error.response.data.status.message);
    }
    setSubmitted(false);
  };

  const createMutation = useMutation({
    mutationKey: ['create-WorkDiary'],
    mutationFn: createWorkDiary,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: WorkDiaryFormProps) => {
    setSubmitted(true);

    if (formData.date) {
      formData.date = moment(formData.date).format('YYYY-MM-DD');
    }

    // prepare rnds array data
    const filteredRnds: RnDFormProps[] = [];
    if (formData.rnds) {
      formData.rnds?.forEach((item) => {
        if (Object.values(item).some((val) => val !== null && val !== '')) {
          filteredRnds.push(item);
        }
      });
    }

    formData.rnds = filteredRnds;

    if (formData?.travel_diaries?.start_time) {
      formData.travel_diaries.start_time = moment(
        formData.travel_diaries.start_time
      ).format('HH:mm');
    }

    if (formData?.travel_diaries?.end_time) {
      formData.travel_diaries.end_time = moment(
        formData.travel_diaries.end_time
      ).format('HH:mm');
    }

    if (formData?.travel_diaries?.start_odometer_reading) {
      formData.travel_diaries.start_odometer_reading = Number(
        formData.travel_diaries.start_odometer_reading
      );
    }

    if (formData?.travel_diaries?.end_odometer_reading) {
      formData.travel_diaries.end_odometer_reading = Number(
        formData.travel_diaries.end_odometer_reading
      );
    }

    if (formData?.travel_diaries?.end_odometer_reading) {
      formData.travel_diaries.end_odometer_reading = Number(
        formData.travel_diaries.end_odometer_reading
      );
    }

    if (formData?.travel_diaries?.total_kms) {
      formData.travel_diaries.total_kms = Number(
        formData.travel_diaries.total_kms
      );
    }

    if (formData?.travel_diaries?.personal_kms) {
      formData.travel_diaries.personal_kms = Number(
        formData.travel_diaries.personal_kms
      );
    }

    if (formData?.travel_diaries?.work_kms) {
      formData.travel_diaries.work_kms = Number(
        formData.travel_diaries.work_kms
      );
    }

    if (formData?.travel_diaries?.rnd_distance) {
      formData.travel_diaries.rnd_distance = Number(
        formData.travel_diaries.rnd_distance
      );
    }

    if (formData?.travel_diaries?.non_rnd_distance) {
      formData.travel_diaries.non_rnd_distance = Number(
        formData.travel_diaries.non_rnd_distance
      );
    }

    if (formData?.travel_diaries?.public_road_distance) {
      formData.travel_diaries.public_road_distance = Number(
        formData.travel_diaries.public_road_distance
      );
    }

    if (formData?.travel_diaries?.private_road_distance) {
      formData.travel_diaries.private_road_distance = Number(
        formData.travel_diaries.private_road_distance
      );
    }

    if (formData?.travel_diaries?.total_flying_hours) {
      formData.travel_diaries.total_flying_hours = Number(
        formData.travel_diaries.total_flying_hours
      );
    }

    if (formData?.travel_diaries?.rnd_flying_hours) {
      formData.travel_diaries.rnd_flying_hours = Number(
        formData.travel_diaries.rnd_flying_hours
      );
    }

    if (formData?.travel_diaries?.non_rnd_flying_hours) {
      formData.travel_diaries.non_rnd_flying_hours = Number(
        formData.travel_diaries.non_rnd_flying_hours
      );
    }

    if (formData.used_company_vehicle) {
      formData.travel_diaries.date = formData.date;
    } else {
      formData.travel_diaries = null as any;
    }

    createMutation.mutate(formData);
  };

  const addRnd = () => {
    append({
      id: null,
      rnd_activity_id: null,
      rnd_description: null,
      rnd_hours: null,
      group: null,
    });

    if (rndFields?.length > 1) {
      toast.info('Task Added Successfully.');
    }
  };

  const removeRnd = (index: number) => {
    remove(index);
    toast.info('Task Removed Successfully.');
  };

  useEffect(() => {
    if (defaultValues?.rnds?.length === 0) {
      addRnd();
    }
  }, []);

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createMutation,
    submitted,
    setSubmitted,
    navigateToList,
    onSubmit,
    rndFields,
    addRnd,
    removeRnd,
    watch,
    setValue,
    useWatch,
    isVehicleUsed,
    toggle,
  };
}
