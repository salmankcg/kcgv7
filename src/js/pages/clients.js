// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from 'jquery';
import Cookies from 'js-cookie';


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    // REDIRECT WITH FILTER CASE STUDY FROM CLIENT PAGE
    $(document).on('click', '.kcg-clients-content .button', function(e) {
        e.preventDefault();
        let link = $(this).attr('href');
        let type = $(this).data('id');
        if(type) {
            Cookies.set('work_type', type);
            console.log(Cookies.get('work_type'));
            window.location.href = link;
            return true;
        } else {
            Cookies.set('work_type', '');
            console.log(Cookies.get('work_type'));
            window.location.href = link;
            return true;
        }
    });

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\




// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }