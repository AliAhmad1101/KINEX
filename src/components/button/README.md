# KINEX Button

Reusable button component from KINEX.js.

## Usage

### Import

```javascript
import { Button } from "./components/button/index.js";
```

### HTML

```html
<button id="demo">
    Explore Library
</button>
```

### JavaScript

```javascript
Button("#demo", {
    variant: "primary"
});
```

## Variants

Available button variants:

- `primary`
- `glow`
- `disabled`

### Example

```javascript
Button("#demo", {
    variant: "glow"
});
```