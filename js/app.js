/* ==========================
   SQL TRAINER APP
========================== */

let editor;

let currentDifficulty = "Beginner";
let currentExercise = null;

let score = 0;
let completed = 0;

/* ==========================
   STARTUP
========================== */

window.addEventListener(
"DOMContentLoaded",
async ()=>{

    await Database.init();

    initializeEditor();
    initializeButtons();
    initializeTopics();
    initializeDifficulty();

    loadExercise();

});

/* ==========================
   EDITOR
========================== */

function initializeEditor(){

    editor = CodeMirror.fromTextArea(

        document.getElementById(
            "sql-editor"
        ),

        {

            mode:"text/x-sql",
            theme:"material-darker",
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
    .getElementById("runBtn")
    .addEventListener(
        "click",
        runExercise
    );

    document
    .getElementById("hintBtn")
    .addEventListener(
        "click",
        toggleHint
    );

    createNextButton();

}

/* ==========================
   NEXT BUTTON
========================== */

function createNextButton(){

    if(
        document.getElementById(
            "nextBtn"
        )
    ){

        return;

    }

    const btn =
        document.createElement(
            "button"
        );

    btn.id = "nextBtn";

    btn.textContent =
        "Next Exercise";

    btn.style.marginTop = "18px";

    btn.addEventListener(
        "click",
        nextExercise
    );

    document
    .querySelector(
        ".exercise-card"
    )
    .appendChild(btn);

}

/* ==========================
   LOAD EXERCISE
========================== */

function loadExercise(){

    currentExercise =
        ExerciseManager.getCurrent(
            currentDifficulty
        );

    if(!currentExercise){

        return;

    }

    document
    .getElementById(
            "exerciseText"
    )
    .textContent =
        currentExercise.prompt;

    document
    .getElementById(
        "hintBox"
    )
    .textContent =
        currentExercise.hint;

    document
    .getElementById(
        "hintBox"
    )
    .classList.add(
        "hidden"
    );

    editor.setValue(
        currentExercise
        .starterCode
    );

    syncTopicUI(
        currentExercise.topic
    );

}

/* ==========================
   RUN EXERCISE
========================== */

async function runExercise(){

    const sql =
        editor.getValue();

    renderExecution(
        Database.execute(sql)
    );

    const validation =
        await Validator.validate(
            currentExercise,
            sql
        );

    renderValidation(
        validation
    );

}

/* ==========================
   EXECUTION PANEL
========================== */

function renderExecution(result){

    const output =
        document.getElementById(
            "output"
        );

    if(
        !result.success
    ){

        output.innerHTML = `
        <div class="error">
            ❌ ${result.error}
        </div>
        `;

        return;

    }

    if(
        result.data.length === 0
    ){

        output.innerHTML = `
        <div class="success">
            Query executed.
        </div>
        `;

        return;

    }

    const table =
        result.data[0];

    let html =
        `<table class="result-table">`;

    html += "<thead><tr>";

    table.columns.forEach(col=>{

        html += `
        <th>${col}</th>
        `;

    });

    html += "</tr></thead><tbody>";

    table.values.forEach(row=>{

        html += "<tr>";

        row.forEach(cell=>{

            html += `
            <td>${cell}</td>
            `;

        });

        html += "</tr>";

    });

    html += "</tbody></table>";

    output.innerHTML = html;

}

/* ==========================
   VALIDATION
========================== */

function renderValidation(
    validation
){

    const output =
        document.getElementById(
            "output"
        );

    if(
        validation.success
    ){

        score += 10;
        completed++;

        output.innerHTML += `

        <div class="success"
        style="margin-top:18px">

        ✅ Correct

        <br>

        ${validation.message}

        <br><br>

        Score: ${score}

        </div>

        `;

    }

    else{

        output.innerHTML += `

        <div class="error"
        style="margin-top:18px">

        ❌ Incorrect

        <br>

        ${validation.message}

        </div>

        `;

    }

}

/* ==========================
   NEXT EXERCISE
========================== */

function nextExercise(){

    ExerciseManager.next(
        currentDifficulty
    );

    Database.reset();

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

    const selector =
        document.getElementById(
            "difficulty"
        );

    selector.addEventListener(

        "change",

        e=>{

            currentDifficulty =
                e.target.value;

            ExerciseManager
            .reset();

            loadExercise();

        }

    );

}

/* ==========================
   TOPICS
========================== */

function initializeTopics(){

    const topics =
        document.querySelectorAll(
            "#topics li"
        );

    topics.forEach(item=>{

        item.addEventListener(

            "click",

            ()=>{

                const topic =
                    item.textContent;

                loadTopicExercise(
                    topic
                );

            }

        );

    });

}

/* ==========================
   TOPIC EXERCISE LOADER
========================== */

function loadTopicExercise(
    topic
){

    const exercises =

        Exercises.filter(ex=>

            ex.difficulty ===
            currentDifficulty

            &&

            ex.topic === topic

        );

    if(
        exercises.length === 0
    ){

        return;

    }

    currentExercise =
        exercises[0];

    document
    .getElementById(
        "exerciseText"
    )
    .textContent =
        currentExercise.prompt;

    document
    .getElementById(
        "hintBox"
    )
    .textContent =
        currentExercise.hint;

    editor.setValue(
        currentExercise
        .starterCode
    );

    syncTopicUI(topic);

}

/* ==========================
   TOPIC ACTIVE STATE
========================== */

function syncTopicUI(topic){

    document
    .querySelectorAll(
        "#topics li"
    )

    .forEach(li=>{

        li.classList.remove(
            "active"
        );

        if(

            li.textContent === topic

        ){

            li.classList.add(
                "active"
            );

        }

    });

}

/* ==========================
   HINT TOGGLE
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