import { EventDispatcher } from '../../../../Core/events/eventSystem';

const gameStateEventDefine = {
  pause: () => {},
  resume: () => {},
};

export class GamePlayStateManager {
  static event = new EventDispatcher<typeof gameStateEventDefine>();
}
