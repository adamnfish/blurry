(function($){
	function $random(max, min){
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	$.fn.extend({
		blurry: function(options){
			options = $.extend({
				animate: true,
                duration: 1000,
                opacity: 0.6,
                offset: 3
			}, options);
			
			if(this.data("blurry_cancel")){
				this.data("blurry_cancel")();
			}
			
			var coords = this.position(),
				height = this.innerHeight(),
				width = this.innerWidth(),
				clone = this.clone(true).css({
					position: "absolute",
					opacity: options.opacity,
					width: width,
					height: height,
					top: coords.top,
					left: coords.left
				}).insertAfter(this),
				timer = false,
				animate = function(){
					clone.animate({
						top: parseInt(coords.top, 10) + $random(-options.offset, options.offset),
	                    left: parseInt(coords.left, 10) + $random(-options.offset, options.offset)
					}, options.duration);
					timer = options.animate ? setTimeout(animate, options.duration + 50) : false;
				};
			
			this.data("blurry_cancel", function(){
	            clearTimeout(timer);
	            clone.remove();
			});
			
			animate();
			return this;
		}
	});
})(jQuery);