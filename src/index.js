import TinyGesture from 'tinygesture';
var swipeL, swipeR, swipeU, swipeD, gestDT, gestLP, commandL, commandR, commandU, commandD, commandDT, commandLP, thisDate;

const target = document.getElementsByClassName('roam-body-main');
const gesture = new TinyGesture(target[0]);

export default {
    onload: ({ extensionAPI }) => {
        const config = {
            tabTitle: "Gesture Actions",
            settings: [
                {
                    id: "ga-left",
                    name: "Swipe Left",
                    description: "Action to take on swipe left",
                    action: { type: "select", items: ["None", "Back one day", "Go to Today", "Forward one day", "Refresh", /*"Right Click", */"Undo", "Redo", "Toggle Right Sidebar", "Toggle Left Sidebar", "Open Command Palette"], onChange: (evt) => { updateLeft(evt); } },
                },
                {
                    id: "ga-right",
                    name: "Swipe Right",
                    description: "Action to take on swipe right",
                    action: { type: "select", items: ["None", "Back one day", "Go to Today", "Forward one day", "Refresh", /*"Right Click", */"Undo", "Redo", "Toggle Right Sidebar", "Toggle Left Sidebar", "Open Command Palette"], onChange: (evt) => { updateRight(evt); } },
                },
                {
                    id: "ga-dt",
                    name: "Double Tap",
                    description: "Action to take on double tap",
                    action: { type: "select", items: ["None", "Back one day", "Go to Today", "Forward one day", "Refresh", /*"Right Click", */"Undo", "Redo", "Toggle Right Sidebar", "Toggle Left Sidebar", "Open Command Palette"], onChange: (evt) => { updateDT(evt); } },
                },
                {
                    id: "ga-lp",
                    name: "Long Press",
                    description: "Action to take on long press",
                    action: { type: "select", items: ["None", "Back one day", "Go to Today", "Forward one day", "Refresh", /*"Right Click", */"Undo", "Redo", "Toggle Right Sidebar", "Toggle Left Sidebar", "Open Command Palette"], onChange: (evt) => { updateLP(evt); } },
                },
            ]
        };
        extensionAPI.settings.panel.create(config);

        updateLeft(extensionAPI.settings.get("ga-left"));
        updateRight(extensionAPI.settings.get("ga-right"));
        updateDT(extensionAPI.settings.get("ga-dt"));
        updateLP(extensionAPI.settings.get("ga-lp"));

        function updateLeft(swipeL) {
            if (swipeL == "Forward one day") {
                commandL = "forward";
            } else if (swipeL == "Go to Today") {
                commandL = "today";
            } else if (swipeL == "Back one day") {
                commandL = "backward";
            } else if (swipeL == "Refresh") {
                commandL = "refresh";
            } else if (swipeL == "Right Click") {
                commandL = "rightclick";
            } else if (swipeL == "Undo") {
                commandL = "undo";
            } else if (swipeL == "Redo") {
                commandL = "redo";
            } else if (swipeL == "Toggle Right Sidebar") {
                commandL = "RSToggle";
            } else if (swipeL == "Toggle Left Sidebar") {
                commandL = "LSToggle";
            } else if (swipeL == "Open Command Palette") {
                commandL = "CP";
            }
        }
        function updateRight(swipeR) {
            if (swipeR == "Forward one day") {
                commandR = "forward";
            } else if (swipeR == "Go to Today") {
                commandR = "today";
            } else if (swipeR == "Back one day") {
                commandR = "backward";
            } else if (swipeR == "Refresh") {
                commandR = "refresh";
            } else if (swipeR == "Right Click") {
                commandR = "rightclick";
            } else if (swipeR == "Undo") {
                commandR = "undo";
            } else if (swipeR == "Redo") {
                commandR = "redo";
            } else if (swipeR == "Toggle Right Sidebar") {
                commandR = "RSToggle";
            } else if (swipeR == "Toggle Left Sidebar") {
                commandR = "LSToggle";
            } else if (swipeR == "Open Command Palette") {
                commandR = "CP";
            }
        }
        function updateDT(gestDT) {
            if (gestDT == "Forward one day") {
                commandDT = "forward";
            } else if (gestDT == "Go to Today") {
                commandDT = "today";
            } else if (gestDT == "Back one day") {
                commandDT = "backward";
            } else if (gestDT == "Refresh") {
                commandDT = "refresh";
            } else if (gestDT == "Right Click") {
                commandDT = "rightclick";
            } else if (gestDT == "Undo") {
                commandDT = "undo";
            } else if (gestDT == "Redo") {
                commandDT = "redo";
            } else if (gestDT == "Toggle Right Sidebar") {
                commandDT = "RSToggle";
            } else if (gestDT == "Toggle Left Sidebar") {
                commandDT = "LSToggle";
            } else if (gestDT == "Open Command Palette") {
                commandDT = "CP";
            }
        }
        function updateLP(gestLP) {
            if (gestLP == "Forward one day") {
                commandLP = "forward";
            } else if (gestLP == "Go to Today") {
                commandLP = "today";
            } else if (gestLP == "Back one day") {
                commandLP = "backward";
            } else if (gestLP == "Refresh") {
                commandLP = "refresh";
            } else if (gestLP == "Right Click") {
                commandLP = "rightclick";
            } else if (gestLP == "Undo") {
                commandLP = "undo";
            } else if (gestLP == "Redo") {
                commandLP = "redo";
            } else if (gestLP == "Toggle Right Sidebar") {
                commandLP = "RSToggle";
            } else if (gestLP == "Toggle Left Sidebar") {
                commandLP = "LSToggle";
            } else if (gestLP == "Open Command Palette") {
                commandLP = "CP";
            }
        }
        if (window.roamAlphaAPI.platform.isMobile || window.roamAlphaAPI.platform.isMobileApp) {
            gesture.on('swipeleft', (event) => {
                action(commandL);
            });
            gesture.on('swiperight', (event) => {
                action(commandR);
            });
            gesture.on('doubletap', (event) => {
                action(commandDT);
            });
            gesture.on('longpress', (event) => {
                action(commandLP);
            });
        }
    },
    onunload: () => {
        gesture.destroy();
    }
}

