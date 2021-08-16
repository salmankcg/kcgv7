// ------------------------------ \\\
// ---------- IMPORTS ----------- \\\
// ------------------------------ \\\
import $ from "jquery";


// ----------------------------------------- \\\
// ---------------- INIT'S ----------------- \\\
// ----------------------------------------- \\\
$('.svg').each(startClass);



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function startClass(){

	var $icon = $(this);
	if ($icon.hasClass('svg-inline')) return true;

	var bg = $icon.css('background-image').replace('url(', '').replace(')', '').replace(/\"/g, '');

	if (bg && bg != 'none') $.get(bg, function(resp){
		$icon.html($(resp).find('svg')).addClass('svg-inline').trigger('svg-ready');
	});

}

