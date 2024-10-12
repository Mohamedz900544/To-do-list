document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector(".add-new-task");
  const categoryInput = document.querySelector(".Add-Category");
  const categoryList = document.querySelector(".left-list");
  const categoryListOver = document.querySelector(".list-inside-over");
  const taskList = document.querySelector(".task-list");
  const clearCompletedButton = document.querySelector(".clear-completed");
  const footerFilter = document.querySelector(".footer");
  const overpage     = document.querySelector(".favDialog");
  const TaskButton   = document.querySelector(".button-task");
  const Taskbarr   = document.querySelector(".over-input");
  const clearhr       = document.querySelector(".task-list hr");
  const themeToggleButton = document.getElementById("nononno"); // New: Selecting the theme toggle button
  let activeCategory = "";

  
   
 
  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDarkMode = document.body.classList.contains("dark");
    themeToggleButton.classList.toggle("fa-sun", !isDarkMode);
    themeToggleButton.classList.toggle("fa-moon", isDarkMode);
  });
  
  let previousSelectedCategory = null;
  categoryListOver.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && e.target.classList.contains("Add-Category") === false) {
      // Select the new category
      selectCategory(e.target.dataset.categoryName || e.target.textContent.trim());
  
      if (previousSelectedCategory) {
        previousSelectedCategory.style.width = "";
        previousSelectedCategory.style.border = "";
      }

      e.target.style.width = "70%";
      e.target.style.border = "2px solid #ffffff";
      previousSelectedCategory = e.target;
    }
  });

  let selectedCategory = null;
  categoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && e.target.classList.contains("Add-Category") === false) {
      selectCategory(e.target.dataset.categoryName || e.target.textContent.trim());
      if (selectedCategory) {
        selectedCategory.style.width = "";
        selectedCategory.style.border = "";
      }
        e.target.style.width = "70%";
        e.target.style.border = "2px solid #ffffff";
      selectedCategory = e.target;
     }
    if (activeCategory === e.target.textContent) {
      // Get all tasks
      const allTasks = document.querySelectorAll(".task-list .weee");
  
      allTasks.forEach((task) => {
        const taskCategoryLabel = task.querySelector(".task-category-label");
        
        if (taskCategoryLabel && taskCategoryLabel.textContent.trim() === activeCategory) {
          task.style.display = "flex";  
        } else {
          task.style.display = "none";  
        }
      });
    }
   
    updateTaskCount()
  });

  function selectCategory(category) {
    activeCategory = category;
    document.querySelector(".tasks").textContent = `0 tasks for ${category}`;
  }

  
  taskInput.addEventListener("click", () => {
    overpage.style.display = "flex";  
  });

  TaskButton.addEventListener("click", () => {
    taskName = Taskbarr.value;
      if (!activeCategory) {
      alert("Please select a category before adding tasks.");
      return;
    }

   if (taskName) {
     const newTask = createTaskElement(taskName);
     taskList.appendChild(newTask);
     const hrElement = document.createElement("hr");
     taskList.appendChild(hrElement);
     updateTaskCount();
   }else{alert("Add a task description first"); return;}
   Taskbarr.value=""
   overpage.style.display = "none";
 });



  categoryInput.addEventListener("click", () => {
    const categoryName = prompt("Enter new category:");

    if (categoryName) {
      if (isCategoryExists(categoryName)) {
        alert(`The category "${categoryName}" already exists. Please enter a new category.`);
      } else {
        
        const randomColor = getRandomColor();
        const newCategory = createTaskCategory(categoryName,randomColor);
        const newCategoryover = createTaskCategory(categoryName,randomColor);
        categoryList.appendChild(newCategory);
        categoryListOver.appendChild(newCategoryover);
      }
    }else{alert("Add category name")}
  });

  taskList.addEventListener("click", (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains("circle") || e.target.classList.contains("fa-check")) {

      const targetElement = e.target.classList.contains("circle") ? e.target : e.target.closest(".circle");
      targetElement.classList.toggle("completed");
  
      const checkIcon = targetElement.querySelector("i");
  
      checkIcon.classList.toggle("hidden");
      checkIcon.classList.toggle("visible");
      updateTaskCount();
      console.log(targetElement.classList);
    }
  

    
    if (e.target.classList.contains("delete-task")) {
      e.target.parentElement.nextElementSibling?.remove();
      e.target.parentElement.remove();
      updateTaskCount();
    }
  });

  let categoryCounter = 0; 

  function createTaskCategory(category,color) {
    const categoryLabel = document.createElement("li");
  
    categoryLabel.className = `random${categoryCounter}`;
    categoryLabel.textContent = category;
  
    const randomColor = getRandomColor();
    categoryLabel.style.backgroundColor = color;
  
    categoryCounter++;
    return categoryLabel;
  }
  
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  function isCategoryExists(categoryName) {
    const categories = document.querySelectorAll(".left-list li");
    for (const category of categories) {
      if (category.textContent.trim().toLowerCase() === categoryName.trim().toLowerCase()) {
        return true;  // Category exists
      }
    }
    return false;
  }
  let countt = 0;
  function createTaskElement(taskName) {
    const li = document.createElement("li");
    li.className = "weee";
  
    const circle = document.createElement("div");
    circle.className = "circle";
  
    const checkIcon = document.createElement("i");
    checkIcon.className = "fa fa-check fa-solid hidden";
    circle.appendChild(checkIcon);
  
    const content = document.createElement("div");
    content.className = "content-list";
    content.textContent = taskName;
    
    const categoryLabel = document.createElement("div");
    categoryLabel.className = "task-category-label"; // Fixed class name
    categoryLabel.classList.add("tasko" + ++countt);
    categoryLabel.textContent = activeCategory;
  
    const selectedCategory = Array.from(document.querySelectorAll(".left-list li"))
                                  .find((el) => el.textContent.trim() === activeCategory);
    
    if (selectedCategory) {
      const selectedCategoryColor = window.getComputedStyle(selectedCategory).backgroundColor;
      categoryLabel.style.backgroundColor = selectedCategoryColor;
    }
  
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash delete-task";
    deleteIcon.style.cursor = "pointer";
  
    li.appendChild(circle);
    li.appendChild(content);
    li.appendChild(categoryLabel);
    // li.appendChild(deleteIcon);
    return li;
  }
  
  clearCompletedButton.addEventListener("click", () => {
    document.querySelectorAll(".circle.completed").forEach((task) => {
      task.parentElement.nextElementSibling?.remove();
      task.parentElement.remove();
    });
    countt = 0;
    updateTaskCount();
  });

  let previousSelectedfooter = null;
  footerFilter.addEventListener("click", (e) => {
    if(previousSelectedfooter){
      previousSelectedfooter.style.color="";
    }
    e.target.style.color="white"
    previousSelectedfooter= e.target;
    if (e.target.tagName !== "SPAN") return;

    const filter = e.target.textContent.toLowerCase();
    const ftlr   = e.target.textContent
    let conter = 0;
    document.querySelectorAll(".task-list li").forEach((task) => {
      const isCompleted = task.querySelector(".circle").classList.contains("completed");
      switch (filter) {
        case "active":
          task.style.display = isCompleted ? "none" : "flex";
          if(!isCompleted) conter++;
          break;
        case "completed":
          task.style.display = isCompleted ? "flex" : "none";
          if(isCompleted) conter++ , completedCounter++;
          break;
        case "all":
        default:
          task.style.display = "flex";
          conter++
          break;
      }
      // const totalTaskse = task.length;
      document.querySelector(".tasks").textContent = `${conter} tasks for ${ftlr}`;
    });

  });

  function updateTaskCount() {
    const totalTasks = Array.from(document.querySelectorAll(".task-list .weee")).filter((task) => {
      const taskCategoryLabel = task.querySelector(".task-category-label");
      return taskCategoryLabel && taskCategoryLabel.textContent.trim() === activeCategory;
    }).length;
  
    document.querySelector(".tasks").textContent = `${totalTasks} tasks for ${activeCategory}`;
  }


});
