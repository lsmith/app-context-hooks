import JSDOM from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><head></head><body lang="en"></body></html>');

export const global = window;
export const document = window.document;
