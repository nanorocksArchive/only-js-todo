window.onload = function (e) {

    var options = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'Tasks from Todo List',
            data: [30,91,125]
        }],
        xaxis: {
            categories: [1991, 1998,1999]
        },
        fill: {
            colors: ['rgb(250, 162, 28)']
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Date for tasks
    function DateTask(){

        this.getTodayDate = function () {
            d = new Date();
            return d.getDay() + '-' + parseInt(d.getMonth() + 1) + '-' + d.getFullYear();
        };

        this.compareDates = function (date) {
            let splitDate = date.split('-');
            let dateString = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2];
            return dateString === this.getTodayDate();
        };

    }

    // Model for tasks
    function Task(name, date, check){
        this.nameTask = name;
        this.dateTask = date;
        this.isCheck = check;
    }

    // Model for view tasks
    function ViewTasks(tasks){

        this.taskList = tasks;

        this.viewModelTasks = function(view){

            let content = `<h5 class="text-center p-3 text-justify bg-light">No todo's in list for today.</h5>`;

            // If there is no tasks yet
            if(Object.keys(this.taskList).length <= 0)
            {
                view.innerHTML = content;
                return -1;
            }

            content = '';
            for(let ind=0; ind<Object.keys(this.taskList).length; ind++){

                d = new DateTask();
                let dateTask = this.taskList[ind].dateTask;
                let nameTask = this.taskList[ind].nameTask;
                let checkTask = this.taskList[ind].isCheck;

                if( !d.compareDates(this.taskList[ind].dateTask) ){
                    continue;
                }

                content += `  
                    <tr>
                        <th scope="row" class="border-top-0 align-middle">
                            ${ ind + 1 }
                        </th>
                        <td class="border-top-0 align-middle">
                            <span class="${ checkTask }">${ nameTask }</span>
                            <input type="text" class="task-date float-right" value="${ dateTask }">
                        </td>
                        <td class="text-right border-top-0">
                            <div class="btn-group m-0" role="group">
                                <button type="button" class="btn btn-outline-dark btn-sm m-1 check-task-btn">&#10004;</button>
                                <button type="button" class="btn btn-outline-dark btn-sm m-1 delete-task-btn" onclick="">&#10006;</button>
                            </div>
                        </td>
                    </tr>
                    `;
            }

            if(content === '')
            {
                content = `<h5 class="text-center p-3 text-justify bg-light">No todo's in list for today.</h5>`;
                view.innerHTML = content;
                return -1;
            }

            view.innerHTML = content;
        };

    }


    // ON LOAD --------------------------------------

    // Data
    let tasks = {
        0: {
            name: 'Eat Pizza',
            date: '6-7-2019',
            check: 'line-through'
        },
        1: {
            name: 'Watch Tv',
            date: '29-2-2019',
            check: 'line-through-none'
        },
        2: {
            name: 'Programming',
            date: '28-2-2019',
            check: 'line-through'
        }
    };

    let taskList = [];

    for(let i = 0; i < Object.keys(tasks).length; i ++)
    {
        let taskName = tasks[i].name;
        let taskDate = tasks[i].date;
        let taskCheck = tasks[i].check;

        taskList.push(new Task(taskName, taskDate, taskCheck));
    }

    tasksModel = new ViewTasks(taskList);

    // load data in view
    let view = document.getElementById('content-task-data');

    // Add task to task list
    let taskAddBtn = document.getElementById('task-add-btn');

    taskAddBtn.addEventListener('click', function (e) {

        let input = document.getElementById('task-add-input');
        let taskName = input.value;

        if(taskName.trim().length <= 0)
        {
            input.placeholder = 'Enter valid todo!!!';
            input.value = '';
            return -1;
        }

        input.value = '';

        let date = new DateTask();
        let taskDate = date.getTodayDate();

        let taskCheck = 'line-through-none';

        taskList.unshift(new Task(taskName, taskDate, taskCheck));
        tasksModel.viewModelTasks(view);

    });



    let deleteBtns = document.getElementsByClassName('delete-task-btn');

    function deleteTask(obj) {
        alert(1);
    }

    for(let i = 0; i < deleteBtns.length; i++)
    {
        console.log('aaaa', deleteBtns[i]);
        deleteBtns[i].addEventListener('click', deleteTask(this), false);
    }

    tasksModel.viewModelTasks(view);
};