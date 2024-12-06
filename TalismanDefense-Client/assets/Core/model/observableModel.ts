import { Logger } from '../debugers/log';
import { EventDispatcher } from '../events/eventSystem';

export type ModelObserver = (newValue: any, oldValue: any, path: string) => void;

const eventDefine = {
  onDataChanged: ((newValue: any, oldValue: any, path: string) => {}) as ModelObserver,
};

function combinePath(basePath: string, key: string): string {
  return basePath ? `${basePath}.${key}` : key;
}

export class ObservableModel<T extends object> {
  private observers: Map<ModelObserver, Set<string>> = new Map();

  private observedKeyCountMap: Map<string, number> = new Map();

  private event = new EventDispatcher<typeof eventDefine>();

  constructor(private model: T) {}

  // 注册观察者
  addObserver(path: string, observer: ModelObserver): void {
    let keyObservers = this.observers.get(observer);
    if (!keyObservers) {
      keyObservers = new Set();
      this.observers.set(observer, keyObservers);
      this.event.on('onDataChanged', observer);
    }
    keyObservers.add(path);

    const count = this.observedKeyCountMap.get(path as string) || 0;
    this.observedKeyCountMap.set(path as string, count + 1);
  }

  // 移除观察者（可选）
  removeObserver(path: string, observer: ModelObserver): void {
    const keyObservers = this.observers.get(observer);
    if (!keyObservers || !keyObservers.has(path)) {
      return;
    }
    keyObservers.delete(path);
    if (keyObservers.size === 0) {
      this.event.remove('onDataChanged', observer);
    }
    const count = this.observedKeyCountMap.get(path as string) || 0;
    if (count === 1) {
      this.observedKeyCountMap.delete(path as string);
    } else {
      this.observedKeyCountMap.set(path as string, count - 1);
    }
  }

  // 代理模型
  get proxy(): T {
    return this.createProxy(this.model, '');
  }

  // 创建代理
  private createProxy(obj: T, basePath: string): T {
    return new Proxy(obj, {
      get: (target, key) => {
        const value = target[key];
        // 如果是对象，递归创建代理
        if (value && typeof value === 'object') {
          return this.createProxy(value, combinePath(basePath, key as string));
        }
        return value;
      },
      set: (target, key, value) => {
        const path = combinePath(basePath, key as string);
        const oldValue = target[key];
        target[key] = value;

        // 通知观察者
        Logger.log('ObservableModel', `onDataChanged: ${path}`);
        if (this.observedKeyCountMap.get(path) > 0) {
          this.event.emit('onDataChanged', value, oldValue, path);
        }
        // 如果新值是对象，递归代理
        if (value && typeof value === 'object') {
          target[key] = this.createProxy(value, path);
        }

        return true;
      },
    });
  }
}
