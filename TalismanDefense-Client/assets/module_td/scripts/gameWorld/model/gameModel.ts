import { ModelObserver, ObservableModel } from '../../../../Core/model/observableModel';
import { ECSWorld } from '../ecs/ECSWorld';
import { genDefaultGameModel, IGameModel } from './interface';

class CGameModel extends ObservableModel<IGameModel> {
  constructor() {
    super(genDefaultGameModel());
  }
}

export class GameModel {
  static readonly gameWorldEntities = new ECSWorld(1000);

  private static myModel = new CGameModel();

  static addObserver(path: string, observer: ModelObserver): void {
    GameModel.myModel.addObserver(path, observer);
  }

  static removeObserver(path: string, observer: ModelObserver): void {
    GameModel.myModel.removeObserver(path, observer);
  }

  static get data(): IGameModel {
    return GameModel.myModel.proxy;
  }
}
