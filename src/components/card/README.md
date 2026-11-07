# KINEX Card

## Overview

Card is a reusable container component designed to group related content with consistent spacing, typography, and visual hierarchy.

The component follows KINEX design tokens for colors, spacing, radius, shadows, and motion.

---

# Usage

```javascript
import { Card } from "./card.js";


Card({
    variant: "default",
    title: "Card Title",
    description: "Card description",
    action: "Explore"
});