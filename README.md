# LFX Light Manager

The LFX Light Manager class is the core of [LFX](https://github.com/andrewmunsell/lfx). Its purpose is to abstract the management of a set of LEDs.

## Public API Reference

The following methods are available for animations to use for rendering.

### get(Number)

**Parameters**

- `Number` - LED to get the color for. 0 index based, where 0 is the LED physically closest to the controller.

Retrieves the RGB value of the specified LED.

### getHSL(Number)

**Parameters**

- `Number` - LED to get the color for. 0 index based, where 0 is the LED physically closest to the controller.

Retrieves the HSL value of the specified LED.

### set(Number, Number, Number, Number)

**Parameters**

- `Number` - LED to set. 0 index based, where 0 is the LED physically closest to the controller.
- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255

Sets the specified LED to the given RGB value.

### setHSL(Number, Number, Number, Number)

**Parameters**

- `Number` - LED to set. 0 index based, where 0 is the LED physically closest to the controller.
- `Number` - Hue value from 0 to 255
- `Number` - Saturation value from 0 to 255
- `Number` - Lightness value from 0 to 255

Sets the specified LED to the given HSL value.

### fillRange(Number, Number, Number, Number, Number)

**Parameters**

- `Number` - Starting LED to set. Inclusive.
- `Number` - Ending LED to set. Exclusive.
- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255

Sets the specified LEDs to the given RGB value. The range is inclusive-exclusive. For example, a call to `fillRange(0, 5, 0, 0, 0)` will fill LEDs 0, 1, 2, 3, 4 will the RGB value `0,0,0`.

### fillRangeHSL(Number, Number, Number, Number, Number)

**Parameters**

- `Number` - Starting LED to set. Inclusive.
- `Number` - Ending LED to set. Exclusive.
- `Number` - Hue value from 0 to 255
- `Number` - Saturation value from 0 to 255
- `Number` - Lightness value from 0 to 255

Sets the specified LEDs to the given RGB value. The range is inclusive-exclusive. For example, a call to `fillRange(0, 5, 0, 0, 0)` will fill LEDs 0, 1, 2, 3, 4 will the HSL value `0,0,0`.

### fill(Number, Number, Number)

**Parameters**

- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255

Fills all LEDs with the specified RGB value.

### fillHSL(Number, Number, Number)

**Parameters**

- `Number` - Hue value from 0 to 255
- `Number` - Saturation value from 0 to 255
- `Number` - Lightness value from 0 to 255

Fills all LEDs with the specified HSL value.