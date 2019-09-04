import { Module } from 'vuex';
import { RootState } from '..';
import { version } from '../../../package.json';

const state = {
    version,
};

export const storeConfig: Module<RootState, RootState> = {
    state,
};
