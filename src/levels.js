// Array of level configurations
export const levels = [
  {
    gridSize: 5, // Grid size for level 1 (5x5)
    start: { x: 0, y: 0 }, // Starting position for level 1
    end: { x: 4, y: 4 }, // End position for level 1
    obstacles: [], // No obstacles in level 1
    locked: false, // First level is unlocked by default
  },
  {
    gridSize: 7, // Grid size for level 2 (7x7)
    start: { x: 0, y: 0 }, // Starting position for level 2
    end: { x: 6, y: 6 }, // End position for level 2
    obstacles: [{ x: 2, y: 3 }, { x: 3, y: 3 }], // Simple obstacles
    locked: true, // Locked initially
  },
  {
    gridSize: 8, // Grid size for level 3 (8x8)
    start: { x: 0, y: 0 }, // Starting position for level 3
    end: { x: 7, y: 7 }, // End position for level 3
    obstacles: [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }], // More obstacles
    locked: true, // Locked initially
  },
  // More levels with increasing difficulty...
];
