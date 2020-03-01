let results = [];
let test = ["123","456","789","123","1234"];

$(function () {
    $("#addProfessors").on("click", ajaxAddProfessors);
    $("#viewProfessors").on("click", ajaxViewProfessors);
    $("#deleteProfessors").on("click", ajaxDeleteProfessors);
    $("#addClasses").on("click", ajaxAddClasses);
    $("#viewClasses").on("click", ajaxViewClasses);
    $("#deleteClasses").on("click", ajaxDeleteClasses);
    $("#viewUsers").on("click", ajaxViewUsers);
    $("#promoteUsers").on("click", ajaxPromoteUsers);
    $("#disgraceUsers").on("click", ajaxDisgraceUsers);
    $("#viewUnverifiedUsers").on("click", ajaxUnverifiedUsers);
    $("#viewProfUsers").on("click", ajaxViewProfUsers);
    $("#viewStudUsers").on("click", ajaxViewStudUsers);
    $("#activateUsers").on("click", ajaxActivateUsers);
    $("#sendActivationCode").on("click", ajaxSendActivationCode);

    function ajaxAddProfessors() {
        $.ajax({
            url: "/manage/addProfessors",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxPromoteUsers() {
        $.ajax({
            url: "/manage/promoteUsers",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxDisgraceUsers() {
        $.ajax({
            url: "/manage/disgraceUsers",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxAddProfessors() {
        $.ajax({
            url: "/manage/addProfessors",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxDeleteProfessors() {
        $.ajax({
            url: "/manage/deleteProfessors",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxViewProfessors() {
        $.ajax({
            url: "/manage/viewProfessors",
            method: "GET",
            contentType: "application/json",
            success: function (res) {
                if (res != "") {
                    let objList = JSON.parse(res);
                    let string = "";
                    results = [];
                    objList.forEach(element => {
                        string += element.email + "\r\n";
                        results.push(element.email);
                    });
                    $("#result").val(string);
                }
            }
        })
    }

    function ajaxAddClasses() {
        $.ajax({
            url: "/manage/addClasses",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxDeleteClasses() {
        $.ajax({
            url: "/manage/deleteClasses",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxViewClasses() {
        $.ajax({
            url: "/manage/viewClasses",
            method: "GET",
            contentType: "application/json",
            success: function (res) {
                if (res != "") {
                    let objList = JSON.parse(res);
                    let string = "";
                    results = [];
                    objList.forEach(element => {
                        string += element.code + "\r\n";
                        results.push(element.code);
                    });
                    $("#result").val(string);
                }
            }
        })
    }

    function ajaxUnverifiedUsers() {
        $.ajax({
            url: "/manage/viewUnverifiedUsers",
            method: "GET",
            contentType: "application/json",
            success: function (res) {
                if (res != "") {
                    let objList = JSON.parse(res);
                    let string = "";
                    objList.forEach(element => {
                        string += element.email + "\r\n";
                    });
                    $("#result").val(string);
                }
            }
        })
    }

    function ajaxViewUsers() {
        $.ajax({
            url: "/manage/viewUsers",
            method: "GET",
            contentType: "application/json",
            success: function (res) {
                if (res != "") {
                    let objList = JSON.parse(res);
                    let string = "";
                    objList.forEach(element => {
                        string += element.email + "\r\n";
                    });
                    $("#result").val(string);
                }
            }
        })
    }

    function ajaxViewProfUsers() {
        $.ajax({
            url: "/manage/viewProfUsers",
            method: "GET",
            contentType: "application/json",
            success: function (res) {
                if (res != "") {
                    let objList = JSON.parse(res);
                    let string = "";
                    objList.forEach(element => {
                        string += element.email + "\r\n";
                    });
                    $("#result").val(string);
                }
            }
        })
    }

    function ajaxViewStudUsers() {
        $.ajax({
            url: "/manage/viewStudUsers",
            method: "GET",
            contentType: "application/json",
            success: function (res) {
                if (res != "") {
                    let objList = JSON.parse(res);
                    let string = "";
                    objList.forEach(element => {
                        string += element.email + "\r\n";
                    });
                    $("#result").val(string);
                }
            }
        })
    }

    function ajaxActivateUsers() {
        $.ajax({
            url: "/manage/activateUsers",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

    function ajaxSendActivationCode() {
        $.ajax({
            url: "/manage/sendActivationCode",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                list: $("#inputList").val()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

});