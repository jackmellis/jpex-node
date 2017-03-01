# jpex-node
Default factories for Jpex in a node environment

## Installation  
`npm install jpex-node --save`  

## Usage  
```javascript
const Jpex = require('jpex');
const jpexNode = require('jpex-node');
Jpex.use(jpexNode);

// We now have access to more goodies
const $fs = Jpex.$resolve('$fs');

Jpex.register.node_module('path');
```

## API  
**jpex-node** automatically includes all factories from the **jpex-defaults** plugin, plus a few extras:  

### $fs  
**$fs** is a wrapper around Node's File System module (*fs*).  
Any method that would normally take a callback has been converted into a promise using the `$promise` factory.

```javascript
var MyClass = jpex.extend(function($fs){
  $fs.readFile('files/file', 'utf8')
    .then(function(data){})
    .catch(function(err){});
});
```

### $tick  
`$tick(callback)`
`$tick` calls the callback function on the next available event loop. This is the equivalent of `process.nextTick`.  

### node_module
`Class.register.node_module(name)`  
This is just a short cut for injecting a node module. Normally Jpex's resolver looks through all inherited factories, decorators, named parameters, etc. until it finally decides to look in the node_modules folder. Registering a node_module tells Jpex where to look straight away.  
```javascript
Class.register.node_module('path');
var path = Class.$resolve('path');
```
