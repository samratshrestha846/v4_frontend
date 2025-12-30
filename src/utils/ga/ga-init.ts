/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import ReactGA from 'react-ga4';
import { UaEventOptions } from 'react-ga4/types/ga4';
import generateClientIdGa from './generate-client-id-ga';
import config from '../../config';

enum HitTypes {
  PageView = 'pageview',
}

type EventTrackOptions = Omit<UaEventOptions, 'category'>;

const ga = {
  initGoogleAnalytics() {
    const trackingId = config.GA_TRACKING_ID ?? '';
    if (trackingId) {
      ReactGA.initialize([
        {
          trackingId,
          gaOptions: {
            anonymizeIp: true,
            clientId: generateClientIdGa(),
          },
        },
      ]);
    }
  },
  setOption(key: string, value: unknown) {
    ReactGA.set({ [key]: value });
  },
  setUserRoleType(userRoleType: string) {
    this.setOption('user_id', userRoleType);
  },
  sendData(type: HitTypes, data: Object) {
    ReactGA.send({ hitType: type, ...data });
  },
  trackPageView(pageTitle?: string, pagePath?: string) {
    if (!pageTitle) {
      pageTitle = document.title;
    }

    if (!pagePath) {
      pagePath = location.href;
    }

    this.sendData(HitTypes.PageView, { page: pagePath, title: pageTitle });
  },
  trackEventBuilder(categoryName: string) {
    return (options: Omit<UaEventOptions, 'category'>) => {
      ReactGA.event({ category: categoryName, ...options });
    };
  },
};

export default ga;
