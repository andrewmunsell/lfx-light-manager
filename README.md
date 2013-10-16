# LFX Light Manager

The LFX Light Manager class is the core of [LFX](https://github.com/andrewmunsell/lfx). Its purpose is to abstract the management of a set of LEDs.

## Public API Reference

The following methods are available for animations to use for rendering.

### set(Number, Number, Number, Number)

**Parameters**

- `Number` - LED to set. 0 index based, where 0 is the LED physically closest to the controller.
- `Number` - Red value from 0 to 255
- `Number` - Green value from 0 to 255
- `Number` - Blue value from 0 to 255