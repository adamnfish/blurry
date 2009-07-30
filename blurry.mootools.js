/*
* blurry.mootools.js
*
* @description: MooTools Element method to create an animated blur of an element
* @author: Adam Fisher (adamnfish)
* @version: 0.1 (alpha)
* @licence: MIT-Style
* @website: http://www.adamnfish.com/projects/blurry/
* @github: http://github.com/adamnfish/blurry/tree
* @requires: MooTools 1.2+
*/

Element.implement({
    blurry: function(options){
        // default options
        options = $merge(
            {
				animate: true,
                duration: 1000,
                transition: Fx.Transitions.linear,
                opacity: 0.6,
                offset: 3
            },
            options
        );
        // cancel existing instances on thhis element
        if(this.retrieve("blurry_cancel")){
            this.retrieve("blurry_cancel")();
        }
       
        var    coords = this.getCoordinates(this.getOffsetParent()),
            clone = this.clone().setStyles(coords).setStyles({position: "absolute", opacity: options.opacity}).injectAfter(this),
            morph = new Fx.Morph(clone, {duration: options.animate ? options.duration : 10, transition: Fx.Transitions.linear, link: "cancel"}),
            animate = function(){
                morph.start({
                    top: coords.top.toInt() + $random(-options.offset, options.offset),
                    left: coords.left.toInt() + $random(-options.offset, options.offset)
                });
                timer = options.animate ? animate.delay($random(options.duration / 2, options.duration * 1.5)) : false;
            }.bind(this),
            timer = false;
       
        this.store("blurry_cancel", function(){
            $clear(timer);
            clone.destroy();
        }.bind(this));
        // start
        animate();
        return this;
    }
});