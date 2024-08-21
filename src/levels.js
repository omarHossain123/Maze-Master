// Array of level configurations
export const levels = [
  {
    gridSize: 5, // Small grid for an introductory level
    start: { x: 0, y: 0 },
    end: { x: 4, y: 4 },
    obstacles: [{ x: 2, y: 2 }], // Single obstacle to introduce the concept
    movingObstacles: [], // No moving obstacles in the first level
    powerUps: [], // No power-ups in the first level
    locked: false, // First level is unlocked by default
  },
  {
    gridSize: 5, // Same grid size as Level 1 but more obstacles
    start: { x: 0, y: 0 },
    end: { x: 4, y: 4 },
    obstacles: [{ x: 1, y: 2 }, { x: 3, y: 2 }], // More obstacles in the path
    movingObstacles: [], // Still no moving obstacles
    powerUps: [], // No power-ups
    locked: true,
  },
  {
    gridSize: 6, // Increase grid size
    start: { x: 0, y: 0 },
    end: { x: 5, y: 5 },
    obstacles: [{ x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 4 }], // More obstacles, tighter paths
    movingObstacles: [], // No moving obstacles yet
    powerUps: [], // No power-ups yet
    locked: true,
  },
  {
    gridSize: 7, // Larger grid size
    start: { x: 0, y: 0 },
    end: { x: 6, y: 6 },
    obstacles: [{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 4 }, { x: 4, y: 5 }], // Introduce a mix of paths
    movingObstacles: [{ x: 4, y: 2 }], // Introduce a single moving obstacle
    powerUps: [], // No power-ups yet
    locked: true,
  },
  {
    gridSize: 8, // Even larger grid
    start: { x: 0, y: 0 },
    end: { x: 7, y: 7 },
    obstacles: [{ x: 2, y: 2 }, { x: 5, y: 3 }, { x: 6, y: 5 }, { x: 3, y: 6 }, { x: 4, y: 4 }], // Complex path
    movingObstacles: [{ x: 4, y: 1 }, { x: 2, y: 5 }], // Two moving obstacles
    powerUps: [{ x: 1, y: 1, type: 'speed' }], // Introduce the first speed boost
    locked: true,
  },
  {
    gridSize: 8, // Same grid size, but more challenging
    start: { x: 0, y: 0 },
    end: { x: 7, y: 7 },
    obstacles: [{ x: 2, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 5 }, { x: 1, y: 6 }, { x: 6, y: 2 }, { x: 4, y: 4 }], // Complex and tight path
    movingObstacles: [{ x: 4, y: 1 }, { x: 2, y: 5 }, { x: 5, y: 3 }], // Three moving obstacles
    powerUps: [{ x: 6, y: 1, type: 'speed' }], // Another speed boost in a harder location
    locked: true,
  },
  {
    gridSize: 9, // Increase grid size again
    start: { x: 0, y: 0 },
    end: { x: 8, y: 8 },
    obstacles: [{ x: 3, y: 3 }, { x: 5, y: 2 }, { x: 6, y: 6 }, { x: 7, y: 4 }, { x: 2, y: 5 }, { x: 1, y: 7 }], // More complex paths
    movingObstacles: [{ x: 3, y: 6 }, { x: 6, y: 2 }], // Two well-placed moving obstacles
    powerUps: [{ x: 7, y: 1, type: 'speed' }], // Speed boost near moving obstacles
    locked: true,
  },
  {
    gridSize: 9, // Same grid size but much tougher
    start: { x: 0, y: 0 },
    end: { x: 8, y: 8 },
    obstacles: [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 4, y: 7 }, { x: 6, y: 3 }, { x: 7, y: 4 }, { x: 2, y: 6 }], // Tighter paths with more obstacles
    movingObstacles: [{ x: 2, y: 4 }, { x: 5, y: 1 }, { x: 7, y: 7 }], // Three moving obstacles in strategic locations
    powerUps: [{ x: 6, y: 1, type: 'speed' }, { x: 3, y: 2, type: 'speed' }], // Two speed boosts
    locked: true,
  },
  {
    gridSize: 10, // Larger grid for maximum challenge
    start: { x: 0, y: 0 },
    end: { x: 9, y: 9 },
    obstacles: [{ x: 2, y: 2 }, { x: 4, y: 5 }, { x: 5, y: 7 }, { x: 7, y: 3 }, { x: 8, y: 4 }, { x: 6, y: 8 }, { x: 3, y: 6 }, { x: 1, y: 4 }], // Very complex maze-like path
    movingObstacles: [{ x: 3, y: 2 }, { x: 5, y: 3 }, { x: 7, y: 5 }, { x: 9, y: 1 }], // Four moving obstacles
    powerUps: [{ x: 1, y: 1, type: 'speed' }, { x: 8, y: 7, type: 'speed' }], // Speed boosts but tough to reach
    locked: true,
  },
  {
    gridSize: 10, // Final, nearly impossible level
    start: { x: 0, y: 0 },
    end: { x: 9, y: 9 },
    obstacles: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }, { x: 8, y: 8 }], // Diagonal obstacle line to force a narrow path
    movingObstacles: [{ x: 3, y: 4 }, { x: 5, y: 6 }, { x: 7, y: 2 }, { x: 6, y: 8 }], // Strategically moving obstacles that cover critical paths
    powerUps: [{ x: 1, y: 8, type: 'speed' }, { x: 8, y: 1, type: 'speed' }], // Final level with minimal help
    locked: true,
  },
];
