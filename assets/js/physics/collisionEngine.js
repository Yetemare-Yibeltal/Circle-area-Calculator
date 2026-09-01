/**
 * Interactive Elastic Particle Bouncing Inside Circle Boundary
 */
export class CollisionEngine {
  constructor(radius, center = { x: 200, y: 200 }) {
    this.circleRadius = radius;
    this.center = center;
    this.particles = [];
  }

  /**
   * Spawn dynamic particle inside circular bounds
   */
  addParticle(x, y, vx, vy, particleRadius = 4) {
    this.particles.push({ x, y, vx, vy, radius: particleRadius });
  }

  /**
   * Step simulation frame and handle boundary bounce vector math
   */
  update() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      const dx = p.x - this.center.x;
      const dy = p.y - this.center.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist + p.radius >= this.circleRadius) {
        // Collision normal vector calculation
        const nx = dx / dist;
        const ny = dy / dist;
        const dot = p.vx * nx + p.vy * ny;

        p.vx -= 2 * dot * nx;
        p.vy -= 2 * dot * ny;

        // Reposition particle back inside perimeter boundary
        p.x = this.center.x + nx * (this.circleRadius - p.radius);
        p.y = this.center.y + ny * (this.circleRadius - p.radius);
      }
    });
  }
}
