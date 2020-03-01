let scheduleObject = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
};

$(function () {
    $("#add").click(function () {
        let hour1 = parseInt($("#selectionHour1").val());
        let minute1 = parseInt($("#selectionMinute1").val());
        let timeshift1 = $("#selectionTimeShift1").val();
        let hour2 = parseInt($("#selectionHour2").val());
        let minute2 = parseInt($("#selectionMinute2").val());
        let timeshift2 = $("#selectionTimeShift2").val();

        let begin = new TimeScheduler(15);
        begin.slotifty(hour1, minute1, timeshift1);
        let end = new TimeScheduler(15);
        end.slotifty(hour2, minute2, timeshift2);

        console.log(begin.timeIntervalToString(end));
    });

});