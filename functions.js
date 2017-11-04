var rawData;
var heroes = {
    "1": {
        "name": "Cid"
    },
    "2": {
        "name": "Treebeast"
    },
    "3": {
        "name": "Ivan"
    },
    "4": {
        "name": "Brittany"
    },
    "5": {
        "name": "Fisherman"
    },
    "6": {
        "name": "Betty"
    },
    "7": {
        "name": "Samurai"
    },
    "8": {
        "name": "Leon"
    },
    "9": {
        "name": "Seer"
    },
    "10": {
        "name": "Alexa"
    },
    "11": {
        "name": "Natalia"
    },
    "12": {
        "name": "Mercedes"
    },
    "13": {
        "name": "Bobby"
    },
    "14": {
        "name": "Broyle"
    },
    "15": {
        "name": "Sir George II"
    },
    "16": {
        "name": "Midas"
    },
    "17": {
        "name": "Referi Jerator"
    },
    "18": {
        "name": "Abaddon"
    },
    "19": {
        "name": "Ma Zhu"
    },
    "20": {
        "name": "Amenhotep"
    },
    "21": {
        "name": "Beastlord"
    },
    "22": {
        "name": "Athena"
    },
    "23": {
        "name": "Aphrodite"
    },
    "24": {
        "name": "Shinatobe"
    },
    "25": {
        "name": "Grant"
    },
    "26": {
        "name": "Frostleaf"
    },
    "27": {
        "name": "Dread Knight"
    },
    "28": {
        "name": "Atlas"
    },
    "29": {
        "name": "Terra"
    },
    "30": {
        "name": "Phthalo"
    },
    "31": {
        "name": "Banana"
    },
    "32": {
        "name": "Lilin"
    },
    "33": {
        "name": "Cadmia"
    },
    "34": {
        "name": "Alabaster"
    },
    "35": {
        "name": "Astraea"
    },
    "36": {
        "name": "Chiron"
    },
    "37": {
        "name": "Moloch"
    },
    "38": {
        "name": "Bomber Max"
    },
    "39": {
        "name": "Gog"
    },
    "40": {
        "name": "Wepwawet"
    },
    "41": {
        "name": "Tsuchi"
    },
    "42": {
        "name": "Skogur"
    },
    "43": {
        "name": "Moeru"
    },
    "44": {
        "name": "Zilar"
    },
    "45": {
        "name": "Madzi"
    },
}

var ancients = {
    "3": {
        "name": "Solomon",
        "level": 0,
        "bonusType": 25
    },
    "4": {
        "name": "Libertas",
        "level": 0,
        "bonusType": 24
    },
    "5": {
        "name": "Siyalatas",
        "level": 0,
        "bonusType": 1
    },
    "8": {
        "name": "Mammon",
        "level": 0,
        "bonusType": 22
    },
    "9": {
        "name": "Mimzee",
        "level": 0,
        "bonusType": 21
    },
    "11": {
        "name": "Dogcog",
        "level": 0,
        "bonusType": 19
    },
    "12": {
        "name": "Fortuna",
        "level": 0,
        "bonusType": 18
    },
    "13": {
        "name": "Atman",
        "level": 0,
        "bonusType": 17
    },
    "14": {
        "name": "Dora",
        "level": 0,
        "bonusType": 16
    },
    "15": {
        "name": "Bhaal",
        "level": 0,
        "bonusType": 15
    },
    "16": {
        "name": "Morgulis",
        "level": 0,
        "bonusType": 14
    },
    "17": {
        "name": "Chronos",
        "level": 0,
        "bonusType": 3
    },
    "18": {
        "name": "Bubos",
        "level": 0,
        "bonusType": 13
    },
    "19": {
        "name": "Fragsworth",
        "level": 0,
        "bonusType": 2
    },
    "20": {
        "name": "Vaagur",
        "level": 0,
        "bonusType": 28
    },
    "21": {
        "name": "Kumawakamaru",
        "level": 0,
        "bonusType": 27
    },
    "22": {
        "name": "Chawedo",
        "level": 0,
        "bonusType": 4
    },
    "23": {
        "name": "Hecatoncheir",
        "level": 0,
        "bonusType": 12
    },
    "24": {
        "name": "Berserker",
        "level": 0,
        "bonusType": 11
    },
    "25": {
        "name": "Sniperino",
        "level": 0,
        "bonusType": 10
    },
    "26": {
        "name": "Kleptos",
        "level": 0,
        "bonusType": 9
    },
    "27": {
        "name": "Energon",
        "level": 0,
        "bonusType": 8
    },
    "28": {
        "name": "Argaiv",
        "level": 0,
        "bonusType": 7
    },
    "29": {
        "name": "Juggernaut",
        "level": 0,
        "bonusType": 26
    },
    "31": {
        "name": "Revolc",
        "level": 0,
        "bonusType": 5
    },
    "32": {
        "name": "Nogardnit",
        "level": 0,
        "bonusType": 999
    },
}

