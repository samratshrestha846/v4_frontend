import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { UseFormReset } from 'react-hook-form';
import {
  TechInventoryFormProps,
  TechInventoryResponse,
} from '../types/TechInventory';
import { TECH_INVENTORY_SKU } from '../constants/constant';
import HttpApi from '../../../Http/http';

export default function useReadBySku(
  skuValue: string,
  reset: UseFormReset<TechInventoryFormProps>,
  apiCore: HttpApi,
  isEditMode: boolean
) {
  const previousSkuRef = useRef<string | null>('');
  const [selectedRecord, setSelectedRecord] =
    useState<TechInventoryResponse | null>(null);

  const [isLoading, setLoading] = useState(false);

  const fetchSkuDetails = debounce(async (sku: string) => {
    if (!sku) return;
    setLoading(true);
    const currentSku = skuValue;
    const previousSku = previousSkuRef.current;
    if (currentSku !== previousSku) {
      if (currentSku) {
        const response = await apiCore.get(`${TECH_INVENTORY_SKU}`, { sku });
        if (response.data.data) {
          const responseData = response.data.data;
          const formProps = {
            name: responseData.name,
            type: responseData.type,
            is_udose_item: responseData.is_udose_item,
          };
          setSelectedRecord(responseData);
          reset(formProps);
        } else {
          setSelectedRecord(null);
          // reset();
        }
      }
    }

    previousSkuRef.current = currentSku;
    setLoading(false);
  }, 500);

  useEffect(() => {
    if (!isEditMode) {
      fetchSkuDetails(skuValue);
    }
    return () => fetchSkuDetails.cancel(); // Cleanup debounce
  }, [skuValue]);

  return {
    selectedRecord,
    isLoading,
  };
}
