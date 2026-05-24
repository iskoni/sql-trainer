/* ==========================
   SQL TRAINER APP
========================== */

let editor;

let currentDifficulty = "Beginner";
let currentExercise = null;

let score = 0;
let completed = 0;

let exerciseIndex = 0;
let filteredExercises = [];

/* ==========================
   STARTUP
========================== */

window.addEventListener("DOMContentLoaded", async () => {

    await Database.init();

    initializeEditor();
    initializeButtons();
    initializeTopics();
    initializeDifficulty();

    loadExerciseSet();
    loadExercise();

});

/* ==========================
   EDITOR
========================== */

function initializeEditor() {

    editor = CodeMirror.fromTextArea(
        document.getElementById("sql-editor"),
        {
            mode: "text/x-sql",
            theme: "material-darker",
            lineNumbers: true,
            matchBrackets: true,
            smartIndent: true,
            autofocus: true
        }
    );

}

/* ==========================
   BUTTONS
========================== */

function initializeButtons() {

    document.getElementById("runBtn")
        .addEventListener("click", runExercise);

    document.getElementById("nextBtn")
        .addEventListener("click", nextExercise);

    document.getElementById("hintBtn")
        .addEventListener("click", toggleHint);

    document.getElementById("resetBtn")
        .addEventListener("click", () => {

            Database.reset();
            loadExerciseSet();
            loadExercise();

            document.getElementById("output").innerHTML =
                "Database reset.";

        });

    document.getElementById("toggleSchemaBtn")
        .addEventListener("click", toggleSchema);

}

/* ==========================
   LOAD EXERCISE SET (BY DIFFICULTY)
========================== */

function loadExerciseSet() {

    filteredExercises =
        Exercises.filter(ex =>
            ex.difficulty === currentDifficulty
        );

    exerciseIndex = 0;

}

/* ==========================
   LOAD CURRENT EXERCISE
========================== */

function loadExercise() {

    if (!filteredExercises.length) return;

    currentExercise =
        filteredExercises[exerciseIndex];

    renderExercise(currentExercise);

    syncTopicUI(currentExercise.topic);
}
/* ==========================
   RUN EXERCISE
========================== */

async function runExercise() {

    const sql = editor.getValue();

    const result = Database.execute(sql);

    renderExecution(result);

    const validation =
        await Validator.validate(currentExercise, sql);

    renderValidation(validation);
}

/* ==========================
   EXECUTION OUTPUT
========================== */

function renderExecution(result) {

    const output =
        document.getElementById("output");

    if (!result.success) {

        output.innerHTML = `
        <div class="error">
            ❌ ${result.error}
        </div>`;

        return;
    }

    if (result.data.length === 0) {

        output.innerHTML = `
        <div class="success">
            Query executed.
        </div>`;

        return;
    }

    const table = result.data[0];

    let html = `<table class="result-table">`;

    html += "<thead><tr>";

    table.columns.forEach(col => {
        html += `<th>${col}</th>`;
    });

    html += "</tr></thead><tbody>";

    table.values.forEach(row => {

        html += "<tr>";

        row.forEach(cell => {
            html += `<td>${cell}</td>`;
        });

        html += "</tr>";
    });

    html += "</tbody></table>";

    output.innerHTML = html;
}

/* ==========================
   VALIDATION
========================== */

function renderValidation(validation) {

    const output =
        document.getElementById("output");

    if (validation.success) {

        score += currentExercise.xp || 10;
        completed++;

        output.innerHTML += `
        <div class="success feedback-card feedback-success">
            ✅ Correct
            <br><br>
            ${validation.message}
            <br><br>
            XP: +${currentExercise.xp || 10}
            <br>
            Score: ${score}
        </div>`;

    } else {

        output.innerHTML += `
        <div class="error feedback-card feedback-error">
            ❌ Incorrect
            <br><br>
            ${validation.message}
        </div>`;
    }
}

/* ==========================
   NEXT EXERCISE (FIXED)
========================== */

function nextExercise() {

    exerciseIndex++;

    if (exerciseIndex >= filteredExercises.length) {
        exerciseIndex = 0;
    }

    Database.reset();

    loadExercise();

    document.getElementById("output").innerHTML = "Ready.";
}

/* ==========================
   DIFFICULTY
========================== */

function initializeDifficulty() {

    const selector =
        document.getElementById("difficulty");

    selector.addEventListener("change", (e) => {

        currentDifficulty = e.target.value;

        loadExerciseSet();
        loadExercise();

    });
}

/* ==========================
   TOPICS
========================== */

function initializeTopics() {

    const topics =
        document.querySelectorAll("#topics li");

    topics.forEach(item => {

        item.addEventListener("click", () => {

            loadTopicExercise(item.textContent);

        });

    });
}

/* ==========================
   TOPIC FILTER
========================== */

function loadTopicExercise(topic) {

    const matches =
        filteredExercises.filter(ex =>
            ex.topic === topic
        );

    if (!matches.length) return;

    currentExercise = matches[0];

    exerciseIndex =
        filteredExercises.indexOf(currentExercise);

    renderExercise(currentExercise);

    syncTopicUI(topic);
}

/* ==========================
   TOPIC UI
========================== */

function syncTopicUI(topic) {

    document.querySelectorAll("#topics li")
        .forEach(li => {

            li.classList.toggle(
                "active",
                li.textContent === topic
            );

        });
}

/* ==========================
   HINT
========================== */

function toggleHint() {

    document.getElementById("hintBox")
        .classList.toggle("hidden");
}

/* ==========================
   SCHEMA
========================== */
function toggleSchema() {

    const box =
        document.getElementById("schemaBox");

    const btn =
        document.getElementById("toggleSchemaBtn");

    box.classList.toggle("hidden");

    btn.textContent =
        box.classList.contains("hidden")
        ? "Show Schema"
        : "Hide Schema";

}

/* ==========================
   HELPER
========================== */
function renderExercise(ex) {

    document.getElementById("exerciseText")
        .textContent = ex.prompt;

    document.getElementById("hintBox")
        .textContent = ex.hint;

    document.getElementById("hintBox")
        .classList.add("hidden");

    document.getElementById("difficultyBadge")
        .textContent = ex.difficulty;

    document.getElementById("topicBadge")
        .textContent = ex.topic;

    editor.setValue("-- Write your SQL here");
}