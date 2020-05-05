
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    onDeviceReady: function () {


        let taskTxt = [];
        let taskStatus = [];

        console.log("ready!");

        //read file from internal storage
        
        if (window.localStorage.getItem("TASK_TXT") != undefined) {
            
            //Get the data from storage

            let text = window.localStorage.getItem("TASK_TXT");
            let status = window.localStorage.getItem("TASK_STAT");

            taskTxt = text.split(",");
            taskStatus = status.split(",");
        }

        //add button event handling
        $("#addBtn").click(function () {
            console.log("task added");

            //Add task to taskTxt set
            taskTxt.push($("#taskAdd").val());

            //set complete status to incomplete (represent by 0)
            taskStatus.push("0");

            //Save taskTxt to local storage
            window.localStorage.setItem("TASK_TXT", taskTxt.toString());

            //Save taskStatus to local storage
            window.localStorage.setItem("TASK_STAT", taskStatus.toString());

            //reload page
            location.reload();

            //clear text box
            //$("#taskAdd").val("");

        });

        //clear button event handling
        $("#clrBtn").click(function () {
            console.log("task clear");

            let inprogress = true;
            let donePos = -1;

            while (inprogress) {

                //finding done task position in array
                donePos = taskStatus.indexOf("1");

                if (donePos >= 0) {
                    taskStatus.splice(donePos, 1);
                    taskTxt.splice(donePos, 1);
                } else {
                    inprogress = false;
                }

            }


            //update local storage
            window.localStorage.setItem("TASK_STAT", taskStatus.toString());
            window.localStorage.setItem("TASK_TXT", taskTxt.toString());

            //reload page
            location.reload();

        });

        //check box event handling
        $("input[type=checkbox]").click(function () {
            console.log("checked ", this.checked);

            if (this.checked) {
                //update ui
                $("#" + this.value + "p").css("text-decoration", "line-through");

                //update done item by change it to 1 in taskStatus
                taskStatus[this.value] = "1";

            } else {
                $("#" + this.value + "p").css("text-decoration", "none");
                //update undone item by change it to 0 in taskStatus
                taskStatus[this.value] = "0";
            }

            //save task status to local storage
            window.localStorage.setItem("TASK_STAT", taskStatus.toString());

        });

        //update date in header
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

        $("#showDate").html(output);

    },




};

app.initialize();