import { Func } from './types';

export class EventBus {
  eventDep: Record<string, Array<Func<any>> | null> = {};

  on(eventName: string, func: Func<any>) {
    if (this.eventDep[eventName]) {
      this.eventDep[eventName]?.push(func);
    } else {
      this.eventDep[eventName] = [func];
    }
  }

  emit(eventName: string, ...args: any) {
    if (this.eventDep[eventName]) {
      this.eventDep[eventName]?.forEach(func => func(...args));
    }
  }

  off(eventName: string) {
    this.eventDep[eventName] = null;
  }

  clear() {
    this.eventDep = {};
  }
}

export function EventBusCreator() {
  return new EventBus();
}

export const eventBus = EventBusCreator();
