var latestSliders = null;
Event.observe(window, 'load', function() {
	var container = $('latest');
	latestSliders = new AC.SlidingBureau(container);
	var drawers = $$("#latest .drawers>li");
	for (var i = 0; i < drawers.length; i++) {
		var handle = drawers[i].getElementsByClassName('drawer-handle')[0];
		var content = drawers[i].getElementsByClassName('drawer-content')[0];
		var drawer = new AC.SlidingDrawer(content, handle, latestSliders, {
			triggerEvent: 'mouseover', triggerDelay: 120});
		latestSliders.addDrawer(drawer);
	}
	var freeDrawers = function(container) {
		return function() {
			if (!AC.Detector.isIEStrict()) {
				container.setStyle({height: 'auto'});
			}
		}
	}
	setTimeout(freeDrawers(container), 1000);
});