var outsiders = {
    "1": {
        "name": "Xyliqil"
    },
    "2": {
        "name": "Chor'gorloth"
    },
    "3": {
        "name": "Phandoryss"
    },
    "4": {
        "name": "Borb"
    },
    "5": {
        "name": "Ponyboy"
    },
}

function loadGame(encodedData) {
    rawData = decoder.decode_main(encodedData);
}

function nf(number) {
    if (number.lt(0))
        return "-" + nf(number.times(-1))
    if (number.lt(10000))
        return number.toFixed(0);
    else
        return number.toExponential(4).replace("+", "");
}

function tf(time) {
    var temp = time / 1000;
    var day = Math.floor(temp / 86400);
    temp -= day * 86400;
    var hour = Math.floor(temp / 3600);
    temp -= hour * 3600;
    var min = Math.floor(temp / 60);
    return (((day == 0) ? "" : (day + "d ")) + ((hour == 0) ? "" : (hour + "h ")) + min + "m");
}

function tf_2(time) {
    var temp = Math.round(time / 1000);
    var hour = Math.floor(temp / 3600);
    temp -= hour * 3600;
    var min = Math.floor(temp / 60);
    var sec = temp - min * 60;
    return (((hour == 0) ? "" : (hour + "h")) + ((min == 0) ? "" : (min + "m")) + sec + "s");
}

function fixedLengthOutput(out, length) {
    var _loc = out.toString();
    while (_loc.length < length)
        _loc = ' ' + _loc;
    return _loc;
}

function getRelicBonus(id) {
    var level = 0;
    for (var i in rawData.items.slots) {
        if (i > 4)
            continue;
        var relic = rawData.items.items[rawData.items.slots[i]];
        for (var j = 1; j <= 4; j++) {
            if (relic["bonusType" + j] == id)
                level += Number(relic['bonus' + j + 'Level']);
        }
    }
    return level;
}

function showOutsiders() {
    var rs = "**Outsiders:** ";
    for (var i in outsiders)
        rs += outsiders[i].name + " (" + rawData.outsiders.outsiders[i].level + "), ";
    rs = rs.substring(0, rs.length - 2) + ".";
    return rs;
}