async function action(command) {
    if (command == "forward" || command == "backward" || command == "today") { // working
        resolveDNP(command);
    } else if (command == "refresh") { // working
        location.reload();
    } else if (command == "undo") { // working
        await window.roamAlphaAPI.data.undo();
    } else if (command == "redo") { // working
        await window.roamAlphaAPI.data.redo();
    } else if (command == "rightclick") { // TODO

    } else if (command == "RSToggle") { // working
        if (document.querySelector("#roam-right-sidebar-content")) {
            await window.roamAlphaAPI.ui.rightSidebar.close();
        } else {
            await window.roamAlphaAPI.ui.rightSidebar.open();
        }
    } else if (command == "LSToggle") { // working
        if (document.querySelector('.rm-open-left-sidebar-btn')) {
            await window.roamAlphaAPI.ui.leftSidebar.open();
        } else {
            await window.roamAlphaAPI.ui.leftSidebar.close();
        }
    } else if (command == "CP") { // working
        window.dispatchEvent(new KeyboardEvent('keydown', {
            key: "p",
            keyCode: 80,
            code: "KeyP",
            which: 80,
            shiftKey: false,
            ctrlKey: true,
            metaKey: false
        }));
        window.dispatchEvent(new KeyboardEvent('keyup', {
            key: "p",
            keyCode: 80,
            code: "KeyP",
            which: 80,
            shiftKey: false,
            ctrlKey: true,
            metaKey: false
        }));
    }
}

async function resolveDNP(direction) {
    var startBlock = await window.roamAlphaAPI.ui.mainWindow.getOpenPageOrBlockUid();
    if (!startBlock) {
        var uri = window.location.href;
        const regex = /^https:\/\/roamresearch.com\/#\/(app|offline)\/\w+$/; //today's DNP
        if (regex.test(uri)) { // this is Daily Notes for today
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            thisDate = new Date(yyyy, mm, dd);
        }
    } else {
        let q = `[:find (pull ?page [:node/title :block/string :block/uid {:block/children ...} ]) :where [?page :block/uid "${startBlock}"]  ]`;
        var info = await window.roamAlphaAPI.q(q);
        const regex = /\d{2}-\d{2}-\d{4}/;
        if (regex.test(info[0][0].uid)) { // dated DNP
            let dateBits = info[0][0].uid.split("-");
            let mm = String(parseInt(dateBits[0]) - 1);
            thisDate = new Date(dateBits[2], mm, dateBits[1]);
        } else { // not a dated DNP
            thisDate = new Date(new Date().setDate(new Date().getDate()));
        }
    }

    if (direction == "backward") {
        thisDate.setDate(thisDate.getDate() - 1);
    } else if (direction == "forward") {
        thisDate.setDate(thisDate.getDate() + 1);
    } else if (direction == "today") {
        thisDate = new Date();
    }

    var newMonth = (thisDate.getMonth() + 1).toString();
    var newDay = thisDate.getDate().toString();
    var newYear = thisDate.getFullYear().toString();
    var newDate = newMonth.padStart(2, "0") + "-" + newDay.padStart(2, "0") + "-" + newYear;
    var titleDate = convertToRoamDate(newDate);
    var page = await window.roamAlphaAPI.q(`
    [:find ?e
        :where [?e :node/title "${titleDate}"]]`);
    if (page.length < 1) { // create new page
        await window.roamAlphaAPI.createPage({ page: { title: titleDate, uid: newDate } });
    }
    var results = window.roamAlphaAPI.data.pull("[:block/children]", [":block/uid", newDate]);
    if (results == null) {
        let newBlockUid = roamAlphaAPI.util.generateUID();
        await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newDate, order: 0 }, block: { string: "", uid: newBlockUid } });
    }
    window.roamAlphaAPI.ui.mainWindow.openBlock({ block: { uid: newDate } })
}

function convertToRoamDate(dateString) {
    var parsedDate = dateString.split('-');
    var year = parsedDate[2];
    var month = Number(parsedDate[0]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthName = months[month - 1];
    var day = Number(parsedDate[1]);
    let suffix = (day >= 4 && day <= 20) || (day >= 24 && day <= 30)
        ? "th"
        : ["st", "nd", "rd"][day % 10 - 1];
    return "" + monthName + " " + day + suffix + ", " + year + "";
}