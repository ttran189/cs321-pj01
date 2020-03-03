let scheduleObject = new TimeSlotObj();
let index = 1;

$(function () {
    $("#saveSchedule").on("click", ajaxSaveSchedule);

    $("#selectionAppLength").change(function () {
        let selection = parseInt($(this).val());
        let $minute1 = $("#selectionMinute1");
        let $minute2 = $("#selectionMinute2");
        var newOptions;
        switch (selection) {
            case 5:
                newOptions = {
                    "00": 0,
                    "05": 5,
                    "10": 10,
                    "15": 15,
                    "20": 20,
                    "25": 25,
                    "30": 30,
                    "35": 35,
                    "40": 40,
                    "45": 45,
                    "50": 50,
                    "55": 55
                }
                break;
            case 10:
                newOptions = {
                    "00": 0,
                    "10": 10,
                    "20": 20,
                    "30": 30,
                    "40": 40,
                    "50": 50
                }
                break;
            case 15:
                newOptions = {
                    "00": 0,
                    "15": 15,
                    "30": 30,
                    "45": 45
                }
                break;
            case 20:
                newOptions = {
                    "00": 0,
                    "20": 20,
                    "40": 40
                }
                break;
            case 30:
                newOptions = {
                    "00": 0,
                    "30": 30
                }
                break;
        }
        $minute1.empty();
        $minute2.empty();

        for (const [k, v] of Object.entries(newOptions)) {
            $minute1.append($("<option></option>").attr("value", v).text(k));
            $minute2.append($("<option></option>").attr("value", v).text(k));
        }
    });

    $("#add").click(function () {
        let classCode = $("#classCode").val();
        let day = parseInt($("#selectionDay").val());
        let appLength = parseInt($("#selectionAppLength").val());
        let hour1 = parseInt($("#selectionHour1").val());
        let minute1 = parseInt($("#selectionMinute1").val());
        let timeshift1 = $("#selectionTimeShift1").val();
        let hour2 = parseInt($("#selectionHour2").val());
        let minute2 = parseInt($("#selectionMinute2").val());
        let timeshift2 = $("#selectionTimeShift2").val();

        let begin = new TimeScheduler(appLength);
        let slotID1 = begin.slotifty(hour1, minute1, timeshift1);
        let end = new TimeScheduler(appLength);
        let slotID2 = end.slotifty(hour2, minute2, timeshift2);
        if (slotID1 >= slotID2) {
            alert("Invalid input, please reselect the times");
        } else {
            let interval = begin.getInterval(end);
            if (scheduleObject.pushTime(classCode, day, interval, appLength)) {
                buildHTMLSchedule();
            } else {
                alert("Conflict found, no changes were made.");
            }
        }
    });

    $("#scheduleData").on('click', '.sc_delete', function () {
        let id = this.id;
        let slitter = id.split("_");
        let deleteIndex = slitter[1];

        slitter = $("#dslots_" + deleteIndex).text().split(",");
        let slots = slitter;
        slots = slots.map(function (x) {
            return parseInt(x, 10);
        });
        let day = parseInt($("#dday_" + deleteIndex).text());

        if (scheduleObject.deleteSlot(day, slots))
            console.log(scheduleObject);
        else
            console.log("Delete failed!");
        $("#dr_" + deleteIndex).remove();
    });

    function ajaxSaveSchedule() {
        $.ajax({
            url: "/scheduler/update",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                schedule: scheduleObject,
                count: scheduleObject.getScheduleCount()
            }),
            success: function (res) {
                console.log(res);
            },
        })
    }

});

function loadAndBuild(scheduleFromDb) {
    scheduleObject.loadSchedule(scheduleFromDb);
    let dataView = scheduleObject.buildView(index++);
    document.getElementById("scheduleData").innerHTML = dataView;
}

function buildHTMLSchedule() {
    let dataView = scheduleObject.buildView(index++);
    $("#scheduleData").empty();
    $("#scheduleData").append(dataView);
}