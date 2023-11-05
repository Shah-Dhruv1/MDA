// import { action } from 'mobx';

// import { action } from 'mobx';

// class AppStore {
//     // ... other code

//     @observable isHidingBranding = false;

//     @action
//     toggleHidingBranding() {
//         this.isHidingBranding = !this.isHidingBranding;
//     }
// }


const testimonials = document.querySelector('.testimonials');
const scroller = testimonials.querySelector('.scroller');
const nextBtn = testimonials.querySelector('.btn.next');
const prevBtn = testimonials.querySelector('.btn.prev');
const itemWidth = testimonials.querySelector('.item').clientWidth;
var current_month = 0;
var total_months = document.getElementsByClassName("item").length;
var base_url = "https://6932-2409-4041-6e90-a6ff-1024-c7f1-6dea-b9b6.ngrok-free.app/";
nextBtn.addEventListener('click', scrollToNextItem);
prevBtn.addEventListener('click', scrollToPrevItem);
// AppStore.toggleHidingBranding();
function scrollToNextItem() {
    
    if(scroller.scrollLeft < (scroller.scrollWidth - itemWidth)){
        // The scroll position is not at the beginning of last item
        scroller.scrollBy({left: itemWidth, top: 0, behavior:'smooth'});
        
    }
    else{
        // Last item reached. Go back to first item by setting scroll position to 0
        scroller.scrollTo({left: 0, top: 0, behavior:'smooth'});
    }
    // var pdf_url = base_url + "/" + current_month;
    // alert(pdf_url);
}
function scrollToPrevItem() {
    if(scroller.scrollLeft != 0)
        // The scroll position is not at the beginning of first item
        scroller.scrollBy({left: -itemWidth, top: 0, behavior:'smooth'});
    else
        // This is the first item. Go to last item by setting scroll position to scroller width
        scroller.scrollTo({left: scroller.scrollWidth, top: 0, behavior:'smooth'});
    var pdf_url = base_url + "/" + current_month;
    // alert(pdf_url);
}
// document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
//     var adobeDCView = new AdobeDC.View({clientId: "7d5391e5548242b2847dd11ccd5d3a95", divId: "adobe-dc-view"});
//     adobeDCView.previewFile({
//         content:{location: {url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
//         metaData:{fileName: "Newsletter.pdf"}
//     }, {});
// });
// embed-pdf.js

document.addEventListener("adobe_dc_view_sdk.ready", function () {
    

    function removePDF(pdfUrl, pdfFileName) {
        var remadobedcview = document.getElementById("adobe-dc-view");
        remadobedcview.innerHTML = '';
    }

    function loadPDF(pdfUrl, pdfFileName) {
        var adobeDCView = new AdobeDC.View({ clientId: "7d5391e5548242b2847dd11ccd5d3a95", divId: "adobe-dc-view" });
        // alert(pdfUrl);
        adobeDCView.previewFile(
            {
                content: { location: { url: pdfUrl } },
                metaData: { fileName: pdfFileName }
            },
            {}
        );
    }

    loadPDF(base_url+"1.pdf", "Newsletter.pdf");

    var changePDFButtonnext = document.querySelector('.btn.next');
    changePDFButtonnext.addEventListener('click', function () {
        current_month = current_month + 1;
        current_month = current_month % total_months;   
        var newPDFUrl = base_url + current_month.toString() +".pdf";
        // alert(newPDFUrl);
        var newPDFFileName = "Newsletter.pdf";
        removePDF();
        loadPDF(newPDFUrl, newPDFFileName);
    });
    var changePDFButtonprev = document.querySelector('.btn.prev');
    changePDFButtonprev.addEventListener('click',function(){
        current_month = current_month + total_months - 1;
        current_month = current_month % total_months;
        var newPDFUrl = base_url + current_month.toString() +".pdf";
        // alert(newPDFUrl);
        var newPDFFileName = "Newsletter.pdf";
        removePDF();
        loadPDF(newPDFUrl, newPDFFileName);
    });
});
