export * from './utils';
import { functorWarn } from './utils';
import { Func } from '../types';
import * as R from 'ramda';

export class Identify<T> {
  private constructor(private __value: T) {}

  static of<T>(value: T) {
    if (value == undefined) {
      functorWarn('Provided Identify value must not be empty');
    }
    return new Identify(value);
  }

  map<R>(f: (wrapped: T) => R): Identify<R> {
    return Identify.of(f(this.__value));
  }

  ap<R>(functor: Identify<R>) {
    return (R.is(Function, this.__value) ? functor.map(this.__value as any) : this) as T extends (
        ...args: any[]
      ) => infer P
      ? Identify<P>
      : Identify<T>;
  }
}

export class Maybe<T> {
  private constructor(private __value: T | null) {}

  static of<T>(value?: T | null) {
    return value == undefined ? Maybe.none<T>() : new Maybe(value);
  }

  static none<T>() {
    return new Maybe<T>(null);
  }

  static run<R>(gen: IterableIterator<Maybe<R>>): Maybe<R> {
    function step(value?: any): Maybe<R> {
      const result = gen.next(value);
      if (result.done) {
        return Maybe.of(result.value);
      }
      return result.value.chain(step);
    }

    return step();
  }

  map<R>(f: (wrapped: T) => R): Maybe<R> {
    if (this.__value == undefined) {
      return Maybe.none<R>();
    } else {
      return Maybe.of(f(this.__value));
    }
  }

  isNegative() {
    return this.__value == undefined;
  }

  join() {
    return this.isNegative() ? Maybe.none<T>() : this.__value;
  }

  chain<R>(f: (wrapped: T) => Maybe<R>): Maybe<R> {
    return this.map(f).join() as Maybe<R>;
  }

  getWithDefault(defaultValue?: T) {
    return this.isNegative() ? defaultValue : this.__value;
  }

  ap<R>(functor: Maybe<R>) {
    return (R.is(Function, this.__value) ? functor.map(this.__value as any) : this) as T extends (
        ...args: any[]
      ) => infer P
      ? Maybe<P>
      : Maybe<T>;
  }
}

export class IO<T, P> {
  private constructor(private __value: (arg: P) => T) {}

  static of<T, P>(value: (arg: P) => T) {
    return new IO(value);
  }

  map<R>(f: (wrapped: T) => R): IO<R, P> {
    return new IO(R.compose(f, this.__value));
  }

  join() {
    return this.unsafePerformIO();
  }

  chain<R>(f: (wrapped: T) => IO<R, P>) {
    return this.map(f).join();
  }

  unsafePerformIO(arg?: P) {
    if (!arg) {
      // functorWarn('Provided IO unsafePerformIO called params is empty', arg);
    }
    return this.__value(arg!) as T;
  }

  ap(functor: IO<P, void>) {
    const res = this.unsafePerformIO(functor.unsafePerformIO());
    return (R.is(Function, res) ? IO.of(res as any) : IO.of(() => res)) as T extends (
        arg: infer ARGS
      ) => infer RETURN
      ? IO<RETURN, ARGS>
      : IO<T, void>;
  }
}

export class Task {
  fork: Func<any>;
  cleanup: Func<any>;

  constructor(
    fork: (reject: Func<any>, resolve: Func<any>) => any,
    cleanup: Func<any> = () => void 0
  ) {
    this.fork = fork;
    this.cleanup = cleanup;
  }

  static of(b: any) {
    return new Task((_, resolve) => {
      return resolve(b);
    });
  }

  map(f: Func<any>) {
    const fork = this.fork;
    const cleanup = this.cleanup;
    return new Task(function (reject, resolve) {
      return fork(reject, R.compose(resolve, f));
    }, cleanup);
  }
}

export class Left<T> {
  private constructor(public __value: T) {}

  static of<T>(value: T) {
    if (value == undefined) {
      functorWarn('Provided value must not be empty');
    }
    return new Left(value);
  }

  map<R>(f: (wrapped: T) => R): this {
    f;
    return this;
  }

  ap<R>(functor: Left<R>) {
    functor;
    return this;
  }
}

export class Right<T> {
  private constructor(public __value: T) {}

  static of<T>(value: T) {
    if (value == undefined) {
      functorWarn('Provided Right value must not be empty');
    }
    return new Right(value);
  }

  map<R>(f: (wrapped: T) => R): Right<R> {
    return Right.of(f(this.__value));
  }

  ap<R>(functor: Right<R>) {
    return (R.is(Function, this.__value) ? functor.map(this.__value as any) : this) as T extends (
        ...args: any[]
      ) => infer P
      ? Right<P>
      : Right<T>;
  }
}

export class Either<L = Left<any>, R = Right<any>> {
  private constructor(private left: L, private right: R) {}
}
