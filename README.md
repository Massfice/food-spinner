# 🍽️ FoodSpin

An interactive food selection application that helps users discover and choose meals through an engaging spinning wheel interface.

## What is FoodSpin?

FoodSpin is an interactive food discovery game where users **spin** to find their next meal:

-   **Food plates are arranged in a spinning wheel** - Multiple dishes rotate around a central point
-   **The center plate displays the current "winner"** - The selected dish is prominently featured in the middle
-   **Interactive spinning experience** - Hover and click the center plate to **SPIIIIIN**! 🌪️
-   **UI updates dynamically** - Price, description, and ordering options change based on the selected meal
-   **Smooth spinning animations** - Users can spin through options with directional controls

## How the Spinning Works

The core experience revolves around the satisfying spin interaction:

1. **Hover** on the central plate
2. **Click** to initiate the spin
3. **System randomizes everything**:
    - Selects a random plate as the new winner
    - Generates random spin duration
    - Randomizes "full cycles" to create that satisfying **"SPINNER GOING BRRRR"** effect
4. **Complex algorithms take over**:
    - All randomized data feeds into the movement system
    - Item positions update using delta time and `requestAnimationFrame`
    - Smooth eased animations create realistic spinning motion
5. **Animation stops** and the winner is **announced** (though it was chosen from the very beginning!)

This creates the illusion of chance while ensuring a smooth, predictable animation experience.

## Tech Stack

-   **React** + **TypeScript** - Modern component-based architecture
-   **Vite** - Fast development and build tooling
-   **Vitest** - Unit testing framework
-   **Storybook** - Component development and automated testing (stories converted to tests)
-   **Tailwind CSS** - Utility-first styling

## Key Features

### 🎯 Intelligent Spinning Algorithm

-   **Nearest neighbor detection** - Finds the closest meal option in the desired direction
-   **Directional spinning** - Clockwise and counterclockwise navigation
-   **Randomized animations** - Dynamic spin duration and rotation counts for variety

### 🧪 Comprehensive Testing

-   Unit tests for circular movement logic and components
-   Direction-specific test cases
-   Robust edge case handling

### 📚 Component Documentation & Testing

-   Storybook integration for component showcasing
-   Stories automatically converted to Vitest test suites
-   Interactive component playground

## Prerequisites

First, install Bun (if not already installed):

```bash
curl -fsSL https://bun.com/install | bash
```

Or see other installation methods at [Bun Installation](https://bun.com/docs/installation).

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Run tests
bun run test

# Start Storybook
bun storybook
```

## Project Structure

```
src/
├── components/         # UI components (Circle, Spinner, etc.)
├── hooks/              # Custom React hooks for movement logic
├── utils/              # Core algorithms (circular movement, math utils)
├── stories/            # Storybook component stories
└── types.ts            # TypeScript type definitions
```

## Core Algorithms

The entire movement system is the core innovation of this project, featuring sophisticated mathematical calculations:

-   **Circular positioning algorithm** - Items dynamically arranged in perfect circles using trigonometry
-   **Nearest neighbor detection** - Complex angular calculations to find the closest meal option in the desired direction
-   **Movement orchestration** - Coordinated system handling spin duration, rotation counts, and directional preferences
-   **Eased animation engine** - Smooth cubic easing functions for natural, organic movement transitions

---

_Built for food lovers who want an engaging way to discover their next meal! 🌟_

**Created by Adrian Larysz**
