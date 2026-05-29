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

    syncTopicUI(
        currentExercise.topic
    );

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

    editor.setValue(
        ex.starterCode ||
        "-- Write your SQL here"
    );

}

/* ==========================
   EXERCISE COUNTER
   ========================== */

function updateCounter(){

    document
    .getElementById(
        "exerciseCounter"
    )
    .textContent =
        (exerciseIndex + 1) +
        " / " +
        filteredExercises.length;

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
        `<table class="result-table">`;

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
        "</tbody></table>";

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

    /* Get unique topics from
       filtered exercises */

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

        li.textContent = topic;

        li.addEventListener(

            "click",

            ()=>{

                loadTopicExercise(
                    topic
                );

            }

        );

        topicsUl.appendChild(li);

    });

    /* Set first topic active */

    if(topicsUl.firstChild){

        topicsUl
        .firstChild
        .classList
        .add("active");

    }

}

/* ==========================
   TOPIC FILTER
   ========================== */

function loadTopicExercise(
    topic
){

    const matches =

        filteredExercises
        .filter(

            ex =>

            ex.topic ===
            topic

        );

    if(
        !matches.length
    ){

        return;

    }

    currentExercise =
        matches[0];

    exerciseIndex =

        filteredExercises
        .indexOf(
            currentExercise
        );

    renderExercise(
        currentExercise
    );

    syncTopicUI(topic);

    updateCounter();

}

/* ==========================
   TOPIC UI
   ========================== */

function syncTopicUI(
    topic
){

    document
    .querySelectorAll(
        "#topics li"
    )

    .forEach(li=>{

        li.classList.toggle(

            "active",

            li.textContent
            === topic

        );

    });

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