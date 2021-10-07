function get_highter(data) {
    let max = 0
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key]["actual"] > max) {
                max = data[key]["actual"]
            }
        }
    }
    return max
}

function remove_max(data, actual_bid) {
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key]["actual"] == actual_bid) {
                delete data[key]
            }
        }
    }
    return data
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function get_id_array(data, actual_bid) {
    let array_id = []
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key]["actual"] == actual_bid) {
                array_id.push(key)
            }
        }
    }
    return array_id
}

function fill_result(data, result, actual_bid) {
    let array_id = get_id_array(data, actual_bid)
    let tmp = []
    for (let id of array_id) {
        let new_actual = data[id]["actual"]
        let new_rank = data[id]["rank"]
        tmp.push({id, new_actual, new_rank})
    }
    tmp.sort(dynamicSort("new_rank"));
    for (let elem of tmp) {
        let new_id = elem["id"]
        let actual = elem["new_actual"]
        result.push({new_id, actual})
    }
    return result
}

function list_bids(data) {
    let end = false
    let result = []
    while (!end) {
        let actual_bid = get_highter(data)
        result = fill_result(data, result, actual_bid)
        data = remove_max(data, actual_bid)
        if (isEmpty(data)) {
            end = true
        }
    }
    return result;
}

function isEmpty(obj) {
    return !Object.keys(obj).length > 0;
}

module.exports = { isEmpty, list_bids };
