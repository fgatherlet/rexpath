# Rexpath is xpath with regex.

With this package, you can query dom tree with xpath and regex(regular expression).

With xpath, we already can query dom but cannot use regex.
You may want to query dom which attribute(like `class`, `href`) match a regex(like `/bo.+k/`, `/(fa[vb]olite)/`).

You can do it. like:

```
var elements = document.rexpath_all( ['and', '//div', ['or', ['@~', 'class', '(cool|awesome)-cafe'], ['@~', 'id', 'number-~d+']]] );
elements.forEach((element)=>{
  var a = element.rexpath( ['and', './/a', ['~', 'hotel']]);
  console.log('find a tag:', a);
}
```

## Start with unpkg

```
<html>
  <head>
    <script src='https://unpkg.com/rexpath@1.0.8/dist/index-web.js'></script>
    <script>
      window.onload = (event) => {
        console.log("window on load start. -----");
        const as = document.rexpath_all(['and', '//a', ['~', '\\d+']]);
        as.forEach(a=>{ console.log(`found a. href:${a.href} text:${a.text}.`) });
      };
    </script>
  </head>
  <body>
    <ul>
      <li><a href='/apple-200'>apple 200</a></li>
      <li><a href='/orange-300'>orange 300</a></li>
      <li><a href='/pine-400'>pine 400</a></li>
      <li><a href='/knife'>knife</a></li>
    </ul>
  </body>
</html>
```

## Start with webpack.

Install.

```
$ npm install rexpath
```

Use this like.

```
import rexpath from 'rexpath';
rexpath.init(); /* inject method to HTMLElement, HTMLDocument. */

function find_it() {
    var div = document.rexpath( ["and", "//div", ["or", ["@~", "class", "awesome-[ck]lass"],
                                                        ["@~", "id", "awesome"]]] );
    var a = div.rexpath( ["and", ".//a", ["~", "cool.+title"]] );                                                    
    return a;
}
```

## API

### `(HTMLElement|HTMLDocument)#rexpath(query)`

Find a element.

### `(HTMLElement|HTMLDocument)#rexpath_all(query)`

Find all elements.

## Query

definition.

```
query = string | list
list = and-clause | or-clause | attribute-match-clause | text-match-clause
and-clause = ["and", query,,,]
or-clause = ["or", query,,,]
attribute-match-clause = ["@~", attribute, regex]
text-match-clause = ["~", regex]
```

meaning.

```
string : xpath. like "//div", ".//a[ contains(text(), 'aaa') ]"
and-clause : query `and` mached dom. like ["and", "//div", ["~", "this .+ is awesome"]]
or-clause : query `or` mached dom. like ["or", ["@~", "class", "red|blue"], ["@~", "id", "red|blue"]]
attribute-match-clause : query dom which text match 
attribute: string. attribute like "href", "class"
regex: string. regular expression.
```

## Examples

### Compose xpath.

```
document.rexpath( ['and', '//div[ @class="test" ]', ['or', "./span", "./table"], './/a'] );
```

### RegEx

```
// attribute match
document.rexpath( ['and', '//*', ['@~', 'class', '(novel|music|movie)']] );

// text() match
document.rexpath_all( ['and', '//a', ['~', 'social\\s+network\\s+\\d+']] );
```


