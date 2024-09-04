// Array of level configurations with 10 levels, max grid size of 13
export const levels = [
  {
    // Level 1: Introductory level with minimal obstacles
    gridSize: 5, // Small grid to introduce the game mechanics
    start: { x: 0, y: 0 }, // Starting position of the player
    end: { x: 4, y: 4 }, // End point the player must reach
    obstacles: [
      { x: 2, y: 2 }
    ], // A single obstacle to introduce difficulty
    movingObstacles: [], // No moving obstacles in the first level
    powerUps: [], // No power-ups, keeping it simple
    locked: false, // First level is unlocked by default
  },
  {
    // Level 2: Slightly larger grid with more obstacles
    gridSize: 7, // Increase grid size to introduce more complexity
    start: { x: 0, y: 0 },
    end: { x: 6, y: 6 },
    obstacles: [
      { x: 2, y: 2 }, { x: 4, y: 3 }, { x: 5, y: 5 }
    ], // Multiple obstacles to block simple paths
    movingObstacles: [], // No moving obstacles yet
    powerUps: [], // No power-ups yet
    locked: true, // Locked until Level 1 is completed
  },
  {
    // Level 3: Introducing moving obstacles
    gridSize: 7, // Same grid size, but now with moving obstacles
    start: { x: 0, y: 0 },
    end: { x: 6, y: 6 },
    obstacles: [
      { x: 3, y: 3 }, { x: 5, y: 4 }
    ], // Fewer static obstacles, focus shifts to moving ones
    movingObstacles: [
      { x: 2, y: 2 }
    ], // First appearance of a moving obstacle
    powerUps: [], // No power-ups
    locked: true, // Locked until Level 2 is completed
  },
  {
    // Level 4: Larger grid with more moving obstacles
    gridSize: 9, // Increase grid size for additional complexity
    start: { x: 0, y: 0 },
    end: { x: 8, y: 8 },
    obstacles: [
      { x: 3, y: 4 }, { x: 7, y: 7 }, { x: 4, y: 5 }
    ], // More obstacles and trickier paths
    movingObstacles: [
      { x: 2, y: 3 }, { x: 5, y: 6 }
    ], // Additional moving obstacles
    powerUps: [], // No power-ups to keep it challenging
    locked: true,
  },
  {
    // Level 5: Modified with additional still blocks in bottom left and right diagonal from it
    gridSize: 9, // Same grid size as before
    start: { x: 0, y: 0 },
    end: { x: 8, y: 8 },
    obstacles: [
      { x: 4, y: 2 }, { x: 5, y: 5 }, { x: 6, y: 7 }, { x: 3, y: 6 },
      { x: 0, y: 8 }, 
      { x: 8, y: 6 },  
      { x: 2, y: 8 }
    ],
    movingObstacles: [
      { x: 2, y: 1 }, { x: 7, y: 4 }
    ], // Same as before
    powerUps: [
      { x: 6, y: 2, type: 'speed' }
    ], // Same as before
    locked: true,
  },
  {
    // Level 6: Modified with additional still blocks in the bottom left corner and diagonally filled
    gridSize: 11, // Same grid size as before
    start: { x: 0, y: 0 },
    end: { x: 10, y: 10 },
    obstacles: [
      { x: 3, y: 3 }, { x: 7, y: 7 }, { x: 6, y: 5 },
      { x: 8, y: 9 }, { x: 4, y: 6 },
      { x: 0, y: 10 }, { x: 1, y: 9 }, { x: 2, y: 8 }, // Added still blocks in the bottom left diagonal formation
      { x: 9, y: 1 }, { x: 9, y: 0 }
    ],
    movingObstacles: [
      { x: 5, y: 2 }, { x: 9, y: 4 }
    ], // Same as before
    powerUps: [
      { x: 8, y: 3, type: 'speed' }
    ], // Same as before
    locked: true,
  },
  {
    // Level 7: Modified with additional still blocks on the far left and right columns
    gridSize: 11, // Same grid size as before
    start: { x: 0, y: 0 },
    end: { x: 10, y: 10 },
    obstacles: [
      { x: 2, y: 2 }, { x: 4, y: 4 }, { x: 6, y: 6 },
      { x: 5, y: 8 }, { x: 8, y: 7 },
      { x: 10, y: 0 }, { x: 10, y: 1 }, { x: 10, y: 2 },
      { x: 3, y: 10 }, { x: 5, y: 10 }, { x: 8, y: 9 },
      { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 } 
    ],
    movingObstacles: [
      { x: 3, y: 3 }, { x: 7, y: 5 }, { x: 9, y: 9 }
    ], // Same as before
    powerUps: [
      { x: 7, y: 1, type: 'speed' }
    ], // Same as before
    locked: true,
  },
  {
    // Level 8: Modified with additional still blocks on the far left, right, and middle columns
    gridSize: 13, // Same grid size as before
    start: { x: 0, y: 0 },
    end: { x: 12, y: 12 },
    obstacles: [
      { x: 2, y: 4 }, { x: 6, y: 6 }, { x: 8, y: 8 },
      { x: 4, y: 10 }, { x: 10, y: 2 }, { x: 3, y: 7 },
      { x: 12, y: 0 }, { x: 12, y: 3 }, { x: 12, y: 7 }, 
      { x: 3, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 9 },
      { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, 
      { x: 0, y: 10 }, { x: 0, y: 11 }, 
      {x: 3, y: 12 }, { x: 8, y: 12 }, { x: 0, y: 12 },
      { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 } 
    ],
    movingObstacles: [
      { x: 5, y: 3 }, { x: 9, y: 9 }, { x: 11, y: 4 }
    ], // Same as before
    powerUps: [
      { x: 10, y: 1, type: 'speed' }, 
      { x: 2, y: 10, type: 'speed' }
    ], // Same as before
    locked: true,
  },
  {
    // Level 9: Modified with additional still blocks in the bottom left and diagonal to it, and others
    gridSize: 13, // Same grid size as before
    start: { x: 0, y: 0 },
    end: { x: 12, y: 12 },
    obstacles: [
      { x: 3, y: 3 }, { x: 7, y: 7 }, { x: 5, y: 5 },
      { x: 9, y: 9 }, { x: 11, y: 11 }, { x: 6, y: 8 },
      { x: 4, y: 10 }, { x: 8, y: 12 }, { x: 1, y: 11 }, { x: 3, y: 12 }, 
      { x: 12, y: 0 }, { x: 11, y: 1 }, { x: 10, y: 2 }, { x: 9, y: 3 }, 
      { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, 
      { x: 12, y: 6 }, { x: 10, y: 12},
      { x: 6, y: 4 }, { x: 7, y: 5 }, { x: 6, y: 7 }, { x: 8, y: 6 }, { x: 9, y: 5 } 
    ],
    movingObstacles: [
      { x: 3, y: 1 }, { x: 7, y: 4 }, { x: 10, y: 6 },
      { x: 12, y: 8 }
    ], // Same as before
    powerUps: [
      { x: 11, y: 2, type: 'speed' }
    ], // Same as before
    locked: true,
  },
  {
    // Level 10: Completely restructured as per your description
    gridSize: 13, // Same grid size as before
    start: { x: 0, y: 0 },
    end: { x: 12, y: 12 },
    obstacles: [
      { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, 
      { x: 9, y: 9 }, { x: 10, y: 10 }, { x: 11, y: 11 }, 
      { x: 0, y: 6 }, { x: 0, y: 8 }, { x: 0, y: 10 },
      { x: 6, y: 0 }, { x: 8, y: 0 }, { x: 10, y: 0 },
      { x: 12, y: 4 }, { x: 12, y: 6 }, { x: 12, y: 8 }, 
      { x: 1, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 7 }, 
      { x: 5, y: 12 }, { x: 6, y: 11 }, { x: 7, y: 12 }, 
      { x: 12, y: 10 }, { x: 10, y: 12 }, { x: 11, y: 9 },
      { x: 3, y: 11 }, { x: 2, y: 10 }, { x: 1, y: 11 },
      { x: 6, y: 6 }, { x: 7, y: 7 }, { x: 8, y: 8 }, { x: 9, y: 7 }, { x: 8, y: 9 }, { x: 7, y: 8 }, { x: 6, y: 7 }, { x: 7, y: 6 } // Added still blocks in the middle
    ],
    movingObstacles: [
      { x: 0, y: 12 }, { x: 2, y: 12 }, { x: 3, y: 9 }, { x: 7, y: 4 }, { x: 9, y: 2 },
      { x: 9, y: 0 }  
    ],
    powerUps: [
      { x: 5, y: 11, type: 'speed' },
      { x: 11, y: 10, type: 'speed' }
    ], // Strategic power-up placement
    locked: true, // Locked until previous levels are completed
  }
];
