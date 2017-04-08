# MMM-ScaleIoT
A MagicMirror module for a [ScaleIoT]() server.

This code is partially copied from the very simple [stock ticker](https://github.com/alexyak/stocks) from _alexyak_.


## Configuration
It is very simple to set up this module, a sample configuration looks like this:

```
modules: [
  {
		module: 'MMM-ScaleIoT',
		position: 'bottom_bar',
		config: {
			url: ,
			updateInterval: 60000 // update interval in milliseconds
		}
	}
]
```
