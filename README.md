# MemoizeUntil

A unique Memoization Pattern which memoizes until the next time metric - could be until the next minute, hour, day, week.

## Get Started

Install this grunt plugin next to your project's grunt.js gruntfile with: `npm install memoize_until --save-dev`

## Usage

```javascript
const MemoizeUntil = require('memoize_until').MemoizeUntil

MemoizeUntil.fetch('min', 'default', () => { 
    return 'SomeComplexOperation'; 
})
```

#### options:
1. `min` : Metric until when you want to memoize. Can be one of ['min', 'hour', 'day', 'week']

2. `default` : All metric levels come with a 'default' key. More can be added by [initializing](#Initialisation) `MemoizeUntil` with extra keys

3. `cb`: callback function. This callback function must return a value which needs to be memoized/cached.

## Initialisation
To add custom keys to each metric, pass a custom object to the `init` function of `MemoizeUntil`.
```javascript
MemoizeUntil.init({ 
    min: ['custom1', 'custom2']
})

MemoizeUntil.fetch('min', 'custom1', () => { 
    return 'SomeComplexOperation'; 
})
```

## Extend
To add custom keys during runtime to any metric, use the `extend` function of `MemoizeUntil`.
```javascript
let runtime_key = 'runtime_key';
MemoizeUntil.extend('min', runtime_key)

MemoizeUntil.fetch('min', runtime_key, () => { 
    return 'SomeComplexOperation'; 
})
```

## License
[Ritikesh](https://ritikesh.github.io)  
Licensed under the MIT license.