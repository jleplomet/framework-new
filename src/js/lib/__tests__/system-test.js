
const system = require('../system');

describe('js/lib/system.js', () => {
  describe('isPhone', () => {
    it('should return false on non mobile environments', () => {
      expect(system.isPhone()).toBe(false);
    });
  });

  describe('isTablet', () => {
    it('should return false on non tablet environments', () => {
      expect(system.isTablet()).toBe(false);
    });
  });

  describe('isDesktop', () => {
    it('should return true on non mobile, and tablet environments', () => {
      expect(system.isDesktop()).toBe(true);
    })
  });

  describe('device', () => {
    it('should return empty on non iOS devices', () => {
      expect(system.device()).toBe('');
    })
  });

  describe('os', () => {
    it('should return Unknown when cannot determine', () => {
      expect(system.os()).toBe('Unknown');
    })
  })
})