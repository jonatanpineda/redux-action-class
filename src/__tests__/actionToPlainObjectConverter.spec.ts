import actionToPlainObjectConverter from '../';

describe('actionToPlainObjectConverter', () => {
  const setup = () => ({
    store: {
      getState: jest.fn(),
      dispatch: jest.fn(),
    },
    next: jest.fn(action => action),
  });

  const CLASS_BASED_ACTION = 'CLASS_BASED_ACTION';

  class ClassBasedAction {
    readonly type = CLASS_BASED_ACTION;
    constructor(public payload: string) {}
  }

  const classBasedAction = new ClassBasedAction('TEST');
  const plainObjectAction = {
    type: 'PLAIN_OBJECT_ACTION',
    payload: 'TEST',
  };

  it('should handle next() with a class-based action', () => {
    const { store, next } = setup();

    const actual = actionToPlainObjectConverter(store)(next)(classBasedAction);
    const expected = next({ ...classBasedAction });

    expect(next).toBeCalled();
    expect(actual).toEqual(expected);
  });

  it('should handle next() with a plain object action', () => {
    const { store, next } = setup();

    const actual = actionToPlainObjectConverter(store)(next)(plainObjectAction);
    const expected = next({ ...plainObjectAction });

    expect(next).toBeCalled();
    expect(actual).toEqual(expected);
  });

  it('should convert class-based action to plain object action', () => {
    const { store, next } = setup();

    const actual = actionToPlainObjectConverter(store)(next)(classBasedAction);
    const expected = { ...classBasedAction };

    expect(actual).toEqual(expected);
    expect(actual).toBeInstanceOf(Object);
  });

  it('should throw an error when action is not an object', () => {
    const { store, next } = setup();
    expect(() => actionToPlainObjectConverter(store)(next)(null)).toThrow();
  });
});