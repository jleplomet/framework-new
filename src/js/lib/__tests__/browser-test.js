
describe('js/lib/browser.js', () => {
  let browser;

  beforeEach(() => {
    browser = require('../browser');
  });

  describe('isChrome', () => {
    it ('should return false on non Chrome browser', () => {
      expect(browser.isChrome()).toBe(false);
    });

    it('should return true on Chrome browser', () => {
      browser.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36');

      expect(browser.isChrome()).toBe(true);
    });
  });

  describe('isSafari', () => {
    it('should return false on non Safari browser', () => {
      expect(browser.isSafari()).toBe(false);
    });

    it('should return true on Safari browser', () => {
      browser.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0.2 Safari/602.3.12");

      expect(browser.isSafari()).toBe(true);
    })
  });

  describe('isFirefox', () => {
    it('should return false on non Firefox browser', () => {
      expect(browser.isFirefox()).toBe(false);
    });

    it('should return true on Firefox browser', () => {
      browser.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:40.0) Gecko/20100101 Firefox/40.0");

      expect(browser.isFirefox()).toBe(true);
    })
  });

  describe('isEdge', () => {
    it('should return false on non Edge browser', () => {
      expect(browser.isEdge()).toBe(false);
    });

    it('should return true on Edge browser', () => {
      browser.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246");

      expect(browser.isEdge()).toBe(true);
    })
  });

  describe('isIE', () => {
    it('should return false on non IE browser', () => {
      expect(browser.isIE()).toBe(false);
    });

    it('should return true on IE browser', () => {
      browser.setUserAgent("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)");

      expect(browser.isIE()).toBe(true);
    })
  });

  describe('isIE11', () => {
    it('should return false on non IE 11 browser', () => {
      expect(browser.isIE11()).toBe(false);
    });

    it('should return true on IE 11 browser', () => {
      browser.setUserAgent("Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko");

      expect(browser.isIE11()).toBe(true);
    })
  });

  describe('serviceWorker', () => {
    it('should return false when not supported', () => {
      expect(browser.serviceWorker()).toBe(false);
    })
  });

  describe('webWorker', () => {
    it('should return false when not supported', () => {
      expect(browser.webWorker()).toBe(false);
    });
  });

  describe('touchEvent', () => {
    it('should return false when not supported', () => {
      expect(browser.touchEvent()).toBe(false);
    })
  });

  describe('webGL', () => {
    it('should return false when not supported', () => {
      expect(browser.webGL()).toBe(false);
    })
  });

  describe('videoExtension', () => {
    it('should return default mp4', () => {
      expect(browser.videoExtension()).toBe('mp4');
    })
  });
});


