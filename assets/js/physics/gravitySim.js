/**
 * Orbital Satellite Dynamics & Central Mass Gravity Mechanics
 */
export class GravitySim {
  /**
   * Compute required circular orbital velocity around central mass
   * @param {number} orbitRadius Distance from central core
   * @param {number} [gravitationalConstant=1000] Standard gravitational constant scale
   */
  static calculateOrbitalVelocity(orbitRadius, gravitationalConstant = 1000) {
    if (orbitRadius <= 0) return 0;
    return Math.sqrt(gravitationalConstant / orbitRadius);
  }

  /**
   * Compute mathematical pendulum period swinging along circular arc
   * @param {number} pendulumLength
   * @param {number} [gravity=9.81]
   */
  static calculatePendulumPeriod(pendulumLength, gravity = 9.81) {
    return 2 * Math.PI * Math.sqrt(pendulumLength / gravity);
  }
}
