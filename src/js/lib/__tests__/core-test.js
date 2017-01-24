
const core = require('../core');

var defaultSettings = {
  assets: [],
  assetsLoadProgress: false,
  assetsMaxConnections: 10,
  cdnurl: 'files/',
  phpurl: 'files/php/'
};

describe('js/lib/core.js', () => {
  describe('getSettings', () => {
    it('should return default core settings', () => {
      expect(core.getSettings()).toEqual(defaultSettings);
    });
  });

  describe('setSettings', () => {
    it('should update default core settings', () => {
      core.setSettings({foo: 'bar'});

      expect(core.getSettings()).toEqual(expect.objectContaining({foo: 'bar'}))
    });
  });

  
});