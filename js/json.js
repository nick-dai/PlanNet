var characters = [{
        name: "嬰兒期"
    }, {
        name: "中二期"
    }, {
        name: "公主病女友"
    }];

var messages = [{
        normal: [
            "巴噗巴噗！主人好，你來看我了嗎？",
            "嚕嚕嚕，啦啦啦，今天過得不錯。"
        ],
        luminous: {
            upper: [
                "嗚嗚嗚太陽好大…曬得不太舒服…",
                "嗚嗚...燙燙..."
            ],
            lower: [
                "今天怎麼暗暗的，有點可怕。",
                "好黑...主人我怕怕..."
            ]
        },
        humidity: {
            upper: [
                "哇哇哇！太多水了！不想喝了！"
            ],
            lower: [
                "嗚嗚嗚哇我口渴了，水水呢？"
            ]
        },
        temperature: {
            upper: [
                "好熱！好熱！嗚嗚嗚…不舒服…"
            ],
            lower: [
                "…好冷，嘶嘶嘶…嗚…"
            ]
        }
    }, {
        normal: [
            "主人好，今天還開心嗎？你開心的話，我也就開心。",
            "最近一直在想長大要做什麼…希望是做自己喜歡的事情。"
        ],
        luminous: {
            upper: [
                "那個…我覺得陽光有點強，可能會曬傷…今天就不出門了。"
            ],
            lower: [
                "現在好暗，讓人心情不太好。沒有光，暗反應也沒有意義了。"
            ]
        },
        humidity: {
            upper: [
                "夠了，水太多了，你澆再多，我也不會長那麼快。"
            ],
            lower: [
                "我還在成長期，水量注意一下，不然我長不高。"
            ]
        },
        temperature: {
            upper: [
                "好熱！我感受到我的葉綠體在騷動了！快阻止他們！"
            ],
            lower: [
                "好冷，好懶，我好想冬眠，聽說現在睡就再也起不來了。"
            ]
        }
    }, {
        normal: [
            "誒誒達令，人家最近想買新盆栽，買嘛…",
            "我們親暱度好高唷，你一定超喜歡我對不對！"
        ],
        luminous: {
            upper: [
                "紫外線那麼強我會曬傷，你注意點好嗎?你對我的愛也不過如此。"
            ],
            lower: [
                "太暗了，我不能行光合作用，你知道你這樣很不尊重我。"
            ]
        },
        humidity: {
            upper: [
                "你真的覺得你給我那麼多水我喜歡嗎？你都不在乎我在想什麼。"
            ],
            lower: [
                "現在就這樣，反正你不想澆水，我們就分手呀！"
            ]
        },
        temperature: {
            upper: [
                "唉唷！很煩誒！天氣那麼熱很討厭！你解決一下好嗎？"
            ],
            lower: [
                "我都抖成這樣你沒發現嘛？別人的男友都會怎樣怎樣…你都怎樣…"
            ]
        }
    }];

var plants = [{
        name: "蘆薈",
        description: "原產於地中海、非洲，為獨尾草科多年生草本、多肉植物，據考證的野生蘆薈品種300多種，主要分布於非洲等地。這種植物頗受大眾喜愛，主要因其易於栽種，為花葉兼備的觀賞植物。",
        tempUpper: "35",
        tempLower: "15",
        humidUpper: "85",
        humidLower: "45",
        lifetime: ["0.1", "0.3", "5"],
        tips: [
            "主人可以幫我鬆土除草，提高我的抗病能力，讓我成長更快喔~",
            "我的盆栽如果排水良好，可以讓我長得更高更壯喔！可摻些沙礫灰渣或腐葉草灰等更好~",
            "我潮怕冷，如果低於 0℃，我就會凍傷，5℃ 左右時停止成長，所以主人要特別注意溫度喔>.<！"
        ]
    }];

var userId = "test",
    coins = 222,
    myPlants = [{
        name: "test",
        date: "2012-02-20",
        plantNumber: "0",
        cohesion: "75",
        character: "0"
    }],
    myItems = [],
    myRecords,
    humidity, temperature, luminous;

