type initialStoreState = {
  Auth: any;
  Layout: any;
  Log: any;
  Site: any;
  Tank: any;
  Property: any;
};

export default initialStoreState;

export type LayoutAction = { type: string; payload?: string | null };

export type LogAction = { type: string; payload?: any };

export type PropertyAction = { type: string; payload?: any };

export type TankAction = { type: string; payload?: any };
