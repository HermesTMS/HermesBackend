import { Vehicle } from './vehicle.entity';

describe('Vehicle', () => {
  it('should be defined', () => {
    expect(new Vehicle()).toBeDefined();
  });
});
