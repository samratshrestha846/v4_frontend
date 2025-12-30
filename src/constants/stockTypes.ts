type TStockTypeConstants = {
  PROVISIONED: string;
  PRODUCTION: string;
  TESTING: string;
  READY: string;
  FACTORY_OUTGOING: string;
  FACTORY_INCOMING: string;
  REPAIR: string;
  INSTALLED: string;
  RETIRED: string;
};

type TStockTypeStyle = {
  styleClass: string;
  styleTextClass: string;
};

const stockTypeConstants: TStockTypeConstants = {
  PROVISIONED: 'provisioned',
  PRODUCTION: 'production',
  TESTING: 'testing',
  READY: 'ready',
  FACTORY_OUTGOING: 'factory-outgoing',
  FACTORY_INCOMING: 'factory-incoming',
  REPAIR: 'repair',
  INSTALLED: 'installed',
  RETIRED: 'retired',
};

const stockTypes: Record<string, TStockTypeStyle> = {
  [stockTypeConstants.PROVISIONED]: {
    styleClass: 'bg-light text-dark',
    styleTextClass: 'text-light-green',
  },
  [stockTypeConstants.PRODUCTION]: {
    styleClass: 'bg-warning text-dark',
    styleTextClass: 'text-warning',
  },
  [stockTypeConstants.TESTING]: {
    styleClass: 'bg-danger',
    styleTextClass: 'text-danger',
  },
  [stockTypeConstants.READY]: {
    styleClass: 'bg-success',
    styleTextClass: 'text-success',
  },
  [stockTypeConstants.FACTORY_OUTGOING]: {
    styleClass: 'bg-secondary',
    styleTextClass: 'text-info',
  },
  [stockTypeConstants.FACTORY_INCOMING]: {
    styleClass: 'bg-secondary',
    styleTextClass: 'text-secondary',
  },
  [stockTypeConstants.REPAIR]: {
    styleClass: 'bg-light text-dark',
    styleTextClass: 'text-cyan',
  },
  [stockTypeConstants.INSTALLED]: {
    styleClass: 'bg-primary',
    styleTextClass: 'text-primary',
  },

  [stockTypeConstants.RETIRED]: {
    styleClass: 'bg-primary',
    styleTextClass: 'text-dark-red',
  },
};

export { stockTypes, stockTypeConstants };

export const DEVICE_STOCK_TYPE_INSTALLED = 'Installed';
