//-----------------------------------------------------------
// Client side JavaScript for Mustache demo page
//-----------------------------------------------------------

/* global $ui */

class DemoMustacheFrontend {
	static render(params) {
		try {
			if (typeof Mustache === 'undefined') throw 'Mustache not available';

			const app = typeof $ui !== 'undefined' ?
				// Internal UI use
				$ui.getAjax() :
				// External use (public)
				new Simplicite.Ajax(params.root, 'uipublic');

			const prd = app.getBusinessObject('DemoProduct');
			prd.bannerURL = prd.bannerURL || params.bannerURL; // Image banner URL
			prd.toFixed = prd.toFixed || function() { return (n, r) => { return parseFloat(r(n)).toFixed(2); }; }; // Rendering function for decimal

			const div = $('#demomustachefrontend');
			if (!params.pub) div.css('min-height', '1000px');
			prd.search(() => div.html(Mustache.render($('#demo-template').html(), prd)), null, { inlineDocs: true });
		} catch(e) {
			console.error('Render error: ' + e.message);
		}
	}
}
