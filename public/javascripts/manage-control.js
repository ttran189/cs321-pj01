$(function () {
    $("#addProfessors").on("click", ajaxAddProfessors);
    $("#viewProfessors").on("click", ajaxViewProfessors);
    $("#deleteProfessors").on("click", ajaxDeleteProfessors);
    $("#viewUsers").on("click", ajaxViewUsers);
    $("#promoteUsers").on("click", ajaxPromoteUsers);
    $("#disgraceUsers").on("click", ajaxDisgraceUsers);

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

});