[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/redux-action-class.svg)](https://badge.fury.io/js/redux-action-class)
[![Build Status](https://travis-ci.org/JonatanPineda/redux-action-class.svg?branch=master)](https://travis-ci.org/JonatanPineda/redux-action-class)
[![Coverage Status](https://coveralls.io/repos/github/JonatanPineda/redux-action-class/badge.svg?branch=master)](https://coveralls.io/github/JonatanPineda/redux-action-class?branch=master)

# redux-action-class
Redux middleware that allows to dispatch Typescript class-based actions.

## Motivation
Write action creators using Typescript requires a lot of boilerplate.

```ts

export const INCREMENT = 'INCREMENT';
export type INCREMENT = typeof INCREMENT;

export interface Increment {
  type: INCREMENT
  payload: number
}

export function increment(value: number): Increment {
  return {
    type: INCREMENT,
    payload: value
  }
}

```

A more simplified approach is to use class-based actions that reduce boilerplate.


```ts

export const INCREMENT = 'INCREMENT';

export class Increment {
  readonly type = INCREMENT
  constructor(public payload: number) {}
}

```

But redux can't dispatch class-based actions [More info](https://redux.js.org/faq/designdecisions#why-doesnt-redux-support-using-classes-for-actions-and-reducers).


```ts

// not allowed
store.dispatch(new Increment(10));

```

With this middleware you can dispatch class-based actions.



## Quick start

##### 1. Install with npm (or [Yarn](https://yarnpkg.com))
```shell
npm install --save redux-action-class
```

##### 2. Add the middleware in your store configuration.
```ts

import { createStore, applyMiddleware } from 'redux';
import actionToPlainObjectConverter from 'redux-action-class'

const store = createStore(
  rootReducer,
  applyMiddleware(actionToPlainObjectConverter)
);
```

## License

MIT
