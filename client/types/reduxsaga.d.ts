import { put, PutEffect } from 'redux-saga/effects';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

declare module 'redux-saga/effects' {
    export function put<A extends Action>(action: A): PutEffect;
    export function put(thunkAction: ThunkAction<void, any, any, AnyAction>): void;
};