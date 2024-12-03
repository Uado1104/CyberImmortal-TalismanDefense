import { Button, Component } from 'cc';
import { UIController } from './UIController';
import { UiTestController } from './uiTestController';
import { ResourceConfig } from '../../../Core/resource/define';

export interface UIResourceConfig extends ResourceConfig {
  controllerCls: typeof UIController;
  layerCls: typeof Component;
  layer: number;
}

const uiPrefabList = ['test'];

export type TUIPrefab = (typeof uiPrefabList)[number];

export enum EGameUILayers {
  GAME,
  JOY_STICK,
  HUD,
  POPUP,
  POPUP1,
  POPUP2,
  ALERT,
  NOTICE,
  LOADING,
  OVERLAY,
  NUM,
}

export const UIResDefine: Record<TUIPrefab, UIResourceConfig> = {
  test: {
    bundleName: 'module_td',
    path: 'ui/test/test',
    cache: true,
    layer: 1,
    controllerCls: UiTestController,
    layerCls: Button,
  },
};

export function getUIResDefine(type: TUIPrefab): UIResourceConfig {
  return UIResDefine[type];
}

export const uiEventsDefine = {
  killEnemy: () => {},
  onEnenmyNumberChanged: () => {},
};
