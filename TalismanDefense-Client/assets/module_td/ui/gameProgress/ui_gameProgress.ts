import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ui_gameProgress')
export class ui_gameProgress extends Component {
  @property({ type: Label })
  round: Label = null;

  @property({ type: Label })
  wave: Label = null;

  @property({ type: Label })
  enemy: Label = null;
}
