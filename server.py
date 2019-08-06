from flask import Flask, redirect, render_template, request, session, url_for

app = Flask(__name__)


@app.route('/')
def main_page():
    return render_template('game.html')


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8001,
        debug=True
    )