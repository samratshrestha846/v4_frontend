import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { convertToSlug } from '../../../../helpers';
import useAuth from '../../../../hooks/useAuth';
import { DEVICE_CONFIGURATION_TYPE_UDOSE } from '../../../../constants/constants';

const useCheckProductSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { isCustomer, isStationManager } = useAuth();

  const location = useLocation();

  useEffect(() => {
    isProductInSubscribedList();
  }, []);

  const isProductInSubscribedList = () => {
    const path = location.pathname.split('/');
    const filteredPath = path[path.length - 2];
    const localStorageData = localStorage.getItem('dit_auth_user');
    const subscribedProducts = localStorageData
      ? JSON.parse(localStorageData)?.customer?.subscribed_products
      : [];
    const filteredProducts = subscribedProducts?.map((prod: any) =>
      convertToSlug(
        prod === DEVICE_CONFIGURATION_TYPE_UDOSE ? 'udose-sites' : prod
      )
    );

    if (isCustomer || isStationManager) {
      setIsSubscribed(filteredProducts.includes(filteredPath));
    } else {
      setIsSubscribed(true);
    }
  };

  return {
    isSubscribed,
    isProductInSubscribedList,
  };
};

export default useCheckProductSubscription;
