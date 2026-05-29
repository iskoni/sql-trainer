/* ==========================
   SQL TRAINER APP
   ========================== */

let editor;

let currentDifficulty =
    "Beginner";

let currentExercise =
    null;

let score = 0;
let completed = 0;

let exerciseIndex = 0;

let filteredExercises = [];

/* ==========================
   STARTUP
   ========================== */

window.addEventListener(

    "DOMContentLoaded",

    async ()=>{

        await Database.init();

        initializeEditor();

        initializeButtons();

        initializeDifficulty();

        loadExerciseSet();

        loadExercise();

        renderSchema();

        renderTablesList();

    }

);

/* ==========================
   EDITOR
   ========================== */

function initializeEditor(){

    editor =
        CodeMirror.fromTextArea(

            document.getElementById(
                "sql-editor"
            ),

            {

                mode:"text/x-sql",

                theme:
                "material-darker",

                lineNumbers:true,

                matchBrackets:true,

                smartIndent:true,

                autofocus:true

            }

        );

    editor.on("change", () => {
        if (currentExercise) {
            localStorage.setItem(`sql_draft_${currentExercise.id}`, editor.getValue());
        }
    });

}

/* ==========================
   BUTTONS
   ========================== */

function initializeButtons(){

    document
    .getElementById(
        "runBtn"
    )
    .addEventListener(
        "click",
        runExercise
    );

    document
    .getElementById(
        "nextBtn"
    )
    .addEventListener(
        "click",
        nextExercise
    );

    document
    .getElementById(
        "hintBtn"
    )
    .addEventListener(
        "click",
        toggleHint
    );

    document
    .getElementById(
        "resetBtn"
    )
    .addEventListener(

        "click",

        ()=>{

            Database.reset();

            renderSchema();

            loadExercise();

            document
            .getElementById(
                "output"
            )
            .innerHTML =
            "Database reset.";

        }

    );

    document
    .getElementById(
        "toggleSchemaBtn"
    )
    .addEventListener(
        "click",
        toggleSchema
    );

    document
    .getElementById(
        "exerciseCounter"
    )
    .addEventListener(
        "change",
        (e) => {
            exerciseIndex = parseInt(e.target.value, 10);
            Database.reset();
            renderSchema();
            loadExercise();
            document.getElementById("output").innerHTML = "Ready.";
        }
    );

    const mobileBtn = document.getElementById("mobileMenuBtn");
    if(mobileBtn) {
        mobileBtn.addEventListener("click", () => {
            document.querySelector(".sidebar").classList.toggle("open");
        });
    }

    // Close sidebar when clicking outside of it on mobile
    document.addEventListener("click", (e) => {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar && sidebar.classList.contains("open")) {
            if (!sidebar.contains(e.target) && mobileBtn && !mobileBtn.contains(e.target)) {
                sidebar.classList.remove("open");
            }
        }
    });

}

/* ==========================
   EXERCISE SET
   ========================== */

function loadExerciseSet(){

    filteredExercises =

        (window.Exercises || [])
        .filter(

            ex =>

            ex.difficulty ===
            currentDifficulty

        );

    exerciseIndex = 0;

    /* Rebuild topic sidebar */

    renderTopics();

}

/* ==========================
   LOAD EXERCISE
   ========================== */

function loadExercise(){

    if(
        !filteredExercises.length
    ){

        document
        .getElementById(
            "exerciseText"
        )
        .textContent =
            "No exercises for this level yet.";

        return;

    }

    currentExercise =
        filteredExercises[
            exerciseIndex
        ];

    renderExercise(
        currentExercise
    );

    syncTopicUI();

    updateCounter();

}

/* ==========================
   RENDER EXERCISE
   ========================== */

