/**
 * Copyright (c) 2015 Neil Pullman
 * Licensed under the MIT license
 */

var Spinner = function (el) {
  this.svg = el,
  this.timing = .3,
  this.direction = 0,
  this.timelineEnd = 0, // can be used to end the spinner.
  this.timeline = new TimelineMax({ // initiate the timeline object
    paused: true, // paused at start so the tween steps can be added
    ease: Bounce.easeOut,
    yoyo: true,
    repeat: -1,
    onStart: this.startRepeat.bind(this),
    onRepeat: this.startRepeat.bind(this)
  });

  this.polygon = new Polygon({ el: this.svg.querySelector('#polygon'), parent: this.svg });

  this.setupTimeline();
  this.timeline.play();
};

Spinner.prototype.startRepeat = function (el) {
  if (this.direction) {
    TweenMax.to(this.polygon.el, this.timing * this.polygon.maxSides * 1.05, { rotation: '10deg', ease: Cubic.easeInOut });
  } else {
    TweenMax.to(this.polygon.el, this.timing * this.polygon.maxSides, { rotation: '370deg', ease: Cubic.easeInOut });
  }

  this.direction = !this.direction;
};

Spinner.prototype.applyUpdates = function (tween, sides) {
  var points = [];

  for (var j = 0; j <= sides; j++) {
    points.push(tween.target['x' + j] + ',' + tween.target['y' + j]);
  }

  this.polygon.el.setAttribute('points', points.join(' '));
};

Spinner.prototype.setupTimeline = function () {
  for (var i = this.polygon.sides - 1; i < this.polygon.maxSides; i++) {
    var finish = this.polygon.setSides(i + 1),
        _sides = i;

    this.timeline.to(this.polygon.points, this.timing, _.extend(finish, {
      ease: Cubic.easeOut,
      onUpdateParams: ["{self}", _sides],
      onUpdate: this.applyUpdates.bind(this)
    }));
  }

  // enables the spinner to hide itself at the end of a cycle
  this.timeline.call(this.fadeOut.bind(this));
};

Spinner.prototype.fadeOut = function () {
  if (this.timelineEnd) {
    this.timeline.pause();

    TweenMax.to(this.svg, .4, {
      bezier: {
        curviness: 1.25,
        values: [
          { scale: 1.2, opacity: 1 },
          { scale: .8, opacity: .5 },
          { scale: .2, opacity: .1 },
          { scale: 0, opacity: 0 }
        ]
      }
    })
  }
};

// used to kill the spinner when something finished loading.
// `timelineEnd` is checked at the end of every animation cycle
// via the `fadeOut` method above
Spinner.prototype.finish = function () {
  this.timelineEnd = 1;
};

var Polygon = function (opts) {
  this.el = opts.el;
  this.parent = opts.parent;

  this.setupPolygon();
};

Polygon.prototype.setupPolygon = function () {
  // setup size properties
  this.size = this.parent.getBoundingClientRect().width,
  this.center = this.size / 6,
  this.radius = this.center

  this.sides = 1, //beginning number of sides. we start with a triangle
  this.maxSides = 12, // end with a dodecagon
  this.points = { // defines the initial triangle area
    x0: 0, y0: 60, x1: 51, y1: -31, x2: -52, y2: -32, x3: -52,y3: -32
  };

  TweenMax.set(this.el, {
    transformOrigin: 'center center',
    x: this.size / 2,
    y: this.size / 2
  });

  this.points = this.fillPoints(this.points, this.sides);
};

Polygon.prototype.setSides = function (sides) {
  var points = {},
      angle = 2 * Math.PI / sides,
      i = 0; // keep track of `i` outside of for loop so we can easily pass it to `fillPoints`

  for (i; i < sides; i++) {
    var _angle = i * angle,
        _radius = this.center + this.radius,
        x = _radius * Math.sin(_angle),
        y = _radius * Math.cos(_angle);

    points['x' + i] = Math.floor(x);
    points['y' + i] = Math.floor(y);
  }

  return this.fillPoints(points, i);
};

Polygon.prototype.fillPoints = function (points, i) {
  // fill in remaining values to be the same as the last point
  // so they dont appear on screen
  var x = points['x' + (i - 1)],
      y = points['y' + (i - 1)];

  for (i; i < this.maxSides; i++) {
    points['x' + i] = x;
    points['y' + i] = y;
  }

  return points;
};