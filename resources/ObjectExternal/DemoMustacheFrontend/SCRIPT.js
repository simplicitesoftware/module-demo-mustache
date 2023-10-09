var DemoMustacheFrontend = DemoMustacheFrontend || (() => {
	let app, prd;

	/**
	 * Render
	 * @param params Parameters
	 * @function
	 */
	function render(params) {
		try {
			if (typeof Mustache === 'undefined') throw 'Mustache not available';
			const div = $('#demomustachefrontend');
			if (!params.pub) div.css('min-height', '1000px');

			app = app || (params.pub ?
				// External
				new Simplicite.Ajax(params.root, 'api', 'website', 'simplicite') :
				// Internal
				$ui.getAjax()
			);
	
			prd = prd || app.getBusinessObject('DemoProduct');
			prd.bannerURL = prd.bannerURL || params.bannerURL; // Image banner URL
			prd.toFixed = prd.toFixed || function() { return (n, r) => { return parseFloat(r(n)).toFixed(2); }; }; // Rendering function for decimal

			prd.search(() => {
				div.html(Mustache.render($('#demo-template').html(), prd));
			}, null, { inlineDocs: true });
		} catch(e) {
			console.error('Render error: ' + e.message);
		}
	}

	return { render: render };	
})();