function renderExercise(ex){

    document
    .getElementById(
        "exerciseText"
    )
    .textContent =
        ex.prompt;

    document
    .getElementById(
        "hintBox"
    )
    .textContent =
        ex.hint;

    document
    .getElementById(
        "hintBox"
    )
    .classList.add(
        "hidden"
    );

    /* Note box for non-SQLite */

    const noteBox =
        document
        .getElementById(
            "noteBox"
        );

    if(ex.note){

        noteBox.textContent =
            "⚠ " + ex.note;

        noteBox.classList
        .remove("hidden");

    } else {

        noteBox.textContent = "";

        noteBox.classList
        .add("hidden");

    }

    /* Difficulty badge */

    const badge =
        document
        .getElementById(
            "difficultyBadge"
        );

    badge.textContent =
        ex.difficulty;

    badge.className =
        "badge badge-" +
        ex.difficulty
        .toLowerCase();

    document
    .getElementById(
        "topicBadge"
    )
    .textContent =
        ex.topic;

    const defaultCode = "-- Write your SQL here";
    const savedDraft = localStorage.getItem(`sql_draft_${ex.id}`);

    if (savedDraft !== null && savedDraft !== "") {
        editor.setValue(savedDraft);
        editor.setOption("placeholder", "");
    } else if (!ex.starterCode || ex.starterCode === defaultCode) {
        editor.setValue("");
        editor.setOption("placeholder", defaultCode);
    } else {
        editor.setValue(ex.starterCode);
        editor.setOption("placeholder", "");
    }

}

/* ==========================
   EXERCISE COUNTER
   ========================== */

function updateCounter(){

    const selector = document.getElementById("exerciseCounter");
    selector.innerHTML = "";
    
    filteredExercises.forEach((ex, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = (idx + 1) + " / " + filteredExercises.length + " - " + ex.topic;
        if (idx === exerciseIndex) {
            opt.selected = true;
        }
        selector.appendChild(opt);
    });

}

/* ==========================
   RUN EXERCISE
   ========================== */

async function runExercise(){

    const sql =
        editor.getValue();

    /* For non-SQLite conceptual
       exercises, show the query
       but skip validation */

    if(currentExercise.note &&
       !currentExercise.expectedQuery){

        document
        .getElementById("output")
        .innerHTML = `

        <div class="feedback-card
                     feedback-error">

            This is a conceptual
            exercise. The syntax
            shown is not supported
            in SQLite.

        </div>

        `;

        return;

    }

    const result =
        Database.execute(sql);

    renderExecution(
        result
    );

    const validation =

        await Validator
        .validate(

            currentExercise,

            sql

        );

    renderValidation(
        validation
    );

}

/* ==========================
   RESULT PANEL
   ========================== */

function renderExecution(result){

    const output =
        document
        .getElementById(
            "output"
        );

    if(
        !result.success
    ){

        output.innerHTML = `

        <div class="feedback-card feedback-error">

            ❌ ${result.error}

        </div>

        `;

        return;

    }

    if(
        result.data.length===0
    ){

        output.innerHTML = `

        <div class="feedback-card feedback-success">

            Query executed.

        </div>

        `;

        return;

    }

    const table =
        result.data[0];

    let html =
        `<div class="table-responsive"><table class="result-table">`;

    html +=
        "<thead><tr>";

    table.columns
    .forEach(col=>{

        html +=
        `<th>${col}</th>`;

    });

    html +=
        "</tr></thead><tbody>";

    table.values
    .forEach(row=>{

        html += "<tr>";

        row.forEach(cell=>{

            html +=
            `<td>${cell !== null ? cell : '<em>NULL</em>'}</td>`;

        });

        html += "</tr>";

    });

    html +=
        "</tbody></table></div>";

    output.innerHTML =
        html;

}

/* ==========================
   VALIDATION
   ========================== */

function renderValidation(
    validation
){

    const output =
        document
        .getElementById(
            "output"
        );

    if(
        validation.success
    ){

        score +=
            currentExercise.xp;

        completed++;

        output.innerHTML += `

        <div class="feedback-card feedback-success">

            ✅ Correct

            <br><br>

            ${validation.message}

            <br><br>

            XP:
            +${currentExercise.xp}

            <br>

            Score:
            ${score}

        </div>

        `;

    }

    else{

        output.innerHTML += `

        <div class="feedback-card feedback-error">

            ❌ Incorrect

            <br><br>

            ${validation.message}

        </div>

        `;

    }

}

