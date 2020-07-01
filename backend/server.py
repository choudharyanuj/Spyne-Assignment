from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import json,datetime

app = Flask(__name__)
CORS(app)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'OptimusPrime'
app.config['MYSQL_DB'] = 'spyne'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

@app.route('/home')
def home():
    return ("HELLO")

#For uploading image
@app.route('/addimage', methods=['POST'])
def addimage():
    if request.method == 'POST':
        f = request.files['new_image']
        location = "static/img/" + f.filename
        f.save(location)
    cursor = mysql.connection.cursor()
    cursor.execute("""insert into image_data (image) VALUES (%s)""", [location])
    mysql.connection.commit()
    cursor.close()
    return json.dumps({
        'image':location
    })


#For displaying all images
@app.route('/allimages', methods=['GET'])
def allimages():
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from image_data ORDER BY id DESC""")
    results = cursor.fetchall()
    cursor.close()
    items = []
    for item in results:
        items.append(item)
    return json.dumps(items)

#Selecting Particular image
@app.route('/details')
def details():
    image_id = request.headers.get('image_id')
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from image_data where id = (%s)""",[image_id])
    result = cursor.fetchall()
    cursor.close()
    items = []
    for item in result:
        items.append(item)
    return json.dumps(items) 

#Adding new comments
@app.route('/postcomment', methods=['POST'])
def postcomment():
    image_id = request.headers.get('image_id')
    comments = request.headers.get('comments')
    if request.method == 'POST':
        f = request.files['image']
        location = "static/img/" + f.filename
        f.save(location)
    cursor = mysql.connection.cursor()
    cursor.execute("""insert into image_review (image_id, comments, image) values (%s,%s,%s)""",[image_id, comments, location])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Commented Successfully")

#For accessing comments about particular images
@app.route('/allcomments/<int:image_id>')
def allcomments(image_id):
    cursor=mysql.connection.cursor()
    cursor.execute("""select * from image_review where image_id =(%s) order by timestamp desc""", [image_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    items = []
    for comments in result:
        comments["timestamp"] = datetime.datetime.strftime(comments["timestamp"], "%d %b, %y")
        items.append(comments)
    return json.dumps(items)
if __name__ == "__main__":
    app.run(debug = True)