// Initialize Parse with provided keys.
Parse.initialize("key1", "key2");
function getMyCoins() {
    return queryParse("myUsers", [{
        column: "index",
        entry: userId
    }], function(results) {
        coins = results[0].get("coins");
    }, parseError);
}
function getMyPlants() {
    return queryParse("myPlants", [{
        column: "userId",
        entry: userId
    }], function(results) {
        myPlants.length = 0; // Clear previous data to avoid duplicate entries.
        for (var i=0; i<results.length; i++) {
            myPlants[i] = {
                "id": results[i].id,
                "name": results[i].get("name"),
                "date": results[i].get("date"),
                "plantNumber": results[i].get("plantNumber"),
                "cohesion": results[i].get("cohesion"),
                "character": results[i].get("character")
            };
        }
    }, parseError);
}
function getMyItems() {
    return queryParse("myItems", [{
        column: "userId",
        entry: userId
    }, {
        column: "plantId",
        entry: myPlants[0].id
    }], function(results) {
        myItems.length = 0; // Clear previous data to avoid duplicate entries.
        for (var i=0; i<results.length; i++) {
            myItems[i] = {
                "type": results[i].get("type"),
                "index": results[i].get("index")
            };
        }
    }, parseError);
}
function getMyLastRecords() {
    return readTsLastFeed(function(data) {
        console.log(data);
        myRecords = data;
        console.log(myRecords);
    });
}
// PARSE COMMANDS:
//   Parse query function with a deferred object returned.
function queryParse(parseClass, conditions, successCallback, errorCallback) {
    var deferred = $.Deferred(),
        object = Parse.Object.extend(parseClass), // Create an object of the target class.
        dbObject = new Parse.Query(object); // New a query object of the target class.
    for (var i=0; i<conditions.length; i++) { // Filter matched columns (Multiple conditions are allowed.)
        dbObject.equalTo(conditions[i].column, conditions[i].entry);
    }
    dbObject.find({ // Start finding the target class.
        success: function(results) {
            successCallback(results);
            deferred.resolve();
        },
        error: function(error) {
            errorCallback(error);
            deferred.reject();
        }
    });
    return deferred.promise();
}
function queryParseLatest(parseClass, count, conditions, successCallback, errorCallback) {
    var deferred = $.Deferred(),
        object = Parse.Object.extend(parseClass), // Create an object of the target class.
        dbObject = new Parse.Query(object); // New a query object of the target class.
    for (var i=0; i<conditions.length; i++) { // Filter matched columns (Multiple conditions are allowed.)
        dbObject.equalTo(conditions[i].column, conditions[i].entry);
    }
    dbObject.descending("createdAt"); // Retrieve latest ones.
    dbObject.limit(count); // Limit amount.
    dbObject.find({ // Start finding the target class.
        success: function(results) {
            successCallback(results);
            deferred.resolve();
        },
        error: function(error) {
            errorCallback(error);
            deferred.reject();
        }
    });
    return deferred.promise();
}
//   What to do when Parse returns an error.
function parseError(error) {
    showErrorDialog("代碼：" + error.code + "<br>原因：" + error.message);
}

// Load data from ThingSpeak
var tsWrtieKey = "write",
    tsReadKey = "read",
    channelId = "0";
var ts_latest_feed;
function setTsWriteKey(key) {
    tsWrtieKey = key;
}
function setTsReadKey(key) {
    tsReadKey = key;
}
function setTsChannelId(id) {
    channelId = id;
}
function writeTsFeed(parameters) {
    var url = "https://api.thingspeak.com/update?" + $.param({
        api_key: tsWrtieKey,
        field1: "", // Humidity
        field2: "", // Temperature
        field3: "" // Luminous
    });
    $.getJson(url, function(data) {
    });
}
function readTsLastFeed(successCallback) {
    var deferred = $.Deferred();
    var url = "https://api.thingspeak.com/channels/" + channelId + "/feeds/last.json?" + $.param({
        api_key: tsReadKey
    });
    $.getJSON(url, function(data) {
        successCallback(data);
        deferred.resolve();
    });
    return deferred.promise();
}

// Periodically get current state of my plant from server.
function worker() {
    $.ajax({
        url: 'ajax/test.html', 
        success: function(data) {
            $('.result').html(data);
        },
        complete: function() {
            // Schedule the next request when the current one's complete
            setTimeout(worker, 5000);
        }
    });
}


function updateMessage() {

}

function updateStatus() {
    getMyCoins();
    getMyPlants();

}

// Update screens.
function updateUser() {
    var message = "";
    
    $("#home-user").html("<div id='status-label-inner' class='valign'>" + userId + "</div>");
    $("#home-coins").html("<div id='status-label-inner' class='valign'>" + coins + "</div>");
}
function updateMyPlants() {
    var str = "";
    for (var i=0; i<myPlants.length; i++) {
        str += "<div class='info-header'><div class='header-circle-1 left'><a class='waves-effect waves-light frame-style circle card-style valign-wrapper' onclick='showInputDialog(\"名稱\", this.children[0]);'><div class='valign center'>" + myPlants[i].name + "</div></a></div><div class='header-circle-2 left'><a class='waves-effect waves-light frame-style circle card-style valign-wrapper' onclick='showDateDialog(\"種植日期\", this.children[0]);'><div class='valign center'>" + myPlants[i].date + "</div></a></div><div class='header-circle-3 left'><a class='waves-effect waves-light frame-style circle card-style valign-wrapper' onclick='showDropdownDialog(plants, \"品種\", this.children[0]);'><div class='valign center'><div class='plantNumber'>" + myPlants[i].plantNumber + "</div>" + plants[myPlants[i].plantNumber].name + "</div></a></div></div><div class='info-plant'><div class='image my-plant'></div><div class='image my-pot'></div></div><div class='info-bottom'><div class='bottom-circle-1 left'><div class='circle theme-accent-1 card-style valign-wrapper'><div class='valign center'>" + myPlants[i].cohesion + "</div></div></div><div class='bottom-circle-2 left'><a class='waves-effect waves-light frame-style circle card-style valign-wrapper' onclick='showDropdownDialog(characters, \"角色\", this.children[0]);'><div class='valign center'>" + characters[myPlants[i].character].name + "</div></a></div><div class='bottom-circle-3 left'><div class='circle theme-accent-1 card-style valign-wrapper'><div class='valign center'></div></div></div></div>";
    }
    $("#info").html(str);
}
function updateMyRecords() {
    setArc(44, 72, 36, coins);
}