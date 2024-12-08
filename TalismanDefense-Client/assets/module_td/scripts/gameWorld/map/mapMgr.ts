import { Prefab } from 'cc';
import { ResourceManager } from '../../../../Core/resource/resourceSystem';
import { MapResDefine, TMapType } from './mapDefine';

export class MapMgr extends ResourceManager<Prefab, TMapType> {
  private static myInstance = null;

  static get instance(): MapMgr {
    if (!MapMgr.myInstance) {
      MapMgr.myInstance = new MapMgr(MapResDefine, Prefab);
    }
    return MapMgr.myInstance;
  }

  // 加载地图
  async loadMap(mapName: TMapType) {
    await this.load(mapName);
  }
}
