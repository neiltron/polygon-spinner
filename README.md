# polygon-spinner
A loading spinner that draws an SVG triangle and then animates it to a dodecagon and back.

[View demo](http://codepen.io/neiltron/full/eNGzKY/)

## Usage
Create an SVG with a polygon element somewhere in the DOM. E.g.:

```
<svg class='spinner' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="0 0 100 100">
   <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100%" height="100%">
    <polygon id='polygon' />
  </svg>
</svg>
```

Then initialize the spinner by passing a reference to your SVG element:

```
var spinner = new Spinner(document.querySelector('.spinner'));
```

And style it however you like. The demo looks something like this:
```
.spinner polygon {
    stroke: #fafafa;
    fill: transparent;
    stroke-width: 2;
}
```

## Contribute

Feel free to create [an issue](https://github.com/neiltron/math-ios/issues) if you have any problems. If you'd like to contribute fixes or changes, please fork the repository and create a pull request. If you aren't sure where to start or need help implementing something, you can create an issue to discuss it or contact me directly.

## Contact

 - http://twitter.com/realtron
 - neil at descend.org


## License

Released under the MIT License. Free to use, modify, and distribute (with restrictions).  Check the [LICENSE](https://github.com/neiltron/polygon-spinner/blob/master/LICENSE) for more information.
