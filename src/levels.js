// Array of level configurations
export const levels = [
  {
    gridSize: 5, // Grid size for level 1 (5x5)
    start: { x: 0, y: 0 }, // Starting position for level 1
    end: { x: 4, y: 4 }, // End position for level 1
    obstacles: [], // No obstacles in level 1
  },
  {
    gridSize: 7, // Grid size for level 2 (7x7)
    start: { x: 0, y: 0 }, // Starting position for level 2
    end: { x: 6, y: 6 }, // End position for level 2
    obstacles: [{ x: 2, y: 3 }, { x: 3, y: 3 }], // Simple obstacles
  },
  {
    gridSize: 8, // Grid size for level 3 (8x8)
    start: { x: 0, y: 0 }, // Starting position for level 3
    end: { x: 7, y: 7 }, // End position for level 3
    obstacles: [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }], // More obstacles
  },
  {
    gridSize: 10, // Grid size for level 4 (10x10)
    start: { x: 0, y: 0 }, // Starting position for level 4
    end: { x: 9, y: 9 }, // End position for level 4
    obstacles: [
      { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
      { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
    ], // Obstacles forming a more complex pattern
  },
  {
    gridSize: 12, // Grid size for level 5 (12x12)
    start: { x: 0, y: 0 }, // Starting position for level 5
    end: { x: 11, y: 11 }, // End position for level 5
    obstacles: [
      { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 },
      { x: 5, y: 4 }, { x: 5, y: 6 },
      { x: 6, y: 4 }, { x: 6, y: 5 },
    ], // Obstacles forming more complex patterns
  },
  {
    gridSize: 15, // Grid size for level 6 (15x15)
    start: { x: 0, y: 0 }, // Starting position for level 6
    end: { x: 14, y: 14 }, // End position for level 6
    obstacles: [
      { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 },
      { x: 10, y: 3 }, { x: 11, y: 3 },
      { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 6, y: 10 },
      { x: 7, y: 10 }, { x: 8, y: 10 },
    ], // Obstacles forming a complex pattern
  },
  {
    gridSize: 20, // Grid size for level 7 (20x20)
    start: { x: 0, y: 0 }, // Starting position for level 7
    end: { x: 19, y: 19 }, // End position for level 7
    obstacles: [
      { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },
      { x: 8, y: 5 }, { x: 9, y: 5 },
      { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 },
      { x: 13, y: 10 }, { x: 14, y: 10 },
      { x: 15, y: 15 }, { x: 16, y: 15 }, { x: 17, y: 15 },
      { x: 18, y: 15 }, { x: 19, y: 15 },
    ], // Obstacles forming a very complex pattern
  },
];
