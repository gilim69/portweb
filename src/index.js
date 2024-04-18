const express = require('express');
// *** REMOVE ***
const v1Router = require('./v1/routes');
// *** ADD ***
const v1WorkoutRouter = require('./v1/routes/workoutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
///console.log(app)
// *** REMOVE ***
app.use('/api/v1', v1Router);

// *** ADD ***
app.use('/api/v1/workouts', v1WorkoutRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});