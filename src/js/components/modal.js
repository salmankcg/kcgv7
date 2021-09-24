// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $modal       	= $('.modal');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($modal.length){

	if(localStorage.getItem('loaded') != 'yes'){
		// setTimeout(function(){
		// 	$modal.fadeIn(400).css('display','flex');
		// },4000);

		// localStorage.setItem('loaded', 'yes');
	}

	$modal.find('.button').on('click',function(){
		$modal.fadeOut(400);
	});

	$modal.find('.background').on('click',function(){
		$modal.fadeOut(400);
	});
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\

