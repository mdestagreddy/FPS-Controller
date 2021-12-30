function FPS_Controller(fps, callback) {
	var t = this, prevTick = 0, renderer = undefined;
	
	t.obj = {
		vsync: {
			start: 0,
			end: 0,
			elapsed: 0
		},
		isStart: false,
		fps: fps
	}
	
	function render() {
		renderer = window.requestAnimationFrame(render);
		
		var now = Math.round(t.obj.fps * performance.now() / 1000);
 			if (now == prevTick) return;
 			prevTick = now;
 			
 			t.obj.vsync.start = performance.now();
 			t.obj.vsync.elapsed = (t.obj.vsync.start - t.obj.vsync.end) / (1000 / 60);
		t.obj.vsync.end = t.obj.vsync.start;
 			
 			callback({
 				frameRate: (1 / t.obj.vsync.elapsed) * 60,
 				elapsed: t.obj.vsync.elapsed
 			});
	}
	
	t.frameRate = function(set) {
		t.obj.fps = set;
	}
	
	t.start = function() {
		if (!t.obj.isStart) {
			t.obj.vsync.start = performance.now();	
			t.obj.vsync.end = t.obj.vsync.start + 1000;
			render();
			t.obj.isStart = true;
		}
	}
	
	t.stop = function() {
		if (t.obj.isStart) {
			window.cancelAnimationFrame(renderer);
			t.obj.isStart = false;
		}
	}
}
