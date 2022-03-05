import express from 'express';

const app = express();
app.listen(5050, () => {
  console.log('Server runnin in http://localhost:5050');
});
