import app from './app/server';

app.listen(app.get('port'), function() {
   console.log("listening", app.get('port'))
});