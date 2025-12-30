type MapLayerData = {
  id: number;
  name: string;
  feature_type: string;
  visible_zoom_level: number;
  label_visible_zoom_level: number;
  style: {
    font: any;
    style: any;
  };
};

type MapData = {
  layerData: MapLayerData;
  geoJSONData: any;
};

export type { MapLayerData, MapData };