function showAncients() {
    var rs1 = "**Ancients:** ";
    var rs2 = "**Not Summoned:** ";
    var notSummonedAncient = false;
    var noAncientSummoned = true;
    var ancientsArr = [];
    for (var i in ancients) {
        if (!!rawData.ancients.ancients[i]) {
            ancients[i].level = Decimal(rawData.ancients.ancients[i].level);
            noAncientSummoned = false;
        } else
            ancients[i].level = Decimal(0);
        ancientsArr.push(ancients[i]);
    }
    ancientsArr.sort(function(a, b) {
        if (a.level.equals(b.level))
            return (a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        else
        if (a.level.lt(b.level))
            return 1;
        else
            return -1;
    });
    for (var i in ancientsArr) {
        if (ancientsArr[i].level != 0)
            rs1 += ancientsArr[i].name + " (" + nf(Decimal(ancientsArr[i].level)) + "), ";
        else {
            notSummonedAncient = true;
            rs2 += ancientsArr[i].name + ", ";
        }
    }
    if (noAncientSummoned)
        rs1 += "None.";
    else
        rs1 = rs1.substring(0, rs1.length - 2) + ".";
    if (notSummonedAncient)
        rs2 = rs2.substring(0, rs2.length - 2) + ".";
    else
        rs2 += "None."
    return rs1 + "\n\n" + rs2;
}

function showGilds() {
    var rs = "**Gilds:** ";
    var noGild = true;
    for (var i in heroes) {
        if (rawData.heroCollection.heroes[i].epicLevel > 0) {
            noGild = false;
            rs += heroes[i].name + " (" + rawData.heroCollection.heroes[i].epicLevel + "), ";
        }
    }
    if (noGild)
        rs += "None.";
    else
        rs = rs.substring(0, rs.length - 2) + ".";
    return rs;
}

function showMiscs() {
    var rs = "**Miscs:** ";
    //about AS
    var currentHS = Decimal(rawData.heroSouls);
    var sacrificedHS = Decimal(rawData.heroSoulsSacrificed);
    var spentHS = Decimal(rawData.ancients.rerollSoulsSpent);
    for (var i in rawData.ancients.ancients)
        spentHS = spentHS.plus(Decimal(rawData.ancients.ancients[i].spentHeroSouls));
    if (sacrificedHS.plus(currentHS).plus(spentHS).gt(0))
        var currentASGain = Decimal.log10(sacrificedHS.plus(currentHS).plus(spentHS)).times(5).floor().minus(Decimal(rawData.ancientSoulsTotal));
    else
        var currentASGain = Decimal(0);
    rs += "AS (" + rawData.ancientSoulsTotal + " +" + currentASGain + ", " + (rawData.ancientSouls != "0" ? "***" : "") + "Unspent: " + rawData.ancientSouls + (rawData.ancientSouls != "0" ? "***" : "") + "); ";
    //about TP
    var tp = 1 + 49 * (1 - Math.exp(-Number(rawData.ancientSoulsTotal) / 10000)) + 50 * (1 - Math.exp(-Number(rawData.outsiders.outsiders[3].level) / 1000));
    rs += "TP (" + Decimal(tp).toFixed(3) + "%); ";
    //about HS
    rs += "HS (" + nf(currentHS) + ", Spent: " + nf(spentHS) + ", Sacrificed: " + nf(sacrificedHS) + "); ";
    //about Zone
    rs += "Highest Zone (This Ascension: " + rawData.highestFinishedZone + ", This Transcension: " + rawData.highestFinishedZonePersist + ", Ever: " + Decimal.max(rawData.transcendentHighestFinishedZone, rawData.pretranscendentHighestFinishedZone) + "); ";
    //about Transcension and Ascension
    rs += "Transcensions (" + rawData.numberOfTranscensions + "); ";
    rs += "Ascensions (This Transcension: " + rawData.numAscensionsThisTranscension + ", Total: " + rawData.numWorldResets + "); ";
    //about Relics Found
    rs += "Relics Found (This Transcension: " + rawData.relicsReceivedThisTranscension + ", Total: " + rawData.totalRelicsReceived + "); ";
    //about ID
    rs += "Immortal Damage (" + nf(Decimal(rawData.titanDamage)) + "); ";
    //about Rubies 
    rs += "Rubies (" + rawData.rubies + "); ";
    //about the Ruby DPS Multiplier
    rs += "2x multiplier to all your dmg (" + (rawData.paidForRubyMultiplier == true ? "Yes" : "No") + "); ";
    //about AutoClickers
    rs += "Auto Clickers (" + (Number(rawData.autoclickers) + Number(rawData.dlcAutoclickers)) + "); ";
    //about Achievements
    var achievementCount = 0;
    for (var i in rawData.achievements)
        achievementCount++;
    rs += "Achievements (" + achievementCount + "/161); ";
    //cleanup
    rs = rs.substring(0, rs.length - 2) + ".";
    return rs;
}

function showDurations() {
    var rs = "**Times:** ";
    var curTime = new Date().getTime();
    rs += "Since Start (" + tf(curTime - Number(rawData.creationTimestamp)) + "); ";
    if (Number(rawData.transcensionTimestamp) != 0)
        rs += "Since Transcension (" + tf(curTime - Number(rawData.transcensionTimestamp)) + "); ";
    rs += "Since Ascension (" + tf(curTime - Number(rawData.startTimestamp)) + "); ";
    rs = rs.substring(0, rs.length - 2) + ".";
    return rs;
}

function showEvent() {
    var rs = "**Event:** ";
    //presents
    rs += "Presents (Opened: " + rawData.openedClickmasPresents + "; Unopened: " + rawData.unopenedClickmasPresents + "); ";
    //rewards
    rs += "Rewards (Candy Canes: " + rawData.candyCanesEarned + "; Rubies: " + rawData.clickmasRubiesEarned + "); ";
    rs = rs.substring(0, rs.length - 2) + ".";
    return rs;
}

function showRelics() {
    var rs = "**Relics:**\n\n";
    var haveRelic = false;
    for (var i in rawData.items.slots) {
        if (i > 4)
            continue;
        haveRelic = true;
        var relic = rawData.items.items[rawData.items.slots[i]];
        var relicDesc = "* *" + relic.name + "*:";
        for (var j = 1; j <= 4; j++)
            if (relic["bonusType" + j] != 0) {
                for (var temp in ancients)
                    if (ancients[temp].bonusType == relic["bonusType" + j])
                        relicDesc += " +" + Number(relic["bonus" + j + "Level"]).toFixed(2) + " " + ancients[temp].name + ",";
            }
        relicDesc = relicDesc.substring(0, relicDesc.length - 1);
        rs += relicDesc + ";\n";
    }
    if (!haveRelic)
        rs += " None.";
    else
        rs = rs.substring(0, rs.length - 1);
    return rs;
}

function showTotalRelicBonuses() {
    var rs = "**Total Relic Bonuses:**\n\n";
    var noRelicBonus = true;
    for (var i in ancients) {
        if (getRelicBonus(ancients[i].bonusType) != 0) {
            noRelicBonus = false;
            rs += "* +" + getRelicBonus(ancients[i].bonusType).toFixed(2) + " " + ancients[i].name + "\n";
        }
    }
    if (noRelicBonus)
        rs += "None.";
    return rs;
}

function showTLog() {
    var log = rawData.stats.transcensions;
    var rs = "Transcension Log:\n\n" + "| No. | Duration |  HZE  | HS gained |  AS  |\n" + "|:---:|:--------:|:-----:|:---------:|:----:|\n";
    $("select").empty();
    $.each(log, function(key, value) {
        $("select").append('<option>' + key + '</option>');
        var temp = "";
        temp += "|" + fixedLengthOutput(value.id, 5) + "|";
        temp += fixedLengthOutput(tf_2(value.endTime - value.startTime), 10) + "|";
        temp += fixedLengthOutput(value.highestZoneEver, 7) + "|";
        temp += fixedLengthOutput(nf(Decimal(value.heroSoulsGained)), 11) + "|";

        var _loc = Decimal.log10(value.heroSoulsGained).times(5).floor();
        temp += fixedLengthOutput(_loc, 6) + "|";
        rs += temp + "\n";
    });
    $("select").val($("select option:last").val()).trigger("change");
    $("#log_t").val(rs);
}

function showALog(ntrans) {
    var log = rawData.stats.transcensions[ntrans].ascensions;
    var rs = "Ascensions in Transcension #" + ntrans + ":\n\n" + "| No. | Duration |  HZE  | HS gained |\n" + "|:---:|:--------:|:-----:|:---------:|\n";
    $.each(log, function(key, value) {
        var temp = "";
        temp += "|" + fixedLengthOutput(value.id, 5) + "|";
        temp += fixedLengthOutput(tf_2(value.endTime - value.startTime), 10) + "|";
        temp += fixedLengthOutput(value.highestZoneEver, 7) + "|";
        temp += fixedLengthOutput(nf(Decimal(value.heroSoulsEnd).minus(value.heroSoulsStart)), 11) + "|";
        rs += temp + "\n";
    });
    $("#log_a").val(rs);
}

function displayInfo() {
    var sgt = "";
    if ($("input[value=outsiders]").is(":checked"))
        sgt += showOutsiders() + "\n\n";
    if ($("input[value=ancients]").is(":checked"))
        sgt += showAncients() + "\n\n";
    if ($("input[value=gilds]").is(":checked"))
        sgt += showGilds() + "\n\n";
    if ($("input[value=miscs]").is(":checked"))
        sgt += showMiscs() + "\n\n";
    if ($("input[value=times]").is(":checked"))
        sgt += showDurations() + "\n\n";
    if ($("input[value=event]").is(":checked"))
        sgt += showEvent() + "\n\n";
    if ($("input[value=relics]").is(":checked"))
        sgt += showRelics() + "\n\n";
    if ($("input[value=totalRelicBonuses]").is(":checked"))
        sgt += showTotalRelicBonuses() + "\n\n";
    sgt = sgt.substring(0, sgt.length - 2);
    showTLog();
    $("#result").val(sgt);
}

$(document).ready(function() {
    $("#themeChoice input").on("change", function() {
        if ($(this).val() == "dark")
            $("link[id=\"style\"]").attr("href", "https://bootswatch.com/3/darkly/bootstrap.min.css");
        else
            $("link[id=\"style\"]").attr("href", "https://bootswatch.com/3/flatly/bootstrap.min.css");
    });

    $("#savegameFile").on("change", function() {
        var fr = new FileReader();
        fr.readAsText($(this).prop("files")[0]);
        fr.onload = function() {
            loadGame(fr.result);
            displayInfo();
        };
    });

    $("#savegameText").on("change", function() {
        loadGame($(this).val());
        displayInfo();
    });

    $("select").on("change", function() {
        var n = $(this).val();
        showALog(n);
    });

    $('.button-checkbox').each(function() {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'fa fa-check'
                },
                off: {
                    icon: 'fa fa-times'
                }
            };

        // Event Handlers
        $button.on('click', function() {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
            displayInfo();
        });
        $checkbox.on('change', function() {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            } else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});
