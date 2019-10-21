var _0x1159 = ['AIzaSyBIaEZCl5BP4SuL9yLi_Rs64NPxyA9FNfw', 'fir-85919.firebaseapp.com', 'https://fir-85919.firebaseio.com', 'fir-85919', 'fir-85919.appspot.com', '498434668190', '1:498434668190:web:077fdffbd0b7035c5fed8f', 'G-EVWJSHL14H', 'firestore', 'getElementById', 'email', 'value', 'collection', 'emails', 'doc', 'set', 'then', 'catch', 'Error\x20writing\x20document:\x20'];
(function (_0x41b5ff, _0xff9ae8) {
  var _0x3e8ff1 = function (_0x567b53) {
    while (--_0x567b53) {
      _0x41b5ff['push'](_0x41b5ff['shift']());
    }
  };
  _0x3e8ff1(++_0xff9ae8);
}(_0x1159, 0x1db));
var _0x1e8f = function (_0x40abf8, _0xd60525) {
  _0x40abf8 = _0x40abf8 - 0x0;
  var _0x180ab4 = _0x1159[_0x40abf8];
  return _0x180ab4;
};
var firebaseConfig = {
  'apiKey': _0x1e8f('0x0'),
  'authDomain': _0x1e8f('0x1'),
  'databaseURL': _0x1e8f('0x2'),
  'projectId': _0x1e8f('0x3'),
  'storageBucket': _0x1e8f('0x4'),
  'messagingSenderId': _0x1e8f('0x5'),
  'appId': _0x1e8f('0x6'),
  'measurementId': _0x1e8f('0x7')
};
firebase['initializeApp'](firebaseConfig);
var db = firebase[_0x1e8f('0x8')]();
const inputEmail = document[_0x1e8f('0x9')](_0x1e8f('0xa'));
var storeData = () => {
  const _0x226d3f = inputEmail[_0x1e8f('0xb')];
  db[_0x1e8f('0xc')](_0x1e8f('0xd'))[_0x1e8f('0xe')](_0x226d3f)[_0x1e8f('0xf')]({
    'email': _0x226d3f
  })[_0x1e8f('0x10')](function () {
    console['log']('Document\x20successfully\x20written!');
  })[_0x1e8f('0x11')](function (_0x40c280) {
    console['error'](_0x1e8f('0x12'), _0x40c280);
  });
};
