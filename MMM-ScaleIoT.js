'use strict';

Module.register("ScaleIoT", {

  result: {},
  defaults: {
    updateInterval: 600000,
    url: ''
  },

  start: function() {
    this.getStats();
    this.scheduleUpdate();
  },

  getDom: function() {
    var wrapper = document.createElement("ticker");
    wrapper.className = 'dimmed small';

    var data = this.result;
    var statElement =  document.createElement("header");
    var title = "ScaleIoT";

    if (data) {
      console.log(JSON.stringify(data));
      statElement.innerHTML = title;
      wrapper.appendChild(statElement);
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
      this.updateDom(self.config.fadeSpeed);
    }
  },

});