/* ==========================
   NEXT EXERCISE
   ========================== */

function nextExercise(){

    exerciseIndex++;

    if(

        exerciseIndex >=
        filteredExercises.length

    ){

        exerciseIndex = 0;

    }

    Database.reset();

    renderSchema();

    loadExercise();

    document
    .getElementById(
        "output"
    )
    .innerHTML =
        "Ready.";

}

/* ==========================
   DIFFICULTY
   ========================== */

function initializeDifficulty(){

    document
    .getElementById(
        "difficulty"
    )
    .addEventListener(

        "change",

        e=>{

            currentDifficulty =
                e.target.value;

            loadExerciseSet();

            loadExercise();

            document
            .getElementById(
                "output"
            )
            .innerHTML =
                "Ready.";

        }

    );

}

/* ==========================
   DYNAMIC TOPICS
   ========================== */

function renderTopics(){

    const topicsUl =
        document
        .getElementById(
            "topics"
        );

    topicsUl.innerHTML = "";

    const topics = [
        ...new Set(
            filteredExercises
            .map(ex => ex.topic)
        )
    ];

    topics.forEach(topic =>{

        const li =
            document
            .createElement("li");

        li.className = "topic-header";
        li.textContent = topic;

        const exList = document.createElement("ul");
        exList.className = "topic-exercises hidden";
        
        filteredExercises.filter(e => e.topic === topic).forEach(ex => {
            const exLi = document.createElement("li");
            exLi.textContent = ex.title || "Exercise " + ex.id;
            exLi.className = "topic-exercise-item";
            exLi.dataset.index = filteredExercises.indexOf(ex);
            exLi.addEventListener("click", (e) => {
                e.stopPropagation();
                exerciseIndex = parseInt(exLi.dataset.index, 10);
                Database.reset();
                renderSchema();
                loadExercise();
                document.getElementById("output").innerHTML = "Ready.";
                document.querySelector(".sidebar").classList.remove("open");
            });
            exList.appendChild(exLi);
        });

        li.addEventListener("click", () => {
            exList.classList.toggle("hidden");
        });

        li.appendChild(exList);
        topicsUl.appendChild(li);

    });

}

function syncTopicUI(){

    document.querySelectorAll(".topic-exercises").forEach(ul => ul.classList.add("hidden"));
    document.querySelectorAll(".topic-exercise-item").forEach(li => li.classList.remove("active"));
    
    const activeLi = document.querySelector(`.topic-exercise-item[data-index="${exerciseIndex}"]`);
    if (activeLi) {
        activeLi.classList.add("active");
        const parentUl = activeLi.closest(".topic-exercises");
        if (parentUl) {
            parentUl.classList.remove("hidden");
        }
    }

}

/* ==========================
   HINT
   ========================== */

function toggleHint(){

    document
    .getElementById(
        "hintBox"
    )
    .classList.toggle(
        "hidden"
    );

}

/* ==========================
   SCHEMA
   ========================== */

function renderSchema(){

    const list =
        document
        .getElementById(
            "schemaList"
        );

    list.innerHTML = "";

    Database
    .getSchema()

    .forEach(row=>{

        const li =
            document
            .createElement(
                "li"
            );

        li.textContent =
            row;

        list.appendChild(li);

    });

}

function toggleSchema(){

    const box =
        document
        .getElementById(
            "schemaBox"
        );

    const btn =
        document
        .getElementById(
            "toggleSchemaBtn"
        );

    box.classList.toggle(
        "hidden"
    );

    btn.textContent =

        box.classList.contains(
            "hidden"
        )

        ?

        "Show Schema"

        :

        "Hide Schema";

}

/* ==========================
   DYNAMIC TABLES LIST
   ========================== */

function renderTablesList(){

    const tablesList =
        document
        .getElementById(
            "tablesList"
        );

    if(!tablesList) return;

    tablesList.innerHTML = "";

    Database
    .getSchema()

    .forEach(row=>{

        const tableName =
            row.split("(")[0];

        const li =
            document
            .createElement(
                "li"
            );

        li.textContent =
            tableName;

        tablesList
        .appendChild(li);

    });

}