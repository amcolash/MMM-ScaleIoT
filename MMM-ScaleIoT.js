'use strict';

Module.register("MMM-ScaleIoT", {

  result: {},
  defaults: {
    updateInterval: 600000,
    url: '',
    fadeSpeed: 500
  },

  start: function() {
    this.getStats();
    this.scheduleUpdate();
  },

  isEmpty: function(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false;
      }
    }
    
    return true;
  },

  getDom: function() {
    var wrapper = document.createElement("ticker");
    wrapper.className = 'dimmed small';

    var data = this.result;
    var statElement =  document.createElement("header");
    var title = "ScaleIoT";
    statElement.innerHTML = title;
    wrapper.appendChild(statElement);
      
    if (data && !this.isEmpty(data)) {
      var tableElement = document.createElement("table");

      var averageWeight = data.averageWeight;
      var low = data.low;
      var high = data.high;
      var lastWeight = data.lastWeight;

      var lastRow = document.createElement("tr");
      var avgRow = document.createElement("tr");
      var lowRow = document.createElement("tr");
      var highRow = document.createElement("tr");

      lastRow.innerHTML = "Last: " + lastWeight + " lbs";
      avgRow.innerHTML = "Avg: " + averageWeight + " lbs";
      lowRow.innerHTML = "Low: " + low + " lbs";
      highRow.innerHTML = "High: " + high + " lbs";

      tableElement.appendChild(lastRow);
      tableElement.appendChild(avgRow);
      tableElement.appendChild(lowRow);
      tableElement.appendChild(highRow);

      wrapper.appendChild(tableElement);
    } else {
      var error = document.createElement("span");
      error.innerHTML = "Error fetching stats.";
      wrapper.appendChild(error);
    }
    
    return wrapper;
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    setInterval(function() {
      self.getStats();
    }, nextLoad);
  },

  getStats: function () {
    this.sendSocketNotification('GET_STATS', this.config.url);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "STATS_RESULT") {
      this.result = payload;
      console.log("fade: " + self.config.fadeSpeed);
      this.updateDom(self.config.fadeSpeed);
    }
  },

});
