import { Component } from 'cc';
import { UIController } from './UIController';
import { UiTestController } from '../../ui/test/uiTestController';
import { ResourceConfig } from '../../../Core/resource/define';
import { UIGameProgressController } from '../../ui/gameProgress/uiGameProgressController';
import { test_ui } from '../../ui/test/test_ui';
import { ui_gameProgress } from '../../ui/gameProgress/ui_gameProgress';

export interface UIResourceConfig extends ResourceConfig {
  controllerCls: typeof UIController;
  layerCls: typeof Component;
  layer: number;
}

const uiPrefabList = ['test', 'gameProgress'] as const;

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
    layerCls: test_ui,
  },
  gameProgress: {
    bundleName: 'module_td',
    path: 'ui/gameProgress/ui_gameProgress',
    cache: true,
    layer: 2,
    controllerCls: UIGameProgressController,
    layerCls: ui_gameProgress,
  },
};

export function getUIResDefine(type: TUIPrefab): UIResourceConfig {
  return UIResDefine[type];
}

export const uiEventsDefine = {
  killEnemy: () => {},
  onEnenmyNumberChanged: () => {},
};
