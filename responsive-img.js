/*
// @name: Responsive-img.js
// @version: 1.1
// 
// Copyright 2013-2014 Koen Vendrik, http://kvendrik.com
// Licensed under the MIT license

// special version for simpler HTML
// attention
*/

	function makeImagesResponsive(){

			var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		////////GET ALL IMAGES////////

		var images = document.getElementsByTagName('body')[0].getElementsByTagName('img');
		if( images.length === 0 ){
			return;
		}

		////////HASATTR FUNCTION////////

		var hasAttr;
		if(!images[0].hasAttribute){ //IE <=7 fix

			hasAttr = function(el, attrName){ //IE does not support Object.Prototype
				return el.getAttribute(attrName) !== null;
			};

		} else {

			hasAttr = function(el, attrName){
				return el.hasAttribute(attrName);
			};

		}

		////////CHECK IF DISPLAY IS RETINA////////

		// var retina = window.devicePixelRatio ? window.devicePixelRatio >= 1.2 ? 1 : 0 : 0;

		////////LOOP ALL IMAGES////////

		for (var i = 0; i < images.length; i++) {

				var image = images[i];


				//set attr names

				//var srcAttr = ( retina && hasAttr(image, 'data-src2x') ) ? 'data-src2x' : 'data-src';
				var srcAttr = 'data-responsive';
				
				//var baseAttr = ( retina && hasAttr(image, 'data-src-base2x') ) ? 'data-src-base2x' : 'data-src-base';
				
				
				
				//check image attributes

				if( !hasAttr(image, srcAttr) ){
					continue;
				}
                                var srcString = image.getAttribute(srcAttr);
				var basePathOnly = srcString.substring(0, srcString.lastIndexOf('/')+1);
				var baseFile = srcString.substring(srcString.lastIndexOf('/')+1);
				var fileName = baseFile.substring(0, baseFile.lastIndexOf('.'));
				var fileType = baseFile.substring(baseFile.lastIndexOf('.'));
				fileName = fileName.substring(0, ((fileName.lastIndexOf('-')+1) ? fileName.lastIndexOf('-') : fileName.length));
				
				
                                // eventually compute image height
				var imageHeight = 730;
                                var setHeight = 0;
				var heightAttr = 'height-responsive';
                                if (hasAttr(image, heightAttr)) {
                                    imageHeight = image.getAttribute(heightAttr); 
                                    setHeight = 1;
                                }

				//check window size and return appropriate file
				var fileSuffix = '';
				if (viewport <= 576){
					fileSuffix = '-298';
                                        imageHeight = imageHeight * 298 / 730;
				} else if (viewport <= 768){
					fileSuffix = '-330';
                                        imageHeight = imageHeight * 330 / 730;
				} else if (viewport <= 992){
					fileSuffix = '-450';
                                        imageHeight = imageHeight * 450 / 730;
				} else if (viewport <= 1200){
					fileSuffix = '-610';
                                        imageHeight = imageHeight * 610 / 730;
				}else{
					fileSuffix = '-730';
				}
				
				var newSource = basePathOnly + fileName + fileSuffix + fileType;
				image.setAttribute('src', newSource);
                                if (setHeight) {
				   image.setAttribute('height', parseFloat(imageHeight).toFixed());
                                }



		}

	}

if(window.addEventListener){

	window.addEventListener('load', makeImagesResponsive, false);
	window.addEventListener('resize', makeImagesResponsive, false);

} else { //ie <=8 fix

	window.attachEvent('onload', makeImagesResponsive);
	window.attachEvent('onresize', makeImagesResponsive);

}
