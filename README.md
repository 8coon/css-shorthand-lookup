# CSS Shorthand Lookup

Lookup function for
[CSS shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties).

Useful in CSS parsing and CSSOM traversal, can be used to
circumvent the way all modern browsers treat shorthand
properties if
[CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
are used.

## Install

```shell
npm i css-shorthand-lookup
```

## Use

### Simple lookup

```javascript
import {lookupShorthands} from 'css-shorthand-lookup';

// Will print ['border-color', 'border-bottom']
console.log(lookupShorthands('border-bottom-color'));
```

### With a CSSStyleRule provided

Assuming the page has the following stylesheet:

```css
.class {
	border: 1px solid var(--border-color);
}
```

Assuming `rule` variable holds a reference to
the first rule of that stylesheet:

```javascript
import {lookupShorthands} from 'css-shorthand-lookup';

// Will print ['border']
console.log(lookupShorthands('border-bottom-color', rule));
```

`lookupShorthands` can return multiple values if there are
several CSS shorthand properties that include the
provided property.

If you pass the second `CSSStyleRule` argument,
`lookupShorthands` will filter out those properties that
exist in that rule and will sort them in the order they
originally exist in the CSS source.
