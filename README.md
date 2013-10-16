# LFX Light Manager

The LFX Light Manager class is the core of [LFX](https://github.com/andrewmunsell/lfx). Its purpose is to abstract the management of a set of LEDs.

## Public API Reference

These methods do not write the pixel buffer to the LED strand itself. Rather, the buffer is written only after all animations have modified the buffer and the render cycle is over. By default, the LFX Light Manager updates LEDs at 24 times per second.

The following methods are available for animations to use for rendering. 

### get(Number)

**Parameters**

- `Number` - LED to get the color for. 0 index based, where 0 is the LED physically closest to the controller.

Retrieves the RGB value of the specified LED. Color is returned in an object with the specified format:

```
{
	"r": Number,
	"g": Number,
	"b": Number
}
```

### getHSL(Number)

**Parameters**

- `Number` - LED to get the color for. 0 index based, where 0 is the LED physically closest to the controller.

Retrieves the HSL value of the specified LED. Color is returned in an object with the specified format:

```
{
	"h": Number,
	"s": Number,
	"l": Number
}
```

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
- `Number` - Hue value from 0 to 360
- `Number` - Saturation value from 0 to 1
- `Number` - Lightness value from 0 to 1

Sets the specified LED to the given HSL value.

### fillRange(Number, Number, Number, Number, Number)

**Parameters**

- `Number` - Start of the range to set, inclusive.
- `Number` - End of the range to set, exclusive.
- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255

Sets the specified LEDs to the given RGB value. The range is inclusive-exclusive. For example, a call to `fillRange(0, 5, 0, 0, 0)` will fill LEDs 0, 1, 2, 3, 4 will the RGB value `0,0,0`.

### fillRangeHSL(Number, Number, Number, Number, Number)

**Parameters**

- `Number` - Start of the range to set, inclusive.
- `Number` - End of the range to set, exclusive.
- `Number` - Hue value from 0 to 360
- `Number` - Saturation value from 0 to 1
- `Number` - Lightness value from 0 to 1

Sets the specified LEDs to the given RGB value. The range is inclusive-exclusive. For example, a call to `fillRange(0, 5, 0, 0, 0)` will fill LEDs 0, 1, 2, 3, 4 will the HSL value `0,0,0`.

### fill(Number, Number, Number)

**Parameters**

- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255

Fills all LEDs with the specified RGB value.

### fillHSL(Number, Number, Number)

**Parameters**

- `Number` - Hue value from 0 to 360
- `Number` - Saturation value from 0 to 1
- `Number` - Lightness value from 0 to 1

Fills all LEDs with the specified HSL value.

### multiply(Number, Number, Number, Number)

**Parameters**

- `Number` - LED to set. 0 index based, where 0 is the LED physically closest to the controller.
- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255

Multiplies the given RGB value onto the specified LED.

The formula is defined as `f(a, b) = ab`, where `a` represents the base value and `b` represents the value to multiply.

### screen(Number, Number, Number, Number)

**Parameters**

- `Number` - LED to set. 0 index based, where 0 is the LED physically closest to the controller.
- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255

Applies screen blending with the given RGB value onto the specified LED. Essentially, the screen blending mode is the opposite of multiply.

The formula is defined as `f(a, b) = 1 - (1 - a)(1 - b)`, where `a` represents the base value and `b` represents the value to screen. [[1]](https://en.wikipedia.org/wiki/Blend_modes#Screen)

### clear

**Parameters**

*None*

Clears the entire strand buffer and removes all animations.

### blank

**Parameters**

*None*

Blanks the entire LED strand. This method, unlike `clear`, will *not* remove any animations-- it will only clear the pixel buffer. If any animations are active, they will still render on the next cycle.