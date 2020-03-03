class TimeSlotObj {
    constructor() {
        this.monday = [];
        this.tuesday = [];
        this.wednesday = [];
        this.thursday = [];
        this.friday = [];
        this.saturday = [];
        this.sunday = [];
    }

    loadSchedule(scheduleFromDb) {
        this.monday = scheduleFromDb.monday;
        this.tuesday = scheduleFromDb.tuesday;
        this.wednesday = scheduleFromDb.wednesday;
        this.thursday = scheduleFromDb.thursday;
        this.friday = scheduleFromDb.friday;
        this.saturday = scheduleFromDb.saturday;
        this.sunday = scheduleFromDb.sunday;
    }

    // hasConflict(dayIntervalArr, interval) {
    //     let result = false;
    //     for (let i = 0; i < dayIntervalArr.length; i++) {
    //         let z = _.intersection(dayIntervalArr[i].slots, interval);
    //         if (z.length !== 0) {
    //             console.log("Conflict slots detected:");
    //             console.log(z);
    //             result = true;
    //             break;
    //         }
    //     }
    //     return result;
    // }

    toBase5Arr(slotArr, base) {
        let tmp = [];
        let key;
        switch (base) {
            case 10:
                key = 10 / 5;
                break;
            case 15:
                key = 15 / 5;
                break;
            case 20:
                key = 20 / 5;
                break;
            case 30:
                key = 30 / 5;
                break;
        }
        slotArr.forEach(element => {
            let i = key;
            let newBase5Element = key * element - key + 1;
            while (i > 0) {
                tmp.push(newBase5Element++);
                i--;
            }
        });
        return tmp;
    }

    hasConflict(dayMultiSlots, slotArr, appLength) {
        let result = false;
        let slotArrBase5;
        if (appLength !== 5) {
            slotArrBase5 = this.toBase5Arr(slotArr, appLength);
        } else {
            slotArrBase5 = slotArr;
        }
        for (let i = 0; i < dayMultiSlots.length; i++) {
            let tmp;
            if (dayMultiSlots[i].appLength !== 5) {
                tmp = this.toBase5Arr(dayMultiSlots[i].slots, dayMultiSlots[i].appLength);
            } else {
                tmp = dayMultiSlots[i].slots;
            }
            let z = _.intersection(tmp, slotArrBase5);
            if (z.length !== 0) {
                console.log("Conflict slots detected:");
                console.log(z);
                console.log(tmp);
                console.log(slotArrBase5);
                result = true;
                break;
            }
        }
        return result;
    }

    pushTime(classCode, dayInt, slotArr, appLength) {
        let obj = {
            classCode: classCode,
            appLength: appLength,
            slots: slotArr
        }

        switch (dayInt) {
            case 1:
                if (!this.hasConflict(this.monday, obj.slots, obj.appLength)) {
                    this.monday.push(obj);
                    return true;
                }
                break;
            case 2:
                if (!this.hasConflict(this.tuesday, obj.slots, obj.appLength)) {
                    this.tuesday.push(obj);
                    return true;
                }
                break;
            case 3:
                if (!this.hasConflict(this.wednesday, obj.slots, obj.appLength)) {
                    this.wednesday.push(obj);
                    return true;
                }
                break;
            case 4:
                if (!this.hasConflict(this.thursday, obj.slots, obj.appLength)) {
                    this.thursday.push(obj);
                    return true;
                }
                break;
            case 5:
                if (!this.hasConflict(this.friday, obj.slots, obj.appLength)) {
                    this.friday.push(obj);
                    return true;
                }
                break;
            case 6:
                if (!this.hasConflict(this.saturday, obj.slots, obj.appLength)) {
                    this.saturday.push(obj);
                    return true;
                }
                break;
            case 7:
                if (!this.hasConflict(this.sunday, obj.slots, obj.appLength)) {
                    scheduleObject.sunday.push(obj);
                    return true;
                }
                break;
            default:
                return false;
        }
        return false;
    }

    getScheduleCount() {
        let count = 0;
        if (this.monday.length !== 0) {
            count += this.monday.length;
        }
        if (this.tuesday.length !== 0) {
            count += this.tuesday.length;
        }
        if (this.wednesday.length !== 0) {
            count += this.wednesday.length;
        }
        if (this.thursday.length !== 0) {
            count += this.thursday.length;
        }
        if (this.friday.length !== 0) {
            count += this.friday.length;
        }
        if (this.saturday.length !== 0) {
            count += this.saturday.length;
        }
        if (this.sunday.length !== 0) {
            count += this.sunday.length;
        }
        return count;
    }

    getDayText(dayInt) {
        switch (dayInt) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
        }
    }

    findIndexOfObj(container, obj) {
        let indexFound = -1;
        if (container.length !== 0)
            for (let i = 0; i < container.length; i++) {
                if (_.isEqual(container[i].slots, obj)) {
                    indexFound = i;
                    break;
                }
            }
        return indexFound;
    }

    deleteSlot(dayInt, slotArr) {
        let indexFound = -1;
        let flag = false;
        switch (dayInt) {
            case 1:
                indexFound = this.findIndexOfObj(this.monday, slotArr);
                console.log(indexFound);
                if (indexFound !== -1) {
                    this.monday.splice(indexFound, 1);
                    flag = true;
                }
                break;
            case 2:
                indexFound = this.findIndexOfObj(this.tuesday, slotArr);
                if (indexFound !== -1) {
                    this.tuesday.splice(indexFound, 1);
                    flag = true;
                }
                break;
            case 3:
                indexFound = this.findIndexOfObj(this.wednesday, slotArr);
                if (indexFound !== -1) {
                    this.wednesday.splice(indexFound, 1);
                    flag = true;
                }
                break;
            case 4:
                indexFound = this.findIndexOfObj(this.thursday, slotArr);
                if (indexFound !== -1) {
                    this.thursday.splice(indexFound, 1);
                    flag = true;
                }
                break;
            case 5:
                indexFound = this.findIndexOfObj(this.friday, slotArr);
                if (indexFound !== -1) {
                    this.friday.splice(indexFound, 1);
                    flag = true;
                }
                break;
            case 6:
                indexFound = this.findIndexOfObj(this.saturday, slotArr);
                if (indexFound !== -1) {
                    this.saturday.splice(indexFound, 1);
                    flag = true;
                }
                break;
            case 7:
                indexFound = this.findIndexOfObj(this.sunday, slotArr);
                if (indexFound !== -1) {
                    this.sunday.splice(indexFound, 1);
                    flag = true;
                }
                break;
        }
        return flag;
    }

    toSessionText(slotArr, appLength) {
        let slotNum = slotArr.length;
        let totalMinutes = slotNum * appLength;
        let hour = 0;
        let minute = 0;
        if (Math.floor(totalMinutes % 60) !== 0) {
            hour = Math.floor(totalMinutes / 60);
            minute = totalMinutes - (60 * hour);
        } else {
            if (totalMinutes >= 60) {
                hour = Math.floor(totalMinutes / 60);
                minute = totalMinutes - (60 * hour);
            } else {
                hour = 0;
                minute = totalMinutes;
            }
        }
        return {
            hourAmount: hour,
            minuteAmount: minute
        }
    }

    buildView(index) {
        let view = '<div class="scheduleTable">';
        view += '<div class="scheduleRow">';
        view += '<div class="scheduleColumn scheduleHeader">Day</div>';
        view += '<div class="scheduleColumn scheduleHeader">Class</div>';
        view += '<div class="scheduleColumn scheduleHeader">Time</div>';
        view += '<div class="scheduleColumn scheduleHeader">Session</div>';
        view += '<div class="scheduleColumn scheduleHeader">Appointment</div>';
        view += '<div class="scheduleColumn scheduleHeader">Availibilities</div>';
        view += '<div class="scheduleColumn scheduleHeader">Control</div>';
        view += '</div>';
        let arr = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday];
        for (let i = 0; i < 7; i++) {
            let dayStr = this.getDayText(i + 1);
            let tmpObj = arr[i];
            //console.log(tmpObj);
            if (tmpObj.length !== 0) {
                tmpObj.forEach(slotObj => {
                    view += '<div class="scheduleRow" id="dr_' + index + '">';
                    view += '<div class="scheduleColumn">';
                    view += dayStr;
                    view += '</div>';
                    view += '<div class="scheduleColumn">';
                    view += slotObj.classCode;
                    view += '</div>';
                    view += '<div class="scheduleColumn">';
                    let begin = new TimeScheduler(slotObj.appLength);
                    let end = new TimeScheduler(slotObj.appLength);
                    let slotID1 = slotObj.slots[0];
                    let slotID2 = slotObj.slots[slotObj.slots.length - 1];
                    begin.parse(slotID1);
                    end.parse(slotID2);
                    view += begin.toString(1) + " - " + end.toString(2);
                    view += '</div>'; // close column
                    view += '<div class="scheduleColumn">';
                    let obj = this.toSessionText(slotObj.slots, slotObj.appLength);
                    view += obj.hourAmount + " h(s) " + obj.minuteAmount + " m(s)";
                    view += '</div>';
                    view += '<div class="scheduleColumn">';
                    view += slotObj.appLength + "'";
                    view += '</div>';
                    view += '<div class="scheduleColumn">';
                    view += slotObj.slots.length;
                    view += '</div>';
                    view += '<div class="scheduleColumn hidden" id="dslots_' + index + '">';
                    for (let i = 0; i < slotObj.slots.length; i++) {
                        if (i === slotObj.slots.length - 1)
                            view += slotObj.slots[i];
                        else
                            view += slotObj.slots[i] + ",";
                    }
                    view += '</div>';
                    view += '<div class="scheduleColumn hidden" id="dday_' + index + '">';
                    view += (i + 1);
                    view += '</div>';
                    view += '<div class="scheduleColumn sc_delete" id="btnDel_' + index + '"><img src="/images/delete.png"></div>';
                    view += '<div class="clr"></div>';
                    view += '</div>'; // close row
                });
            }
        }
        view += '</div>'; // close table
        return view;
    }
}