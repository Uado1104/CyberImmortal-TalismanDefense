import { Prefab, UITransform, Node, Widget, instantiate, director } from 'cc';
import { TUIPrefab, getUIResDefine, UIResDefine } from './uiDefine';
import { UIController } from './UIController';
import { ResourceManager } from '../../../Core/resource/resourceSystem';
import { ITicker } from '../../../Core/ticker/ITicker';
import { TickSystem } from '../../../Core/ticker/TickerSystem';

/**
 * 注册ui的controller以及对应的prefab位置，controller主要用于处理ui的逻辑，prefab主要用于ui的显示
 */
export class UIMgr extends ResourceManager<Prefab, TUIPrefab> {
  private static myInstance = null;

  static get instance(): UIMgr {
    if (UIMgr.myInstance == null) {
      UIMgr.myInstance = new UIMgr();
    }
    return UIMgr.myInstance;
  }

  private static ticker: ITicker = {
    Tick: (dt: number) => {
      UIController.updateAll(dt);
    },
  };

  private constructor() {
    super(UIResDefine, Prefab);
  }

  private _uiCanvas: Node;
  private _uiRoot: Node;

  private createFullScreenNode() {
    const canvas = this._uiCanvas.getComponent(UITransform);
    const node = new Node();
    node.layer = this._uiCanvas.layer;
    const uiTransform = node.addComponent(UITransform);
    uiTransform.width = canvas.width;
    uiTransform.height = canvas.height;

    const widget = node.addComponent(Widget);
    widget.isAlignBottom = true;
    widget.isAlignTop = true;
    widget.isAlignLeft = true;
    widget.isAlignRight = true;

    widget.left = 0;
    widget.right = 0;
    widget.top = 0;
    widget.bottom = 0;
    return node;
  }

  /**
   * @en setup this UIMgr,`don't call more than once`.
   * @zh 初始化UIMgr,`不要多次调用`
   *  */
  init(uiCanvas: Node | Prefab, maxLayers: number, ly?: string[]) {
    if (this._uiCanvas) {
      return;
    }

    if (!uiCanvas) {
      throw new Error('uiCanvas must be a Node or Prefab');
    }
    if (uiCanvas instanceof Node) {
      this._uiCanvas = uiCanvas;
    } else {
      this._uiCanvas = instantiate(uiCanvas);
      director.getScene().addChild(this._uiCanvas);
    }

    this._uiCanvas.name = '$tgxUICanvas$';
    director.addPersistRootNode(this._uiCanvas);

    //this.resize();
    const canvas = this._uiCanvas.getComponent(UITransform);

    const layerNames = ly ?? [];

    this._uiRoot = this.createFullScreenNode();
    this._uiRoot.name = 'ui_root';
    canvas.node.addChild(this._uiRoot);

    //create layers
    for (let i = 0; i < maxLayers; ++i) {
      const layerNode = this.createFullScreenNode();
      layerNode.name = `ui_layer_${layerNames[i] ?? i}`;
      this._uiRoot.addChild(layerNode);
    }

    TickSystem.AddTicker(UIMgr.ticker);
  }

  getLayerNode(layerIndex: number): Node {
    return this._uiRoot.children[layerIndex] || this._uiRoot;
  }

  closeAll() {
    UIController.closeAll();
  }

  /***
   * @en show ui by the given parameters.
   * @zh 显示UI
   * @param uiCls the class, must inherits from the class `UIController`.
   * @param cb will be called after ui created.
   * @param thisArg the this argument for param `cb`.
   * @returns the instance of `uiCls`
   *  */
  async showUI(type: TUIPrefab): Promise<UIController> {
    const prefabAsset = await this.load(type);
    const prefab = UIResDefine[type].path;
    const { layer, controllerCls, layerCls } = getUIResDefine(type);
    const ctl = new controllerCls(prefab, layer, layerCls, controllerCls);
    const node = prefabAsset ? instantiate(prefabAsset as Prefab) : this.createFullScreenNode();
    ctl.setup(node);
    const parent = this.getLayerNode(layer);
    parent.addChild(node);

    return ctl;
  }
}
