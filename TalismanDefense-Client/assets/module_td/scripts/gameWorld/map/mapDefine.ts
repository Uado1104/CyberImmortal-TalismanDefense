import { ResourceConfig } from '../../../../Core/resource/define';

export type MapSourceConfig = ResourceConfig;

const mapList = ['testOne'] as const;

export type TMapType = (typeof mapList)[number];

export const MapResDefine: Record<TMapType, MapSourceConfig> = {
  testOne: {
    bundleName: 'module_td',
    path: 'map/testOne/testOne',
    cache: false,
  },
};
