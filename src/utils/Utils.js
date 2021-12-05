
//takes in a hex code as string, ex: #01A327
//returns a JSON of separated red, green, blue values in base 10
function hexStringToJson(hexString){
    let string = hexString.substring(1);
    let r_val = parseInt(string.substring(0,2), 16);
    let g_val = parseInt(string.substring(2,4), 16);
    let b_val = parseInt(string.substring(4,6), 16);

    return {
        red: r_val,
        green: g_val,
        blue: b_val
    };
}

function convertDBtoFE(db_schedules){
    // {
    //     id: '21456dd1-2954-41dc-a71d-6d5dab50726a',
    //     name: 'New Schedule1',
    //     text: 'Testing',
    //     month: '',
    //     day: '',
    //     dayOfweek: 'mon,tue,wed',
    //     time: '00:00:0',
    //     active: true,
    //     repeat: true,
    //     twitterHandle: 'TE_OfficiaI'
    // }
    // to 
    // {
    //     id: '001',
    //     name: 'Weekend',
    //     text: 'Have a great weekend Twitter!',
    //     mon: false,
    //     tue: false,
    //     wed: false,
    //     thur: false,
    //     fri: true,
    //     sat: true,
    //     sun: true,
    //     time: '07:00',
    //     active: true,
    //     repeating: true
    // }
    const fe_schedules = [];

    db_schedules.forEach((schedule) => {
        fe_schedules.push({
            id: schedule.id,
            name: schedule.name,
            text: schedule.text,
            mon: schedule.dayOfweek.includes('mon'),
            tue: schedule.dayOfweek.includes('tue'),
            wed: schedule.dayOfweek.includes('wed'),
            thur: schedule.dayOfweek.includes('thu'),
            fri: schedule.dayOfweek.includes('fri'),
            sat: schedule.dayOfweek.includes('sat'),
            sun: schedule.dayOfweek.includes('sun'),
            time: schedule.time.substring(0, 5),
            active:schedule.active,
            repeating: schedule.repeat
        })
    })
    return fe_schedules;
}

export default {convertDBtoFE};