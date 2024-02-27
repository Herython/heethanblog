document.addEventListener('DOMContentLoaded', function() {
    loadTasks(); // 加载已保存的任务
    updateDateTime(); 

    // 设置导航链接在新标签页打开
    var navLinks = document.querySelectorAll('nav a'); // 获取所有导航栏内的链接
    navLinks.forEach(function(link) {
        link.setAttribute('target', '_blank'); // 为每个链接设置target="_blank"
    });
});

function addTask() {
    var newTask = document.getElementById('new-task').value;
    if (newTask.trim() !== '') {
        var li = document.createElement('li');
        li.textContent = newTask;
        li.onclick = function() { this.remove(); saveTasks(); }; // 删除任务时也保存
        document.getElementById('tasks').appendChild(li);
        document.getElementById('new-task').value = '';
        saveTasks(); // 添加任务后保存
    }
}

function saveTasks() {
    var tasks = [];
    document.querySelectorAll('#tasks li').forEach(function(task) {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(function(task) {
        var li = document.createElement('li');
        li.textContent = task;
        li.onclick = function() { this.remove(); saveTasks(); };
        document.getElementById('tasks').appendChild(li);
    });
}

function search() {
    var query = document.getElementById('search-input').value;
    var engine = document.getElementById('search-engine').value;
    window.open(engine + encodeURIComponent(query), '_blank');
}


function updateDateTime() {
    var now = new Date();
    var dateTimeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    document.getElementById('current-date-time').textContent = dateTimeStr;
    setTimeout(updateDateTime, 1000);
}


