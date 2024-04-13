// Calculating the tax applied
function applyTax(income) {
    let ageGroup = $("#age-group").val();
    if(ageGroup == "young") {
        return 0.3*(income - 800000)
    } else if(ageGroup == "middle-aged") {
        return 0.4*(income - 800000)
    } else {
        return 0.1*(income - 800000)
    }
}

// Verifying if the input is valid
$(".form-control").on("input", function() {
    if(!$.isNumeric($(this).val())) {
        $(this).siblings().removeClass("d-none")
    } else {
        $(this).siblings().addClass("d-none")
    }
})

// Actions to perform when data is submitted
let validForm = true;

$("#data-form").on("submit", function(e) {
    e.preventDefault();
    validForm = true;
    $(".form-control").each(function(index) {
        if($(this).val() == "") {
            validForm = false;
            $(this).siblings().removeClass("d-none")
        } else {
            $(this).siblings().addClass("d-none")
        }
    })
    if(validForm) {
        let taxDeduced;
        let overallIncome = parseInt($("#income").val()) + parseInt($("#extra-income").val()) - parseInt($("#deductions").val());
        taxDeduced = overallIncome <= 800000 ? overallIncome : overallIncome - applyTax(overallIncome);
        if(taxDeduced < 0) 
            taxDeduced = 0;
        $('.modal').modal('show');
        $("#overall-income").html( "&#8377;" + taxDeduced);
    }
})

// Enabling use of tooltip with bootstrap
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})