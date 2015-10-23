'use strict';

import { fetch } from '../web/io';
import { Service, channel, broadcast } from './bridge';
import { Remote } from '../../bindings/html/remote';

var languages = navigator.languages || [navigator.language];
const remote = new Remote(fetch, broadcast, languages);
window.addEventListener('languagechange', remote);
document.addEventListener('additionallanguageschange', remote);

remote.service = new Service('l20n')
  .method('registerView', (...args) => remote.registerView(...args))
  .method('resolvedLanguages', (...args) => remote.resolvedLanguages(...args))
  .method('requestLanguages', (...args) => remote.requestLanguages(...args))
  .method('resolveEntities', (...args) => remote.resolveEntities(...args))
  .method('formatValues', (...args) => remote.formatValues(...args))
  .method('getName', (...args) => remote.getName(...args))
  .method('processString', (...args) => remote.processString(...args))
  .on('disconnect', clientId => remote.unregisterView(clientId))
  .listen(channel);
