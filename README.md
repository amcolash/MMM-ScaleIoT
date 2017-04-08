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
			url: 'http://your.server.here',
			updateInterval: 60000 // update interval in milliseconds
		}
	}
]
```

| Option               | Description
| -------------------- | -----------
| `updateInterval`     | The time between updates (In milliseconds). / <br><br> **Default value:** `300000 (5 minutes)`
| `url`                | The url of the ScaleIoT web server. <br><br> **Default value:** `REQUIRED`
