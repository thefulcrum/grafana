import { isSoloRoute } from './utils';

describe('isSoloRoute', () => {
  describe('when called with a solo route', () => {
    it('then it should return true', () => {
      expect(
        isSoloRoute(
          'http://localhost:3000/render/d-solo/4vEk45n7k/dash?orgId=1&from=1629329071059&to=1629350671060&panelId=5&width=1000&height=500&tz=Europe%2FStockholm'
        )
      ).toBe(true);
    });
<<<<<<< HEAD
=======

    it('then it should return true for a dashboard-solo route', () => {
      expect(
        isSoloRoute(
          'http://localhost:3000/render/dashboard-solo/4vEk45n7k/dash?orgId=1&from=1629329071059&to=1629350671060&panelId=5&width=1000&height=500&tz=Europe%2FStockholm'
        )
      ).toBe(true);
    });
>>>>>>> v12.1.0
  });

  describe('when called without a solo route', () => {
    it('then it should return false', () => {
      expect(isSoloRoute('http://localhost:3000/d/4vEk45n7k/the-variables-system?orgId=1')).toBe(false);
    });
  });
});
