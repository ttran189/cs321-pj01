let scheduleObject = new TimeSlotObj();
let index = 1;

$(function () {
    $("#add").click(function () {
        let classCode = $("#classCode").val();
        let day = parseInt($("#selectionDay").val());
        let hour1 = parseInt($("#selectionHour1").val());
        let minute1 = parseInt($("#selectionMinute1").val());
        let timeshift1 = $("#selectionTimeShift1").val();
        let hour2 = parseInt($("#selectionHour2").val());
        let minute2 = parseInt($("#selectionMinute2").val());
        let timeshift2 = $("#selectionTimeShift2").val();

        let begin = new TimeScheduler(15);
        let slotID1 = begin.slotifty(hour1, minute1, timeshift1);
        let end = new TimeScheduler(15);
        let slotID2 = end.slotifty(hour2, minute2, timeshift2);
        if (slotID1 >= slotID2) {
            alert("Invalid input, please reselect the times");
        } else {
            let interval = begin.getInterval(end);
            if (scheduleObject.pushTime(classCode, day, interval)) {
                let dataView = scheduleObject.buildView(index++);
                $("#scheduleData").empty();
                $("#scheduleData").append(dataView);
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
        slots = slots.map(function(x) {
            return parseInt(x, 10);
        });
        let day = parseInt($("#dday_" + deleteIndex).text());

        if (scheduleObject.deleteSlot(day, slots))
            console.log(scheduleObject);
        else
            console.log("Delete failed!");
        $("#dr_" + deleteIndex).remove();
    });

});