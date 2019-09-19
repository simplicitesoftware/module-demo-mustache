var demo = typeof demo !== 'undefined' ? demo : (function($) {
	var app, prd;

	/**
	 * Render
	 * @param root Context path
	 * @param banner Banner URL
	 * @param pub Public?
	 * @function
	 */
	function render(root, banner, pub, inapp) {
		//alert("inapp="+inapp);
		
		try {
			if (typeof Mustache === 'undefined') throw 'Mustache not available';
			var div = $('#demo');
			if (!pub) div.css('min-height', '1000px');
			
			app = app || (pub
				? new Simplicite.Ajax(root, 'api', 'website', 'simplicite')
				: Simplicite.Application); // Internal
	
			prd = prd || app.getBusinessObject('DemoProduct');
			prd.bannerURL = prd.bannerURL || banner; // Image banner URL
			prd.toFixed = prd.toFixed || function() { return function(n, r) { return parseFloat(r(n)).toFixed(2); } }; // Rendering function for decimal

			prd.search(function() {
				div.html(Mustache.render($('#demo-template').html(), prd));
			}, null, { inlineDocs: true });
		} catch(e) {
			console.error('Render error: ' + e.message);
		}
	}

	return { render: render };	
})(jQuery);
